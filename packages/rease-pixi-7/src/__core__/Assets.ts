import { Rease } from 'rease'

import type {
  Assets,
  AssetInitOptions,
  UnresolvedAsset,
  ProgressCallback,
  Texture,
  AssetsBundle,
} from 'pixi-7'

function _destroy(this: any) {
  const props = this
  props.assets[/Bundle$/.test(props.method) ? 'unloadBundle' : 'unload'](
    props.url || props.urls || props.bundleId || props.bundleIds
  )
}

function _await(this: { iam: PixiAssets; props: any }, v: any) {
  const { iam, props } = this
  if (props.unload) iam.onDestroy(_destroy, props)
  if (!iam.destroyed) {
    iam.insert(props.callback ? props.callback.call(iam, v) : props.children)
  }
}

class PixiAssets extends Rease {
  constructor(
    props: {
      pixi?: typeof Assets
      method: 'init'
      options?: AssetInitOptions
    } & ({ children?: any } | { callback?: (this: PixiAssets) => any })
  )
  constructor(props: { pixi?: typeof Assets; method: 'add'; assets: AssetsBundle['assets'] })
  constructor(props: {
    pixi?: typeof Assets
    method: 'addBundle'
    bundleId: string
    assets: AssetsBundle['assets']
  })
  constructor(
    props: {
      pixi?: typeof Assets
      method: 'load'
      url: string | UnresolvedAsset
      onProgress?: ProgressCallback
      unload?: Boolean
    } & ({ children?: any } | { callback?: (this: PixiAssets, texture: Texture) => any })
  )
  constructor(
    props: {
      pixi?: typeof Assets
      method: 'load'
      urls: string[] | UnresolvedAsset[]
      onProgress?: ProgressCallback
      unload?: Boolean
    } & (
      | { children?: any }
      | { callback?: (this: PixiAssets, textures: Record<string, Texture>) => any }
    )
  )
  constructor(
    props: {
      pixi?: typeof Assets
      method: 'loadBundle'
      bundleId: string
      onProgress?: ProgressCallback
      unload?: Boolean
    } & ({ children?: any } | { callback?: (this: PixiAssets, texture: Texture) => any })
  )
  constructor(
    props: {
      pixi?: typeof Assets
      method: 'loadBundle'
      bundleIds: string[]
      onProgress?: ProgressCallback
      unload?: Boolean
    } & (
      | { children?: any }
      | { callback?: (this: PixiAssets, textures: Record<string, Texture>) => any }
    )
  )
  constructor(
    props: {
      pixi?: typeof Assets
      method: 'backgroundLoad'
      url: string
      unload?: Boolean
    } & ({ children?: any } | { callback?: (this: PixiAssets) => any })
  )
  constructor(
    props: {
      pixi?: typeof Assets
      method: 'backgroundLoad'
      urls: string[]
      unload?: Boolean
    } & ({ children?: any } | { callback?: (this: PixiAssets) => any })
  )
  constructor(
    props: {
      pixi?: typeof Assets
      method: 'backgroundLoadBundle'
      bundleId: string
      unload?: Boolean
    } & ({ children?: any } | { callback?: (this: PixiAssets) => any })
  )
  constructor(
    props: {
      pixi?: typeof Assets
      method: 'backgroundLoadBundle'
      bundleIds: string[]
      unload?: Boolean
    } & ({ children?: any } | { callback?: (this: PixiAssets) => any })
  )
  constructor(props: any) {
    super()
    this.await(
      (props.pixi || (PIXI.Assets as any))[props.method](
        props.options ||
          props.url ||
          props.urls ||
          props.bundleId ||
          props.bundleIds ||
          props.assets,
        props.onProgress || props.assets
      ),
      _await,
      { iam: this, props }
    )
  }
}

export { PixiAssets as Assets }
