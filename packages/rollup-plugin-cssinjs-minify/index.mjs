/* eslint-disable */
import{jsx2tokens as e,TOKEN_TYPES as t}from"jsx2tokens";function s(){return{name:"rollup-plugin-cssinjs-minify",transform(s,n){if(/\.[mc]?[tj]sx?$/.test(n)&&/\bcss`/.test(s)){var p=[],r=e(s,{proxy(e,s,n){((e.type===t.TEMPLATE||e.type===t.TEMPLATE_HEAD)&&n[s-1]&&"css"===n[s-1].value||(e.type===t.TEMPLATE_MIDDLE||e.type===t.TEMPLATE_TAIL)&&p[0]===e.deep)&&(e.type===t.TEMPLATE_HEAD?p.unshift(e.deep):e.type===t.TEMPLATE_TAIL&&p.shift(),e.value=e.value.replace(/(?<=\:|\;|\{|\}|\,)\s+|\s+(?=\:|\;|\{|\}|\,)|\s*\n\s*|\/\*[^]*?\*\//g,""))}});return{code:s=r.map((e=>e.value)).join("")}}return null}}}export{s as default};