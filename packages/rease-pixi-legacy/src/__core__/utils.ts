export function is_equal(a: any, b: any) {
  return a === a ? a === b : b !== b
}
export function is_function(v: any): v is Function {
  return typeof v === 'function'
}
export function is_native_object(v: any): v is { [key: string]: any } {
  return !!((v && (v = Object.getPrototypeOf(v)) === Object.prototype) || !v)
}

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

import { Rease, type IMaybeSubscribable } from 'rease'

//
// type Props
type IPropsBase<R extends Rease, P> = {
  onCreate?: (pixi: R) => any
  onRender?: (pixi: R, t: number) => any
  $onSignal$?: IMaybeSubscribable<(pixi: R) => any>
  children?: any
  $props$?: IMaybeSubscribable<IDeepPartial<P>>
}

export type IPropsWithRequiredPixi<R extends Rease, P> = IPropsBase<R, P> & {
  pixi: P
}

export type IPropsWithoutOptions<R extends Rease, P> = IPropsBase<R, P> & {
  pixi?: P
}

export type IPropsWithOptionalOptions<R extends Rease, P, O> = IPropsBase<R, P> &
  ({ pixi?: P; options?: never } | { pixi?: never; options?: O })

export type IPropsWithRequiredOptions<R extends Rease, P, O> = IPropsBase<R, P> &
  ({ pixi: P; options?: never } | { pixi?: never; options: O })
// type Props
//

export type IDeepPartial<T> = T extends object
  ? {
      -readonly [P in keyof T as P extends `_${string}` ? never : P]?: T[P] extends (
        ...args: any
      ) => any
        ? never
        : IDeepPartial<T[P]>
    }
  : T
export function deep_update_props(to: any, from: any, cache: any) {
  for (const k in from) {
    is_native_object(from[k])
      ? deep_update_props(to[k], from[k], cache[k] || (cache[k] = {}))
      : is_equal(cache[k], from[k]) || is_equal(to[k], (cache[k] = from[k])) || (to[k] = from[k])
  }
}

type PixiReaseLike = Rease & { pixi: any; update: () => any }

function props_watcher(this: { rease: PixiReaseLike; cache: {} }, props: any) {
  if (props) deep_update_props(this.rease.pixi, props, this.cache), this.rease.update()
}
export function watch_props(rease: PixiReaseLike, props: any) {
  if (props) rease.watch(props, props_watcher, { rease, cache: {} })
}

export function run_oncreate_and_onrender(rease: PixiReaseLike, onCreate: any, onRender: any) {
  if (onCreate) onCreate(rease)
  if (onRender) rease.on('render', onRender)
}
function use_watcher(this: PixiReaseLike, onSignal: any) {
  if (onSignal) onSignal(this), this.update()
}
export function watch_on_signal(rease: PixiReaseLike, onSignal: any) {
  if (onSignal) rease.watch(onSignal, use_watcher, rease)
}
