/* eslint-disable */
const e=require("node:os"),t=require("node:fs"),r=require("node:path"),a=require("node:child_process"),n=require("node-fetch");var s,i,o,c,l,y,h,u,d,f,g,p,w="https://translate.api.cloud.yandex.net/translate/v2/detect",m="https://translate.api.cloud.yandex.net/translate/v2/languages",x="https://translate.api.cloud.yandex.net/translate/v2/translate",S=396e5,v=()=>i="",A=()=>{if(!s){o=e.homedir(),c=r.resolve(o,".ya.folder_id.cache.txt"),l=r.resolve(o,".ya.api_token.cache.txt"),y=r.resolve(o,".ya.languages.cache.json"),h=r.resolve(o,".ya.translate.cache.json"),u=r.resolve(o,".ya.detection.cache.json");try{if(t.existsSync(c))s=t.readFileSync(c,"utf8").trim();else{var n=a.execSync("yc config list",{encoding:"utf8"});s=n.match(/folder-id:\s*([^\s]+)/)[1].trim(),t.writeFileSync(c,s)}console.log("YA_FOLDER_ID: ",s)}catch(i){throw{myMsg:'Please install "yc" cli: https://yandex.cloud/ru/docs/cli/quickstart',error:i}}try{t.existsSync(y)&&(g=t.readFileSync(y,"utf8")||"")}catch(p){}d={};try{t.existsSync(h)&&(d=JSON.parse(t.readFileSync(h,"utf8"))||{})}catch(w){}f={};try{t.existsSync(u)&&(f=JSON.parse(t.readFileSync(u,"utf8"))||{})}catch(m){}}},O=()=>{if(!i){var e=!1;if(t.existsSync(l)){var r=t.lstatSync(c).mtimeMs,n=Date.now()-r;n>3564e4?e=!0:setTimeout(v,S-n)}else e=!0;e?(i=a.execSync("yc iam create-token",{encoding:"utf8"}).trim(),t.writeFileSync(l,i),setTimeout(v,S)):i=t.readFileSync(l,"utf8").trim(),console.log("YA_API_TOKEN: ",i)}},j=[];function F(e,t,r,a){return new Promise(((n,s)=>{j.push({resolve:n,reject:s,URL:e,text:t,from:r,to:a}),L()}))}async function L(){if(!p&&(p=j.shift())){A();var e=p,r=e.resolve,a=e.reject;try{switch(p.URL){case m:if(g)r(JSON.parse(g).languages);else{O();var o={method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`},body:JSON.stringify({folderId:s})},c=await n(m,o),l=await c.text(),S=JSON.parse(l);if(!Array.isArray(S.languages))throw S;t.writeFileSync(y,g=l),r(S.languages)}break;case w:var v=p.text;if(!f.hasOwnProperty(v)){O();var F={method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`},body:JSON.stringify({text:v,languageCodeHints:p.from,folderId:s})},P=await n(w,F),N=await P.json();if("string"!=typeof N.languageCode)throw N;f[v]=N.languageCode,console.log("YA detectLanguage: "+v+" => "+f[v]),t.writeFileSync(u,JSON.stringify(f,null,2))}r(f[v]);break;case x:var C=p,J=C.text,T=C.from,Y=C.to;d.hasOwnProperty(T)||(d[T]={}),d[T].hasOwnProperty(Y)||(d[T][Y]={});var E=J.filter((function(e,t,r){return e.trim()&&!this.hasOwnProperty(e)&&t===r.indexOf(e)}),d[T][Y]),_=d[T][Y];if(E.length){O();var b={method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`},body:JSON.stringify({sourceLanguageCode:T,targetLanguageCode:Y,texts:E,folderId:s})},q=await n(x,b),k=await q.json();if(!Array.isArray(k.translations))throw k;k.translations.forEach((function(e,t){console.log("YA translate "+this.to+": "+this.texts[t]+" => "+e.text),this.data[this.texts[t]]=e.text}),{data:_,texts:E,to:Y}),t.writeFileSync(h,JSON.stringify(d,null,2))}r(J.map((function(e){return this[e]}),_))}}catch(I){a(I)}p=null,L()}}exports.detectLanguage=async(e,t)=>{if(!(e=e.trim().slice(0,990).toLocaleLowerCase()))throw new Error("YA detectLanguage: text is empty");return F(w,e,t)},exports.listLanguages=()=>F(m),exports.translate=async(e,t,r)=>{if(!t)throw new Error("YA translate: from is empty");if(!r)throw new Error("YA translate: to is empty");var a=Array.isArray(e);if(t===r||!e.length)return a?e.slice(0):e;var n=(a?e:[e]).reduce(((e,t)=>{if(t.length>9990)throw new Error("YA translate: text very big");var r=e[e.length-1];return t.length+r.join("").length>9990?e.push([t]):r.push(t),e}),[[]]),s=await Promise.all(n.map((function(e){return F(x,e,this.from,this.to)}),{from:t,to:r}));return a?Array.prototype.concat.apply([],s):s[0][0]||""};
