export declare function createCards({ width, height, bgColor, borderColor, s11Color, // ♥
s10Color, // ♦
s01Color, // ♠
s00Color }?: {
    width?: number;
    height?: number;
    bgColor?: string | CanvasGradient | CanvasPattern;
    borderColor?: string | CanvasGradient | CanvasPattern;
    s11Color?: string | CanvasGradient | CanvasPattern | null;
    s01Color?: string | CanvasGradient | CanvasPattern | null;
    s10Color?: string | CanvasGradient | CanvasPattern | null;
    s00Color?: string | CanvasGradient | CanvasPattern | null;
}): {
    [key: string]: string;
};
