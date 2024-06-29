import {
  canvasarea,
  type CanvasareaRenderingContext2D,
  Canvasarea
} from '@wareset-tools/canvasarea'

const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')!
// document.body.appendChild(canvas)

import * as suits from './__core__/gen/svg/d_suits'
const SUITS = {} as { [K in keyof typeof suits]: Path2D }
for (const k in suits) (SUITS as any)[k] = new Path2D((suits as any)[k])

import * as values from './__core__/gen/svg/d_values'
const VALUES = {} as { [K in keyof typeof values]: Path2D }
for (const k in values) (VALUES as any)[k] = new Path2D((values as any)[k])

function roundRectPath(w: number, h: number, tlr: number, trr: number, brr: number, blr: number) {
  // prettier-ignore
  return 'M 0 ' + tlr
    + ' A ' + tlr + ' ' + tlr + ' 0 0 1 ' + tlr + ' 0'
    + ' L ' + (w - trr) + ' 0'
    + ' A ' + trr + ' ' + trr + ' 0 0 1 ' + w + ' ' + trr
    + ' L ' + w + ' ' + (h - brr)
    + ' A ' + brr + ' ' + brr + ' 0 0 1 ' + (w - brr) + ' ' + h
    + ' L ' + blr + ' ' + h
    + ' A ' + blr + ' ' + blr + ' 0 0 1 0 ' + (h - blr)
    + ' Z';
}

let WIDTH: number
let HEIGHT: number
let CARD_SUIT: Path2D
let CARD_VALUE: Path2D
let BG_COLOR: string | CanvasGradient | CanvasPattern
let BORDER_COLOR: string | CanvasGradient | CanvasPattern
let CARD_COLOR: string | CanvasGradient | CanvasPattern | null

const lft = canvasarea(() => {})
const rgt = canvasarea((ctx: CanvasareaRenderingContext2D) => {
  // ctx.areaScale(WIDTH / 100, HEIGHT / 140)
  ctx.areaShift(WIDTH, HEIGHT)
  ctx.areaAngle(180)
})

//
// AREA BORDER
//
const area_1_clear_and_draw_border = canvasarea((ctx) => {
  let rad: number
  const wh = WIDTH + HEIGHT
  const rx = WIDTH / 33
  ctx.clearRect(0, 0, WIDTH, HEIGHT)
  ctx.strokeStyle = BORDER_COLOR

  const lw = (ctx.lineWidth = wh / 300) / ctx.GLOBAL_SCALE_MEAN

  rad = wh / 66
  ctx.areaShift(lw / 2, lw / 2)
  ctx.stroke(new Path2D(roundRectPath(WIDTH - lw, HEIGHT - lw, rad, rad, rad, rad)))
  // ctx.beginPath()
  // ctx.rect(rx, rx, WIDTH - rx * 2, HEIGHT - rx * 2)
  // ctx.closePath()
  rad /= WIDTH / (WIDTH - rx * 2)
  ctx.areaShift(rx, rx)
  ctx.lineWidth = 2 / ctx.GLOBAL_SCALE_MEAN
  ctx.stroke(new Path2D(roundRectPath(WIDTH - rx * 2, HEIGHT - rx * 2, rad, rad, rad, rad)))
})

//
// AREA VALUE AND SUIT
//
const area_2_draw_value = (() => {
  const _move = (ctx: CanvasareaRenderingContext2D) => {
    const w2 = WIDTH / 2
    const h2 = HEIGHT / 2
    ctx.areaPivot(w2, h2)
    ctx.areaShift(w2, h2)
  }
  const _fill = (ctx: CanvasareaRenderingContext2D) => {
    ctx.areaPivot(16, 16)
    const wh = WIDTH + HEIGHT

    const sc = wh / 325
    const rx = WIDTH / 33 + 16 * sc
    ctx.areaShift(rx, rx)
    ctx.areaScale(sc)
    ctx.lineWidth = (WIDTH + HEIGHT) / 100 / ctx.GLOBAL_SCALE_MEAN
    ctx.stroke(CARD_VALUE)
    ctx.fill(CARD_VALUE)

    const sc2 = wh / 500
    const coef = 0 // (sc - sc2) * 12
    ctx.areaShift(WIDTH - rx + coef, rx - coef)
    ctx.areaScale(sc2)
    ctx.lineWidth = (WIDTH + HEIGHT) / 100 / ctx.GLOBAL_SCALE_MEAN
    ctx.stroke(CARD_SUIT)
    ctx.fill(CARD_SUIT)
  }
  const root = canvasarea((ctx) => {
    ctx.fillStyle = CARD_COLOR!
    ctx.strokeStyle = BG_COLOR
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.miterLimit = 0
  })
  root.createArea(_move).createArea(_fill)
  root.createArea((ctx) => (_move(ctx), ctx.areaAngle(180))).createArea(_fill)
  return root
})()

//
// AREAS
//
let PLACE_SUITS_SCALE = 1

const fill = (ctx: CanvasareaRenderingContext2D, isValue?: boolean) => {
  ctx.areaPivot(16, 16)
  ctx.fillStyle = CARD_COLOR!
  ctx.fill(isValue ? CARD_VALUE : CARD_SUIT)
}

const suitOne = canvasarea((ctx: CanvasareaRenderingContext2D) => {
  ctx.areaScale(PLACE_SUITS_SCALE * 2)
  ctx.areaShift(WIDTH / 2, HEIGHT / 2)
  fill(ctx)
})
// const suitValue = canvasarea((ctx: CanvasareaRenderingContext2D) => {
//   ctx.areaScale(PLACE_SUITS_SCALE * 2)
//   ctx.areaShift(WIDTH / 2, HEIGHT / 2)
//   fill(ctx, true)
// })

const suitTop = canvasarea((ctx: CanvasareaRenderingContext2D) => {
  ctx.areaScale(PLACE_SUITS_SCALE)
  ctx.areaShift(WIDTH / 2, WIDTH / 4)
  fill(ctx)
})
const suitTopLeft = canvasarea((ctx: CanvasareaRenderingContext2D) => {
  ctx.areaScale(PLACE_SUITS_SCALE)
  ctx.areaShift(WIDTH / 3, WIDTH / 4)
  fill(ctx)
})
const suitTopRight = canvasarea((ctx: CanvasareaRenderingContext2D) => {
  ctx.areaScale(PLACE_SUITS_SCALE)
  ctx.areaShift(WIDTH - WIDTH / 3, WIDTH / 4)
  fill(ctx)
})
const suitLeft = canvasarea((ctx: CanvasareaRenderingContext2D) => {
  ctx.areaScale(PLACE_SUITS_SCALE)
  ctx.areaShift(WIDTH / 3, WIDTH / 4 + (HEIGHT - WIDTH / 2) / 3)
  fill(ctx)
})
const suitRight = canvasarea((ctx: CanvasareaRenderingContext2D) => {
  ctx.areaScale(PLACE_SUITS_SCALE)
  ctx.areaShift(WIDTH - WIDTH / 3, WIDTH / 4 + (HEIGHT - WIDTH / 2) / 3)
  fill(ctx)
})
const suitMiddle = canvasarea((ctx: CanvasareaRenderingContext2D) => {
  ctx.areaScale(PLACE_SUITS_SCALE)
  ctx.areaShift(WIDTH / 2, WIDTH / 4 + (HEIGHT - WIDTH / 2) / 6)
  fill(ctx)
})
const suitCenter = canvasarea((ctx: CanvasareaRenderingContext2D) => {
  ctx.areaScale(PLACE_SUITS_SCALE)
  ctx.areaShift(WIDTH / 2, HEIGHT / 2)
  fill(ctx)
})
const suitCenterLeft = canvasarea((ctx: CanvasareaRenderingContext2D) => {
  ctx.areaScale(PLACE_SUITS_SCALE)
  ctx.areaShift(WIDTH / 3, HEIGHT / 2)
  fill(ctx)
})
const suitCenterRight = canvasarea((ctx: CanvasareaRenderingContext2D) => {
  ctx.areaScale(PLACE_SUITS_SCALE)
  ctx.areaShift(WIDTH - WIDTH / 3, HEIGHT / 2)
  fill(ctx)
})
const suitCenterMiddle = canvasarea((ctx: CanvasareaRenderingContext2D) => {
  ctx.areaScale(PLACE_SUITS_SCALE)
  ctx.areaShift(WIDTH / 2, WIDTH / 4 + (HEIGHT - WIDTH / 2) / 4)
  fill(ctx)
})

//
// Suit
//
const suit1 = (lft: Canvasarea) => {
  lft.attachArea(suitOne)
  // lft.layer(suitValue)
}
const suit2 = (lft: Canvasarea, rgt: Canvasarea) => {
  lft.attachArea(suitTop)
  rgt.attachArea(suitTop)
}
const suit3 = (lft: Canvasarea, rgt: Canvasarea) => {
  suit2(lft, rgt)
  lft.attachArea(suitCenter)
}
const suit4 = (lft: Canvasarea, rgt: Canvasarea) => {
  lft.attachArea(suitTopLeft)
  lft.attachArea(suitTopRight)
  rgt.attachArea(suitTopLeft)
  rgt.attachArea(suitTopRight)
}
const suit5 = (lft: Canvasarea, rgt: Canvasarea) => {
  suit4(lft, rgt)
  lft.attachArea(suitCenter)
}
const suit6 = (lft: Canvasarea, rgt: Canvasarea) => {
  suit4(lft, rgt)
  lft.attachArea(suitCenterLeft)
  lft.attachArea(suitCenterRight)
}
const suit7 = (lft: Canvasarea, rgt: Canvasarea) => {
  suit6(lft, rgt)
  lft.attachArea(suitCenterMiddle)
}
const suit8 = (lft: Canvasarea, rgt: Canvasarea) => {
  suit4(lft, rgt)
  lft.attachArea(suitLeft)
  lft.attachArea(suitRight)
  rgt.attachArea(suitLeft)
  rgt.attachArea(suitRight)
}
const suit9 = (lft: Canvasarea, rgt: Canvasarea) => {
  suit8(lft, rgt)
  lft.attachArea(suitCenter)
}
const suit10 = (lft: Canvasarea, rgt: Canvasarea) => {
  suit8(lft, rgt)
  lft.attachArea(suitMiddle)
  rgt.attachArea(suitMiddle)
}
const suit11 = (_lft: Canvasarea) => {
  // _lft.attachArea(suitValue)
}

const DRAWS = [
  suit1, //  ---
  suit1, //  1
  suit2, //  2
  suit3, //  3
  suit4, //  4
  suit5, //  5
  suit6, //  6
  suit7, //  7
  suit8, //  8
  suit9, //  9
  suit10, //10 a
  suit11, //11 b
  suit11, //12 c
  suit11 // 13 d
]

export function createCards({
  width = 100,
  height = width * 1.4,
  bgColor = '#fff',
  borderColor = '#000',
  rhColor = '#f00', // ♥
  rnColor = '#f80', // ♦
  bhColor = '#000', // ♠
  bnColor = '#080' //  ♣
}: {
  width?: number
  height?: number
  bgColor?: string | CanvasGradient | CanvasPattern
  borderColor?: string | CanvasGradient | CanvasPattern
  rhColor?: string | CanvasGradient | CanvasPattern | null
  bhColor?: string | CanvasGradient | CanvasPattern | null
  rnColor?: string | CanvasGradient | CanvasPattern | null
  bnColor?: string | CanvasGradient | CanvasPattern | null
} = {}) {
  const res = {} as { [key: string]: string }
  // rhColor = null
  // rnColor = null
  // bhColor = null
  // bnColor = null
  const COLORS = [
    [bnColor, bhColor],
    [rnColor, rhColor]
  ] as const

  BG_COLOR = bgColor
  BORDER_COLOR = borderColor
  canvas.width = WIDTH = width
  canvas.height = HEIGHT = height

  PLACE_SUITS_SCALE = (WIDTH + HEIGHT) / 375

  // let jjj = 0
  for (let color = 2 as 0 | 1; color-- > 0; ) {
    for (let heart = 2 as 0 | 1; heart-- > 0; ) {
      if ((CARD_COLOR = COLORS[color][heart]) == null) continue
      CARD_SUIT = SUITS[`s_${color as 1}_${heart as 1}`]
      for (let value = 14; value-- > 1; ) {
        // if (++jjj > 6) continue
        CARD_VALUE = VALUES[`v_${value as 1}`]
        lft.detachAllAreas()
        rgt.detachAllAreas()

        area_1_clear_and_draw_border.render(ctx)
        area_2_draw_value.render(ctx)
        DRAWS[value](lft, rgt)
        lft.render(ctx)
        rgt.render(ctx)

        // const key = `c${color}${heart}${value > 9 ? '' : '0'}${value}`
        const key = `${color ? 'r' : 'b'}${heart ? 'h' : 'n'}${value.toString(16)}`
        res[key] = canvas.toDataURL()
      }
    }
  }

  return res
}
