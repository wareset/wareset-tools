export declare function is_equal(a: any, b: any): boolean;
export declare function is_function(v: any): v is Function;
export declare function is_native_object(v: any): v is {
    [key: string]: any;
};
import { Rease, type IMaybeSubscribable } from 'rease';
type IPropsBase<R extends Rease, P> = {
    onCreate?: (pixi: R) => any;
    onRender?: (pixi: R, t: number) => any;
    $onSignal$?: IMaybeSubscribable<(pixi: R) => any>;
    children?: any;
    $props$?: IMaybeSubscribable<IDeepPartial<P>>;
};
export type IPropsWithRequiredPixi<R extends Rease, P> = IPropsBase<R, P> & {
    pixi: P;
};
export type IPropsWithoutOptions<R extends Rease, P> = IPropsBase<R, P> & {
    pixi?: P;
};
export type IPropsWithOptionalOptions<R extends Rease, P, O> = IPropsBase<R, P> & ({
    pixi?: P;
    options?: never;
} | {
    pixi?: never;
    options?: O;
});
export type IPropsWithRequiredOptions<R extends Rease, P, O> = IPropsBase<R, P> & ({
    pixi: P;
    options?: never;
} | {
    pixi?: never;
    options: O;
});
export type IDeepPartial<T> = T extends object ? {
    -readonly [P in keyof T as P extends `_${string}` ? never : P]?: T[P] extends (...args: any) => any ? never : IDeepPartial<T[P]>;
} : T;
export declare function deep_update_props(to: any, from: any, cache: any): void;
type PixiReaseLike = Rease & {
    pixi: any;
    update: () => any;
};
export declare function watch_props(rease: PixiReaseLike, props: any): void;
export declare function run_oncreate_and_onrender(rease: PixiReaseLike, onCreate: any, onRender: any): void;
export declare function watch_on_signal(rease: PixiReaseLike, onSignal: any): void;
export {};
