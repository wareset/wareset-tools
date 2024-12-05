import {
  autoDetectRenderer as PIXI_autoDetectRenderer,
  type IRenderer as PIXI_IRenderer,
  type IRendererOptionsAuto as PIXI_IRendererOptionsAuto
} from './__pixi__'

import { h, RElement, listen } from 'rease'

import type { IPropsWithOptionalOptions } from './utils'
import { __PixiRease__ } from './__PixiRease__'
import { PixiContainer } from './DisplayObject'
import { watch_props, run_oncreate_and_onrender, watch_on_signal } from './utils'

import { requestAnimationFrame } from 'tweenity'

function _move(this: PixiRenderer) {
  this.PixiRenderer = this
}
function _destroy(iam: PixiRenderer) {
  iam.pixi.destroy()
}

export class PixiRenderer extends __PixiRease__ {
  readonly pixi: PIXI_IRenderer<HTMLCanvasElement>
  readonly PixiStage: PixiContainer
  private readonly _render: (t: number) => void
  constructor({
    onCreate,
    onRender,
    $onSignal$,
    children,
    options,
    $props$,
    pixi
  }: IPropsWithOptionalOptions<
    PixiRenderer,
    PIXI_IRenderer<HTMLCanvasElement>,
    Partial<PIXI_IRendererOptionsAuto>
  >) {
    super()
    this.pixi = pixi || (pixi = PIXI_autoDetectRenderer(options))
    this._render = (t: number) => {
      this._allowUpdate = true
      this.emitDeep('render', t)
      this.pixi.render(this.PixiStage.pixi)
    }
    this._allowUpdate = true

    watch_props(this, $props$)
    _move.call(this)
    this.onMove(_move, this)

    const view_style = pixi.view.style
    view_style.width = view_style.height = '100%'
    this.insert(h(RElement, { this: pixi.view }, h(PixiContainer, null)))
    this.PixiStage = this.children[0].children[0] as any

    this.onDestroy(
      listen(pixi.view, 'resize', () => {
        pixi!.resize(pixi!.view.clientWidth, pixi!.view.clientHeight)
        // this._allowUpdate ? this._render(1) : this.update()
        this.update()
      })
    )
    run_oncreate_and_onrender(this, onCreate, onRender)
    this.PixiStage.insert(children)
    watch_on_signal(this, $onSignal$)
    this.onDestroy(_destroy)
    this.update()
  }

  private _allowUpdate: boolean
  override update() {
    this._allowUpdate && ((this._allowUpdate = false), requestAnimationFrame(this._render))
  }
}
