/* eslint-disable */
var t,e,a,c,h,n,l=t=>{void 0===t||console.error(t)},o="undefined"!=typeof YaGames?()=>t||(t=YaGames.init().then((t=>t)).catch((t=>(l(t),null)))):()=>t||(t=Promise.resolve(null)),r=(t,e)=>{l(e),t&&t.onError&&t.onError(e)},s=(t={})=>{o().then((e=>e?e.adv.showFullscreenAdv({callbacks:t}):r(t))).catch((e=>r(t,e)))},u=(t={})=>{o().then((e=>e?e.adv.showRewardedVideo({callbacks:t}):r(t))).catch((e=>r(t,e)))},d={app:{id:""},i18n:{lang:"",tld:""}},g=()=>o().then((t=>d=t&&t.environment||d)).catch((t=>(l(t),d))),i=t=>t&&t.defaultFlags||{},p=t=>o().then((e=>e?e.getFlags(t):i(t))).catch((e=>(l(e),i(t)))),v=!1,m=()=>o().then((t=>v||(t&&t.features.GameplayAPI.start(),v=!0))).catch((t=>(l(t),v))),w=()=>o().then((t=>!(v&&(t&&t.features.GameplayAPI.stop(),v=!1)))).catch((t=>(l(t),!v))),f=()=>e||(e=o().then((t=>t?t.getPlayer({scopes:!1}):null)).catch((t=>(l(t),null)))),S=()=>a||(a=o().then((t=>t?t.getPlayer({scopes:!0}):null)).catch((t=>(l(t),null)))),P=()=>c||(c=a||e||f()),D=()=>h||(h=o().then((t=>!!t&&t.auth.openAuthDialog().then((()=>(h=null,!0))).catch((()=>(h=null,!1))))).catch((t=>(l(t),h=null,!1)))),y=t=>P().then((e=>e?e.getData(t):{})).then((t=>t?{...t}:{})).catch((t=>(l(t),{}))),N=(t,e=!1)=>P().then((a=>!!a&&a.setData(t,e).then((()=>!0)))).catch((t=>(l(t),!1))),b=(t,e=!1)=>P().then((a=>!!a&&a.getData().then((c=>a.setData({...c,...t},e).then((()=>!0)))))).catch((t=>(l(t),!1))),k=t=>P().then((e=>e?e.getStats(t):{})).then((t=>t?{...t}:{})).catch((t=>(l(t),{}))),A=t=>P().then((e=>!!e&&e.setStats(t).then((()=>!0)))).catch((t=>(l(t),!1))),G=t=>P().then((e=>!!e&&e.incrementStats(t).then((()=>!0)))).catch((t=>(l(t),!1))),F=()=>n||(n=o().then((t=>t?t.getStorage():localStorage)).catch((t=>(l(t),localStorage)))),I=!1,R=()=>o().then((t=>I||(t&&t.features.LoadingAPI.ready(),I=!0))).catch((t=>(l(t),I))),E=()=>o().then((t=>t?t.feedback.canReview():{value:!1,reason:"UNKNOWN"})).catch((t=>(l(t),{value:!1,reason:"UNKNOWN"}))),K=()=>o().then((t=>t?t.feedback.requestReview():{})).then((t=>!!t.feedbackSent)).catch((t=>(l(t),!1))),O=()=>o().then((t=>t?t.shortcut.canShowPrompt():{})).then((t=>!!t.canShow)).catch((t=>(l(t),!1))),U=()=>o().then((t=>t?t.shortcut.showPrompt():{})).then((t=>"accepted"===t.outcome)).catch((t=>(l(t),!1))),W=()=>o().then((t=>t?t.serverTime():Date.now())).catch((t=>(l(t),Date.now())));export{s as advImage,u as advVideo,m as gameStart,w as gameStop,y as getData,g as getEnv,p as getFlags,W as getServerTime,k as getStats,b as incrementData,G as incrementStats,o as init,D as openAuthDialog,S as playerWithScopes,f as playerWithoutScopes,R as ready,E as reviewCan,K as reviewRun,F as safeStorage,N as setData,A as setStats,O as shortcutCan,U as shortcutRun,l as showError};