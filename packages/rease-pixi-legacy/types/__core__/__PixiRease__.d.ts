import { Rease } from 'rease';
import { type PixiRenderer } from './Renderer';
export declare class __PixiRease__ extends Rease {
    PixiRenderer: PixiRenderer | null | undefined;
    constructor();
    update(): void;
}
