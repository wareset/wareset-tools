declare class _CanvasareaRenderingContext2D_ {
    private _ctx;
    private _tl;
    private _tn;
    private _gsx;
    private _gsy;
    readonly GLOBAL_SCALE_X: number;
    readonly GLOBAL_SCALE_Y: number;
    readonly GLOBAL_SCALE_MEAN: number;
    constructor();
    protected _render(canvasarea: Canvasarea): void;
    protected _areaUpdate(): void;
    areaShift(x?: number, y?: number): void;
    areaShiftX(x?: number): void;
    areaShiftY(y?: number): void;
    areaShiftAdd(x?: number, y?: number): void;
    areaShiftXAdd(x?: number): void;
    areaShiftYAdd(y?: number): void;
    areaScale(x?: number, y?: number): void;
    areaScaleX(x?: number): void;
    areaScaleY(y?: number): void;
    areaScaleAdd(x?: number, y?: number): void;
    areaScaleXAdd(x?: number): void;
    areaScaleYAdd(y?: number): void;
    areaRadii(rad?: number): void;
    areaRadiiAdd(rad?: number): void;
    areaAngle(deg?: number): void;
    areaAngleAdd(deg?: number): void;
    areaPivot(x?: number, y?: number): void;
    areaPivotX(x?: number): void;
    areaPivotY(y?: number): void;
    areaPivotAdd(x?: number, y?: number): void;
    areaPivotXAdd(x?: number): void;
    areaPivotYAdd(y?: number): void;
}
export type CanvasareaRenderingContext2D = _CanvasareaRenderingContext2D_ & CanvasRenderingContext2D;
export declare class Canvasarea<T = unknown> {
    drawThis: T;
    draw: (this: T, ctx: CanvasareaRenderingContext2D) => void;
    readonly areas: Readonly<Canvasarea<any>[]>;
    constructor(draw: Canvasarea<T>['draw'], drawThis?: T);
    render(ctx: CanvasRenderingContext2D): void;
    createArea<T2 = unknown>(draw: Canvasarea<T2>['draw'], drawThis?: T2, index?: number): Canvasarea<T2>;
    attachArea(canvasarea: Canvasarea<any>, index?: number): void;
    detachArea(canvasarea_or_index: Canvasarea<any> | number): boolean;
    detachAllAreas(): void;
}
export declare function canvasarea<T = unknown>(draw: Canvasarea<T>['draw'], drawThis?: T): Canvasarea<T>;
export default canvasarea;
