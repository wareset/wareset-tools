export function ellipse(
  x: number,
  y: number,
  radiusX: number,
  radiusY: number,
  rotation: number,
  startAngle: number,
  endAngle: number,
  counterclockwise?: boolean
) {
  const { sin, cos, PI, abs } = Math
  const tau = PI * 2

  if (startAngle === endAngle) return ''

  if (!(startAngle + endAngle)) {
    if (endAngle) endAngle += endAngle > 2e-3 ? -1e-3 : 1e-3
    else startAngle += startAngle > 2e-3 ? -1e-3 : 1e-3
  }

  let newStartAngle = startAngle % tau
  if (newStartAngle <= 0) newStartAngle += tau

  endAngle += newStartAngle - startAngle
  startAngle = newStartAngle

  if (!counterclockwise && endAngle - startAngle >= tau) {
    endAngle = startAngle + tau
  } else if (counterclockwise && startAngle - endAngle >= tau) {
    endAngle = startAngle - tau
  } else if (!counterclockwise && startAngle > endAngle) {
    endAngle = startAngle + (tau - ((startAngle - endAngle) % tau))
  } else if (counterclockwise && startAngle < endAngle) {
    endAngle = startAngle - (tau - ((endAngle - startAngle) % tau))
  }

  const dTheta = endAngle - startAngle
  const dThetaAbs = abs(dTheta)

  const fa = dThetaAbs > Math.PI ? 1 : 0
  const fs = dTheta > 0 ? 1 : 0

  if (tau - dThetaAbs < 1e-6) {
    if (dTheta) endAngle -= 1e-6
    else startAngle += 1e-6
  }

  const cosR = cos(rotation)
  const sinR = sin(rotation)

  const M11 = radiusX * cos(startAngle)
  const N11 = radiusY * sin(startAngle)
  const M21 = radiusX * cos(endAngle)
  const N21 = radiusY * sin(endAngle)

  const x1 = x + cosR * M11 - sinR * N11
  const y1 = y + sinR * M11 + cosR * N11
  const x2 = x + cosR * M21 - sinR * N21
  const y2 = y + sinR * M21 + cosR * N21

  // return [
  //   ['M', x1, y1],
  //   ['A', radiusX, radiusY, (rotation * 180) / PI, fa, fs, x2, y2],
  // ]

  return `M ${x1} ${y1}
A ${radiusX} ${radiusY} ${(rotation * 180) / PI} ${fa} ${fs} ${x2} ${y2}`
}
