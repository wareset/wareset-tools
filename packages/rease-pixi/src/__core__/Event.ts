import { Rease, type IMaybeSubscribable } from 'rease'

import { Scene as PixiScene } from './Scene'

import { type EventMode } from 'pixi.js'

function move(iam: PixiEvent) {
  const parent = iam.findParent(PixiScene)
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

function _watchMode(this: PixiEvent, mode?: EventMode) {
  if ((this._mode = mode) && this.PixiScene) this.PixiScene.pixi.eventMode = mode
}
function _watch(
  this: PixiEvent,
  [types, handler, once, ctx]: [string | string[], (...a: any) => any, boolean?, any?]
) {
  _off(this)
  this._once = once
  this._type = Array.isArray(types) ? types.slice() : [types]
  this._handler = handler
  this._context = ctx === void 0 ? this : ctx
  _on(this)
}

class PixiEvent<CTX = any> extends Rease {
  PixiScene?: PixiScene
  constructor({
    $mode$,
    $once$,
    $type$,
    $handler$,
    $context$,
  }: {
    $mode$?: IMaybeSubscribable<EventMode>
    $once$?: IMaybeSubscribable<boolean>
    $type$: IMaybeSubscribable<string | string[]>
    $handler$: IMaybeSubscribable<(this: CTX, ...a: any) => any | null>
    $context$?: CTX
  }) {
    super()
    this.onMove(this.hookMove, this), move(this)
    $mode$ && this.watch($mode$, _watchMode, this)
    this.watchAll([$type$, $handler$, $once$, $context$], _watch, this)
    this.onDestroy(this.hookDestroy)
  }

  _mode?: EventMode
  _once?: boolean
  _type?: string[]
  _handler?: (...a: any) => any
  _context?: any

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
    _off(iam)
  }
}

export { PixiEvent as Event }
