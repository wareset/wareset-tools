import { Rease } from 'rease';
import { type Renderer, type Container } from 'pixi.js';
import { type Scene as PixiScene } from './Scene';
import { type PropsRenderer } from './utils';
declare class PixiRenderer<Pixi extends Renderer = Renderer> extends Rease {
    pixi?: Pixi;
    PixiScene?: PixiScene;
    _renderOptions?: {
        container: Container;
    };
    constructor(props: PropsRenderer);
    update(): void;
}
export { PixiRenderer as Renderer };
