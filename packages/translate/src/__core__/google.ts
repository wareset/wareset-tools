import * as fs from 'fs'
import * as os from 'os'
import * as path from 'path'

import puppeteer, { type Page, type Browser } from 'puppeteer'

export const GOOGLE_LANGS = {
  ru: 'русский',
  en: 'английский',
  az: 'азербайджанский',
  ay: 'аймара',
  sq: 'албанский',
  am: 'амхарский',
  ar: 'арабский',
  hy: 'армянский',
  as: 'ассамский',
  af: 'африкаанс',
  bm: 'бамбара',
  eu: 'баскский',
  be: 'белорусский',
  bn: 'бенгальский',
  my: 'бирманский',
  bg: 'болгарский',
  bs: 'боснийский',
  // bho: 'бходжпури',
  cy: 'валлийский',
  hu: 'венгерский',
  vi: 'вьетнамский',
  // haw: 'гавайский',
  gl: 'галисийский',
  el: 'греческий',
  ka: 'грузинский',
  gn: 'гуарани',
  gu: 'гуджарати',
  da: 'датский',
  // doi: 'догри',
  zu: 'зулу',
  iw: 'иврит',
  ig: 'игбо',
  yi: 'идиш',
  // ilo: 'илоканский',
  id: 'индонезийский',
  ga: 'ирландский',
  is: 'исландский',
  es: 'испанский',
  it: 'итальянский',
  yo: 'йоруба',
  kk: 'казахский',
  kn: 'каннада',
  ca: 'каталанский',
  qu: 'кечуа',
  ky: 'киргизский',
  // 'zh-TW': 'китайский (традиционный)',
  'zh-CN': 'китайский', // (упрощенный)',
  // gom: 'конкани',
  ko: 'корейский',
  co: 'корсиканский',
  xh: 'коса',
  ht: 'креольский', // (гаити)',
  // kri: 'крио',
  ku: 'курдский', // (курманджи)',
  // ckb: 'курдский (сорани)',
  km: 'кхмерский',
  lo: 'лаосский',
  la: 'латинский',
  lv: 'латышский',
  ln: 'лингала',
  lt: 'литовский',
  lg: 'луганда',
  lb: 'люксембургский',
  // mai: 'майтхили',
  mk: 'македонский',
  mg: 'малагасийский',
  ms: 'малайский',
  ml: 'малаялам',
  dv: 'мальдивский',
  mt: 'мальтийский',
  mi: 'маори',
  mr: 'маратхи',
  // 'mni-Mtei': 'мейтейлон (манипури)',
  // lus: 'мизо',
  mn: 'монгольский',
  de: 'немецкий',
  ne: 'непальский',
  nl: 'нидерландский',
  no: 'норвежский',
  or: 'ория',
  om: 'оромо',
  pa: 'панджаби',
  fa: 'персидский',
  pl: 'польский',
  pt: 'португальский',
  ps: 'пушту',
  rw: 'руанда',
  ro: 'румынский',
  sm: 'самоанский',
  sa: 'санскрит',
  // ceb: 'себуанский',
  // nso: 'сепеди',
  sr: 'сербский',
  st: 'сесото',
  si: 'сингальский',
  sd: 'синдхи',
  sk: 'словацкий',
  sl: 'словенский',
  so: 'сомалийский',
  sw: 'суахили',
  su: 'сунданский',
  tg: 'таджикский',
  th: 'тайский',
  ta: 'тамильский',
  tt: 'татарский',
  te: 'телугу',
  ti: 'тигринья',
  ts: 'тсонга',
  tr: 'турецкий',
  tk: 'туркменский',
  uz: 'узбекский',
  ug: 'уйгурский',
  uk: 'украинский',
  ur: 'урду',
  tl: 'филиппинский',
  fi: 'финский',
  fr: 'французский',
  fy: 'фризский',
  ha: 'хауса',
  hi: 'хинди',
  // hmn: 'хмонг',
  hr: 'хорватский',
  ak: 'чви',
  ny: 'чева',
  cs: 'чешский',
  sv: 'шведский',
  sn: 'шона',
  gd: 'шотландский', // (гэльский)',
  ee: 'эве',
  eo: 'эсперанто',
  et: 'эстонский',
  jw: 'яванский',
  ja: 'японский',
} as const

export const google = (() => {
  let page: Page | null
  let browser: Browser | null
  let item: any
  let CACHE: any
  const CACHE_PATH = path.join(os.homedir(), '.wareset_tools_google.cache.json')
  const QUEUE: any[] = []
  console.log('GT cache: ' + CACHE_PATH)

  const timeout = (ms = 100) => new Promise((res) => setTimeout(res, ms))

  const response = async (response: any) => {
    if (!item || !item.res) return
    try {
      const data = (await response.buffer()).toString()

      const tt = data.split('\n')[3]
      const res = JSON.parse(JSON.parse(tt)[0][2])[1]
      const {
        0: {
          0: { 5: arr },
        },
        // 1: to,
        // 3: from,
        4: { 0: text, 1: from, 2: to },
      } = res
      if (item.text !== text || item.from !== from || item.to !== to) return
      // console.log(res)
      const translate = arr.map((v: any) => v[0]).join('')

      console.log('GT:', translate, to, from)

      if (CACHE) {
        if (!CACHE[item.from]) CACHE[item.from] = {}
        if (!CACHE[item.from][item.to]) CACHE[item.from][item.to] = {}
        CACHE[item.from][item.to][item.text] = translate
        fs.writeFileSync(CACHE_PATH, JSON.stringify(CACHE, null, 2))
      }

      item.res(translate)
      item.res = null
      await timeout(item.timeout)
      item = null
      goto()

      // if (!item.ready) {
      //   const [, , , , [text, from, to]] = res
      //   if (item.from === from && item.to === to && item.text === text) item.ready = true
      // } else {
      //   const [translate, to, from] = res
      //   if (item.from !== from || item.to !== to) return
      //   console.log('GT:', translate, to, from)

      //   if (CACHE) {
      //     if (!CACHE[item.from]) CACHE[item.from] = {}
      //     if (!CACHE[item.from][item.to]) CACHE[item.from][item.to] = {}
      //     CACHE[item.from][item.to][item.text] = translate
      //     // fs.writeFileSync(CACHE_PATH, JSON.stringify(CACHE, null, 2))
      //   }

      //   item.res(translate)
      //   item.res = null
      //   await timeout(333)
      //   item = null
      //   goto()
      // }
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
          CACHE = {}
          if (fs.existsSync(CACHE_PATH)) {
            try {
              CACHE = JSON.parse(fs.readFileSync(CACHE_PATH, 'utf8')) || {}
            } catch {}
          }
        }

        if (CACHE[from] && CACHE[from][to] && CACHE[from][to][text]) {
          item.res(CACHE[from][to][text])
          item.res = null
          item = null
          goto()
        } else {
          if (!page) {
            page = await (browser = await puppeteer.launch({ headless: false })).newPage()
            // await page.setUserAgent(customUA);
            page.on('response', response)
          }
          page.goto(
            `https://translate.google.com/?sl=${from}&tl=${to}&text=${encodeURI(
              text
            )}&op=translate`
          )
        }
      } else {
        cto = setTimeout(autoclose, 5000)
      }
    }
  }

  return (text = '', from = 'en', to = 'ru', timeout = 2222): Promise<string> => {
    if (from === 'zh') from = 'zh-CN'
    if (to === 'zh') to = 'zh-CN'
    if (from === to) return Promise.resolve(text)
    if (!(from in GOOGLE_LANGS) || !(to in GOOGLE_LANGS)) {
      throw new Error(`wareset_tools_google: ${from} -> ${to}: - incorrect lang`)
    }

    return new Promise((res) => {
      QUEUE.push({ res, text, from, to, timeout }), goto()
    })
  }
})()
