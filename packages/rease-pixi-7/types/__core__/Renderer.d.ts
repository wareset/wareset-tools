import { Rease } from 'rease';
import { IProps } from './types';
import type { __Scene__ } from './Scene';
declare class PixiRenderer extends Rease {
    readonly pixi: PIXI.IRenderer<HTMLCanvasElement>;
    PixiScene?: __Scene__ | undefined;
    constructor(props: IProps<PixiRenderer> & {
        options?: Partial<PIXI.IRendererOptionsAuto>;
    });
    update: () => void;
    protected hookDestroy(iam: this): void;
}
export { PixiRenderer as Renderer };
