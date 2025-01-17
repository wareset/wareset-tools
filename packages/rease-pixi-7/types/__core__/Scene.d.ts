import { Rease } from 'rease';
import { IProps } from './types';
import { Renderer } from './Renderer';
declare class __PixiScene__ extends Rease {
    readonly pixi: any;
    PixiRenderer?: Renderer | undefined;
    constructor(props: IProps<any>, pixi: any);
    update(): void;
    protected hookMove(rease: Rease, _from: Rease | null, _to: Rease | null): void;
    protected hookDestroy(iam: this): void;
}
export { __PixiScene__ as __Scene__ };
declare class PixiSceneContainer extends __PixiScene__ {
    readonly pixi: PIXI.Container;
    constructor(props: IProps<PixiSceneContainer>);
}
export { PixiSceneContainer as SceneContainer };
declare class PixiSceneParticleContainer extends __PixiScene__ {
    readonly pixi: PIXI.ParticleContainer;
    constructor(props: IProps<PixiSceneParticleContainer> & {
        options?: {
            maxSize?: number;
            properties?: PIXI.IParticleProperties;
            batchSize?: number;
            autoResize?: boolean;
        };
    });
}
export { PixiSceneParticleContainer as SceneParticleContainer };
declare class PixiSceneSprite extends __PixiScene__ {
    readonly pixi: PIXI.Sprite;
    constructor(props: IProps<PixiSceneSprite> & {
        options?: {
            texture?: PIXI.Texture;
        };
    });
}
export { PixiSceneSprite as SceneSprite };
declare class PixiSceneTilingSprite extends __PixiScene__ {
    readonly pixi: PIXI.TilingSprite;
    constructor(props: IProps<PixiSceneTilingSprite> & {
        options: {
            texture: PIXI.Texture;
            width?: number;
            height?: number;
        };
    });
}
export { PixiSceneTilingSprite as SceneTilingSprite };
declare class PixiSceneText extends __PixiScene__ {
    readonly pixi: PIXI.Text;
    constructor(props: IProps<PixiSceneText> & {
        options?: {
            text?: string | number;
            style?: Partial<PIXI.ITextStyle> | PIXI.TextStyle;
            canvas?: PIXI.ICanvas;
        };
    });
}
export { PixiSceneText as SceneText };
declare class PixiSceneAnimatedSprite extends __PixiScene__ {
    readonly pixi: PIXI.AnimatedSprite;
    constructor(props: IProps<PixiSceneAnimatedSprite> & {
        options: {
            textures: PIXI.Texture[] | PIXI.FrameObject[];
            autoUpdate?: boolean;
        };
    });
}
export { PixiSceneAnimatedSprite as SceneAnimatedSprite };
declare class PixiSceneHTMLText extends __PixiScene__ {
    readonly pixi: PIXI.HTMLText;
    constructor(props: IProps<PixiSceneHTMLText> & {
        options?: {
            text?: string;
            style?: PIXI.HTMLTextStyle | PIXI.TextStyle | Partial<PIXI.ITextStyle>;
        };
    });
}
export { PixiSceneHTMLText as SceneHTMLText };
declare class PixiSceneGraphics extends __PixiScene__ {
    readonly pixi: PIXI.Graphics;
    constructor(props: IProps<PixiSceneGraphics> & {
        options?: {
            geometry?: PIXI.GraphicsGeometry;
        };
    });
}
export { PixiSceneGraphics as SceneGraphics };
declare class PixiSceneMesh extends __PixiScene__ {
    readonly pixi: PIXI.Mesh;
    constructor(props: IProps<PixiSceneMesh> & {
        options: {
            geometry: PIXI.Geometry;
            shader: PIXI.Shader;
            state?: PIXI.State;
            drawMode?: PIXI.DRAW_MODES;
        };
    });
}
export { PixiSceneMesh as SceneMesh };
declare class PixiSceneSimplePlane extends __PixiScene__ {
    readonly pixi: PIXI.SimplePlane;
    constructor(props: IProps<PixiSceneSimplePlane> & {
        options: {
            texture: PIXI.Texture;
            verticesX?: number;
            verticesY?: number;
        };
    });
}
export { PixiSceneSimplePlane as SceneSimplePlane };
declare class PixiSceneNineSlicePlane extends __PixiScene__ {
    readonly pixi: PIXI.NineSlicePlane;
    constructor(props: IProps<PixiSceneNineSlicePlane> & {
        options: {
            texture: PIXI.Texture;
            leftWidth?: number;
            topHeight?: number;
            rightWidth?: number;
            bottomHeight?: number;
        };
    });
}
export { PixiSceneNineSlicePlane as SceneNineSlicePlane };
declare class PixiSceneSimpleMesh extends __PixiScene__ {
    readonly pixi: PIXI.SimpleMesh;
    constructor(props: IProps<PixiSceneSimpleMesh> & {
        options?: {
            texture?: PIXI.Texture;
            vertices?: PIXI.IArrayBuffer;
            uvs?: PIXI.IArrayBuffer;
            indices?: PIXI.IArrayBuffer;
            drawMode?: PIXI.DRAW_MODES;
        };
    });
}
export { PixiSceneSimpleMesh as SceneSimpleMesh };
declare class PixiSceneSimpleRope extends __PixiScene__ {
    readonly pixi: PIXI.SimpleRope;
    constructor(props: IProps<PixiSceneSimpleRope> & {
        options: {
            texture: PIXI.Texture;
            points: PIXI.IPoint[];
            textureScale?: number;
        };
    });
}
export { PixiSceneSimpleRope as SceneSimpleRope };
declare class PixiSceneBitmapText extends __PixiScene__ {
    readonly pixi: PIXI.BitmapText;
    constructor(props: IProps<PixiSceneBitmapText> & {
        options: {
            text: string;
            style?: Partial<PIXI.IBitmapTextStyle>;
        };
    });
}
export { PixiSceneBitmapText as SceneBitmapText };
