export function bezierCurveTo(
  cp1x: number,
  cp1y: number,
  cp2x: number,
  cp2y: number,
  x: number,
  y: number
) {
  // return [['C', cp1x, cp1y, cp2x, cp2y, x, y]]
  return `C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${x} ${y}`
}
