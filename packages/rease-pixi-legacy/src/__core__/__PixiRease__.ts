import { Rease } from 'rease'

import { type PixiRenderer } from './Renderer'

function _move(iam: __PixiRease__) {
  iam.update()
  const parent = iam.findParent(__PixiRease__)
  iam.PixiRenderer = parent && parent.PixiRenderer
}
function _destroy(iam: __PixiRease__) {
  iam.update()
  iam.PixiRenderer = null
}

export class __PixiRease__ extends Rease {
  PixiRenderer: PixiRenderer | null | undefined
  constructor() {
    super()
    _move(this)
    this.onMove(_move)
    this.onDestroy(_destroy)
  }

  public update() {
    if (this.PixiRenderer) this.PixiRenderer.update()
  }
}
