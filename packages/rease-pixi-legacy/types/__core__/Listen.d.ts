import { Rease, type IMaybeSubscribable } from 'rease';
import { _PixiDisplayObject_ } from './DisplayObject';
export declare class PixiListen extends Rease {
    constructor({ once, $event$, $handler$ }: {
        once: boolean;
        $event$: IMaybeSubscribable<string | string[]>;
        $handler$: IMaybeSubscribable<(this: _PixiDisplayObject_, ...a: any) => any | null>;
    });
    private _once?;
    private _eventsLast?;
    private _handlerLast?;
    _watch([events, handler]: [string | string[], (...a: any) => any]): void;
    _off(): void;
    _on(): void;
    private _pixiParentLast?;
    _move(): void;
    _destroy(): void;
}
