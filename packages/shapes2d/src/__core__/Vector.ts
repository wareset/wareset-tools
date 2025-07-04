export interface IVector {
  x: number
  y: number
}

export class Vector implements IVector {
  x: number
  y: number

  constructor(x?: number, y?: number) {
    this.x = x || 0
    this.y = y || 0
  }

  // Utility

  clone() {
    return new Vector(this.x, this.y)
  }

  // copyX(objX: { x: number }) {
  //   return (this.x = objX.x), this
  // }
  // copyY(objY: { y: number }) {
  //   return (this.y = objY.y), this
  // }
  // copy(objXY: { x: number; y: number }) {
  //   return (this.x = objXY.x), (this.y = objXY.y), this
  // }

  toString() {
    return `x: ${this.x}, y: ${this.y}`
  }
  toObject() {
    return { x: this.x, y: this.y }
  }

  fromArray(array: number[], offset = 0) {
    return (this.x = array[offset]), (this.y = array[offset + 1]), this
  }
  toArray(array: number[] = [], offset = 0) {
    return (array[offset] = this.x), (array[offset + 1] = this.y), array
  }

  // Manipulation

  setX(objX: { x: number }) {
    return (this.x = objX.x), this
  }
  setY(objY: { y: number }) {
    return (this.y = objY.y), this
  }
  set(objXY: { x: number; y: number }) {
    return (this.x = objXY.x), (this.y = objXY.y), this
  }
  setScalarX(x: number) {
    return (this.x = x), this
  }
  setScalarY(y: number) {
    return (this.y = y), this
  }
  setScalar(x_or_xy: number, y = x_or_xy) {
    return (this.x = x_or_xy), (this.y = y), this
  }

  addX(objX: { x: number }) {
    return (this.x += objX.x), this
  }
  addY(objY: { y: number }) {
    return (this.y += objY.y), this
  }
  add(objXY: { x: number; y: number }) {
    return (this.x += objXY.x), (this.y += objXY.y), this
  }
  addScalarX(x: number) {
    return (this.x += x), this
  }
  addScalarY(y: number) {
    return (this.y += y), this
  }
  addScalar(x_or_xy: number, y = x_or_xy) {
    return (this.x += x_or_xy), (this.y += y), this
  }

  subX(objX: { x: number }) {
    return (this.x -= objX.x), this
  }
  subY(objY: { y: number }) {
    return (this.y -= objY.y), this
  }
  sub(objXY: { x: number; y: number }) {
    return (this.x -= objXY.x), (this.y -= objXY.y), this
  }
  subScalarX(x: number) {
    return (this.x -= x), this
  }
  subScalarY(y: number) {
    return (this.y -= y), this
  }
  subScalar(x_or_xy: number, y = x_or_xy) {
    return (this.x -= x_or_xy), (this.y -= y), this
  }

  multiplyX(objX: { x: number }) {
    return (this.x *= objX.x), this
  }
  multiplyY(objY: { y: number }) {
    return (this.y *= objY.y), this
  }
  multiply(objXY: { x: number; y: number }) {
    return (this.x *= objXY.x), (this.y *= objXY.y), this
  }
  multiplyScalarX(x: number) {
    return (this.x *= x), this
  }
  multiplyScalarY(y: number) {
    return (this.y *= y), this
  }
  multiplyScalar(x_or_xy: number, y = x_or_xy) {
    return (this.x *= x_or_xy), (this.y *= y), this
  }

  divideX(objX: { x: number }) {
    return (this.x /= objX.x), this
  }
  divideY(objY: { y: number }) {
    return (this.y /= objY.y), this
  }
  divide(objXY: { x: number; y: number }) {
    return (this.x /= objXY.x), (this.y /= objXY.y), this
  }
  divideScalarX(x: number) {
    return (this.x /= x), this
  }
  divideScalarY(y: number) {
    return (this.y /= y), this
  }
  divideScalar(x_or_xy: number, y = x_or_xy) {
    return (this.x /= x_or_xy), (this.y /= y), this
  }

  reverseX() {
    return (this.x = -this.x), this
  }
  reverseY() {
    return (this.y = -this.y), this
  }
  reverse() {
    return (this.x = -this.x), (this.y = -this.y), this
  }

  perp() {
    const x = this.x
    return (this.x = this.y), (this.y = -x), this
  }

  rotate(radii: number) {
    const x = this.x
    const y = this.y
    const cos = Math.cos(radii)
    const sin = Math.sin(radii)
    this.x = x * cos - y * sin
    this.y = x * sin + y * cos
    return this
  }
  rotateAround(centerXY: { x: number; y: number }, radii: number) {
    const cx = centerXY.x
    const cy = centerXY.y
    const x = this.x - cx
    const y = this.y - cy
    const cos = Math.cos(radii)
    const sin = Math.sin(radii)
    this.x = x * cos - y * sin + cx
    this.y = x * sin + y * cos + cy
    return this
  }

  normalize() {
    // return this.divideScalar(this.length() || 1)
    const d = this.length()
    if (d) (this.x /= d), (this.y /= d)
    return this
  }

  project(vector: Vector) {
    const amt = this.dot(vector) / vector.lengthSq()
    return (this.x = amt * vector.x), (this.y = amt * vector.y), this
  }

  // Products

  dot(objXY: { x: number; y: number }) {
    return this.x * objXY.x + this.y * objXY.y
  }

  cross(objXY: { x: number; y: number }) {
    return this.x * objXY.y - this.y * objXY.x
  }

  lengthSq() {
    return this.dot(this)
  }

  length() {
    return Math.sqrt(this.lengthSq())
  }

  hAngle() {
    return Math.atan2(this.y, this.x)
  }
  vAngle() {
    return Math.atan2(this.x, this.y)
  }

  angle() {
    return Math.atan2(-this.y, -this.x) + Math.PI
  }

  applyMatrix(matrix: {
    a: number
    b: number
    c: number
    d: number
    e: number
    f: number
  }) {
    const x = this.x
    const y = this.y
    this.x = x * matrix.a + y * matrix.c + matrix.e
    this.y = x * matrix.b + y * matrix.d + matrix.f
    return this
  }
}
