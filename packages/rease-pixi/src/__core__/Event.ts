import { Rease, type IMaybeSubscribable } from 'rease'

import { Scene as PixiScene } from './Scene'

import { type EventMode } from 'pixi.js'

class PixiEvent extends Rease {
  PixiScene?: PixiScene
  constructor({
    $mode$,
    $once$,
    $type$,
    $handler$
  }: {
    $mode$?: IMaybeSubscribable<EventMode>
    $once$?: IMaybeSubscribable<boolean>
    $type$: IMaybeSubscribable<string | string[]>
    $handler$: IMaybeSubscribable<(this: PixiScene, ...a: any) => any | null>
  }) {
    super()
    this.onMove(this._move, this), this._move()
    $mode$ && this.watch($mode$, this._watchMode, this)
    this.watchAll([$type$, $handler$, $once$], this._watch, this)
    this.onDestroy(this._destroy, this)
  }

  private _mode?: EventMode
  private _once?: boolean
  private _type?: string[]
  private _handler?: (...a: any) => any

  _watchMode(mode?: EventMode) {
    if ((this._mode = mode) && this.PixiScene) this.PixiScene.pixi.eventMode = mode
  }

  _watch([types, handler, once]: [string | string[], (...a: any) => any, boolean?]) {
    this._off()
    this._once = once
    this._type = Array.isArray(types) ? types.slice() : [types]
    this._handler = handler
    this._on()
  }

  _off() {
    const events = this._type
    const handler = this._handler
    const pixiParent = this.PixiScene
    if (pixiParent && events && handler)
      for (let pixi = pixiParent.pixi, i = events.length; i-- > 0; )
        pixi.off(events[i], handler, this)
  }
  _on() {
    const events = this._type
    const handler = this._handler
    const pixiParent = this.PixiScene
    if (pixiParent && events && handler)
      for (let pixi = pixiParent.pixi, i = events.length; i-- > 0; )
        pixi[this._once ? 'once' : 'on'](events[i], handler, this)
  }

  _move() {
    const parent = this.findParent(PixiScene)
    if (parent !== this.PixiScene) {
      this._off()
      this.PixiScene = parent
      this._on()
      if (this._mode) parent.pixi.eventMode = this._mode
      console.log(parent.pixi)
    }
  }

  _destroy() {
    this._off()
  }
}

export { PixiEvent as Event }
