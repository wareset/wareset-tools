import { Rease } from 'rease';
import { Scene as PixiScene } from './Scene';
import { type Filter } from 'pixi.js';
import type { AlphaFilter, AlphaFilterOptions, BlurFilter, BlurFilterOptions, BlurFilterPass, BlurFilterPassOptions, ColorMatrixFilter, FilterOptions, DisplacementFilter, Sprite, DisplacementFilterOptions, NoiseFilter, NoiseFilterOptions } from 'pixi.js';
import { type PropsFilter } from './utils';
declare class PixiFilter<Pixi extends Filter = Filter> extends Rease {
    readonly pixi: Pixi;
    PixiScene?: PixiScene;
    constructor(props: PropsFilter<AlphaFilter> & {
        options?: AlphaFilterOptions;
    });
    constructor(props: PropsFilter<BlurFilter> & {
        options?: BlurFilterOptions;
    });
    constructor(props: PropsFilter<BlurFilterPass> & {
        options: BlurFilterPassOptions;
    });
    constructor(props: PropsFilter<ColorMatrixFilter> & {
        options?: FilterOptions;
    });
    constructor(props: PropsFilter<DisplacementFilter> & {
        options?: Sprite | DisplacementFilterOptions;
    });
    constructor(props: PropsFilter<NoiseFilter> & {
        options?: NoiseFilterOptions;
    });
    update(): void;
}
export { PixiFilter as Filter };
