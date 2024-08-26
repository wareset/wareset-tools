export default function cardsFactory({ width, height, bgColor, borderColor, rhColor, // ♥
rnColor, // ♦
bhColor, // ♠
bnColor, }?: {
    width?: number;
    height?: number;
    bgColor?: string | CanvasGradient | CanvasPattern;
    borderColor?: string | CanvasGradient | CanvasPattern;
    rhColor?: string | CanvasGradient | CanvasPattern | null;
    bhColor?: string | CanvasGradient | CanvasPattern | null;
    rnColor?: string | CanvasGradient | CanvasPattern | null;
    bnColor?: string | CanvasGradient | CanvasPattern | null;
}): {
    [key: string]: "bha" | "bhb" | "bh1" | "bh2" | "bh3" | "bh4" | "bh5" | "bh6" | "bh7" | "bh8" | "bh9" | "bhc" | "bhd" | "bna" | "bnb" | "bn1" | "bn2" | "bn3" | "bn4" | "bn5" | "bn6" | "bn7" | "bn8" | "bn9" | "bnc" | "bnd" | "rha" | "rhb" | "rh1" | "rh2" | "rh3" | "rh4" | "rh5" | "rh6" | "rh7" | "rh8" | "rh9" | "rhc" | "rhd" | "rna" | "rnb" | "rn1" | "rn2" | "rn3" | "rn4" | "rn5" | "rn6" | "rn7" | "rn8" | "rn9" | "rnc" | "rnd";
};
