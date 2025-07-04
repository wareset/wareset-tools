import { Matrix } from './Matrix'

export class Shape {
  hitArea: null

  rendererContext: any
  renderer: (this: any, ctx: CanvasRenderingContext2D) => any

  constructor(
    renderer: (this: any, ctx: CanvasRenderingContext2D) => any,
    rendererContext?: any
  ) {
    this.renderer = renderer
    this.rendererContext = rendererContext

    this.matrix = new Matrix()
    // this.matrixRelative = new Matrix()
    // this.matrixAbsolute = new Matrix()
    this._sizes = { tx: 0, ty: 0, sx: 1, sy: 1, ra: 0, px: 0, py: 0 }

    this.parent = null
    this.children = []

    this.hitArea = null

    this._needUpdateMatrix = false
  }

  readonly parent: Shape | null
  readonly children: Readonly<Shape[]>
  attachChild(shape: Shape, beforeShape_or_index?: Shape | number) {
    if (shape !== beforeShape_or_index) {
      const children = this.children
      shape.parent && shape.parent.detachChild(shape)
      beforeShape_or_index =
        typeof beforeShape_or_index === 'number'
          ? beforeShape_or_index
          : beforeShape_or_index && beforeShape_or_index.parent === this
            ? children.lastIndexOf(beforeShape_or_index)
            : children.length
      // @ts-ignore
      shape.parent = this
      // @ts-ignore
      children.splice(beforeShape_or_index, 0, shape)
    }
  }
  detachChild(shape_or_index: Shape | number) {
    const children = this.children
    return typeof shape_or_index !== 'number' &&
      (shape_or_index =
        shape_or_index.parent === this
          ? children.lastIndexOf(shape_or_index)
          : -1) < 0
      ? false
      : // @ts-ignore
        (shape_or_index = children.splice(shape_or_index, 1)[0])
        ? // @ts-ignore
          ((shape_or_index.parent = null), true)
        : false
  }

  readonly matrix: Matrix
  private readonly _sizes: {
    tx: number
    ty: number
    sx: number
    sy: number
    ra: number
    px: number
    py: number
  }

  private _needUpdateMatrix: boolean
  updateMatrix() {
    if (this._needUpdateMatrix) {
      this._needUpdateMatrix = false
      const mx = this.matrix
      const sz = this._sizes
      mx.reset()
      if (sz.tx || sz.ty) mx.translate(sz.tx, sz.ty)
      if (sz.sx !== 1 || sz.sy !== 1) mx.scale(sz.sx, sz.sy)
      if (sz.ra) mx.rotate(sz.ra)
      if (sz.px || sz.py) mx.translate(-sz.px, -sz.py)
    }
  }

  setRadii(radians: number) {
    if (isFinite(radians)) {
      const sz = this._sizes
      if (sz.ra !== radians) {
        ;(sz.ra = radians), (this._needUpdateMatrix = true)
      }
    }
  }
  addRadii(radians: number) {
    this.setRadii(this._sizes.ra + radians)
  }
  getRadii() {
    return this._sizes.ra
  }
  get radii() {
    return this._sizes.ra
  }
  set radii(radians: number) {
    this.setRadii(radians)
  }
  setAngle(degrees: number) {
    // this.setRadii((degrees / 180) * Math.PI)
    this.setRadii(degrees * 0.017453292519943295)
  }
  addAngle(degrees: number) {
    this.setRadii(degrees * 0.017453292519943295 + this._sizes.ra)
  }
  getAngle() {
    // return (this._sizes.ra * 180) / Math.PI
    return this._sizes.ra / 0.017453292519943295
  }
  get angle() {
    return this.getAngle()
  }
  set angle(degrees: number) {
    this.setAngle(degrees)
  }

  setScale(sx: number, sy = sx) {
    if (isFinite(sx) && isFinite(sy)) {
      const sz = this._sizes
      if (sz.sx !== sx || sz.sy !== sy) {
        ;(sz.sx = sx), (sz.sy = sy), (this._needUpdateMatrix = true)
      }
    }
  }
  setScaleX(sx: number) {
    const sz = this._sizes
    this.setScale(sx, sz.sy)
  }
  setScaleY(sy: number) {
    const sz = this._sizes
    this.setScale(sz.sx, sy)
  }
  addScale(sx: number, sy = sx) {
    const sz = this._sizes
    this.setScale(sz.sx + sx, sz.sy + sy)
  }
  addScaleX(sx: number) {
    const sz = this._sizes
    this.setScale(sz.sx + sx, sz.sy)
  }
  addScaleY(sy: number) {
    const sz = this._sizes
    this.setScale(sz.sx, sz.sy + sy)
  }
  getScale() {
    const sz = this._sizes
    return { x: sz.sx, y: sz.sy }
  }
  getScaleX() {
    return this._sizes.sx
  }
  getScaleY() {
    return this._sizes.sy
  }
  get scaleX() {
    return this._sizes.sx
  }
  set scaleX(sx: number) {
    this.setScale(sx, this._sizes.sy)
  }
  get scaleY() {
    return this._sizes.sy
  }
  set scaleY(sy: number) {
    this.setScale(this._sizes.sx, sy)
  }

  setPivot(px: number, py: number) {
    if (isFinite(px) && isFinite(py)) {
      const sz = this._sizes
      if (sz.px !== px || sz.py !== py) {
        ;(sz.px = px), (sz.py = py), (this._needUpdateMatrix = true)
      }
    }
  }
  setPivotX(px: number) {
    const sz = this._sizes
    this.setPivot(px, sz.py)
  }
  setPivotY(py: number) {
    const sz = this._sizes
    this.setPivot(sz.px, py)
  }
  addPivot(px: number, py: number) {
    const sz = this._sizes
    this.setScale(sz.px + px, sz.py + py)
  }
  addPivotX(px: number) {
    const sz = this._sizes
    this.setScale(sz.px + px, sz.py)
  }
  addPivotY(py: number) {
    const sz = this._sizes
    this.setScale(sz.px, sz.py + py)
  }
  getPivot() {
    const sz = this._sizes
    return { x: sz.px, y: sz.py }
  }
  getPivotX() {
    return this._sizes.px
  }
  getPivotY() {
    return this._sizes.py
  }
  get pivotX() {
    return this._sizes.px
  }
  set pivotX(px: number) {
    this.setPivot(px, this._sizes.py)
  }
  get pivotY() {
    return this._sizes.py
  }
  set pivotY(py: number) {
    this.setPivot(this._sizes.px, py)
  }

  setTranslate(tx: number, ty: number) {
    if (isFinite(tx) && isFinite(ty)) {
      const sz = this._sizes
      if (sz.tx !== tx || sz.ty !== ty) {
        ;(sz.tx = tx), (sz.ty = ty), (this._needUpdateMatrix = true)
      }
    }
  }
  setTranslateX(tx: number) {
    const sz = this._sizes
    this.setTranslate(tx, sz.ty)
  }
  setTranslateY(ty: number) {
    const sz = this._sizes
    this.setTranslate(sz.tx, ty)
  }
  addTranslate(tx: number, ty: number) {
    const sz = this._sizes
    this.setTranslate(sz.tx + tx, sz.ty + ty)
  }
  addTranslateX(tx: number) {
    const sz = this._sizes
    this.setTranslate(sz.tx + tx, sz.ty)
  }
  addTranslateY(ty: number) {
    const sz = this._sizes
    this.setTranslate(sz.tx, sz.ty + ty)
  }
  getTranslate() {
    const sz = this._sizes
    return { x: sz.tx, y: sz.ty }
  }
  getTranslateX() {
    return this._sizes.tx
  }
  getTranslateY() {
    return this._sizes.ty
  }
  get x() {
    return this._sizes.tx
  }
  set x(tx: number) {
    this.setTranslate(tx, this._sizes.ty)
  }
  get y() {
    return this._sizes.ty
  }
  set y(ty: number) {
    this.setTranslate(this._sizes.tx, ty)
  }
}
