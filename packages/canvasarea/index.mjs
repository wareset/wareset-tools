/* eslint-disable */
function t(t){var a=this.iam;a._gsx=this.gsx,a._gsy=this.gsy,a._render(t)}class a{constructor(){if(this._ctx=null,this._tl={},this._tn={},this._gsx=1,this._gsy=1,!("GLOBAL_SCALE_X"in this)){var t=a.prototype,s=CanvasRenderingContext2D.prototype,e=Object.defineProperty,r=Object.getOwnPropertyDescriptor;e(t,"GLOBAL_SCALE_X",{get:function(){return this._gsx}}),e(t,"GLOBAL_SCALE_Y",{get:function(){return this._gsy}}),e(t,"GLOBAL_SCALE_MEAN",{get:function(){return(this._gsx+this._gsy)/2}}),Object.getOwnPropertyNames(s).forEach((function(a){var i=r(s,a),n=i.get,h=i.set,_=i.value;(n||h||"function"==typeof _)&&e(t,a,n||h?{get:n?function(){return n.call(this._ctx)}:void 0,set:h?function(t){h.call(this._ctx,t)}:void 0}:{value:function(){return _.apply(this._ctx,arguments)}})}))}}_render(a){this._tl={tx:0,ty:0,sx:1,sy:1,ra:0,px:0,py:0},this._tn={tx:0,ty:0,sx:1,sy:1,ra:0,px:0,py:0},this._ctx.save(),a._draw(this);var s=this._gsx,e=this._gsy;a._areas.forEach(t,{gsx:s,gsy:e,iam:this}),this._gsx=this._gsy=1,this._ctx.restore()}_areaUpdate(){var t=this._ctx,a=this._tl,s=this._tn;for(var e in(a.px||a.py)&&t.translate(a.px,a.py),a.ra&&t.rotate(-a.ra),1===a.sx&&1===a.sy||t.scale(1/a.sx,1/a.sy),(a.tx||a.ty)&&t.translate(-a.tx,-a.ty),this._gsx/=a.sx,this._gsy/=a.sy,s)a[e]=s[e];this._gsx*=a.sx,this._gsy*=a.sy,(a.tx||a.ty)&&t.translate(a.tx,a.ty),1===a.sx&&1===a.sy||t.scale(a.sx,a.sy),a.ra&&t.rotate(a.ra),(a.px||a.py)&&t.translate(-a.px,-a.py)}areaShift(t=0,a=0){var s=this._tn;s.tx===t&&s.ty===a||(s.tx=t,s.ty=a,this._areaUpdate())}areaScale(t=1,a=t){var s=this._tn;s.sx===t&&s.sy===a||(s.sx=t,s.sy=a,this._areaUpdate())}areaAngle(t=0){this.areaRadii(t*Math.PI/180)}areaRadii(t=0){var a=this._tn;a.ra!==t&&(a.ra=t,this._areaUpdate())}areaPivot(t=0,a=0){var s=this._tn;s.px===t&&s.py===a||(s.px=t,s.py=a,this._areaUpdate())}}var s=[];class Canvasarea{constructor(t){this._draw=t,this._areas=[]}render(t){var e=s.pop()||new a;e._ctx=t,e._render(this),s.push(e)}createArea(t,a){var s=new Canvasarea(t);return this.attachArea(s,a),s}attachArea(t,a){var s,e,r=this._areas;r.splice((s=a,e=r.length,"number"==typeof s&&s<=e?(s|=0)<0&&(s=e+s-1)<0?0:s:e),0,t)}detachArea(t){var a=this._areas,s="number"==typeof t?0|t:a.lastIndexOf(t);return!(s<0)&&a.splice(s,1).length>0}detachAllAreas(){this._areas.length=0}}function e(t){return new Canvasarea(t)}export{Canvasarea,e as canvasarea,e as default};
