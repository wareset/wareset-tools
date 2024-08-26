/* eslint-disable */
import*as e from"fs";import*as r from"path";import s from"jimp";import t from"adm-zip";import o from"@rollup/plugin-json";import n from"@rollup/plugin-inject";import i from"@rollup/plugin-replace";import a from"@rollup/plugin-commonjs";import l from"@rollup/plugin-node-resolve";import c from"rollup-plugin-polyfill-node";import p from"rollup-plugin-livereload";import m from"@wareset-tools/rollup-plugin-cssinjs-minify";import{optimize as u}from"svgo";import{minify as d}from"terser";import{transform as f}from"sucrase";import{transformAsync as v}from"@babel/core";function g({sdkUrl:g="https://yandex.ru/games/sdk/v2",srcDir:j="src",appDir:y="app",zipDir:b="zip",staticDirName:x="static",injects:h={},plugins:$=[],globals:w={},indexHtmlFile:S=r.join(y,"_index.html"),scriptFileList:F=[]}={}){var k=JSON.stringify,_=!process.env.ROLLUP_WATCH,E=r.join(y,"_dev"),R=r.join(E,"scripts");e.mkdirSync(r.resolve(b),{recursive:!0}),e.mkdirSync(r.resolve(R),{recursive:!0});var D=e.readFileSync(r.resolve(S),"utf8").replace(/\s*<!--[^]*?-->|\s*\/\*[^]*?\*\/|\s*\/\/[^\n]*/g,"").replace(/\s*\n/g,"\n");return e.readdirSync(r.resolve(j),{withFileTypes:!0}).filter((e=>e.isFile()&&/^[^_\W][^]*\.tsx?$/.test(e.name))).map(((S,A)=>{var L=S.name,O=L.match(/^\w+/)[0],B=r.join(E,`${O}.js`),I=_?null:p({watch:B,port:35729+A}),N=D.replace("</title>",`: ${O}</title>`),z=r.resolve(b,`${O}.zip`);return e.existsSync(z)&&e.rmSync(z),e.writeFileSync(r.resolve(y,`${O}.html`),N.replace(/\s*<\/body>/,F.map((s=>{s=r.resolve(s);var t=r.basename(s);return/\.js/.test(t)?(e.cpSync(s,r.resolve(R,t)),e.existsSync(s+".map")&&e.cpSync(s+".map",r.resolve(R,t+".map")),`\n    <script src=${k(`_dev/scripts/${t}`)}><\/script>`):""})).join("")+`\n    <script src=${k(`_dev/${O}.js`)} defer><\/script>\n  </body>`)),_&&(N=N.replace(/\s*<\/head>/,"\n    \x3c!-- Game SDK --\x3e"+(g?`\n    <script src=${k(g)}><\/script>`:"")+"\n  </head>").replace(/\s*<\/body>/,(F=F.map((s=>(s=r.resolve(s),/\.js/.test(s)?(!/\.min\.js/.test(s)&&e.existsSync(s.slice(0,-2)+"min.js")&&(s=s.slice(0,-2)+"min.js"),s):""))).filter(Boolean)).map((e=>`\n    <script src=${k(`${x}/scripts/${r.basename(e)}`)}><\/script>`)).join("")+`\n    <script src=${k(`${x}/build.js`)} defer><\/script>\n  </body>`)),{external:Object.keys(w),input:r.join(j,L),output:{globals:w,sourcemap:!1,format:"iife",name:O,file:B},plugins:[o(),i({preventAssignment:!0,values:{"process.env.DEV":k(!_),"process.env.NODE_ENV":k(_?"production":"dev")}}),l({browser:!0,extensions:[".mjs",".js",".jsx",".mts",".ts",".tsx",".json"]}),a(),c(),{name:"svg-custom",transform:(e,r)=>/\.svg$/.test(r)?(e=u(e).data,`export default ${k(encodeURIComponent(e))}`):null},{name:"img-custom",async transform(e,r){if(/\.(?:jpe?g|png|bmp|tiff|gif)$/.test(r)){var t=await s.read(r),o=await t.getBase64Async(t.getMIME());return`export default ${k(o)}`}return null}},{name:"sucrase-custom",transform(e,r){if(/\.[mc]?(?:jsx|tsx?)$/.test(r)){try{e=f(e,{transforms:["jsx","typescript"],production:!0,jsxRuntime:"classic",jsxImportSource:"rease"}).code}catch(s){throw console.error("sucrase-custom"),s}return{code:e}}return null}},m(),n({REASE:["rease","*"],css:["rease","css"],"React.createElement":["rease","createElement"],"React.Fragment":["rease","RFragment"]}),n({MATH:["math-safe","*"]}),Object.keys(h).length?n(h):null,...$,I,{name:"babel-and-terser",async transform(e){if(_)try{return{code:e=(await v(e,{presets:[["@babel/preset-env",{corejs:3,loose:!0,bugfixes:!0,modules:!1,useBuiltIns:"entry",targets:"iOS 7"}]],plugins:["@babel/plugin-transform-runtime",["@babel/plugin-transform-block-scoping",{throwIfClosureRequired:!0}]]})).code}}catch(r){throw console.error("babel-custom"),r}},async renderChunk(e,r){if(_)try{return(await d(e,{safari10:!0,mangle:!0,module:!0,toplevel:!0,compress:{drop_console:!0,keep_fnames:!1,keep_classnames:!1}})).code||(console.warn(`WARN: chunk "${r.name}" - terser return empty code`),e)}catch(s){throw console.error("terser-custom"),s}}},{name:"write-bundle",writeBundle(s){_&&s.name===O&&setTimeout((()=>{var s=new t,o=r.resolve(y,x);e.existsSync(o)&&s.addLocalFolder(o,x),F.forEach((e=>{s.addLocalFile(e,x+"/scripts")})),s.addFile("index.html",Buffer.from(N,"utf8")),s.addLocalFile(r.resolve(B),x,"build.js"),s.writeZip(z)}),500)}}],watch:{clearScreen:!1}}}))}export{g as default};
