import {
  canvasarea,
  type CanvasareaRenderingContext2D,
  Canvasarea,
} from '@wareset-tools/canvasarea'

const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')!
// document.body.appendChild(canvas)

import * as suits from './__core__/gen/svg/d_suits'
const SUITS = {} as Readonly<{ [K in keyof typeof suits]: Path2D }>
for (const k in suits) (SUITS as any)[k] = new Path2D((suits as any)[k])

import * as ranks_bold from './__core__/gen/svg/d_values'
export const RANKS_BOLD = {} as Readonly<{ [K in keyof typeof ranks_bold]: Path2D }>
for (const k in ranks_bold) (RANKS_BOLD as any)[k] = new Path2D((ranks_bold as any)[k])

import * as ranks_thin from './__core__/gen/svg/d_values_v2'
export const RANKS_THIN = {} as Readonly<{ [K in keyof typeof ranks_thin]: Path2D }>
for (const k in ranks_thin) (RANKS_THIN as any)[k] = new Path2D((ranks_thin as any)[k])

const SUITS_NORMALIZED = {
  rh: SUITS.s_1_1,
  rn: SUITS.s_1_0,
  bh: SUITS.s_0_1,
  bn: SUITS.s_0_0,
} as const
export { SUITS_NORMALIZED as SUITS }

export const RANKS_TYPES = {
  thin: RANKS_THIN,
  bold: RANKS_BOLD,
} as const

function roundRectPath(
  w: number,
  h: number,
  tlr: number,
  trr: number,
  brr: number,
  blr: number
) {
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

let RANKS: typeof RANKS_BOLD

let WIDTH: number
let HEIGHT: number
let SUIT_PATH: Path2D
let RANK_PATH: Path2D

let BORDER_RADIUS: number
let BORDER_COLOR: string | CanvasGradient | CanvasPattern

let SUIT_COLOR: string | CanvasGradient | CanvasPattern | null
let FRONT_COLOR: string | CanvasGradient | CanvasPattern
let SHIRT_COLOR: string | CanvasGradient | CanvasPattern | null

let OUSIDE_ROUND_RECT: Path2D | null
let INSIDE_ROUND_RECT: Path2D | null

const noop = () => {}

const lft = canvasarea(noop)
const rgt = canvasarea((ctx: CanvasareaRenderingContext2D) => {
  // ctx.areaScale(WIDTH / 100, HEIGHT / 140)
  ctx.areaShift(WIDTH, HEIGHT)
  ctx.areaAngle(180)
})

//
// AREA BORDER
//
const area_0_clear = canvasarea((ctx) => {
  ctx.clearRect(0, 0, WIDTH, HEIGHT)
})
const area_1_draw_borders_or_shirt = canvasarea((ctx) => {
  let brad = BORDER_RADIUS
  const rx = WIDTH / 33
  const lw = (ctx.lineWidth = (WIDTH + HEIGHT) / 300) / ctx.GLOBAL_SCALE_MEAN

  ctx.strokeStyle = BORDER_COLOR

  OUSIDE_ROUND_RECT ||
    (OUSIDE_ROUND_RECT = new Path2D(
      roundRectPath(WIDTH - lw, HEIGHT - lw, brad, brad, brad, brad)
    ))
  ctx.areaShift(lw / 2, lw / 2)
  if (SHIRT_COLOR) {
    ctx.fillStyle = SHIRT_COLOR
    ctx.fill(OUSIDE_ROUND_RECT)

    if (SHIRT_COLOR !== FRONT_COLOR) {
      // TODO
    }
  }
  ctx.stroke(OUSIDE_ROUND_RECT)

  INSIDE_ROUND_RECT ||
    ((brad /= WIDTH / (WIDTH - rx * 2)),
    (INSIDE_ROUND_RECT = new Path2D(
      roundRectPath(WIDTH - rx * 2, HEIGHT - rx * 2, brad, brad, brad, brad)
    )))
  ctx.areaShift(rx, rx)
  ctx.stroke(INSIDE_ROUND_RECT)
})

//
// AREA VALUE AND SUIT
//
const area_2_draw_rank = (() => {
  const _move = (ctx: CanvasareaRenderingContext2D) => {
    const w2 = WIDTH / 2
    const h2 = HEIGHT / 2
    ctx.areaPivot(w2, h2)
    ctx.areaShift(w2, h2)
  }
  const _fill = (ctx: CanvasareaRenderingContext2D) => {
    ctx.areaPivot(16, 16)
    const wh = WIDTH + HEIGHT

    const sc = wh / 350
    const rx = WIDTH / 33 + 16 * sc
    ctx.areaShift(rx, rx)
    ctx.areaScale(sc)
    ctx.lineWidth = (WIDTH + HEIGHT) / 100 / ctx.GLOBAL_SCALE_MEAN
    ctx.stroke(RANK_PATH)
    ctx.fill(RANK_PATH)

    const sc2 = wh / 500
    const coef = 0 // (sc - sc2) * 12
    ctx.areaShift(WIDTH - rx + coef, rx - coef)
    ctx.areaScale(sc2)
    ctx.lineWidth = (WIDTH + HEIGHT) / 100 / ctx.GLOBAL_SCALE_MEAN
    ctx.stroke(SUIT_PATH)
    ctx.fill(SUIT_PATH)
  }
  const root = canvasarea((ctx) => {
    ctx.fillStyle = SUIT_COLOR!
    ctx.strokeStyle = FRONT_COLOR
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
  ctx.fillStyle = SUIT_COLOR!
  ctx.fill(isValue ? RANK_PATH : SUIT_PATH)
}

const suitOne = canvasarea((ctx: CanvasareaRenderingContext2D) => {
  ctx.areaScale(PLACE_SUITS_SCALE * 2)
  ctx.areaShift(WIDTH / 2, HEIGHT / 2)
  fill(ctx)
})
const suitValue = canvasarea((ctx: CanvasareaRenderingContext2D) => {
  ctx.areaScale(PLACE_SUITS_SCALE * 2)
  ctx.areaShift(WIDTH / 2, HEIGHT / 2)
  fill(ctx, true)
})

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
  _lft.attachArea(suitValue)
}

const DRAWS = [
  noop, //  --
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
  suit11, //13 d
]

export type ICardsFactoryOptions = {
  width?: number
  height?: number
  borderColor?: string | CanvasGradient | CanvasPattern
  borderRadius?: number
  rhColor?: string | CanvasGradient | CanvasPattern | null
  bhColor?: string | CanvasGradient | CanvasPattern | null
  rnColor?: string | CanvasGradient | CanvasPattern | null
  bnColor?: string | CanvasGradient | CanvasPattern | null
  frontColor?: string | CanvasGradient | CanvasPattern
  shirtColor?: string | CanvasGradient | CanvasPattern | null
  fontWeight?: keyof typeof RANKS_TYPES
}

export default function cardsFactory({
  width = 100,
  height = width * 1.4,
  borderColor = '#000',
  borderRadius = (width + height) / 66,
  rhColor = '#f00', // ♥
  rnColor = '#f80', // ♦
  bhColor = '#000', // ♠
  bnColor = '#080', //  ♣
  frontColor = '#fff',
  shirtColor = '#08f',
  fontWeight = 'bold',
}: ICardsFactoryOptions = {}) {
  const basic = {} as any
  const chars = {} as any
  const other = {} as any
  // const jokers = {} as any
  // rhColor = null
  // rnColor = null
  // bhColor = null
  // bnColor = null
  const COLORS = [
    [bnColor, bhColor],
    [rnColor, rhColor],
  ] as const

  RANKS = RANKS_TYPES[fontWeight] || RANKS_BOLD

  FRONT_COLOR = frontColor
  BORDER_COLOR = borderColor
  BORDER_RADIUS = borderRadius
  canvas.width = WIDTH = width
  canvas.height = HEIGHT = height

  PLACE_SUITS_SCALE = (WIDTH + HEIGHT) / 350

  SHIRT_COLOR = null
  OUSIDE_ROUND_RECT = null
  INSIDE_ROUND_RECT = null

  // let jjj = 0
  for (let color = 2 as 0 | 1; color-- > 0; ) {
    for (let heart = 2 as 0 | 1; heart-- > 0; ) {
      if (!(SUIT_COLOR = COLORS[color][heart])) continue
      SUIT_PATH = SUITS[`s_${color as 1}_${heart as 1}`]
      for (let rank = 14; rank-- > 1; ) {
        // if (++jjj > 6) continue
        RANK_PATH = RANKS[`v_${rank as 1}`]
        lft.detachAllAreas()
        rgt.detachAllAreas()

        area_0_clear.render(ctx)
        area_2_draw_rank.render(ctx)
        if (rank < 11) DRAWS[rank](lft, rgt)
        lft.render(ctx)
        rgt.render(ctx)
        area_1_draw_borders_or_shirt.render(ctx)

        const key = `${color ? 'r' : 'b'}${heart ? 'h' : 'n'}${rank.toString(16)}`
        basic[key] = canvas.toDataURL()

        if (rank > 10) {
          lft.detachAllAreas()
          rgt.detachAllAreas()

          area_0_clear.render(ctx)
          DRAWS[rank](lft, rgt)
          lft.render(ctx)
          rgt.render(ctx)

          chars[key] = canvas.toDataURL()
        }
      }
    }
  }

  if ((SHIRT_COLOR = frontColor)) {
    area_0_clear.render(ctx)
    area_1_draw_borders_or_shirt.render(ctx)
    other['front'] = canvas.toDataURL()
  }

  if ((SHIRT_COLOR = shirtColor)) {
    area_0_clear.render(ctx)
    area_1_draw_borders_or_shirt.render(ctx)
    other['shirt'] = canvas.toDataURL()
  }

  return { basic, chars, other } as {
    basic: Readonly<{
      [key in `${'r' | 'b'}${'h' | 'n'}${
        | '1'
        | '2'
        | '3'
        | '4'
        | '5'
        | '6'
        | '7'
        | '8'
        | '9'
        | 'a'
        | 'b'
        | 'c'
        | 'd'}`]?: string
    }>

    chars: Readonly<{
      [key in `${'r' | 'b'}${'h' | 'n'}${'b' | 'c' | 'd'}`]?: string
    }>

    other: Readonly<{
      [key in `${'shirt' | 'front'}`]?: string
    }>
  }
}

// function drawRoundedRect(ctx: any, x: number, y: number, w: number, h: number, cr: number) {
  // ctx.beginPath();
  // ctx.moveTo(x + w / 2, y);
  // // Начинаем в середине верхней
  // // стороны.
  // ctx.arcTo(x + w, y, x + w, y + h, cr); // Верхняя сторона и верхний
  // // правый угол.
  // ctx.arcTo(x + w, y + h, x, y + h, cr); // Правая сторона и нижний
  // // правый угол.
  // ctx.arcTo(x, y + h, x, y, cr);
  // // Нижняя сторона и нижний
  // // левый угол.
  // ctx.arcTo(x, y, x + w, y, cr);
  // // Левая сторона и верхний
  // // левый угол.
  // ctx.closePath();
  // ctx.strokeStyle = '#f00';
  // // Задаем для обводки
  // // ярко-красный цвет.
  // ctx.lineWidth = 4;
  // // Задаем ширину линии равной
  // // 4 пикселам.
  // ctx.stroke();
  // ctx.fillStyle = '#0f0';
  // // Здесь указываем зеленый цвет
  // // заливки.
  // ctx.fill();
// }
