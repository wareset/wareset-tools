import { createElement, Rease, RElement, listen, requestAnimationFrame } from 'rease'

import { IProps } from './types'

import type { __Scene__ } from './Scene'

import { parse_props_before_insert, parse_props_after_insert } from './utils'

class PixiRenderer extends Rease {
  readonly pixi: PIXI.IRenderer<HTMLCanvasElement>
  PixiScene?: __Scene__ | undefined
  constructor(
    props: IProps<PixiRenderer> & {
      options?: Partial<PIXI.IRendererOptionsAuto>
    }
  ) {
    super()
    const pixi = (this.pixi = PIXI.autoDetectRenderer(props.options))

    const canvas = pixi.view
    const canvasStyle = canvas.style
    canvasStyle.width = canvasStyle.height = '100%'

    let needResize = true
    let updateAllow = false
    const render = (t: number) => {
      updateAllow = true
      if (this.PixiScene) {
        if (needResize) {
          needResize = false
          pixi.resize(canvas.clientWidth, canvas.clientHeight)
          this.emitDeep('pixi-resize')
        }
        this.emitDeep('pixi-render', t)
        pixi.render(this.PixiScene.pixi)
      }
    }
    this.update = () => {
      updateAllow && ((updateAllow = false), requestAnimationFrame(render))
    }

    const reaseCanvas = this.insert(createElement(RElement, { this: canvas }))[0]

    this.onDestroy(
      listen(canvas, 'resize', () => {
        needResize = true
        this.update()
      })
    )

    parse_props_before_insert(this, props)
    reaseCanvas.insert(props.children)
    parse_props_after_insert(this, props)
    updateAllow = true
    this.update()
  }

  update: () => void
}
export { PixiRenderer as Renderer }
