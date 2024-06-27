import { Rease, type IMaybeSubscribable } from 'rease';
import { Scene as PixiScene } from './Scene';
import { type EventMode } from 'pixi.js';
declare class PixiEvent extends Rease {
    PixiScene?: PixiScene;
    constructor({ $mode$, $once$, $type$, $handler$ }: {
        $mode$?: IMaybeSubscribable<EventMode>;
        $once$?: IMaybeSubscribable<boolean>;
        $type$: IMaybeSubscribable<string | string[]>;
        $handler$: IMaybeSubscribable<(this: PixiScene, ...a: any) => any | null>;
    });
    private _mode?;
    private _once?;
    private _type?;
    private _handler?;
    _watchMode(mode?: EventMode): void;
    _watch([types, handler, once]: [string | string[], (...a: any) => any, boolean?]): void;
    _off(): void;
    _on(): void;
    _move(): void;
    _destroy(): void;
}
export { PixiEvent as Event };
