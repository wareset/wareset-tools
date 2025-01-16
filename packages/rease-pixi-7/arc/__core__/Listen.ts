import { Rease, type IMaybeSubscribable } from 'rease'

import { type Container as PIXI_Container } from './__pixi__'

import { _PixiDisplayObject_ } from './DisplayObject'

export class PixiListen extends Rease {
  constructor({
    once,
    $event$,
    $handler$
  }: {
    once: boolean
    $event$: IMaybeSubscribable<string | string[]>
    $handler$: IMaybeSubscribable<(this: _PixiDisplayObject_, ...a: any) => any | null>
  }) {
    super()
    this._once = once
    this._move()
    this.onMove(this._move, this)
    this.watchAll([$event$, $handler$], this._watch, this)
    this.onDestroy(this._destroy, this)
  }

  private _once?: boolean
  private _eventsLast?: string[]
  private _handlerLast?: (...a: any) => any
  _watch([events, handler]: [string | string[], (...a: any) => any]) {
    this._off()
    this._eventsLast = Array.isArray(events) ? events : [events]
    this._handlerLast = handler
    this._on()
  }

  _off() {
    const events = this._eventsLast
    const handler = this._handlerLast
    const pixiParent = this._pixiParentLast
    if (pixiParent && events && handler)
      for (let i = events.length; i-- > 0; ) pixiParent.off(events[i], handler, this)
  }
  _on() {
    const events = this._eventsLast
    const handler = this._handlerLast
    const pixiParent = this._pixiParentLast
    if (pixiParent && events && handler)
      for (let i = events.length; i-- > 0; )
        pixiParent[this._once ? 'once' : 'on'](events[i], handler, this)
  }

  private _pixiParentLast?: PIXI_Container
  _move() {
    const parent = this.findParent(_PixiDisplayObject_)
    const pixiParent = parent && parent.pixi
    if (pixiParent !== this._pixiParentLast) {
      this._off()
      this._pixiParentLast = pixiParent
      this._on()
    }
  }

  _destroy() {
    this._off()
  }
}
