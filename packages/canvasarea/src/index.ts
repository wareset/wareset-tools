function areasForEach(
  this: { gsx: number; gsy: number; iam: _CanvasareaRenderingContext2D_ },
  v: Canvasarea
) {
  const iam = this.iam
  // @ts-ignore
  ;(iam._gsx = this.gsx), (iam._gsy = this.gsy), iam._render(v)
}

class _CanvasareaRenderingContext2D_ {
  private _ctx: CanvasRenderingContext2D
  // transform last
  private _tl: {
    tx: number
    ty: number
    sx: number
    sy: number
    ra: number
    px: number
    py: number
  }
  // transform next
  private _tn: _CanvasareaRenderingContext2D_['_tl']

  private _gsx: number
  private _gsy: number
  declare readonly GLOBAL_SCALE_X: number
  declare readonly GLOBAL_SCALE_Y: number
  declare readonly GLOBAL_SCALE_MEAN: number

  constructor() {
    this._ctx = null as any
    this._tl = {} as any
    this._tn = {} as any

    this._gsx = 1
    this._gsy = 1
  }

  protected _render(canvasarea: Canvasarea) {
    this._tl = { tx: 0, ty: 0, sx: 1, sy: 1, ra: 0, px: 0, py: 0 }
    this._tn = { tx: 0, ty: 0, sx: 1, sy: 1, ra: 0, px: 0, py: 0 }

    this._ctx.save()
    canvasarea.draw.call(canvasarea.drawThis, this as any)
    const gsx = this._gsx
    const gsy = this._gsy
    canvasarea.areas.forEach(areasForEach, { gsx, gsy, iam: this })
    this._gsx = this._gsy = 1
    this._ctx.restore()
  }

  protected _areaUpdate() {
    const ctx = this._ctx
    const tl = this._tl
    const tn = this._tn

    if (tl.px || tl.py) ctx.translate(tl.px, tl.py)
    if (tl.ra) ctx.rotate(-tl.ra)
    if (tl.sx !== 1 || tl.sy !== 1) ctx.scale(1 / tl.sx, 1 / tl.sy)
    if (tl.tx || tl.ty) ctx.translate(-tl.tx, -tl.ty)

    this._gsx /= tl.sx
    this._gsy /= tl.sy

    // @ts-ignore
    for (const k in tn) tl[k] = tn[k]

    this._gsx *= tl.sx
    this._gsy *= tl.sy

    if (tl.tx || tl.ty) ctx.translate(tl.tx, tl.ty)
    if (tl.sx !== 1 || tl.sy !== 1) ctx.scale(tl.sx, tl.sy)
    if (tl.ra) ctx.rotate(tl.ra)
    if (tl.px || tl.py) ctx.translate(-tl.px, -tl.py)
  }

  areaShift(x = 0, y = 0) {
    const tn = this._tn
    if (tn.tx !== x || tn.ty !== y) (tn.tx = x), (tn.ty = y), this._areaUpdate()
  }
  areaShiftX(x = 0) {
    const tn = this._tn
    this.areaShift(x, tn.ty)
  }
  areaShiftY(y = 0) {
    const tn = this._tn
    this.areaShift(tn.tx, y)
  }
  areaShiftAdd(x = 0, y = 0) {
    const tn = this._tn
    this.areaShift(tn.tx + x, tn.ty + y)
  }
  areaShiftXAdd(x = 0) {
    const tn = this._tn
    this.areaShift(tn.tx + x, tn.ty)
  }
  areaShiftYAdd(y = 0) {
    const tn = this._tn
    this.areaShift(tn.tx, tn.ty + y)
  }

  areaScale(x = 1, y = x) {
    const tn = this._tn
    if (tn.sx !== x || tn.sy !== y) (tn.sx = x), (tn.sy = y), this._areaUpdate()
  }
  areaScaleX(x = 1) {
    const tn = this._tn
    this.areaScale(x, tn.sy)
  }
  areaScaleY(y = 1) {
    const tn = this._tn
    this.areaScale(tn.sx, y)
  }
  areaScaleAdd(x = 0, y = x) {
    const tn = this._tn
    this.areaScale(tn.sx + x, tn.sy + y)
  }
  areaScaleXAdd(x = 0) {
    const tn = this._tn
    this.areaScale(tn.sx + x, tn.sy)
  }
  areaScaleYAdd(y = 0) {
    const tn = this._tn
    this.areaScale(tn.sx, tn.sy + y)
  }

  areaRadii(rad = 0) {
    const tn = this._tn
    if (tn.ra !== rad) (tn.ra = rad), this._areaUpdate()
  }
  areaRadiiAdd(rad = 0) {
    const tn = this._tn
    this.areaRadii(tn.ra + rad)
  }
  areaAngle(deg = 0) {
    this.areaRadii((deg * Math.PI) / 180)
  }
  areaAngleAdd(deg = 0) {
    const tn = this._tn
    this.areaRadii(tn.ra + (deg * Math.PI) / 180)
  }

  areaPivot(x = 0, y = 0) {
    const tn = this._tn
    if (tn.px !== x || tn.py !== y) (tn.px = x), (tn.py = y), this._areaUpdate()
  }
  areaPivotX(x = 0) {
    const tn = this._tn
    this.areaPivot(x, tn.py)
  }
  areaPivotY(y = 0) {
    const tn = this._tn
    this.areaPivot(tn.px, y)
  }
  areaPivotAdd(x = 0, y = 0) {
    const tn = this._tn
    this.areaPivot(tn.px + x, tn.py + y)
  }
  areaPivotXAdd(x = 0) {
    const tn = this._tn
    this.areaPivot(tn.px + x, tn.py)
  }
  areaPivotYAdd(y = 0) {
    const tn = this._tn
    this.areaPivot(tn.px, tn.py + y)
  }
}

let needPrepareCanvasarea = true
function prepareCanvasarea() {
  needPrepareCanvasarea = false

  const proto = _CanvasareaRenderingContext2D_.prototype
  const proto2d = CanvasRenderingContext2D.prototype

  const defineProperty = Object.defineProperty
  const getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor

  defineProperty(proto, 'GLOBAL_SCALE_X', {
    get: function () {
      return this._gsx
    },
  })
  defineProperty(proto, 'GLOBAL_SCALE_Y', {
    get: function () {
      return this._gsy
    },
  })
  defineProperty(proto, 'GLOBAL_SCALE_MEAN', {
    get: function () {
      return (this._gsx + this._gsy) / 2
    },
  })

  Object.getOwnPropertyNames(proto2d).forEach(function (key) {
    const { get, set, value } = getOwnPropertyDescriptor(proto2d, key)!
    if (get || set || typeof value === 'function')
      defineProperty(
        proto,
        key,
        get || set
          ? {
              // configurable,
              // enumerable,
              get: get
                ? function (this: _CanvasareaRenderingContext2D_) {
                    return get.call((this as any)._ctx)
                  }
                : (void 0 as any),
              set: set
                ? function (this: _CanvasareaRenderingContext2D_, v: any) {
                    set.call((this as any)._ctx, v)
                  }
                : (void 0 as any),
            }
          : {
              // configurable,
              // enumerable,
              // writable,
              value: function () {
                return value.apply(this._ctx, arguments)
              },
            }
      )
  })
}

export type CanvasareaRenderingContext2D = _CanvasareaRenderingContext2D_ &
  CanvasRenderingContext2D

const CONTEXTS: _CanvasareaRenderingContext2D_[] = []

export class Canvasarea<T = unknown> {
  drawThis: T
  draw: (this: T, ctx: CanvasareaRenderingContext2D) => void
  readonly areas: Readonly<Canvasarea<any>[]>

  constructor(draw: Canvasarea<T>['draw'], drawThis?: T) {
    this.draw = draw
    this.drawThis = drawThis!
    this.areas = []

    needPrepareCanvasarea && prepareCanvasarea()
  }

  render(ctx: CanvasRenderingContext2D) {
    const context = CONTEXTS.pop() || new _CanvasareaRenderingContext2D_()
    // @ts-ignore
    context._ctx = ctx
    // @ts-ignore
    context._render(this)
    CONTEXTS.push(context)
  }

  createArea<T2 = unknown>(draw: Canvasarea<T2>['draw'], drawThis?: T2, index?: number) {
    const area = new Canvasarea<T2>(draw, drawThis)
    return this.attachArea(area, index), area
  }

  attachArea(canvasarea: Canvasarea<any>, index?: number) {
    // @ts-ignore
    this.areas.splice(typeof index === 'number' ? index : this.areas.length, 0, canvasarea)
  }

  detachArea(canvasarea_or_index: Canvasarea<any> | number) {
    const areas = this.areas
    return typeof canvasarea_or_index !== 'number' &&
      (canvasarea_or_index = areas.lastIndexOf(canvasarea_or_index)) < 0
      ? false
      : // @ts-ignore
        areas.splice(canvasarea_or_index, 1).length > 0
  }

  detachAllAreas() {
    // @ts-ignore
    this.areas.length = 0
  }
}

export function canvasarea<T = unknown>(draw: Canvasarea<T>['draw'], drawThis?: T) {
  return new Canvasarea<T>(draw, drawThis)
}

export default canvasarea
