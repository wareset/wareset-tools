import os from 'node:os'
import fs from 'node:fs'
import path from 'node:path'
import cp from 'node:child_process'
import fetch from 'node-fetch'

const URL_DETECTION = 'https://translate.api.cloud.yandex.net/translate/v2/detect'
const URL_LANGUAGES = 'https://translate.api.cloud.yandex.net/translate/v2/languages'
const URL_TRANSLATE = 'https://translate.api.cloud.yandex.net/translate/v2/translate'

const TEN_O_CLOCK = 1000 * 60 * 60 * 11

let YA_FOLDER_ID: string
let YA_API_TOKEN: string
const removeYaApiToken = () => (YA_API_TOKEN = '')

let DIR_HOME: string
let FILE_YA_FOLDER_ID: string
let FILE_YA_API_TOKEN: string
let FILE_YA_LANGUAGES: string
let FILE_YA_TRANLATES: string
let FILE_YA_DETECTION: string

//                     from lang        to lang          word           translate
let CACHE_TRANSLATE: { [key: string]: { [key: string]: { [key: string]: string } } }
//                     word           lang
let CACHE_DETECTION: { [key: string]: string }
let LANGS: string

// const timeout = (ms = 100) => new Promise((res) => setTimeout(res, ms))

const checkFolderId = () => {
  if (!YA_FOLDER_ID) {
    DIR_HOME = os.homedir()
    FILE_YA_FOLDER_ID = path.resolve(DIR_HOME, '.ya.folder_id.cache.txt')
    FILE_YA_API_TOKEN = path.resolve(DIR_HOME, '.ya.api_token.cache.txt')
    FILE_YA_LANGUAGES = path.resolve(DIR_HOME, '.ya.languages.cache.json')
    FILE_YA_TRANLATES = path.resolve(DIR_HOME, '.ya.translate.cache.json')
    FILE_YA_DETECTION = path.resolve(DIR_HOME, '.ya.detection.cache.json')

    // GET FOLDER ID
    try {
      if (fs.existsSync(FILE_YA_FOLDER_ID)) {
        YA_FOLDER_ID = fs.readFileSync(FILE_YA_FOLDER_ID, 'utf8').trim()
      } else {
        const res = cp.execSync('yc config list', { encoding: 'utf8' })
        YA_FOLDER_ID = res.match(/folder-id:\s*([^\s]+)/)![1].trim()
        fs.writeFileSync(FILE_YA_FOLDER_ID, YA_FOLDER_ID)
      }
      console.log('YA_FOLDER_ID: ', YA_FOLDER_ID)
    } catch (e) {
      throw {
        myMsg: 'Please install "yc" cli: https://yandex.cloud/ru/docs/cli/quickstart',
        error: e,
      }
    }

    // GET LANGS
    try {
      if (fs.existsSync(FILE_YA_LANGUAGES)) {
        LANGS = fs.readFileSync(FILE_YA_LANGUAGES, 'utf8') || ''
      }
    } catch {}

    // GET CACHE_TRANSLATE
    CACHE_TRANSLATE = {}
    try {
      if (fs.existsSync(FILE_YA_TRANLATES)) {
        CACHE_TRANSLATE = JSON.parse(fs.readFileSync(FILE_YA_TRANLATES, 'utf8')) || {}
      }
    } catch {}

    // GET CACHE_TRANSLATE
    CACHE_DETECTION = {}
    try {
      if (fs.existsSync(FILE_YA_DETECTION)) {
        CACHE_DETECTION = JSON.parse(fs.readFileSync(FILE_YA_DETECTION, 'utf8')) || {}
      }
    } catch {}
  }
}

const checkApiToken = () => {
  if (!YA_API_TOKEN) {
    let needUpdateApiToken = false
    if (fs.existsSync(FILE_YA_API_TOKEN)) {
      const mtimeMs = fs.lstatSync(FILE_YA_FOLDER_ID).mtimeMs
      const etimeMs = Date.now() - mtimeMs
      if (etimeMs > TEN_O_CLOCK * 0.9) {
        needUpdateApiToken = true
      } else {
        setTimeout(removeYaApiToken, TEN_O_CLOCK - etimeMs)
      }
    } else {
      needUpdateApiToken = true
    }

    if (needUpdateApiToken) {
      YA_API_TOKEN = cp.execSync('yc iam create-token', { encoding: 'utf8' }).trim()
      fs.writeFileSync(FILE_YA_API_TOKEN, YA_API_TOKEN)
      setTimeout(removeYaApiToken, TEN_O_CLOCK)
    } else {
      YA_API_TOKEN = fs.readFileSync(FILE_YA_API_TOKEN, 'utf8').trim()
    }

    console.log('YA_API_TOKEN: ', YA_API_TOKEN)
  }
}

// const addTaskinQueue = (URL: string, request: (YA_API_TOKEN: string) => RequestInit) =>
//   new Promise<{ text: string; json: any }>((resolve, reject) =>
//     QUEUE.push({ resolve, reject, URL, request })
//   )

export const listLanguages = () => addTaskinQueue(URL_LANGUAGES)

export const detectLanguage = async (text: string, languageCodeHints?: string[]) => {
  text = text.trim().slice(0, 990).toLocaleLowerCase()
  if (!text) throw new Error('YA detectLanguage: text is empty')
  return addTaskinQueue(URL_DETECTION, text, languageCodeHints)
}

export const translate = (async (text: string | string[], from: string, to: string) => {
  if (!from) throw new Error('YA translate: from is empty')
  if (!to) throw new Error('YA translate: to is empty')
  const isArray = Array.isArray(text)
  if (from === to || !text.length) return isArray ? text.slice(0) : text

  const texts: string[][] = ((isArray ? text : [text]) as string[]).reduce(
    (res, v) => {
      if (v.length > 9990) throw new Error('YA translate: text very big')
      const a = res[res.length - 1]
      v.length + a.join('').length > 9990 ? res.push([v]) : a.push(v)
      return res
    },
    [[]] as string[][]
  )

  const res = await Promise.all(
    texts.map(
      function (this: { from: string; to: string }, v) {
        return addTaskinQueue(URL_TRANSLATE, v, this.from, this.to)
      },
      { from, to }
    )
  )

  // console.log(res)
  return isArray ? Array.prototype.concat.apply([], res) : res[0][0] || ''
}) as {
  (text: string, from: string, to: string): Promise<string>
  (text: string[], from: string, to: string): Promise<string[]>
}

type IQueueItem =
  | {
      resolve: (value: any) => void
      reject: (reason?: any) => void
      URL: typeof URL_LANGUAGES
      text: undefined
      from: undefined
      to: undefined
    }
  | {
      resolve: (value: any) => void
      reject: (reason?: any) => void
      URL: typeof URL_DETECTION
      text: string
      from: undefined | string[]
      to: undefined
    }
  | {
      resolve: (value: any) => void
      reject: (reason?: any) => void
      URL: typeof URL_TRANSLATE
      text: string[]
      from: string
      to: string
    }

const QUEUE: IQueueItem[] = []
function addTaskinQueue(
  URL: typeof URL_LANGUAGES,
  _?: never
): Promise<{ code: string; name?: string }[]>
function addTaskinQueue(
  URL: typeof URL_DETECTION,
  text: string,
  languageCodeHints?: string[]
): Promise<string>
function addTaskinQueue(
  URL: typeof URL_TRANSLATE,
  text: string[],
  from: string,
  to: string
): Promise<string[]>
function addTaskinQueue(URL: any, text?: any, from?: any, to?: any): any {
  return new Promise((resolve, reject) => {
    QUEUE.push({ resolve, reject, URL, text, from, to })
    runQueue()
  })
}

let item: IQueueItem | null | undefined
async function runQueue() {
  if (!item && (item = QUEUE.shift())) {
    checkFolderId()
    let { resolve, reject } = item
    try {
      switch (item.URL) {
        case URL_LANGUAGES: {
          if (!LANGS) {
            checkApiToken()
            const request = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${YA_API_TOKEN}`,
              },
              body: JSON.stringify({
                folderId: YA_FOLDER_ID,
              }),
            }
            const response = await fetch(URL_LANGUAGES, request)
            const text = await response.text()
            const json = JSON.parse(text)

            if (!Array.isArray(json.languages)) throw json

            fs.writeFileSync(FILE_YA_LANGUAGES, (LANGS = text))
            resolve(json.languages)
          } else {
            resolve(JSON.parse(LANGS).languages)
          }
          break
        }
        case URL_DETECTION: {
          const { text } = item
          if (!CACHE_DETECTION.hasOwnProperty(text)) {
            checkApiToken()
            const request = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${YA_API_TOKEN}`,
              },
              body: JSON.stringify({
                text,
                languageCodeHints: item.from,
                folderId: YA_FOLDER_ID,
              }),
            }
            const response = await fetch(URL_DETECTION, request)
            const json = (await response.json()) as any

            if (typeof json.languageCode !== 'string') throw json
            CACHE_DETECTION[text] = json.languageCode
            console.log('YA detectLanguage: ' + text + ' => ' + CACHE_DETECTION[text])
            fs.writeFileSync(FILE_YA_DETECTION, JSON.stringify(CACHE_DETECTION, null, 2))
          }
          resolve(CACHE_DETECTION[text])
          break
        }
        case URL_TRANSLATE: {
          const { text, from, to } = item
          CACHE_TRANSLATE.hasOwnProperty(from) || (CACHE_TRANSLATE[from] = {})
          CACHE_TRANSLATE[from].hasOwnProperty(to) || (CACHE_TRANSLATE[from][to] = {})
          const texts = text.filter(function (this: any, v, k, a) {
            return v.trim() && !this.hasOwnProperty(v) && k === a.indexOf(v)
          }, CACHE_TRANSLATE[from][to])

          const data = CACHE_TRANSLATE[from][to]

          if (texts.length) {
            checkApiToken()
            const request = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${YA_API_TOKEN}`,
              },
              body: JSON.stringify({
                sourceLanguageCode: from,
                targetLanguageCode: to,
                texts,
                folderId: YA_FOLDER_ID,
              }),
            }
            const response = await fetch(URL_TRANSLATE, request)
            const json = (await response.json()) as any
            if (!Array.isArray(json.translations)) throw json
            // console.log(json)
            json.translations.forEach(
              function (this: any, v: any, k: number) {
                console.log('YA translate ' + this.to + ': ' + this.texts[k] + ' => ' + v.text)
                this.data[this.texts[k]] = v.text
              },
              { data, texts, to }
            )
            fs.writeFileSync(FILE_YA_TRANLATES, JSON.stringify(CACHE_TRANSLATE, null, 2))
          }
          resolve(
            text.map(function (this: any, v) {
              return this[v]
            }, data)
          )
          break
        }
      }
    } catch (e) {
      reject(e)
    }

    item = null
    runQueue()
  }
}
