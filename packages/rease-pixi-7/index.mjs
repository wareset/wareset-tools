/* eslint-disable */
import{Rease as e,createElement as i,RElement as t,listen as s,requestAnimationFrame as r}from"rease";function n(){var e=this;e.assets[/Bundle$/.test(e.method)?"unloadBundle":"unload"](e.url||e.urls||e.bundleId||e.bundleIds)}function o(e){var i=this.iam,t=this.props;t.unload&&i.onDestroy(n,t),i.destroyed||i.insert(t.callback?t.callback.call(i,e):t.children)}class PixiAssets extends e{constructor(e){super(),this.await((e.pixi||PIXI.Assets)[e.method](e.options||e.url||e.urls||e.bundleId||e.bundleIds||e.assets,e.onProgress||e.assets),o,{iam:this,props:e})}}function a(e,i){return e==e?e===i:i!=i}function c(e,i,t){for(var s in i)null==(r=i[s])||(r=Object.getPrototypeOf(r))!==Object.prototype&&r?a(t[s],i[s])||a(e[s],t[s]=i[s])||(e[s]=i[s]):c(e[s],i[s],t[s]||(t[s]={}));var r}function l(e){e&&(c(this.rease.pixi,e,this.cache),this.rease.update())}function p(e){e&&(e.call(this,this.pixi),this.update())}function x(e,{props:i,$props$:t,onCreateCapture:s,onResizeCapture:r,onRenderCapture:n,$signalCapture$:o}){i&&c(e.pixi,i,{}),t&&e.watch(t,l,{rease:e,cache:{}}),s&&s.call(e,e.pixi),r&&e.on("pixi-resize",r,e,!0),n&&e.on("pixi-render",n,e,!0),o&&e.watch(o,p,e)}function h(e,{onCreate:i,onResize:t,onRender:s,$signal$:r}){i&&i.call(e,e.pixi),t&&e.on("pixi-resize",t,e),s&&e.on("pixi-render",s,e),r&&e.watch(r,p,e)}class PixiRenderer extends e{constructor(e){super();var n=this.pixi=PIXI.autoDetectRenderer(e.options),o=n.view,a=o.style;a.width=a.height="100%";var c=!0,l=!1,p=e=>{l=!0,this.PixiScene&&(c&&(c=!1,n.resize(o.clientWidth,o.clientHeight),this.emitDeep("pixi-resize")),this.emitDeep("pixi-render",e),n.render(this.PixiScene.pixi))};this.update=()=>{l&&(l=!1,r(p))};var u=this.insert(i(t,{this:o}))[0];this.onDestroy(s(o,"resize",(()=>{c=!0,this.update()}))),x(this,e),u.insert(e.children),h(this,e),l=!0,this.update()}}class u extends e{constructor(e,i){super(),this.pixi=i,this.onMove(this.hookMove,this),S(this),x(this,e),this.insert(e.children),h(this,e),this.onDestroy(this.hookDestroy)}update(){this.PixiRenderer&&this.PixiRenderer.update()}hookMove(e,i,t){if(e&&e!==this)for(var s=this;s=s.parent;){if(s instanceof u)return void(this.PixiRenderer=s.PixiRenderer);if(s===e)break}S(this)}hookDestroy(e){d(e),e.pixi.removeFromParent(),e.pixi.destroy(),e.update()}}function d(e){var i=e.PixiRenderer;i&&(i.PixiScene===e&&(i.PixiScene=void 0),e.PixiRenderer=void 0)}var P=[PixiRenderer,u];function S(e){d(e);var i=e.findParentOrNext(P,u),t=i.parent,s=i.next,r=e.pixi;if(r.removeFromParent(),t instanceof PixiRenderer)t.PixiScene=e,e.PixiRenderer=t;else{var n=s&&s.pixi,o=n&&n.parent||t&&t.pixi;o&&(n?o.addChildAt(r,o.getChildIndex(n)):o.addChild(r),e.PixiRenderer=(t||s).PixiRenderer)}e.update()}class PixiSceneContainer extends u{constructor(e){super(e,new PIXI.Container)}}class PixiSceneParticleContainer extends u{constructor(e){var i=e.options||{};super(e,new PIXI.ParticleContainer(i.maxSize,i.properties,i.batchSize,i.autoResize))}}class PixiSceneSprite extends u{constructor(e){var i=e.options||{};super(e,new PIXI.Sprite(i.texture))}}class PixiSceneTilingSprite extends u{constructor(e){var i=e.options;super(e,new PIXI.TilingSprite(i.texture,i.width,i.height))}}class PixiSceneText extends u{constructor(e){var i=e.options||{};super(e,new PIXI.Text(i.text,i.style,i.canvas))}}class PixiSceneAnimatedSprite extends u{constructor(e){var i=e.options;super(e,new PIXI.AnimatedSprite(i.textures,i.autoUpdate))}}class PixiSceneHTMLText extends u{constructor(e){var i=e.options||{};super(e,new PIXI.HTMLText(i.text,i.style))}}class PixiSceneGraphics extends u{constructor(e){var i=e.options||{};super(e,new PIXI.Graphics(i.geometry))}}class PixiSceneMesh extends u{constructor(e){var i=e.options;super(e,new PIXI.Mesh(i.geometry,i.shader,i.state,i.drawMode))}}class PixiSceneSimplePlane extends u{constructor(e){var i=e.options;super(e,new PIXI.SimplePlane(i.texture,i.verticesX,i.verticesY))}}class PixiSceneNineSlicePlane extends u{constructor(e){var i=e.options;super(e,new PIXI.NineSlicePlane(i.texture,i.leftWidth,i.topHeight,i.rightWidth,i.bottomHeight))}}class PixiSceneSimpleMesh extends u{constructor(e){var i=e.options||{};super(e,new PIXI.SimpleMesh(i.texture,i.vertices,i.uvs,i.indices,i.drawMode))}}class PixiSceneSimpleRope extends u{constructor(e){var i=e.options;super(e,new PIXI.SimpleRope(i.texture,i.points,i.textureScale))}}class PixiSceneBitmapText extends u{constructor(e){var i=e.options;super(e,new PIXI.BitmapText(i.text,i.style))}}function v(e){var i=e.findParent(u);f(e),e.PixiScene=i,m.call(e,e._mode),I(e)}function f(e){var i=e._type,t=e._handler,s=e.PixiScene;if(s&&i&&t)for(var r=s.pixi,n=i.length;n-- >0;)r.off(i[n],t,e)}function I(e){var i=e._type,t=e._handler,s=e.PixiScene;if(s&&i&&t)for(var r=s.pixi,n=i.length;n-- >0;)r[e._once?"once":"on"](i[n],t,e._context)}function m(e){(this._mode=e)&&this.PixiScene&&(this.PixiScene.pixi.eventMode=e)}function F([e,i,t,s]){f(this),this._once=t,this._type=Array.isArray(e)?e.slice():[e],this._handler=i,this._context=void 0===s?this:s,I(this)}class PixiEvent extends e{constructor({$mode$:e,$once$:i,$type$:t,$handler$:s,$context$:r}){super(),this.onMove(this.hookMove,this),v(this),e&&this.watch(e,m,this),this.watchAll([t,s,i,r],F,this),this.onDestroy(this.hookDestroy)}hookMove(e,i,t){if(e&&e!==this)for(var s=this;s=s.parent;){if(s===this.PixiScene)return;if(s===e||s instanceof u)break}v(this)}hookDestroy(e){f(e)}}class y extends e{constructor(e,i){super(),this.pixi=i,this.onMove(this.hookMove,this),A(this),x(this,e),this.insert(e.children),h(this,e),this.onDestroy(this.hookDestroy)}update(){this.PixiScene&&this.PixiScene.update()}hookMove(e,i,t){if(e&&e!==this)for(var s=this;s=s.parent;){if(s===this.PixiScene)return;if(s===e||s instanceof u)break}A(this)}hookDestroy(e){w(e),e.pixi.destroy()}}function w(e){var i=e.PixiScene;if(i){var t=i.pixi,s=t.filters;if(s){var r=e.pixi;s===r?t.filters=[]:Array.isArray(s)&&(t.filters=s.filter((function(e){return this!==e}),r)),e.update()}e.PixiScene=void 0}}function A(e){w(e);var i=e.findParentOrNext(u,y),t=i.parent,s=i.next,r=e.pixi,n=s&&s.pixi,o=t&&t.pixi;if(o){var a,c=o.filters;c=Array.isArray(c)?c.slice():c?[c]:[],n&&(a=c.indexOf(n))>-1?c.splice(a,0,r):c.push(r),o.filters=c,e.PixiScene=t,e.update()}}class PixiFilter extends y{constructor(e){var i=e.options||{};super(e,new PIXI.Filter(i.vertexSrc,i.fragmentSrc,i.uniforms))}}class PixiFilterAlpha extends y{constructor(e){var i=e.options||{};super(e,new PIXI.AlphaFilter(i.alpha))}}class PixiFilterBlur extends y{constructor(e){var i=e.options||{};super(e,new PIXI.BlurFilter(i.strength,i.quality,i.resolution,i.kernelSize))}}class PixiFilterColorMatrix extends y{constructor(e){super(e,new PIXI.ColorMatrixFilter)}}class PixiFilterDisplacement extends y{constructor(e){var i=e.options;super(e,new PIXI.DisplacementFilter(i.sprite,i.scale))}}class PixiFilterFXAA extends y{constructor(e){super(e,new PIXI.FXAAFilter)}}class PixiFilterNoise extends y{constructor(e){var i=e.options||{};super(e,new PIXI.NoiseFilter(i.noise,i.seed))}}export{PixiAssets as Assets,PixiEvent as Event,PixiFilter as Filter,PixiFilterAlpha as FilterAlpha,PixiFilterBlur as FilterBlur,PixiFilterColorMatrix as FilterColorMatrix,PixiFilterDisplacement as FilterDisplacement,PixiFilterFXAA as FilterFXAA,PixiFilterNoise as FilterNoise,PixiRenderer as Renderer,PixiSceneAnimatedSprite as SceneAnimatedSprite,PixiSceneBitmapText as SceneBitmapText,PixiSceneContainer as SceneContainer,PixiSceneGraphics as SceneGraphics,PixiSceneHTMLText as SceneHTMLText,PixiSceneMesh as SceneMesh,PixiSceneNineSlicePlane as SceneNineSlicePlane,PixiSceneParticleContainer as SceneParticleContainer,PixiSceneSimpleMesh as SceneSimpleMesh,PixiSceneSimplePlane as SceneSimplePlane,PixiSceneSimpleRope as SceneSimpleRope,PixiSceneSprite as SceneSprite,PixiSceneText as SceneText,PixiSceneTilingSprite as SceneTilingSprite,y as __Filter__,u as __Scene__};
