export interface IMatrix {
  a: number
  b: number
  c: number
  d: number
  e: number
  f: number
}

export class Matrix implements IMatrix {
  a: number
  b: number
  c: number
  d: number
  e: number
  f: number

  constructor() {
    this.a = 1
    this.b = 0
    this.c = 0
    this.d = 1
    this.e = 0
    this.f = 0
  }

  copy(fromMatrix: IMatrix) {
    this.a = fromMatrix.a
    this.b = fromMatrix.b
    this.c = fromMatrix.c
    this.d = fromMatrix.d
    this.e = fromMatrix.e
    this.f = fromMatrix.f
    return this
  }

  clone() {
    return new Matrix().copy(this)
  }

  reset() {
    this.a = this.d = 1
    this.b = this.c = this.e = this.f = 0
    return this
  }

  transform(a: number, b: number, c: number, d: number, e: number, f: number) {
    const a1 = this.a
    const b1 = this.b
    const c1 = this.c
    const d1 = this.d
    const e1 = this.e
    const f1 = this.f
    /* matrix order (canvas compatible):
     * ace
     * bdf
     * 001
     */
    this.a = a1 * a + c1 * b
    this.b = b1 * a + d1 * b
    this.c = a1 * c + c1 * d
    this.d = b1 * c + d1 * d
    this.e = a1 * e + c1 * f + e1
    this.f = b1 * e + d1 * f + f1
    return this
  }
  setTransform(a: number, b: number, c: number, d: number, e: number, f: number) {
    this.a = a
    this.b = b
    this.c = c
    this.d = d
    this.e = e
    this.f = f
    return this
  }

  scale(sx: number, sy: number) {
    this.a *= sx
    this.b *= sx
    this.c *= sy
    this.d *= sy
    // this.transform(sx, 0, 0, sy, 0, 0)
    return this
  }
  scaleX(sx: number) {
    this.a *= sx
    this.b *= sx
    // this.transform(sx, 0, 0, 1, 0, 0)
    return this
  }
  scaleY(sy: number) {
    this.c *= sy
    this.d *= sy
    // this.transform(1, 0, 0, sy, 0, 0)
    return this
  }

  flipX() {
    this.a = -this.a
    this.b = -this.b
    // this.transform(-1, 0, 0, 1, 0, 0)
    return this
  }
  flipY() {
    this.c = -this.c
    this.d = -this.d
    // this.transform(1, 0, 0, -1, 0, 0)
    return this
  }

  skew(sx: number, sy: number) {
    const a1 = this.a
    const b1 = this.b
    const c1 = this.c
    const d1 = this.d
    this.a += c1 * sy
    this.b += d1 * sy
    this.c += a1 * sx
    this.d += b1 * sx
    // this.transform(1, sy, sx, 1, 0, 0)
    return this
  }
  skewX(sx: number) {
    this.c += this.a * sx
    this.d += this.b * sx
    // this.transform(1, 0, sx, 1, 0, 0)
    return this
  }
  skewY(sy: number) {
    this.a += this.c * sy
    this.b += this.d * sy
    // this.transform(1, sy, 0, 1, 0, 0)
    return this
  }

  rotate(radii: number) {
    const a1 = this.a
    const b1 = this.b
    const c1 = this.c
    const d1 = this.d
    const cos = Math.cos(-radii)
    const sin = Math.sin(-radii)
    this.a = a1 * cos - c1 * sin
    this.b = b1 * cos - d1 * sin
    this.c = c1 * cos + a1 * sin
    this.d = d1 * cos + b1 * sin
    // const cos = Math.cos(radii)
    // const sin = Math.sin(radii)
    // this.transform(cos, sin, -sin, cos, 0, 0)
    return this
  }

  translate(tx: number, ty: number) {
    this.e += tx * this.a + ty * this.c
    this.f += tx * this.b + ty * this.d
    // this.transform(1, 0, 0, 1, tx, ty)
    return this
  }
  translateX(tx: number) {
    this.e += tx * this.a
    this.f += tx * this.b
    // this.transform(1, 0, 0, 1, tx, 0)
    return this
  }
  translateY(ty: number) {
    this.e += ty * this.c
    this.f += ty * this.d
    // this.transform(1, 0, 0, 1, 0, ty)
    return this
  }

  /**
   * Get an inverse matrix of current matrix. The method returns a new
   * matrix with values you need to use to get to an identity matrix.
   * Context from parent matrix is not applied to the returned matrix.
   */
  getInverse() {
    const a = this.a
    const b = this.b
    const c = this.c
    const d = this.d
    const e = this.e
    const f = this.f
    const m = new Matrix()
    const dt = a * d - b * c
    m.a = d / dt
    m.b = -b / dt
    m.c = -c / dt
    m.d = a / dt
    m.e = (c * f - d * e) / dt
    m.f = -(a * f - b * e) / dt
    return m
  }

  /**
   * Interpolate this matrix with another and produce a new matrix.
   * t is a value in the range [0.0, 1.0] where 0 is this instance and
   * 1 is equal to the second matrix. The t value is not constrained.
   *
   * Context from parent matrix is not applied to the returned matrix.
   */
  interpolate(matrix: IMatrix, t: number) {
    const a = this.a
    const b = this.b
    const c = this.c
    const d = this.d
    const e = this.e
    const f = this.f
    const m = new Matrix()
    m.a = a + (matrix.a - a) * t
    m.b = b + (matrix.b - b) * t
    m.c = c + (matrix.c - c) * t
    m.d = d + (matrix.d - d) * t
    m.e = e + (matrix.e - e) * t
    m.f = f + (matrix.f - f) * t
    return m
  }

  applyToPoint(x: number, y: number) {
    return {
      x: x * this.a + y * this.c + this.e,
      y: x * this.b + y * this.d + this.f,
    }
  }
}
