// import { autoDetectRenderer, type AutoDetectOptions, type Renderer } from 'pixi.js'

// import { createElement, RElement } from 'rease'

// import { __PixiRease__ } from './__PixiRease__'

// //
// // Renderer
// //
// function _PixiRendererAwait(this: PixiRenderer, renderer: Renderer) {
//   this.onDestroy(() => renderer.destroy())
//   if (this.active) {
//     const node = renderer.canvas
//     const nodeStyle = node.style
//     nodeStyle.width = nodeStyle.height = '100%'
//     this.insert(createElement(RElement, { node, children: this._children }))
//   }
// }
// export class PixiRenderer extends __PixiRease__ {
//   _children: any
//   constructor({ options, children }: { options: Partial<AutoDetectOptions>; children?: any }) {
//     super()
//     this._children = children
//     this.await(autoDetectRenderer(options), _PixiRendererAwait, this)
//   }
// }

import { Rease, requestAnimationFrame } from 'rease'

import { type Renderer, type Container } from 'pixi.js'

import { createElement, RElement, listen } from 'rease'

import { type Scene as PixiScene } from './Scene'

import { type PropsRenderer, parse_pixi_props } from './utils'

// const _perf = typeof performance === 'object' ? performance : Date
// const startTime = _perf.now()

function _PixiRendererAwait(
  this: { iam: PixiRenderer; props: PropsRenderer },
  renderer: Renderer
) {
  const { iam, props } = this
  iam.pixi = renderer
  iam.pixi._rease = iam
  iam.onDestroy(() => ((iam.pixi = void 0), renderer.destroy()))

  if (!iam.destroyed) {
    const canvas = renderer.canvas
    const canvasStyle = canvas.style
    canvasStyle.width = canvasStyle.height = '100%'

    let updateAllow = false
    let needResize = true
    const render = (t: number) => {
      updateAllow = true
      if (iam._renderOptions) {
        if (needResize) {
          needResize = false
          renderer.resize(canvas.clientWidth, canvas.clientHeight)
          iam.emitDeep('pixi-resize')
        }
        iam.emitDeep('pixi-render', t)
        renderer.render(iam._renderOptions)
      }
    }
    iam.update = () => {
      updateAllow && ((updateAllow = false), requestAnimationFrame(render))
    }

    const ReaseCanvas = iam.insert(createElement(RElement, { this: canvas }))[0]

    let resizeCancel: any
    const resize = () => {
      needResize = true
      iam.update()
    }

    iam.onDestroy(
      listen(canvas, 'resize', () => {
        if (resizeCancel != null) clearTimeout(resizeCancel)
        resizeCancel = setTimeout(resize, 17)
        // resize()
      })
    )

    parse_pixi_props(iam, props)

    ReaseCanvas.insert(props.children)

    updateAllow = true
    iam.update()
  }
}

class PixiRenderer<Pixi extends Renderer = Renderer> extends Rease {
  pixi?: Pixi & { _rease?: PixiRenderer<Pixi> }
  PixiScene?: PixiScene
  _renderOptions?: { container: Container }
  constructor(props: PropsRenderer) {
    super()
    this.await(props.autoDetectRenderer(props.options || {}), _PixiRendererAwait, {
      iam: this,
      props,
    })
  }

  update() {}
}

export { PixiRenderer as Renderer }
