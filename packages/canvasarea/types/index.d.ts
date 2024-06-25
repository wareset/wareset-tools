declare class _CanvasareaRenderingContext2D_ {
    private _ctx;
    private _tl;
    private _tn;
    private _nu;
    private _gsx;
    private _gsy;
    readonly GLOBAL_SCALE_X: number;
    readonly GLOBAL_SCALE_Y: number;
    readonly GLOBAL_SCALE_MEAN: number;
    constructor();
    protected _render(canvasarea: Canvasarea): void;
    protected _transform(): void;
    areaShift(x?: number, y?: number): void;
    areaScale(x?: number, y?: number): void;
    areaAngle(deg?: number): void;
    areaRadii(rad?: number): void;
    areaPivot(x?: number, y?: number): void;
}
export type CanvasareaRenderingContext2D = _CanvasareaRenderingContext2D_ & CanvasRenderingContext2D;
export declare class Canvasarea {
    readonly _draw: (ctx: CanvasareaRenderingContext2D) => void;
    readonly _areas: Canvasarea[];
    constructor(draw: Canvasarea['_draw']);
    render(ctx: CanvasRenderingContext2D): void;
    createArea(draw: Canvasarea['_draw'], index?: number): Canvasarea;
    attachArea(canvasarea: Canvasarea, index?: number): void;
    detachArea(canvasarea_or_index: Canvasarea | number): boolean;
    detachAllAreas(): void;
}
export declare function canvasarea(draw: Canvasarea['_draw']): Canvasarea;
export default canvasarea;
