import { type IRenderer as PIXI_IRenderer, type IRendererOptionsAuto as PIXI_IRendererOptionsAuto } from './__pixi__';
import type { IPropsWithOptionalOptions } from './utils';
import { __PixiRease__ } from './__PixiRease__';
import { PixiContainer } from './DisplayObject';
export declare class PixiRenderer extends __PixiRease__ {
    readonly pixi: PIXI_IRenderer<HTMLCanvasElement>;
    readonly PixiStage: PixiContainer;
    private readonly _render;
    constructor({ onCreate, onRender, $onSignal$, children, options, $props$, pixi }: IPropsWithOptionalOptions<PixiRenderer, PIXI_IRenderer<HTMLCanvasElement>, Partial<PIXI_IRendererOptionsAuto>>);
    private _allowUpdate;
    update(): void;
}
