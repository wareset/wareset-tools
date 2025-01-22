import { Rease } from 'rease'

import { IProps } from './types'

import { EMIT_NAME_RESIZE, EMIT_NAME_RENDER } from './const'

export function is_equal(a: any, b: any) {
  return a === a ? a === b : b !== b
}
export function is_function(v: any): v is Function {
  return typeof v === 'function'
}
export function is_native_object(v: any): v is { [key: string]: any } {
  return v != null && ((v = Object.getPrototypeOf(v)) === Object.prototype || !v)
}

// console.log(is_native_object([]))

function deep_update_props(to: any, from: any, cache: any) {
  for (const k in from) {
    is_native_object(from[k])
      ? deep_update_props(to[k], from[k], cache[k] || (cache[k] = {}))
      : is_equal(cache[k], from[k]) ||
        is_equal(to[k], (cache[k] = from[k])) ||
        (to[k] = from[k])
  }
}

function watch_props(this: { rease: any; cache: {} }, props: any) {
  if (props) deep_update_props(this.rease.pixi, props, this.cache), this.rease.update()
}
function watch_onDraw(this: any, onDraw: any) {
  if (onDraw) onDraw.call(this, this.pixi), this.update()
}

export function parse_props_before_insert(
  rease: Rease & { pixi: any },
  {
    props,
    $props$,
    onCreateCapture,
    onResizeCapture,
    onRenderCapture,
    $signalCapture$,
  }: IProps<any>
) {
  if (props) deep_update_props(rease.pixi, props, {})
  if ($props$) rease.watch($props$, watch_props, { rease, cache: {} })

  if (onCreateCapture) onCreateCapture.call(rease, rease.pixi)

  if (onResizeCapture) rease.on(EMIT_NAME_RESIZE, onResizeCapture, rease, true)
  if (onRenderCapture) rease.on(EMIT_NAME_RENDER, onRenderCapture, rease, true)

  if ($signalCapture$) rease.watch($signalCapture$, watch_onDraw, rease)
}

export function parse_props_after_insert(
  rease: Rease & { pixi: any },
  { onCreate, onResize, onRender, $signal$ }: IProps<any>
) {
  if (onCreate) onCreate.call(rease, rease.pixi)

  if (onResize) rease.on(EMIT_NAME_RESIZE, onResize, rease)
  if (onRender) rease.on(EMIT_NAME_RENDER, onRender, rease)

  if ($signal$) rease.watch($signal$, watch_onDraw, rease)
}
