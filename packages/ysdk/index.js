/* eslint-disable */
var e,t,r,a,o,n,s=((e,t,r)=>{var a=()=>{},o=(e,r,a,o)=>{switch(4*t()|0){case 0:e&&e(t()<.5);break;case 1:r&&r();break;case 2:a&&a(new Error("dev"));break;case 3:o&&o()}},n={},s={},c={IS_DEV:!0,getUniqueID:()=>"1",getName:()=>"player",getMode:()=>"lite",etPhoto:e=>"",getPayingStatus:()=>"unknown",getData:e=>{try{var t={};if(e)for(var a,o=e.length;o-- >0;)n.hasOwnProperty(a=e[o])&&(t[a]=JSON.parse(n[a]));else for(var s in n)t[s]=JSON.parse(n[s]);return r.resolve(t)}catch(c){return r.reject(c)}},setData:(e,t=!1)=>{try{var a={};for(var o in e)a[o]=JSON.stringify(e[o]);return n=a,r.resolve()}catch(s){return r.reject(s)}},getStats:e=>{try{var t={};if(e)for(var a,o=e.length;o-- >0;)s.hasOwnProperty(a=e[o])&&(t[a]=s[a]);else for(var n in s)t[n]=s[n];return r.resolve(t)}catch(c){return r.reject(c)}},setStats:e=>{try{var t={};for(var a in e)"number"!=typeof(t[a]=e[a])&&new Error("Stats is not valid");return s=t,r.resolve()}catch(o){return r.reject(o)}},incrementStats:e=>{try{var t={};for(var a in e)"number"!=typeof e[a]?new Error("Increments is not valid"):e[a]!==s[a]&&(t[a]=e[a]);return s={...s,...e},r.resolve(t)}catch(o){return r.reject(o)}}};return{IS_DEV:!0,environment:{app:{id:""},i18n:{lang:"",tld:""},payload:void 0},serverTime:()=>Date.now(),getStorage:()=>r.resolve(localStorage),getPlayer:e=>r.resolve(c),getFlags:(e={})=>r.resolve({...e.defaultFlags}),features:{LoadingAPI:{ready:a},GameplayAPI:{start:a,stop:a}},auth:{openAuthDialog:()=>r.reject()},adv:{showFullscreenAdv:r=>{var a=r.callbacks,n=a.onClose,s=a.onOpen,c=a.onError,h=a.onOffline;e((()=>o(n,s,c,h)),500*t())},showRewardedVideo:r=>{var a=r.callbacks,n=a.onClose,s=a.onOpen,c=a.onError,h=a.onRewarded;e((()=>o(n,s,c,h)),500*t())}},feedback:{canReview:()=>r.resolve({value:!1,reason:"UNKNOWN"}),requestReview:()=>r.resolve({feedbackSent:!1})},shortcut:{canShowPrompt:()=>r.resolve({canShow:!0}),showPrompt:()=>r.resolve({outcome:"accepted"})}}})(setTimeout,Math.random,Promise),c=e=>{void 0===e||console.error(e)},h=()=>e||(e="undefined"!=typeof YaGames?YaGames.init().then((e=>e||s)).catch((e=>(c(e),s))):Promise.resolve(s)),l=!1,v=!1;exports.SDK=s,exports.advImage=(e={})=>h().then((t=>t.adv.showFullscreenAdv({callbacks:e}))).catch(c),exports.advVideo=(e={})=>h().then((t=>t.adv.showRewardedVideo({callbacks:e}))).catch(c),exports.gameStart=()=>h().then((e=>!l&&(l=!0,e.features.GameplayAPI.start(),!0))).catch(c),exports.gameStop=()=>h().then((e=>!!l&&(l=!1,e.features.GameplayAPI.stop(),!0))).catch(c),exports.getFlags=e=>h().then((t=>t.getFlags(e))).catch((t=>(c(t),s.getFlags(e)))),exports.getPlayer=e=>o?n!==(!e||e.scopes)?(()=>{throw new Error("getPlayer: scopes must be "+n)})():o:(n=!e||e.scopes,o=h().then((t=>t.getPlayer(e))).then((e=>a=e)).catch((t=>(c(t),a||s.getPlayer(e))))),exports.getStorage=()=>r||(r=h().then((e=>e.getStorage())).catch((e=>(c(e),s.getStorage())))),exports.init=h,exports.logError=c,exports.openAuthDialog=()=>t||(t=h().then((e=>e.auth.openAuthDialog().then((()=>(t=null,!0))).catch((()=>(t=null,!1))))).catch((e=>(c(e),t=null,!1)))),exports.ready=()=>h().then((e=>v||(v=!0,e.features.LoadingAPI.ready(),v))).catch(c),exports.reviewCan=()=>h().then((e=>e.feedback.canReview())).catch(c),exports.reviewRun=()=>h().then((e=>e.feedback.requestReview())).then((e=>e.feedbackSent)).catch(c),exports.shortcutCan=()=>h().then((e=>e.shortcut.canShowPrompt())).then((e=>!!e.canShow)).catch(c),exports.shortcutRun=()=>h().then((e=>e.shortcut.showPrompt())).then((e=>"accepted"===e.outcome)).catch(c);
