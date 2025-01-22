import { createElement, Rease, RElement, listen, requestAnimationFrame } from 'rease'

import { IProps } from './types'

import type { __Scene__ } from './Scene'

import { parse_props_before_insert, parse_props_after_insert } from './utils'

import { EMIT_NAME_RESIZE, EMIT_NAME_RENDER } from './const'

class PixiRenderer extends Rease {
  readonly pixi: PIXI.IRenderer<HTMLCanvasElement>
  PixiScene?: __Scene__ | undefined
  constructor(
    props: IProps<PixiRenderer> & {
      options?: Partial<PIXI.IRendererOptionsAuto>
    }
  ) {
    super()
    const iam = this
    const pixi = (this.pixi = PIXI.autoDetectRenderer(props.options))

    const canvas = pixi.view
    const canvasStyle = canvas.style
    canvasStyle.width = canvasStyle.height = '100%'

    let needResize = true
    let updateAllow = false
    const render = (t: number) => {
      updateAllow = true
      if (iam.PixiScene) {
        if (needResize) {
          needResize = false
          pixi.resize(canvas.clientWidth, canvas.clientHeight)
          iam.emitDeep(EMIT_NAME_RESIZE)
        }
        iam.emitDeep(EMIT_NAME_RENDER, t)
        pixi.render(iam.PixiScene.pixi)
      }
    }

    const reaseCanvas = iam.insert(createElement(RElement, { this: canvas }))[0]

    this.update = () => {
      updateAllow && ((updateAllow = false), requestAnimationFrame(render))
    }

    iam.onDestroy(
      listen(canvas, 'resize', () => {
        needResize = true
        iam.update()
      })
    )

    parse_props_before_insert(iam, props)
    reaseCanvas.insert(props.children)
    parse_props_after_insert(iam, props)
    iam.onDestroy(iam.hookDestroy)
    updateAllow = true
    iam.update()
  }

  update: () => void

  protected hookDestroy(iam: this) {
    iam.update = () => {}
    iam.pixi.destroy()
  }
}
export { PixiRenderer as Renderer }
