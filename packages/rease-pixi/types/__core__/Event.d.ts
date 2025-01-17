import { Rease, type IMaybeSubscribable } from 'rease';
import { Scene as PixiScene } from './Scene';
import { type EventMode } from 'pixi.js';
declare class PixiEvent<CTX = any> extends Rease {
    PixiScene?: PixiScene;
    constructor({ $mode$, $once$, $type$, $handler$, $context$, }: {
        $mode$?: IMaybeSubscribable<EventMode>;
        $once$?: IMaybeSubscribable<boolean>;
        $type$: IMaybeSubscribable<string | string[]>;
        $handler$: IMaybeSubscribable<((this: CTX, ...a: any) => any) | null>;
        $context$?: CTX;
    });
    _mode?: EventMode;
    _once?: boolean;
    _type?: string[];
    _handler?: (...a: any) => any;
    _context?: any;
    hookMove(rease: Rease, _from: Rease | null, _to: Rease | null): void;
    hookDestroy(iam: this): void;
}
export { PixiEvent as Event };
