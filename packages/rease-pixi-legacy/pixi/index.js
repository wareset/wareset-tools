/* eslint-disable */
const e=require("pixi.js-legacy"),t=require("@pixi/graphics-extras-legacy");function r(e){const t=Object.create(null);if(e)for(const r in e)if("default"!==r){const n=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(t,r,n.get?n:{enumerable:!0,get:function(){return e[r]}})}return t.default=e,Object.freeze(t)}const n=r(require("@pixi/sound-legacy"));exports.sound=n,Object.keys(e).forEach((function(t){"default"===t||Object.prototype.hasOwnProperty.call(exports,t)||Object.defineProperty(exports,t,{enumerable:!0,get:function(){return e[t]}})})),Object.keys(t).forEach((function(e){"default"===e||Object.prototype.hasOwnProperty.call(exports,e)||Object.defineProperty(exports,e,{enumerable:!0,get:function(){return t[e]}})}));