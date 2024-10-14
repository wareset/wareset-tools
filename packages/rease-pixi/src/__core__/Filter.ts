import { Rease } from 'rease'

import { Scene as PixiScene } from './Scene'

import { type Filter } from 'pixi.js'

import type {
  // AlphaFilter,
  AlphaFilter,
  AlphaFilterOptions,
  // BlurFilter,
  BlurFilter,
  BlurFilterOptions,
  // BlurFilterPass,
  BlurFilterPass,
  BlurFilterPassOptions,
  // // ColorBurnBlend,
  // ColorBurnBlend,
  // // ColorDodgeBlend,
  // ColorDodgeBlend,
  // ColorMatrixFilter,
  ColorMatrixFilter,
  FilterOptions,
  // // DarkenBlend,
  // DarkenBlend,
  // DisplacementFilter,
  DisplacementFilter,
  Sprite,
  DisplacementFilterOptions,
  // // DivideBlend,
  // DivideBlend,
  // // HardMixBlend,
  // HardMixBlend,
  // // LinearBurnBlend,
  // LinearBurnBlend,
  // // LinearDodgeBlend,
  // LinearDodgeBlend,
  // // LinearLightBlend,
  // LinearLightBlend,
  NoiseFilter,
  NoiseFilterOptions,
  // // PinLightBlend,
  // PinLightBlend,
  // // SubtractBlend
  // SubtractBlend
} from 'pixi.js'

import { type PropsFilter, parse_pixi_props } from './utils'

function removePixiScene(iam: PixiFilter) {
  const PixiScene = iam.PixiScene
  if (PixiScene) {
    const scene = PixiScene.pixi
    const filters = scene.filters
    if (filters) {
      const filter = iam.pixi
      if (filters === filter) scene.filters = []
      else if (Array.isArray(filters)) {
        scene.filters = filters.filter(function (this: Filter, v) {
          return this !== v
        }, filter)
      }
      iam.update()
    }
    iam.PixiScene = void 0
  }
}

function move(iam: PixiFilter) {
  removePixiScene(iam)
  const { parent, next } = iam.findParentOrNext(PixiScene, PixiFilter)
  const filter = iam.pixi
  const filterNext = next && next.pixi
  const scene = parent && parent.pixi
  if (scene) {
    let idx: number
    let filters = scene.filters as Filter[]
    filters = Array.isArray(filters) ? filters.slice() : filters ? [filters] : []
    filterNext && (idx = filters.indexOf(filterNext)) > -1
      ? filters.splice(idx, 0, filter)
      : filters.push(filter)
    scene.filters = filters
    iam.PixiScene = parent
    iam.update()
  }
}

class PixiFilter<Pixi extends Filter = Filter> extends Rease {
  readonly pixi: Pixi & { _rease?: PixiFilter<Pixi> }
  PixiScene?: PixiScene

  constructor(props: PropsFilter<AlphaFilter> & { options?: AlphaFilterOptions })
  constructor(props: PropsFilter<BlurFilter> & { options?: BlurFilterOptions })
  constructor(props: PropsFilter<BlurFilterPass> & { options: BlurFilterPassOptions })
  // constructor(props: PropsFilter<ColorBurnBlend>)
  // constructor(props: PropsFilter<ColorDodgeBlend>)
  constructor(props: PropsFilter<ColorMatrixFilter> & { options?: FilterOptions })
  // constructor(props: PropsFilter<DarkenBlend>)
  constructor(
    props: PropsFilter<DisplacementFilter> & { options?: Sprite | DisplacementFilterOptions }
  )
  // constructor(props: PropsFilter<DivideBlend>)
  // constructor(props: PropsFilter<HardMixBlend>)
  // constructor(props: PropsFilter<LinearBurnBlend>)
  // constructor(props: PropsFilter<LinearDodgeBlend>)
  // constructor(props: PropsFilter<LinearLightBlend>)
  constructor(props: PropsFilter<NoiseFilter> & { options?: NoiseFilterOptions })
  // constructor(props: PropsFilter<PinLightBlend>)
  // constructor(props: PropsFilter<SubtractBlend>)
  constructor(props: PropsFilter<Pixi> & { options?: any }) {
    super()
    this.pixi = new props.pixi(props.options)
    this.pixi._rease = this
    this.onMove(this.hookMove, this), move(this)
    parse_pixi_props(this, props)
    this.onDestroy(this.hookDestroy)
  }

  update() {
    this.PixiScene && this.PixiScene.update()
  }

  hookMove(rease: Rease, _from: Rease | null, _to: Rease | null) {
    if (rease && rease !== this) {
      for (let parent = this as Rease; (parent = parent.parent!); ) {
        if (parent === this.PixiScene) return
        if (parent === rease || parent instanceof PixiScene) break
      }
    }

    move(this)
  }

  hookDestroy(iam: this) {
    removePixiScene(iam)
    iam.pixi.destroy()
  }
}

export { PixiFilter as Filter }
