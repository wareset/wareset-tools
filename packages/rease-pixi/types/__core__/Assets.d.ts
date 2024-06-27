import { Rease } from 'rease';
import type { Assets, AssetInitOptions, UnresolvedAsset, ProgressCallback, Texture, AssetsBundle } from 'pixi.js';
declare class PixiAssets extends Rease {
    constructor(props: {
        pixi: typeof Assets;
        method: 'init';
        options?: AssetInitOptions;
        children?: (this: PixiAssets) => any;
    });
    constructor(props: {
        pixi: typeof Assets;
        method: 'add';
        assets: AssetsBundle['assets'];
    });
    constructor(props: {
        pixi: typeof Assets;
        method: 'addBundle';
        bundleId: string;
        assets: AssetsBundle['assets'];
    });
    constructor(props: {
        pixi: typeof Assets;
        method: 'load';
        url: string | UnresolvedAsset;
        onProgress?: ProgressCallback;
        children?: (this: PixiAssets, texture: Texture) => any;
        unload?: Boolean;
    });
    constructor(props: {
        pixi: typeof Assets;
        method: 'load';
        urls: string[] | UnresolvedAsset[];
        onProgress?: ProgressCallback;
        children?: (this: PixiAssets, textures: Record<string, Texture>) => any;
        unload?: Boolean;
    });
    constructor(props: {
        pixi: typeof Assets;
        method: 'loadBundle';
        bundleId: string;
        onProgress?: ProgressCallback;
        children?: (this: PixiAssets, texture: Texture) => any;
        unload?: Boolean;
    });
    constructor(props: {
        pixi: typeof Assets;
        method: 'loadBundle';
        bundleIds: string[];
        onProgress?: ProgressCallback;
        children?: (this: PixiAssets, textures: Record<string, Texture>) => any;
        unload?: Boolean;
    });
    constructor(props: {
        pixi: typeof Assets;
        method: 'backgroundLoad';
        url: string;
        children?: (this: PixiAssets) => any;
        unload?: Boolean;
    });
    constructor(props: {
        pixi: typeof Assets;
        method: 'backgroundLoad';
        urls: string[];
        children?: (this: PixiAssets) => any;
        unload?: Boolean;
    });
    constructor(props: {
        pixi: typeof Assets;
        method: 'backgroundLoadBundle';
        bundleId: string;
        children?: (this: PixiAssets) => any;
        unload?: Boolean;
    });
    constructor(props: {
        pixi: typeof Assets;
        method: 'backgroundLoadBundle';
        bundleIds: string[];
        children?: (this: PixiAssets) => any;
        unload?: Boolean;
    });
}
export { PixiAssets as Assets };
