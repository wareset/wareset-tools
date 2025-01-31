export type IDeepPartial<T> = T extends object
  ? {
      -readonly [P in keyof T as P extends `_${string}` ? never : P]?: T[P] extends (
        ...args: any
      ) => any
        ? Parameters<T[P]>
        : IDeepPartial<T[P]>
    }
  : T

// export type IDeepPartial<T> = T extends object
//   ? {
//       -readonly [P in keyof T as P extends `_${string}` ? never : P]?: T[P] extends (
//         ...args: any
//       ) => any
//         ? any
//         : IDeepPartial<T[P]>
//     }
//   : T

import type { IMaybeSubscribable } from 'rease'

export type IProps<R extends { pixi: {} }> = {
  onCreate?: (this: R, pixi: R['pixi']) => any
  onCreateCapture?: (this: R, pixi: R['pixi']) => any

  onResize?: (this: R) => any
  onResizeCapture?: (this: R) => any

  onRender?: (this: R, t: number) => any
  onRenderCapture?: (this: R, t: number) => any

  props?: IDeepPartial<R['pixi']>
  $props$?: IMaybeSubscribable<IDeepPartial<R['pixi']>>

  $signal$?: IMaybeSubscribable<(this: R, pixi: R['pixi']) => any>
  $signalCapture$?: IMaybeSubscribable<(this: R, pixi: R['pixi']) => any>

  children?: any
}
