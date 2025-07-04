import { rect } from './rect'
import { ellipse as el } from './ellipse'

function toL(s: string) {
  return 'L' + s.slice(1)
}

function toCornerPoint(v: any) {
  if (!v) return { x: 0, y: 0 }
  if (v === +v) return { x: v, y: v }
  return { x: +v.x || 0, y: +v.y || 0 }
}
export function roundRect(
  x: number,
  y: number,
  w: number,
  h: number,
  // radii?: number | number[]
  radii?: number | DOMPointInit | (number | DOMPointInit)[]
) {
  if (!radii) {
    return rect(x, y, w, h)
  }

  if (!Array.isArray(radii)) radii = [radii]

  let tl: { x: number; y: number },
    tr: { x: number; y: number },
    br: { x: number; y: number },
    bl: { x: number; y: number }

  switch (radii.length) {
    case 4: {
      tl = toCornerPoint(radii[0])
      tr = toCornerPoint(radii[1])
      br = toCornerPoint(radii[2])
      bl = toCornerPoint(radii[3])
      break
    }
    case 3: {
      tl = toCornerPoint(radii[0])
      tr = toCornerPoint(radii[1])
      bl = tr
      br = toCornerPoint(radii[2])
      break
    }
    case 2: {
      tl = toCornerPoint(radii[0])
      br = tl
      tr = toCornerPoint(radii[1])
      bl = tr
      break
    }
    case 1: {
      tl = toCornerPoint(radii[0])
      tr = tl
      br = tl
      bl = tl
      break
    }
    default: {
      return rect(x, y, w, h)
    }
  }

  const PI = Math.PI

  let res: string[]
  if (w < 0 && h < 0) {
    res = [
      el(x + w + tr.x, y - tr.y, tr.x, tr.y, 0, -PI * 1.5, -PI),
      toL(el(x + w + br.x, y + h + br.y, br.x, br.y, 0, -PI, -PI / 2)),
      toL(el(x - bl.x, y + h + bl.y, bl.x, bl.y, 0, -PI / 2, 0)),
      toL(el(x - tl.x, y - tl.y, tl.x, tl.y, 0, 0, PI / 2)),
      'Z'
    ]
  } else if (w < 0) {
    res = [
      el(x + w + tr.x, y + tr.y, tr.x, tr.y, 0, -PI / 2, -PI, true),
      toL(el(x + w + br.x, y + h - br.y, br.x, br.y, 0, -PI, -PI * 1.5, true)),
      toL(el(x - bl.x, y + h - bl.y, bl.x, bl.y, 0, PI / 2, 0, true)),
      toL(el(x - tl.x, y + tl.y, tl.x, tl.y, 0, 0, -PI / 2, true)),
      'Z'
    ]
  } else if (h < 0) {
    res = [
      el(x + w - tr.x, y - tr.y, tr.x, tr.y, 0, PI / 2, 0, true),
      toL(el(x + w - br.x, y + h + br.y, br.x, br.y, 0, 0, -PI / 2, true)),
      toL(el(x + bl.x, y + h + bl.y, bl.x, bl.y, 0, -PI / 2, -PI, true)),
      toL(el(x + tl.x, y - tl.y, tl.x, tl.y, 0, -PI, -PI * 1.5, true)),
      'Z'
    ]
  } else {
    res = [
      el(x + w - tr.x, y + tr.y, tr.x, tr.y, 0, -PI / 2, 0),
      toL(el(x + w - br.x, y + h - br.y, br.x, br.y, 0, 0, PI / 2)),
      toL(el(x + bl.x, y + h - bl.y, bl.x, bl.y, 0, PI / 2, PI)),
      toL(el(x + tl.x, y + tl.y, tl.x, tl.y, 0, PI, PI * 1.5)),
      'Z',
    ]
  }
  // res[2][0] = res[4][0] = res[6][0] = 'L'

  return res.join('\n')
}
