// type IDeepPartial<T> = T extends object
//   ? {
//       -readonly [P in keyof T as P extends `_${string}` ? never : P]?: T[P] extends (
//         ...args: any
//       ) => any
//         ? Parameters<T[P]>
//         : IDeepPartial<T[P]>
//     }
//   : T
// function check_is_equal_fn_args(this: any[], _v: any, k: number, cache: any[]) {
//   return !is_equal(this[k], cache[k])
// }
// function deep_update_props(target: any, props: any, cache: any) {
//   for (const k in props) {
//     if (is_function(target[k])) {
//       if (
//         !cache[k] ||
//         cache[k].length !== props[k].length ||
//         cache[k].some(check_is_equal_fn_args, props)
//       ) {
//         target[k].apply(target, (cache[k] = props[k]))
//       }
//     } else if (is_native_object(props[k])) {
//       deep_update_props(target[k], props[k], cache[k] || (cache[k] = {}))
//     } else if (!is_equal(cache[k], props[k])) {
//       is_equal(target[k], (cache[k] = props[k])) || (target[k] = props[k])
//     }
//   }
// }

export type IDeepPartial<T> = T extends object
  ? {
      -readonly [P in keyof T as P extends `_${string}` ? never : P]?: T[P] extends (
        ...args: any
      ) => any
        ? any
        : IDeepPartial<T[P]>
    }
  : T

export function is_equal(a: any, b: any) {
  return a === a ? a === b : b !== b
}
export function is_function(v: any): v is Function {
  return typeof v === 'function'
}
export function is_native_object(v: any): v is { [key: string]: any } {
  return !!((v && (v = Object.getPrototypeOf(v)) === Object.prototype) || !v)
}

export function deep_update_props(to: any, from: any, cache: any) {
  for (const k in from) {
    is_native_object(from[k])
      ? deep_update_props(to[k], from[k], cache[k] || (cache[k] = {}))
      : is_equal(cache[k], from[k]) || is_equal(to[k], (cache[k] = from[k])) || (to[k] = from[k])
  }
}

// type PixiReaseLike = Rease & { pixi?: any; update: () => any }

import type { IMaybeSubscribable } from 'rease'

import type { autoDetectRenderer, AutoDetectOptions, Renderer, Container, Filter } from 'pixi.js'

import type { Renderer as PixiRenderer } from './Renderer'
import type { Filter as PixiFilter } from './Filter'
import type { Scene as PixiScene } from './Scene'
export type PixiRease = PixiRenderer | PixiFilter | PixiScene

export type Props<R, P> = {
  onCreate?: (rease: R, pixi: P) => any
  onRender?: (rease: R, t: number) => any
  onRenderCapture?: (rease: R, t: number) => any
  props?: IDeepPartial<P>
  $props$?: IMaybeSubscribable<IDeepPartial<P>>
  $onDraw$?: IMaybeSubscribable<(rease: R, pixi: P) => any>
}

export type PropsScene<P extends Container> = Props<PixiScene<P>, P> & {
  pixi: new (...a: any) => P
  children?: any
}
export type PropsFilter<P extends Filter> = Props<PixiFilter<P>, P> & {
  pixi: new (...a: any) => P
}
export type PropsRenderer = Props<PixiRenderer, Renderer> & {
  autoDetectRenderer: typeof autoDetectRenderer
  options?: Partial<AutoDetectOptions>
  children?: any
}

function watch_props(this: { rease: PixiRease; cache: {} }, props: any) {
  if (props) deep_update_props(this.rease.pixi, props, this.cache), this.rease.update()
}
function watch_onDraw(this: PixiRease, onDraw: any) {
  if (onDraw) onDraw.call(this, this.pixi), this.update()
}
export function parse_pixi_props(
  rease: PixiRease,
  { props, $props$, $onDraw$, onCreate, onRender, onRenderCapture }: Props<any, any>
) {
  if (onCreate) onCreate(rease, rease.pixi)
  if (onRender) rease.on('pixi-render', onRender)
  if (onRenderCapture) rease.on('pixi-render', onRenderCapture, void 0, true)

  if (props) deep_update_props(rease.pixi, props, {})
  if ($props$) rease.watch($props$, watch_props, { rease, cache: {} })
  if ($onDraw$) rease.watch($onDraw$, watch_onDraw, rease)
}
