/* eslint-disable */
var e,t,r,a,o,s=((e,t,r)=>{var a=()=>{},o=(e,r,a,o)=>{switch(4*t()|0){case 0:e&&e(t()<.5);break;case 1:r&&r();break;case 2:a&&a(new Error("dev"));break;case 3:o&&o()}},s={},n={},c={IS_DEV:!0,getUniqueID:()=>"1",getName:()=>"player",getMode:()=>"lite",getPhoto:e=>"",getPayingStatus:()=>"unknown",getData:e=>{try{var t={};if(e)for(var a,o=e.length;o-- >0;)s.hasOwnProperty(a=e[o])&&(t[a]=JSON.parse(s[a]));else for(var n in s)t[n]=JSON.parse(s[n]);return r.resolve(t)}catch(c){return r.reject(c)}},setData:(e,t=!1)=>{try{var a={};for(var o in e)a[o]=JSON.stringify(e[o]);return s=a,r.resolve()}catch(n){return r.reject(n)}},getStats:e=>{try{var t={};if(e)for(var a,o=e.length;o-- >0;)n.hasOwnProperty(a=e[o])&&(t[a]=n[a]);else for(var s in n)t[s]=n[s];return r.resolve(t)}catch(c){return r.reject(c)}},setStats:e=>{try{var t={};for(var a in e)"number"!=typeof(t[a]=e[a])&&new Error("Stats is not valid");return n=t,r.resolve()}catch(o){return r.reject(o)}},incrementStats:e=>{try{var t={};for(var a in e)"number"!=typeof e[a]?new Error("Increments is not valid"):e[a]!==n[a]&&(t[a]=e[a]);return n={...n,...e},r.resolve(t)}catch(o){return r.reject(o)}}},l=!0,h=!0;return{IS_DEV:!0,deviceInfo:{type:"desktop",isMobile:()=>!1,isDesktop:()=>!0,isTablet:()=>!1,isTV:()=>!1},environment:{app:{id:""},i18n:{lang:"",tld:""},payload:void 0},serverTime:()=>Date.now(),getStorage:()=>r.resolve(localStorage),getPlayer:e=>r.resolve(c),getFlags:(e={})=>r.resolve({...e.defaultFlags}),features:{LoadingAPI:{ready:a},GameplayAPI:{start:a,stop:a}},auth:{openAuthDialog:()=>r.reject()},adv:{showFullscreenAdv:r=>{var a=r.callbacks,s=a.onClose,n=a.onOpen,c=a.onError,l=a.onOffline;e((()=>o(s,n,c,l)),500*t())},showRewardedVideo:r=>{var a=r.callbacks,s=a.onClose,n=a.onOpen,c=a.onError,l=a.onRewarded;e((()=>o(s,n,c,l)),500*t())}},feedback:{canReview:()=>r.resolve(l?{value:!0}:{value:!1,reason:"UNKNOWN"}),requestReview:()=>(l=!1,r.resolve({feedbackSent:t()<.5}))},shortcut:{canShowPrompt:()=>r.resolve({canShow:h}),showPrompt:()=>(h=!1,r.resolve({outcome:t()<.5?"accepted":""}))}}})(setTimeout,Math.random,Promise),n=e=>{console.log("YSDK: "+e)},c=e=>{n("error"),void 0===e||console.error(e)},l=()=>e||(e="undefined"!=typeof YaGames?YaGames.init().then((e=>e||s)).catch((e=>(c(e),s))):Promise.resolve(s)),h=!1,p=!1,g=!1,u=!1,v=!0,i=e=>{n(e),v=!0,l().then((e=>v&&(u||(u=!0,n("gameplayStart"),e.features.GameplayAPI.start())))).catch(c)},d=e=>{n(e),v=!1,l().then((e=>v||u&&(u=!1,n("gameplayStop"),e.features.GameplayAPI.stop()))).catch(c)},m=!1;exports.SDK=s,exports.advImage=(e={})=>l().then((t=>(n("advImage"),t.adv.showFullscreenAdv({callbacks:e})))).catch(c),exports.advVideo=(e={})=>l().then((t=>(n("advVideo"),t.adv.showRewardedVideo({callbacks:e})))).catch(c),exports.gameIsPaused=()=>p&&g,exports.gameIsStarted=()=>p,exports.gamePause=()=>!(!p||g)&&(d("gamePause"),g=!0),exports.gameResume=()=>!(!p||!g)&&(i("gameResume"),!(g=!1)),exports.gameStart=()=>!p&&(i("gameStart"),p=!(g=!1)),exports.gameStop=()=>!!p&&(d("gameStop"),!(g=p=!1)),exports.getFlags=e=>l().then((t=>t.getFlags(e))).catch((t=>(c(t),s.getFlags(e)))),exports.getPlayer=e=>(e&&"scopes"in e&&(o?!h!=!e.scopes&&(()=>{throw new Error("getPlayer: scopes must be "+h)})():h=!!e.scopes),o||(o=l().then((e=>e.getPlayer({scopes:h}))).then((e=>a=e)).catch((e=>(c(e),a||s.getPlayer()))))),exports.getSDK=l,exports.getStorage=()=>r||(r=l().then((e=>e.getStorage())).catch((e=>(c(e),s.getStorage())))),exports.log=n,exports.logError=c,exports.openAuthDialog=()=>t||(t=l().then((e=>e.auth.openAuthDialog().then((()=>(t=null,!0))).catch((()=>(t=null,!1))))).catch((e=>(c(e),t=null,!1)))),exports.rateCheck=()=>l().then((e=>(n("rateCheck"),e.feedback.canReview()))).catch(c),exports.rateOpen=()=>l().then((e=>(n("rateOpen"),e.feedback.requestReview()))).then((e=>e.feedbackSent)).catch(c),exports.ready=()=>{m||(m=!0,l().then((e=>(n("ready"),e.features.LoadingAPI.ready()))).catch(c))},exports.shortcutCheck=()=>l().then((e=>(n("shortcutCheck"),e.shortcut.canShowPrompt()))).then((e=>!!e.canShow)).catch(c),exports.shortcutOpen=()=>l().then((e=>(n("shortcutOpen"),e.shortcut.showPrompt()))).then((e=>"accepted"===e.outcome)).catch(c);
