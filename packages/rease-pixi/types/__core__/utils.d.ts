export type IDeepPartial<T> = T extends object ? {
    -readonly [P in keyof T as P extends `_${string}` ? never : P]?: T[P] extends (...args: any) => any ? any : IDeepPartial<T[P]>;
} : T;
export declare function is_equal(a: any, b: any): boolean;
export declare function is_function(v: any): v is Function;
export declare function is_native_object(v: any): v is {
    [key: string]: any;
};
export declare function deep_update_props(to: any, from: any, cache: any): void;
import type { IMaybeSubscribable } from 'rease';
import type { autoDetectRenderer, AutoDetectOptions, Renderer, Container, Filter } from 'pixi.js';
import type { Renderer as PixiRenderer } from './Renderer';
import type { Filter as PixiFilter } from './Filter';
import type { Scene as PixiScene } from './Scene';
export type PixiRease = PixiRenderer | PixiFilter | PixiScene;
export type Props<R, P> = {
    onCreate?: (rease: R, pixi: P) => any;
    onRender?: (rease: R, t: number) => any;
    onRenderCapture?: (rease: R, t: number) => any;
    props?: IDeepPartial<P>;
    $props$?: IMaybeSubscribable<IDeepPartial<P>>;
    $onDraw$?: IMaybeSubscribable<(rease: R, pixi: P) => any>;
};
export type PropsScene<P extends Container> = Props<PixiScene<P>, P> & {
    pixi: new (...a: any) => P;
    children?: any;
};
export type PropsFilter<P extends Filter> = Props<PixiFilter<P>, P> & {
    pixi: new (...a: any) => P;
};
export type PropsRenderer = Props<PixiRenderer, Renderer> & {
    autoDetectRenderer: typeof autoDetectRenderer;
    options?: Partial<AutoDetectOptions>;
    children?: any;
};
export declare function parse_pixi_props(rease: PixiRease, { props, $props$, $onDraw$, onCreate, onRender, onRenderCapture }: Props<any, any>): void;
