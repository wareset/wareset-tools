if (process.execArgv[0] === '--inspect') {
  console.log('gen-dev: started')
  setTimeout(() => console.log('gen-dev: stopped'), 1000 * 60 * 60 * 24 * 24)
}

import * as fs from 'fs'
import * as url from 'url'
import * as path from 'path'
// import { createRequire } from 'module'
// const require = createRequire(import.meta.url)
const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

import { optimize as svgo } from 'svgo'

const SVG_DIR = path.resolve(__dirname, 'svg')

;(() => {
  for (const dirname of fs.readdirSync(SVG_DIR)) {
    if (dirname[0] === '_') continue
    let res = ``
    console.log(dirname)
    for (const filename of fs.readdirSync(path.join(SVG_DIR, dirname))) {
      if (!/^[^_].*\.svg$/.test(filename)) continue
      console.log(filename)
      const svg = svgo(fs.readFileSync(path.join(SVG_DIR, dirname, filename), 'utf8')).data
      const matches = svg.match(/(?<=\sd\=['"`])[^'"`]+/g) || []
      if (matches.length !== 1)
        throw new Error(`gen svg: dirname: ${dirname} filename: ${filename} is NOT FALID!!!`)
      else {
        res += `export const ${filename.match(/\w+/g)[0]} = ${JSON.stringify(matches[0])}\n`
      }
    }

    if (res) {
      const dir = path.resolve(__dirname, '../src/__core__/gen/svg')
      fs.mkdirSync(dir, { recursive: true })
      fs.writeFileSync(path.join(dir, dirname + '.ts'), res)
    }
  }
})()
