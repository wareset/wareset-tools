import type { RollupOptions, Plugin } from 'rollup'

import * as fs from 'fs'
import * as path from 'path'

import Jimp from 'jimp'
import AdmZip from 'adm-zip'

import rollupJson from '@rollup/plugin-json'
import rollupInject, { type RollupInjectOptions } from '@rollup/plugin-inject'
import rollupReplace from '@rollup/plugin-replace'
import rollupCommonjs from '@rollup/plugin-commonjs'
import rollupResolve from '@rollup/plugin-node-resolve'
import rollupPolyfillNode from 'rollup-plugin-polyfill-node'
import rollupLivereload from 'rollup-plugin-livereload'

import rollupCssinjsMinify from '@wareset-tools/rollup-plugin-cssinjs-minify'

import { optimize as svgo } from 'svgo'
import { minify as terser } from 'terser'
import { transform as sucrase } from 'sucrase'
import { transformAsync as babel } from '@babel/core'

import * as MATH_SAFE from 'math-safe'

// let livereload: Plugin | null

export default function ({
  sdkUrl = 'https://yandex.ru/games/sdk/v2',
  srcDir = 'src',
  appDir = 'app',
  zipDir = 'zip',
  staticDirName = 'static',
  injects = {} as RollupInjectOptions,
  plugins = [] as Plugin[],
  globals = {} as { [key: string]: string },
  indexHtmlFile = path.join(appDir, '_index.html'),
  scriptFileList = [] as string[],
} = {}) {
  const stringify = JSON.stringify
  // @ts-ignore
  const production = !process.env.ROLLUP_WATCH

  const APP_DEV_DIR = path.join(appDir, '_dev')
  const SCRIPTS_DIR = path.join(APP_DEV_DIR, 'scripts')

  fs.mkdirSync(path.resolve(zipDir), { recursive: true })
  fs.mkdirSync(path.resolve(SCRIPTS_DIR), { recursive: true })

  // livereload =
  //   !production && !livereload ? rollupLivereload({ watch: appDevDir, delay: 99 }) : null

  const _INDEX_HTML = fs
    .readFileSync(path.resolve(indexHtmlFile), 'utf8')
    .replace(/\s*<!--[^]*?-->|\s*\/\*[^]*?\*\/|\s*\/\/[^\n]*/g, '')
    .replace(/\s*\n/g, '\n')

  return fs
    .readdirSync(path.resolve(srcDir), { withFileTypes: true })
    .filter((dirent) => dirent.isFile() && /^[^_\W][^]*\.tsx?$/.test(dirent.name))
    .map((dirent, k): RollupOptions => {
      const input = dirent.name
      const title = input.match(/^\w+/)![0]

      const outputFile = path.join(APP_DEV_DIR, `${title}.js`)
      const livereload = production
        ? null
        : rollupLivereload({ watch: outputFile, port: 35729 + k })

      let INDEX_HTML = _INDEX_HTML.replace('</title>', `: ${title}</title>`)

      const ZIP_FILE = path.resolve(zipDir, `${title}.zip`)
      if (fs.existsSync(ZIP_FILE)) fs.rmSync(ZIP_FILE)

      fs.writeFileSync(
        path.resolve(appDir, `${title}.html`),
        INDEX_HTML.replace(
          /\s*<\/body>/,
          '' +
            scriptFileList
              .map((file) => {
                file = path.resolve(file)
                const name = path.basename(file)
                if (!/\.js/.test(name)) return ''
                fs.cpSync(file, path.resolve(SCRIPTS_DIR, name))

                if (fs.existsSync(file + '.map')) {
                  fs.cpSync(file + '.map', path.resolve(SCRIPTS_DIR, name + '.map'))
                }

                return `\n    <script src=${stringify(`_dev/scripts/${name}`)}></script>`
              })
              .join('') +
            `\n    <script src=${stringify(`_dev/${title}.js`)} defer></script>` +
            `\n  </body>`
        )
      )

      if (production)
        INDEX_HTML = INDEX_HTML.replace(
          /\s*<\/head>/,
          '' +
            '\n    <!-- Game SDK -->' +
            (sdkUrl ? `\n    <script src=${stringify(sdkUrl)}></script>` : '') +
            `\n  </head>`
        ).replace(
          /\s*<\/body>/,
          '' +
            (scriptFileList = scriptFileList
              .map((file) => {
                file = path.resolve(file)
                if (!/\.js/.test(file)) return ''
                if (!/\.min\.js/.test(file) && fs.existsSync(file.slice(0, -2) + 'min.js')) {
                  file = file.slice(0, -2) + 'min.js'
                }
                return file
              })
              .filter(Boolean))
              .map((file) => {
                const src = stringify(`${staticDirName}/scripts/${path.basename(file)}`)
                return `\n    <script src=${src}></script>`
              })
              .join('') +
            `\n    <script src=${stringify(`${staticDirName}/build.js`)} defer></script>` +
            `\n  </body>`
        )

      return {
        external: Object.keys(globals),
        input: path.join(srcDir, input),
        output: {
          globals,
          // interop: 'auto',
          sourcemap: false,
          format: 'iife',
          name: title,
          file: outputFile,
        },
        plugins: [
          // production && {
          //   transform(code, id) {
          //     if (this.getModuleInfo(id).isEntry) {
          //       return polyfill + '\n' + code
          //     }
          //   }
          // },
          rollupJson(),
          rollupReplace({
            preventAssignment: true,
            values: {
              'process.env.DEV': stringify(!production),
              'process.env.NODE_ENV': stringify(production ? 'production' : 'dev'),
            },
          }),
          rollupResolve({
            browser: true,
            extensions: ['.mjs', '.js', '.jsx', '.mts', '.ts', '.tsx', '.json'],
          }),
          rollupCommonjs(),
          rollupPolyfillNode(),

          {
            name: 'svg-custom',
            transform(code, id) {
              // if (id in temp) return temp[id]
              if (/\.svg$/.test(id)) {
                code = svgo(code).data
                return `export default ${stringify(encodeURIComponent(code))}`
              }
              return null
            },
          },
          {
            name: 'img-custom',
            async transform(_code, id) {
              if (/\.(?:jpe?g|png|bmp|tiff|gif)$/.test(id)) {
                const img = await Jimp.read(id)
                const base64 = await img.getBase64Async(img.getMIME())
                return `export default ${stringify(base64)}`
              }
              return null
            },
          },
          {
            name: 'sucrase-custom',
            transform(code, id) {
              if (/\.[mc]?(?:jsx|tsx?)$/.test(id)) {
                try {
                  code = sucrase(code, {
                    transforms: ['jsx', 'typescript'],
                    production: true,
                    jsxRuntime: 'classic', // "classic" | "automatic" | "preserve"
                    jsxImportSource: 'rease',
                    // jsxPragma: 'rease.h',
                    // jsxFragmentPragma: 'rease.ReaseFragment'
                  }).code
                } catch (e) {
                  console.error('sucrase-custom')
                  throw e
                }
                return { code }
              }
              return null
            },
          },

          //
          // REASE
          rollupCssinjsMinify(),
          (() => {
            return rollupInject({
              REASE: ['rease', '*'],
              css: ['rease', 'css'],
              'React.createElement': ['rease', 'createElement'],
              'React.Fragment': ['rease', 'RFragment'],
            })
          })(),
          // REASE
          //

          //
          // MATH
          (() => {
            const obj = { MATH: ['math-safe', '*'] } as any
            // Object.keys(MATH_SAFE).forEach((v) => {
            //   obj['Math.' + v] = ['math-safe', v]
            // })
            return rollupInject(obj)
            // return inject({
            //   Math: ['math-safe', '*'],
            //   MATH: ['math-safe', '*']
            // })
          })(),
          // MATH
          //

          Object.keys(injects).length ? rollupInject(injects) : null,

          ...plugins,

          livereload,

          {
            name: 'babel-and-terser',
            async transform(code) {
              if (production)
                try {
                  code = (await babel(code, {
                    presets: [
                      [
                        '@babel/preset-env',
                        {
                          corejs: 3,
                          loose: true,
                          bugfixes: true,
                          modules: false,
                          useBuiltIns: 'entry', // 'entry', 'usage'
                          targets: 'iOS 7', // > 0.025%, ie >= 11
                        },
                      ],
                    ],
                    plugins: [
                      '@babel/plugin-transform-runtime',
                      [
                        '@babel/plugin-transform-block-scoping',
                        {
                          throwIfClosureRequired: true,
                        },
                      ],
                    ],
                  }))!.code!
                  return { code }
                } catch (e) {
                  console.error('babel-custom')
                  throw e
                }
            },
            async renderChunk(code, chunk) {
              if (production)
                try {
                  return (
                    (
                      await terser(code, {
                        safari10: true,
                        mangle: true,
                        module: true,
                        toplevel: true,
                        compress: {
                          drop_console: true,

                          keep_fnames: false,
                          keep_classnames: false,
                        },
                      })
                    ).code ||
                    (console.warn(`WARN: chunk "${chunk.name}" - terser return empty code`),
                    code)
                  )
                } catch (e) {
                  console.error('terser-custom')
                  throw e
                }
            },
          },

          {
            name: 'write-bundle',
            writeBundle(data) {
              if (!production) return
              if (data.name !== title) return

              setTimeout(() => {
                const zip = new AdmZip()
                const staticDir = path.resolve(appDir, staticDirName)
                if (fs.existsSync(staticDir)) {
                  zip.addLocalFolder(staticDir, staticDirName)
                }
                scriptFileList.forEach((file) => {
                  zip.addLocalFile(file, staticDirName + '/scripts')
                })
                zip.addFile('index.html', Buffer.from(INDEX_HTML, 'utf8'))
                zip.addLocalFile(path.resolve(outputFile), staticDirName, 'build.js')
                zip.writeZip(ZIP_FILE)
              }, 500)
            },
          },
        ],
        watch: { clearScreen: false },
      }
    })
}
