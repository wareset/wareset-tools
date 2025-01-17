import { Rease, type IMaybeSubscribable } from 'rease';
import { __Scene__ } from './Scene';
declare class PixiEvent<CTX = any> extends Rease {
    PixiScene?: __Scene__;
    constructor({ $mode$, $once$, $type$, $handler$, $context$, }: {
        $mode$?: IMaybeSubscribable<PIXI.EventMode>;
        $once$?: IMaybeSubscribable<boolean>;
        $type$: IMaybeSubscribable<string | string[]>;
        $handler$: IMaybeSubscribable<((this: CTX, ...a: any) => any) | null>;
        $context$?: CTX;
    });
    _mode?: PIXI.EventMode | undefined;
    _once?: boolean | undefined;
    _type?: string[] | undefined;
    _handler?: ((...a: any) => any) | undefined;
    _context?: any;
    protected hookMove(rease: Rease, _from: Rease | null, _to: Rease | null): void;
    protected hookDestroy(iam: this): void;
}
export { PixiEvent as Event };
