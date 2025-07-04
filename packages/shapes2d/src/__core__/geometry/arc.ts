import { ellipse } from './ellipse'

export function arc(
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number,
  counterclockwise?: boolean
) {
  return ellipse(x, y, radius, radius, 0, startAngle, endAngle, counterclockwise)
}
