export declare function createCards({ width, height, bgColor, borderColor, rhColor, // ♥
rnColor, // ♦
bhColor, // ♠
bnColor }?: {
    width?: number;
    height?: number;
    bgColor?: string | CanvasGradient | CanvasPattern;
    borderColor?: string | CanvasGradient | CanvasPattern;
    rhColor?: string | CanvasGradient | CanvasPattern | null;
    bhColor?: string | CanvasGradient | CanvasPattern | null;
    rnColor?: string | CanvasGradient | CanvasPattern | null;
    bnColor?: string | CanvasGradient | CanvasPattern | null;
}): {
    [key: string]: string;
};
