import * as fs from 'fs'
import * as os from 'os'
import * as path from 'path'

import puppeteer, { type Page, type Browser } from 'puppeteer'

export const DEEPL_LANGS = {
  en: 'английский',
  ar: 'арабский',
  bg: 'болгарский',
  hu: 'венгерский',
  el: 'греческий',
  da: 'датский',
  id: 'индонезийский',
  es: 'испанский',
  it: 'итальянский',
  zh: 'китайский',
  ko: 'корейский',
  lv: 'латышский',
  lt: 'литовский',
  de: 'немецкий',
  nl: 'нидерландский',
  nb: 'норвежский',
  pl: 'польский',
  pt: 'португальский',
  ro: 'румынский',
  ru: 'русский',
  sk: 'словацкий',
  sl: 'словенский',
  tr: 'турецкий',
  uk: 'украинский',
  fi: 'финский',
  fr: 'французский',
  cs: 'чешский',
  sv: 'шведский',
  et: 'эстонский',
  ja: 'японский'
} as const

export const deepl = (() => {
  let page: Page | null
  let browser: Browser | null
  let item: any
  let CACHE: any
  const CACHE_PATH = path.join(os.tmpdir(), 'wareset_tools_deepl.json')
  const QUEUE: any[] = []

  const timeout = (ms = 100) => new Promise((res) => setTimeout(res, ms))

  const response = async (response: any) => {
    if (!item) return
    try {
      const result = JSON.parse((await response.buffer()).toString()).result
      if (!result) return
      let { source_lang, target_lang, translations } = result
      if (!source_lang || !target_lang || !translations) return

      // console.log(source_lang, target_lang, translations)
      source_lang = source_lang.toLowerCase()
      target_lang = target_lang.toLowerCase()
      if (item.from !== source_lang || item.to !== target_lang) {
        return
        // console.error('deepl: incorrect result langs', { target: item, result })
        // throw new Error('deepl: incorrect result langs')
      }

      const res = translations.map((v: any) => v.beams[0].sentences[0].text).join('\n')
      if (CACHE) {
        if (!CACHE[item.from]) CACHE[item.from] = {}
        if (!CACHE[item.from][item.to]) CACHE[item.from][item.to] = {}
        CACHE[item.from][item.to][item.text] = res
        fs.writeFileSync(CACHE_PATH, JSON.stringify(CACHE, null, 2))
      }

      item.res(res)
      await timeout(333)
      item = null
      goto()
    } catch {}
  }

  let cto: any
  const autoclose = () => browser && (browser.close(), (browser = page = null))
  const goto = async () => {
    clearTimeout(cto)
    if (!item) {
      if ((item = QUEUE.shift())) {
        const { from, to, text } = item

        if (!CACHE) {
          if (fs.existsSync(CACHE_PATH)) {
            CACHE = JSON.parse(fs.readFileSync(CACHE_PATH, 'utf8'))
          } else {
            CACHE = {}
          }
        }

        if (CACHE[from] && CACHE[from][to] && CACHE[from][to][text]) {
          item.res(CACHE[from][to][text])
          item = null
          goto()
        } else {
          if (!page) {
            page = await (browser = await puppeteer.launch({ headless: false })).newPage()
            page.on('response', response)
          }
          page.goto(`https://www.deepl.com/ru/translator#${from}/${to}/${encodeURI(text)}`)
        }
      } else {
        cto = setTimeout(autoclose, 5000)
      }
    }
  }

  return (text = '', from = 'en', to = 'ru') => {
    if (from === to || !(from in DEEPL_LANGS) || !(to in DEEPL_LANGS)) {
      throw new Error(`wareset_tools_deepl: ${from} -> ${to}: - incorrect lang`)
    }

    return new Promise((res) => {
      QUEUE.push({ res, text, from, to }), goto()
    })
  }
})()
