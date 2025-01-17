import { Rease, type IMaybeSubscribable } from 'rease'

import { __Scene__ } from './Scene'

function move(iam: PixiEvent) {
  const parent = iam.findParent(__Scene__)
  _off(iam)
  iam.PixiScene = parent
  _watchMode.call(iam, iam._mode)
  _on(iam)
}

function _off(iam: PixiEvent) {
  const events = iam._type
  const handler = iam._handler
  const pixiParent = iam.PixiScene
  if (pixiParent && events && handler)
    for (let pixi = pixiParent.pixi, i = events.length; i-- > 0; )
      pixi.off(events[i], handler, iam)
}
function _on(iam: PixiEvent) {
  const events = iam._type
  const handler = iam._handler
  const pixiParent = iam.PixiScene
  if (pixiParent && events && handler)
    for (let pixi = pixiParent.pixi, i = events.length; i-- > 0; )
      pixi[iam._once ? 'once' : 'on'](events[i], handler, iam._context)
}

function _watchMode(this: PixiEvent, mode?: PIXI.EventMode) {
  if ((this._mode = mode) && this.PixiScene) this.PixiScene.pixi.eventMode = mode
}
function _watch(
  this: PixiEvent,
  [types, handler, once, ctx]: [string | string[], any, any, any]
) {
  _off(this)
  this._once = once
  this._type = Array.isArray(types) ? types.slice() : [types]
  this._handler = handler
  this._context = ctx === void 0 ? this : ctx
  _on(this)
}

class PixiEvent<CTX = any> extends Rease {
  PixiScene?: __Scene__
  constructor({
    $mode$,
    $once$,
    $type$,
    $handler$,
    $context$,
  }: {
    $mode$?: IMaybeSubscribable<PIXI.EventMode>
    $once$?: IMaybeSubscribable<boolean>
    $type$: IMaybeSubscribable<string | string[]>
    $handler$: IMaybeSubscribable<((this: CTX, ...a: any) => any) | null>
    $context$?: CTX
  }) {
    super()
    this.onMove(this.hookMove, this), move(this)
    $mode$ && this.watch($mode$, _watchMode, this)
    this.watchAll([$type$, $handler$, $once$, $context$], _watch, this)
    this.onDestroy(this.hookDestroy)
  }

  _mode?: PIXI.EventMode | undefined
  _once?: boolean | undefined
  _type?: string[] | undefined
  _handler?: ((...a: any) => any) | undefined
  _context?: any

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
    _off(iam)
  }
}

export { PixiEvent as Event }
