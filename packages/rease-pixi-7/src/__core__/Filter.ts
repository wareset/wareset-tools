import { Rease } from 'rease'

import { IProps } from './types'

import { __Scene__ } from './Scene'

import { parse_props_before_insert, parse_props_after_insert } from './utils'

class __PixiFilter__ extends Rease {
  readonly pixi: PIXI.Filter
  PixiScene?: __Scene__ | undefined
  constructor(props: IProps<any>, pixi: PIXI.Filter) {
    super()
    this.pixi = pixi
    // this.pixi._rease = this
    this.onMove(this.hookMove, this), move(this)
    parse_props_before_insert(this, props)
    this.insert(props.children)
    parse_props_after_insert(this, props)
    this.onDestroy(this.hookDestroy)
  }

  update() {
    this.PixiScene && this.PixiScene.update()
  }

  protected hookMove(rease: Rease, _from: Rease | null, _to: Rease | null) {
    if (rease && rease !== this) {
      for (let parent = this as Rease; (parent = parent.parent!); ) {
        if (parent === this.PixiScene) return
        if (parent === rease || parent instanceof __Scene__) break
      }
    }

    move(this)
  }

  protected hookDestroy(iam: this) {
    removePixiScene(iam)
    iam.pixi.destroy()
  }
}
export { __PixiFilter__ as __Filter__ }

function removePixiScene(iam: __PixiFilter__) {
  const PixiScene = iam.PixiScene
  if (PixiScene) {
    const scene = PixiScene.pixi
    const filters = scene.filters
    if (filters) {
      const filter = iam.pixi
      if (filters === (filter as any)) scene.filters = []
      else if (Array.isArray(filters)) {
        scene.filters = filters.filter(function (this: PIXI.Filter, v) {
          return this !== v
        }, filter)
      }
      iam.update()
    }
    iam.PixiScene = void 0
  }
}
function move(iam: __PixiFilter__) {
  removePixiScene(iam)
  const { parent, next } = iam.findParentOrNext(__Scene__, __PixiFilter__)
  const filter = iam.pixi
  const filterNext = next && next.pixi
  const scene = parent && parent.pixi
  if (scene) {
    let idx: number
    let filters = scene.filters as PIXI.Filter[]
    filters = Array.isArray(filters) ? filters.slice() : filters ? [filters] : []
    filterNext && (idx = filters.indexOf(filterNext)) > -1
      ? filters.splice(idx, 0, filter)
      : filters.push(filter)
    scene.filters = filters
    iam.PixiScene = parent
    iam.update()
  }
}

type Dict<T> = {
  [key: string]: T
}
class PixiFilter extends __PixiFilter__ {
  declare readonly pixi: PIXI.Filter
  constructor(
    props: IProps<PixiFilter> & {
      options?: {
        vertexSrc?: string
        fragmentSrc?: string
        uniforms?: Dict<any>
      }
    }
  ) {
    const op = props.options || {}
    super(props, new PIXI.Filter(op.vertexSrc, op.fragmentSrc, op.uniforms))
  }
}
export { PixiFilter as Filter }

class PixiFilterAlpha extends __PixiFilter__ {
  declare readonly pixi: PIXI.AlphaFilter
  constructor(
    props: IProps<PixiFilterAlpha> & {
      options?: {
        alpha?: number
      }
    }
  ) {
    const op = props.options || {}
    super(props, new PIXI.AlphaFilter(op.alpha))
  }
}
export { PixiFilterAlpha as FilterAlpha }

class PixiFilterBlur extends __PixiFilter__ {
  declare readonly pixi: PIXI.BlurFilter
  constructor(
    props: IProps<PixiFilterBlur> & {
      options?: {
        strength?: number
        quality?: number
        resolution?: number
        kernelSize?: number
      }
    }
  ) {
    const op = props.options || {}
    super(props, new PIXI.BlurFilter(op.strength, op.quality, op.resolution, op.kernelSize))
  }
}
export { PixiFilterBlur as FilterBlur }

class PixiFilterColorMatrix extends __PixiFilter__ {
  declare readonly pixi: PIXI.ColorMatrixFilter
  constructor(props: IProps<PixiFilterColorMatrix>) {
    super(props, new PIXI.ColorMatrixFilter())
  }
}
export { PixiFilterColorMatrix as FilterColorMatrix }

class PixiFilterDisplacement extends __PixiFilter__ {
  declare readonly pixi: PIXI.DisplacementFilter
  constructor(
    props: IProps<PixiFilterDisplacement> & {
      options: {
        sprite: PIXI.ISpriteMaskTarget
        scale?: number
      }
    }
  ) {
    const op = props.options
    super(props, new PIXI.DisplacementFilter(op.sprite, op.scale))
  }
}
export { PixiFilterDisplacement as FilterDisplacement }

class PixiFilterFXAA extends __PixiFilter__ {
  declare readonly pixi: PIXI.FXAAFilter
  constructor(props: IProps<PixiFilterFXAA>) {
    super(props, new PIXI.FXAAFilter())
  }
}
export { PixiFilterFXAA as FilterFXAA }

class PixiFilterNoise extends __PixiFilter__ {
  declare readonly pixi: PIXI.NoiseFilter
  constructor(
    props: IProps<PixiFilterNoise> & {
      options?: {
        noise?: number
        seed?: number
      }
    }
  ) {
    const op = props.options || {}
    super(props, new PIXI.NoiseFilter(op.noise, op.seed))
  }
}
export { PixiFilterNoise as FilterNoise }
