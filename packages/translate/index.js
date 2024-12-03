/* eslint-disable */
const e=require("fs"),t=require("os"),r=require("path"),o=require("puppeteer");function s(e){const t=Object.create(null);if(e)for(const r in e)if("default"!==r){const o=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(t,r,o.get?o:{enumerable:!0,get:function(){return e[r]}})}return t.default=e,Object.freeze(t)}const n=s(e),a=s(t),l=s(r);var i={en:"английский",ar:"арабский",bg:"болгарский",hu:"венгерский",el:"греческий",da:"датский",id:"индонезийский",es:"испанский",it:"итальянский",zh:"китайский",ko:"корейский",lv:"латышский",lt:"литовский",de:"немецкий",nl:"нидерландский",nb:"норвежский",pl:"польский",pt:"португальский",ro:"румынский",ru:"русский",sk:"словацкий",sl:"словенский",tr:"турецкий",uk:"украинский",fi:"финский",fr:"французский",cs:"чешский",sv:"шведский",et:"эстонский",ja:"японский"},u=(()=>{var e,t,r,s,u=l.join(a.homedir(),".wareset_tools_deepl.cache.json"),c=[];console.log("DT cache: "+u);var f,m=async e=>{if(r&&r.res)try{var t=JSON.parse((await e.buffer()).toString()).result;if(!t)return;var o=t.source_lang,a=t.target_lang,l=t.translations;if(!o||!a||!l)return;if(o=o.toLowerCase(),a=a.toLowerCase(),r.from!==o||r.to!==a)return;console.log("DT: "+r.text),console.log(...l.map((e=>e.beams.map((e=>e.sentences[0].text)))));var i=l.map((e=>e.beams[0].sentences[0].text.replace(/^<P>/,"").replace(/<\/P>$/,"").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#039;/g,"'"))).join("\n");s&&(s[r.from]||(s[r.from]={}),s[r.from][r.to]||(s[r.from][r.to]={}),s[r.from][r.to][r.text]=i,n.writeFileSync(u,JSON.stringify(s,null,2))),r.res(i),r.res=null,await((e=100)=>new Promise((t=>setTimeout(t,e))))(r.timeout),r=null,p()}catch(c){}},g=()=>t&&(t.close(),t=e=null),p=async()=>{if(clearTimeout(f),!r)if(r=c.shift()){var a=r,l=a.from,i=a.to,h=a.text;if(!s&&(s={},n.existsSync(u)))try{s=JSON.parse(n.readFileSync(u,"utf8"))||{}}catch(w){}s[l]&&s[l][i]&&s[l][i][h]?(r.res(s[l][i][h]),r.res=null,r=null,p()):(e||(e=await(t=await o.launch({headless:!1})).newPage()).on("response",m),e.goto(`https://www.deepl.com/ru/translator#${l}/${i}/${encodeURI(h)}`))}else f=setTimeout(g,5e3)};return(e="",t="en",r="ru",o=999)=>{if(t===r)return Promise.resolve(e);if(!(t in i)||!(r in i))throw new Error(`wareset_tools_deepl: ${t} -> ${r}: - incorrect lang`);return new Promise((s=>{c.push({res:s,text:e,from:t,to:r,timeout:o}),p()}))}})(),c={ru:"русский",en:"английский",az:"азербайджанский",ay:"аймара",sq:"албанский",am:"амхарский",ar:"арабский",hy:"армянский",as:"ассамский",af:"африкаанс",bm:"бамбара",eu:"баскский",be:"белорусский",bn:"бенгальский",my:"бирманский",bg:"болгарский",bs:"боснийский",cy:"валлийский",hu:"венгерский",vi:"вьетнамский",gl:"галисийский",el:"греческий",ka:"грузинский",gn:"гуарани",gu:"гуджарати",da:"датский",zu:"зулу",iw:"иврит",ig:"игбо",yi:"идиш",id:"индонезийский",ga:"ирландский",is:"исландский",es:"испанский",it:"итальянский",yo:"йоруба",kk:"казахский",kn:"каннада",ca:"каталанский",qu:"кечуа",ky:"киргизский","zh-CN":"китайский",ko:"корейский",co:"корсиканский",xh:"коса",ht:"креольский",ku:"курдский",km:"кхмерский",lo:"лаосский",la:"латинский",lv:"латышский",ln:"лингала",lt:"литовский",lg:"луганда",lb:"люксембургский",mk:"македонский",mg:"малагасийский",ms:"малайский",ml:"малаялам",dv:"мальдивский",mt:"мальтийский",mi:"маори",mr:"маратхи",mn:"монгольский",de:"немецкий",ne:"непальский",nl:"нидерландский",no:"норвежский",or:"ория",om:"оромо",pa:"панджаби",fa:"персидский",pl:"польский",pt:"португальский",ps:"пушту",rw:"руанда",ro:"румынский",sm:"самоанский",sa:"санскрит",sr:"сербский",st:"сесото",si:"сингальский",sd:"синдхи",sk:"словацкий",sl:"словенский",so:"сомалийский",sw:"суахили",su:"сунданский",tg:"таджикский",th:"тайский",ta:"тамильский",tt:"татарский",te:"телугу",ti:"тигринья",ts:"тсонга",tr:"турецкий",tk:"туркменский",uz:"узбекский",ug:"уйгурский",uk:"украинский",ur:"урду",tl:"филиппинский",fi:"финский",fr:"французский",fy:"фризский",ha:"хауса",hi:"хинди",hr:"хорватский",ak:"чви",ny:"чева",cs:"чешский",sv:"шведский",sn:"шона",gd:"шотландский",ee:"эве",eo:"эсперанто",et:"эстонский",jw:"яванский",ja:"японский"},f=(()=>{var e,t,r,s,i=l.join(a.homedir(),".wareset_tools_google.cache.json"),u=[];console.log("GT cache: "+i);var f,m=async e=>{if(r&&r.res)try{var t=(await e.buffer()).toString().split("\n")[3],o=JSON.parse(JSON.parse(t)[0][2])[1],a=o[0][0][5],l=o[4],u=l[0],c=l[1],f=l[2];if(r.text!==u||r.from!==c||r.to!==f)return;var m=a.map((e=>e[0])).join("");console.log("GT:",m,f,c),s&&(s[r.from]||(s[r.from]={}),s[r.from][r.to]||(s[r.from][r.to]={}),s[r.from][r.to][r.text]=m,n.writeFileSync(i,JSON.stringify(s,null,2))),r.res(m),r.res=null,await((e=100)=>new Promise((t=>setTimeout(t,e))))(r.timeout),r=null,p()}catch(g){}},g=()=>t&&(t.close(),t=e=null),p=async()=>{if(clearTimeout(f),!r)if(r=u.shift()){var a=r,l=a.from,c=a.to,h=a.text;if(!s&&(s={},n.existsSync(i)))try{s=JSON.parse(n.readFileSync(i,"utf8"))||{}}catch(w){}s[l]&&s[l][c]&&s[l][c][h]?(r.res(s[l][c][h]),r.res=null,r=null,p()):(e||(e=await(t=await o.launch({headless:!1})).newPage()).on("response",m),e.goto(`https://translate.google.com/?sl=${l}&tl=${c}&text=${encodeURI(h)}&op=translate`))}else f=setTimeout(g,5e3)};return(e="",t="en",r="ru",o=2222)=>{if("zh"===t&&(t="zh-CN"),"zh"===r&&(r="zh-CN"),t===r)return Promise.resolve(e);if(!(t in c)||!(r in c))throw new Error(`wareset_tools_google: ${t} -> ${r}: - incorrect lang`);return new Promise((s=>{u.push({res:s,text:e,from:t,to:r,timeout:o}),p()}))}})();exports.DEEPL_LANGS=i,exports.GOOGLE_LANGS=c,exports.deepl=u,exports.google=f;
