import { Rease } from 'rease';
import { Renderer as PixiRenderer } from './Renderer';
import { type PropsScene } from './utils';
import type { Container, ContainerOptions, Sprite, SpriteOptions, Texture, AnimatedSprite, FrameObject, TilingSprite, TilingSpriteOptions, NineSliceSprite, NineSliceSpriteOptions, Graphics, GraphicsOptions, GraphicsContext, Mesh, MeshOptions, MeshGeometry, TextureShader, MeshSimple, SimpleMeshOptions, MeshPlane, MeshPlaneOptions, MeshRope, MeshRopeOptions, Text, TextOptions, BitmapText, HTMLText, HTMLTextOptions } from 'pixi.js';
declare class PixiScene<Pixi extends Container = Container> extends Rease {
    readonly pixi: Pixi & {
        _rease?: PixiScene<Pixi>;
    };
    PixiRenderer?: PixiRenderer;
    constructor(props: PropsScene<Container> & {
        options?: ContainerOptions;
    });
    constructor(props: PropsScene<Sprite> & {
        options?: SpriteOptions | Texture;
    });
    constructor(props: PropsScene<AnimatedSprite> & {
        options: Texture[] | FrameObject[];
    });
    constructor(props: PropsScene<TilingSprite> & {
        options?: Texture | TilingSpriteOptions;
    });
    constructor(props: PropsScene<NineSliceSprite> & {
        options: NineSliceSpriteOptions | Texture;
    });
    constructor(props: PropsScene<Graphics> & {
        options?: GraphicsOptions | GraphicsContext;
    });
    constructor(props: PropsScene<Mesh> & {
        options: MeshOptions<MeshGeometry, TextureShader>;
    });
    constructor(props: PropsScene<MeshSimple> & {
        options: SimpleMeshOptions;
    });
    constructor(props: PropsScene<MeshPlane> & {
        options: MeshPlaneOptions;
    });
    constructor(props: PropsScene<MeshRope> & {
        options: MeshRopeOptions;
    });
    constructor(props: PropsScene<Text> & {
        options?: TextOptions;
    });
    constructor(props: PropsScene<BitmapText> & {
        options?: TextOptions;
    });
    constructor(props: PropsScene<HTMLText> & {
        options?: HTMLTextOptions;
    });
    update(): void;
    hookMove(rease: Rease, _from: Rease | null, _to: Rease | null): any;
    hookDestroy(iam: this): void;
}
export { PixiScene as Scene };
