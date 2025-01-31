import { Rease } from 'rease'

import { IProps } from './types'

import { EMIT_NAME_RESIZE, EMIT_NAME_RENDER } from './const'

function is_equal(a: any, b: any) {
  return a === a ? a === b : b !== b
}
function is_function(v: any): v is Function {
  return typeof v === 'function'
}
function is_native_object(v: any): v is { [key: string]: any } {
  return v != null && ((v = Object.getPrototypeOf(v)) === Object.prototype || !v)
}

function is_equal_fn_args(this: any[], _v: any, k: number, cache: any[]) {
  return is_equal(this[k], cache[k])
}
function deep_update_props(to: any, from: any, cache: any) {
  for (const k in from)
    if (is_function(to[k]))
      (cache[k] &&
        cache[k].length === from[k].length &&
        cache[k].every(is_equal_fn_args, from)) ||
        to[k].apply(to, (cache[k] = from[k]))
    else
      is_native_object(from[k])
        ? deep_update_props(to[k], from[k], cache[k] || (cache[k] = {}))
        : is_equal(cache[k], from[k]) ||
          is_equal(to[k], (cache[k] = from[k])) ||
          (to[k] = from[k])
}

// function deep_update_props(to: any, from: any, cache: any) {
//   for (const k in from)
//     is_native_object(from[k])
//       ? deep_update_props(to[k], from[k], cache[k] || (cache[k] = {}))
//       : is_equal(cache[k], from[k]) ||
//         is_equal(to[k], (cache[k] = from[k])) ||
//         (to[k] = from[k])
// }

function watch_props(this: { r: any; c: {} }, props: any) {
  if (props) deep_update_props(this.r.pixi, props, this.c), this.r.update()
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
  if ($props$) rease.watch($props$, watch_props, { r: rease, c: {} })

  if (onCreateCapture) onCreateCapture.call(rease, rease.pixi)
  if ($signalCapture$) rease.watch($signalCapture$, watch_onDraw, rease)

  if (onRenderCapture) rease.on(EMIT_NAME_RENDER, onRenderCapture, rease, true)
  if (onResizeCapture) {
    rease.on(EMIT_NAME_RESIZE, onResizeCapture, rease, true)
    // onResizeCapture.call(rease)
  }
}

export function parse_props_after_insert(
  rease: Rease & { pixi: any },
  { onCreate, onResize, onRender, $signal$ }: IProps<any>
) {
  if (onCreate) onCreate.call(rease, rease.pixi)
  if ($signal$) rease.watch($signal$, watch_onDraw, rease)

  if (onRender) rease.on(EMIT_NAME_RENDER, onRender, rease)
  if (onResize) {
    rease.on(EMIT_NAME_RESIZE, onResize, rease)
    // onResize.call(rease)
  }
}
