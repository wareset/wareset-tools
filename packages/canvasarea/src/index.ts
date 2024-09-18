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
  // need update
  private _nu: boolean

  private _gsx: number
  private _gsy: number
  declare readonly GLOBAL_SCALE_X: number
  declare readonly GLOBAL_SCALE_Y: number
  declare readonly GLOBAL_SCALE_MEAN: number

  constructor() {
    this._ctx = null as any
    this._tl = {} as any
    this._tn = {} as any
    this._nu = false

    this._gsx = 1
    this._gsy = 1

    if (!('GLOBAL_SCALE_X' in this)) {
      const proto = _CanvasareaRenderingContext2D_.prototype
      const proto2d = CanvasRenderingContext2D.prototype

      const defineProperty = Object.defineProperty
      const getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor

      defineProperty(proto, 'GLOBAL_SCALE_X', {
        get: function () {
          return this._transform(), this._gsx
        },
      })
      defineProperty(proto, 'GLOBAL_SCALE_Y', {
        get: function () {
          return this._transform(), this._gsy
        },
      })
      defineProperty(proto, 'GLOBAL_SCALE_MEAN', {
        get: function () {
          return this._transform(), (this._gsx + this._gsy) / 2
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
                        return get.call(this._ctx)
                      }
                    : (void 0 as any),
                  set: set
                    ? function (this: _CanvasareaRenderingContext2D_, v: any) {
                        set.call(this._ctx, v)
                      }
                    : (void 0 as any),
                }
              : {
                  // configurable,
                  // enumerable,
                  // writable,
                  value: function () {
                    return this._transform(), value.apply(this._ctx, arguments)
                  },
                }
          )
      })
    }
  }

  protected _render(canvasarea: Canvasarea) {
    this._tl = { tx: 0, ty: 0, sx: 1, sy: 1, ra: 0, px: 0, py: 0 }
    this._tn = { tx: 0, ty: 0, sx: 1, sy: 1, ra: 0, px: 0, py: 0 }

    this._ctx.save()
    canvasarea._draw(this as any)
    this._transform()
    const gsx = this._gsx
    const gsy = this._gsy
    canvasarea._areas.forEach(areasForEach, { gsx, gsy, iam: this })
    this._gsx = this._gsy = 1
    this._ctx.restore()
  }

  protected _transform() {
    if (this._nu) {
      const ctx = this._ctx
      const tl = this._tl
      const tn = this._tn
      this._nu = false

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
  }

  areaShift(x = 0, y = 0) {
    const tn = this._tn
    if (tn.tx !== x || tn.ty !== y) (tn.tx = x), (tn.ty = y), (this._nu = true)
  }
  areaScale(x = 1, y = x) {
    const tn = this._tn
    if (tn.sx !== x || tn.sy !== y) (tn.sx = x), (tn.sy = y), (this._nu = true)
  }
  areaAngle(deg = 0) {
    this.areaRadii((deg * Math.PI) / 180)
  }
  areaRadii(rad = 0) {
    const tn = this._tn
    if (tn.ra !== rad) (tn.ra = rad), (this._nu = true)
  }
  areaPivot(x = 0, y = 0) {
    const tn = this._tn
    if (tn.px !== x || tn.py !== y) (tn.px = x), (tn.py = y), (this._nu = true)
  }
}

function normalize_idx(i: number | undefined, l: number) {
  return typeof i === 'number' && i <= l
    ? (i |= 0) < 0
      ? (i = l + i - 1) < 0
        ? 0
        : i
      : i
    : l
}

export type CanvasareaRenderingContext2D = _CanvasareaRenderingContext2D_ &
  CanvasRenderingContext2D

const CONTEXTS: _CanvasareaRenderingContext2D_[] = []

export class Canvasarea {
  readonly _draw: (ctx: CanvasareaRenderingContext2D) => void
  readonly _areas: Canvasarea[]

  constructor(draw: Canvasarea['_draw']) {
    this._draw = draw
    this._areas = []
  }

  render(ctx: CanvasRenderingContext2D) {
    const context = CONTEXTS.pop() || new _CanvasareaRenderingContext2D_()
    // @ts-ignore
    context._ctx = ctx
    // @ts-ignore
    context._render(this)
    CONTEXTS.push(context)
  }

  createArea(draw: Canvasarea['_draw'], index?: number) {
    const area = new Canvasarea(draw)
    this.attachArea(area, index)
    return area
  }

  attachArea(canvasarea: Canvasarea, index?: number) {
    const areas = this._areas
    areas.splice(normalize_idx(index, areas.length), 0, canvasarea)
  }

  detachArea(canvasarea_or_index: Canvasarea | number) {
    const areas = this._areas
    const idx =
      typeof canvasarea_or_index === 'number'
        ? canvasarea_or_index | 0
        : areas.lastIndexOf(canvasarea_or_index)
    return idx < 0 ? false : areas.splice(idx, 1).length > 0
  }

  detachAllAreas() {
    this._areas.length = 0
  }
}

export function canvasarea(draw: Canvasarea['_draw']) {
  return new Canvasarea(draw)
}

export default canvasarea
