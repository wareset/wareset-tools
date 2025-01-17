import { Rease } from 'rease';
import type { Assets, AssetInitOptions, UnresolvedAsset, ProgressCallback, Texture, AssetsBundle } from 'pixi-7';
declare class PixiAssets extends Rease {
    constructor(props: {
        pixi?: typeof Assets;
        method: 'init';
        options?: AssetInitOptions;
    } & ({
        children?: any;
    } | {
        callback?: (this: PixiAssets) => any;
    }));
    constructor(props: {
        pixi?: typeof Assets;
        method: 'add';
        assets: AssetsBundle['assets'];
    });
    constructor(props: {
        pixi?: typeof Assets;
        method: 'addBundle';
        bundleId: string;
        assets: AssetsBundle['assets'];
    });
    constructor(props: {
        pixi?: typeof Assets;
        method: 'load';
        url: string | UnresolvedAsset;
        onProgress?: ProgressCallback;
        unload?: Boolean;
    } & ({
        children?: any;
    } | {
        callback?: (this: PixiAssets, texture: Texture) => any;
    }));
    constructor(props: {
        pixi?: typeof Assets;
        method: 'load';
        urls: string[] | UnresolvedAsset[];
        onProgress?: ProgressCallback;
        unload?: Boolean;
    } & ({
        children?: any;
    } | {
        callback?: (this: PixiAssets, textures: Record<string, Texture>) => any;
    }));
    constructor(props: {
        pixi?: typeof Assets;
        method: 'loadBundle';
        bundleId: string;
        onProgress?: ProgressCallback;
        unload?: Boolean;
    } & ({
        children?: any;
    } | {
        callback?: (this: PixiAssets, texture: Texture) => any;
    }));
    constructor(props: {
        pixi?: typeof Assets;
        method: 'loadBundle';
        bundleIds: string[];
        onProgress?: ProgressCallback;
        unload?: Boolean;
    } & ({
        children?: any;
    } | {
        callback?: (this: PixiAssets, textures: Record<string, Texture>) => any;
    }));
    constructor(props: {
        pixi?: typeof Assets;
        method: 'backgroundLoad';
        url: string;
        unload?: Boolean;
    } & ({
        children?: any;
    } | {
        callback?: (this: PixiAssets) => any;
    }));
    constructor(props: {
        pixi?: typeof Assets;
        method: 'backgroundLoad';
        urls: string[];
        unload?: Boolean;
    } & ({
        children?: any;
    } | {
        callback?: (this: PixiAssets) => any;
    }));
    constructor(props: {
        pixi?: typeof Assets;
        method: 'backgroundLoadBundle';
        bundleId: string;
        unload?: Boolean;
    } & ({
        children?: any;
    } | {
        callback?: (this: PixiAssets) => any;
    }));
    constructor(props: {
        pixi?: typeof Assets;
        method: 'backgroundLoadBundle';
        bundleIds: string[];
        unload?: Boolean;
    } & ({
        children?: any;
    } | {
        callback?: (this: PixiAssets) => any;
    }));
}
export { PixiAssets as Assets };
