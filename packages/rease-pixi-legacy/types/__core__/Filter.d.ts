import { Filter as PIXI_Filter, type Container as PIXI_Container } from './__pixi__';
import type { IPropsWithRequiredPixi } from './utils';
import { __PixiRease__ } from './__PixiRease__';
export declare class PixiFilter<Filter extends PIXI_Filter> extends __PixiRease__ {
    readonly pixi: Filter;
    constructor({ onCreate, onRender, $onSignal$, children, $props$, pixi }: IPropsWithRequiredPixi<PixiFilter<Filter>, Filter>);
    _pixiNextLast: PIXI_Filter | undefined;
    _pixiParentLast: PIXI_Container | undefined;
}
