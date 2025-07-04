export function quadraticCurveTo(cpx: number, cpy: number, x: number, y: number) {
  // return [['Q', cpx, cpy, x, y]]
  return `Q ${cpx} ${cpy} ${x} ${y}`
}
