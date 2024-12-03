/* eslint-disable */
Object.defineProperty(exports,"__esModule",{value:!0});const e=require("fs"),r=require("path"),n=require("jimp"),t=require("adm-zip"),s=require("@rollup/plugin-json"),o=require("@rollup/plugin-inject"),i=require("@rollup/plugin-replace"),a=require("@rollup/plugin-commonjs"),l=require("@rollup/plugin-node-resolve"),c=require("rollup-plugin-polyfill-node"),u=require("rollup-plugin-livereload"),p=require("@wareset-tools/rollup-plugin-cssinjs-minify"),m=require("svgo"),d=require("terser"),f=require("sucrase"),g=require("@babel/core");function b(e){const r=Object.create(null);if(e)for(const n in e)if("default"!==n){const t=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(r,n,t.get?t:{enumerable:!0,get:function(){return e[n]}})}return r.default=e,Object.freeze(r)}const y=b(e),v=b(r),h="<!DOCTYPE html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width,initial-scale=1.0\" />\n    \x3c!-- <meta name=\"theme-color\" content=\"#222222\" /> --\x3e\n    <title>Game</title>\n    <style>\n      html,\n      body {\n        /* overflow: hidden; */\n        touch-action: none;\n        overscroll-behavior: contain;\n        background-color: #000;\n        color: #fff;\n        margin: 0;\n        font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue',\n          'Noto Sans', 'Liberation Sans', Arial, sans-serif, 'Apple Color Emoji',\n          'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';\n      }\n      html *,\n      html *::before,\n      html *::after {\n        font-family: inherit !important;\n      }\n      *,\n      *::before,\n      *::after {\n        box-sizing: border-box !important;\n\n        -webkit-user-drag: none !important;\n        -khtml-user-drag: none !important;\n        -moz-user-drag: none !important;\n        -ms-user-drag: none !important;\n\n        -webkit-touch-callout: none !important; /* iOS Safari */\n        -webkit-user-select: none !important; /* Safari */\n        -khtml-user-select: none !important; /* Konqueror HTML */\n        -moz-user-select: none !important; /* Old versions of Firefox */\n        -ms-user-select: none !important; /* Internet Explorer/Edge */\n        user-select: none !important;\n      }\n    </style>\n  </head>\n  <body>\n  </body>\n</html>\n";exports.default=function({sdkUrl:e="https://yandex.ru/games/sdk/v2",srcDir:r="src",appDir:b="app",zipDir:j="zip",staticDirName:x="static",injects:S={},plugins:w=[],globals:$={},indexHtmlFile:k=v.join(b,"_index.html"),scriptFileList:q=[]}={}){var O=JSON.stringify,E=!process.env.ROLLUP_WATCH,F=v.join(b,"_dev"),_=v.join(F,"scripts");y.mkdirSync(v.resolve(j),{recursive:!0}),y.mkdirSync(v.resolve(_),{recursive:!0});var R=(y.existsSync(k=v.resolve(k))?y.readFileSync(k,"utf8"):(y.writeFileSync(k,h),h)).replace(/\s*<!--[^]*?-->|\s*\/\*[^]*?\*\/|\s*\/\/[^\n]*/g,"").replace(/\s*\n/g,"\n");return y.readdirSync(v.resolve(r),{withFileTypes:!0}).filter((e=>e.isFile()&&/^[^_\W][^]*\.tsx?$/.test(e.name))).map(((h,k)=>{var I=h.name,L=I.match(/^\w+/)[0],z=v.join(F,`${L}.js`),D=E?null:u({watch:z,port:35729+k}),M=R.replace("</title>",`: ${L}</title>`),N=v.resolve(j,`${L}.zip`);return y.existsSync(N)&&y.rmSync(N),y.writeFileSync(v.resolve(b,`${L}.html`),M.replace(/\s*<\/body>/,q.map((e=>{e=v.resolve(e);var r=v.basename(e);return/\.js/.test(r)?(y.cpSync(e,v.resolve(_,r)),y.existsSync(e+".map")&&y.cpSync(e+".map",v.resolve(_,r+".map")),`\n    <script src=${O(`_dev/scripts/${r}`)}><\/script>`):""})).join("")+`\n    <script src=${O(`_dev/${L}.js`)} defer><\/script>\n  </body>`)),E&&(M=M.replace(/\s*<\/head>/,"\n    \x3c!-- Game SDK --\x3e"+(e?`\n    <script src=${O(e)}><\/script>`:"")+"\n  </head>").replace(/\s*<\/body>/,(q=q.map((e=>(e=v.resolve(e),/\.js/.test(e)?(!/\.min\.js/.test(e)&&y.existsSync(e.slice(0,-2)+"min.js")&&(e=e.slice(0,-2)+"min.js"),e):""))).filter(Boolean)).map((e=>`\n    <script src=${O(`${x}/scripts/${v.basename(e)}`)}><\/script>`)).join("")+`\n    <script src=${O(`${x}/build.js`)} defer><\/script>\n  </body>`)),{external:Object.keys($),input:v.join(r,I),output:{globals:$,sourcemap:!1,format:"iife",name:L,file:z},plugins:[s(),i({preventAssignment:!0,values:{"process.env.DEV":O(!E),"process.env.NODE_ENV":O(E?"production":"dev")}}),c(),l({browser:!0,preferBuiltins:!1,extensions:[".mjs",".js",".jsx",".mts",".ts",".tsx",".json"]}),a({sourceMap:!1}),{name:"logs-check",onLog(e,r){console.log("LOG:"),console.log(r),"MISSING_EXPORT"===r.code&&this.error(r)}},{name:"svg-custom",transform:(e,r)=>/\.svg$/.test(r)?(e=m.optimize(e).data,`export default ${O(encodeURIComponent(e))}`):null},{name:"img-custom",async transform(e,r){if(/\.(?:jpe?g|png|bmp|tiff|gif)$/.test(r)){var t=await n.read(r),s=await t.getBase64Async(t.getMIME());return`export default ${O(s)}`}return null}},{name:"sucrase-custom",transform(e,r){if(/\.[mc]?(?:jsx|tsx?)$/.test(r)){try{e=f.transform(e,{transforms:["jsx","typescript"],production:!0,jsxRuntime:"classic"}).code}catch(n){throw console.error("sucrase-custom"),n}return{code:e}}return null}},p(),o({sourceMap:!1,REASE:["rease","*"],css:["rease","css"],"React.createElement":["rease","createElement"],"React.Fragment":["rease","RFragment"]}),Object.keys(S).length?o({sourceMap:!1,...S}):null,...w,D,{name:"babel-and-terser",async transform(e){if(E)try{return{code:e=(await g.transformAsync(e,{presets:[["@babel/preset-env",{corejs:3,loose:!0,bugfixes:!0,modules:!1,useBuiltIns:"entry",targets:"iOS 7"}]],plugins:["@babel/plugin-transform-runtime",["@babel/plugin-transform-block-scoping",{throwIfClosureRequired:!0}]]})).code}}catch(r){throw console.error("babel-custom"),r}},async renderChunk(e,r){if(E)try{return(await d.minify(e,{sourceMap:!1,safari10:!0,mangle:!0,module:!0,toplevel:!0,compress:{drop_console:!0,keep_fnames:!1,keep_classnames:!1}})).code||(console.warn(`WARN: chunk "${r.name}" - terser return empty code`),e)}catch(n){throw console.error("terser-custom"),n}}},{name:"write-bundle",writeBundle(e){E&&e.name===L&&setTimeout((()=>{var e=new t,r=v.resolve(b,x);y.existsSync(r)&&e.addLocalFolder(r,x),q.forEach((r=>{e.addLocalFile(r,x+"/scripts")})),e.addFile("index.html",Buffer.from(M,"utf8")),e.addLocalFile(v.resolve(z),x,"build.js"),e.writeZip(N)}),500)}}],watch:{clearScreen:!1}}}))};
