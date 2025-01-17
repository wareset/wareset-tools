import { Rease } from 'rease';
import { IProps } from './types';
import { __Scene__ } from './Scene';
declare class __PixiFilter__ extends Rease {
    readonly pixi: PIXI.Filter;
    PixiScene?: __Scene__ | undefined;
    constructor(props: IProps<any>, pixi: PIXI.Filter);
    update(): void;
    protected hookMove(rease: Rease, _from: Rease | null, _to: Rease | null): void;
    protected hookDestroy(iam: this): void;
}
export { __PixiFilter__ as __Filter__ };
type Dict<T> = {
    [key: string]: T;
};
declare class PixiFilter extends __PixiFilter__ {
    readonly pixi: PIXI.Filter;
    constructor(props: IProps<PixiFilter> & {
        options?: {
            vertexSrc?: string;
            fragmentSrc?: string;
            uniforms?: Dict<any>;
        };
    });
}
export { PixiFilter as Filter };
declare class PixiFilterAlpha extends __PixiFilter__ {
    readonly pixi: PIXI.AlphaFilter;
    constructor(props: IProps<PixiFilterAlpha> & {
        options?: {
            alpha?: number;
        };
    });
}
export { PixiFilterAlpha as FilterAlpha };
declare class PixiFilterBlur extends __PixiFilter__ {
    readonly pixi: PIXI.BlurFilter;
    constructor(props: IProps<PixiFilterBlur> & {
        options?: {
            strength?: number;
            quality?: number;
            resolution?: number;
            kernelSize?: number;
        };
    });
}
export { PixiFilterBlur as FilterBlur };
declare class PixiFilterColorMatrix extends __PixiFilter__ {
    readonly pixi: PIXI.ColorMatrixFilter;
    constructor(props: IProps<PixiFilterColorMatrix>);
}
export { PixiFilterColorMatrix as FilterColorMatrix };
declare class PixiFilterDisplacement extends __PixiFilter__ {
    readonly pixi: PIXI.DisplacementFilter;
    constructor(props: IProps<PixiFilterDisplacement> & {
        options: {
            sprite: PIXI.ISpriteMaskTarget;
            scale?: number;
        };
    });
}
export { PixiFilterDisplacement as FilterDisplacement };
declare class PixiFilterFXAA extends __PixiFilter__ {
    readonly pixi: PIXI.FXAAFilter;
    constructor(props: IProps<PixiFilterFXAA>);
}
export { PixiFilterFXAA as FilterFXAA };
declare class PixiFilterNoise extends __PixiFilter__ {
    readonly pixi: PIXI.NoiseFilter;
    constructor(props: IProps<PixiFilterNoise> & {
        options?: {
            noise?: number;
            seed?: number;
        };
    });
}
export { PixiFilterNoise as FilterNoise };
