import { Rease } from 'rease'

function _destroy(this: any) {
  const props = this
  ;(props.assets || PIXI.Assets)[/Bundle$/.test(props.method) ? 'unloadBundle' : 'unload'](
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
      assets?: typeof PIXI.Assets
      method: 'init'
      options?: PIXI.AssetInitOptions
    } & ({ children?: any } | { callback?: (this: PixiAssets) => any })
  )
  constructor(props: {
    assets: typeof PIXI.Assets
    method: 'add'
    data: PIXI.UnresolvedAsset | PIXI.UnresolvedAsset[]
  })
  constructor(props: {
    assets: typeof PIXI.Assets
    method: 'addBundle'
    bundleId: string
    data: PIXI.AssetsBundle['assets']
  })
  constructor(
    props: {
      assets?: typeof PIXI.Assets
      method: 'load'
      url: string | PIXI.UnresolvedAsset
      onProgress?: PIXI.ProgressCallback
      unload?: boolean
    } & ({ children?: any } | { callback?: (this: PixiAssets, texture: PIXI.Texture) => any })
  )
  constructor(
    props: {
      assets?: typeof PIXI.Assets
      method: 'load'
      urls: string[] | PIXI.UnresolvedAsset[]
      onProgress?: PIXI.ProgressCallback
      unload?: boolean
    } & (
      | { children?: any }
      | { callback?: (this: PixiAssets, textures: Record<string, PIXI.Texture>) => any }
    )
  )
  constructor(
    props: {
      assets?: typeof PIXI.Assets
      method: 'loadBundle'
      bundleId: string
      onProgress?: PIXI.ProgressCallback
      unload?: boolean
    } & ({ children?: any } | { callback?: (this: PixiAssets, texture: PIXI.Texture) => any })
  )
  constructor(
    props: {
      assets?: typeof PIXI.Assets
      method: 'loadBundle'
      bundleIds: string[]
      onProgress?: PIXI.ProgressCallback
      unload?: boolean
    } & (
      | { children?: any }
      | { callback?: (this: PixiAssets, textures: Record<string, PIXI.Texture>) => any }
    )
  )
  constructor(
    props: {
      assets?: typeof PIXI.Assets
      method: 'backgroundLoad'
      url: string
      unload?: boolean
    } & ({ children?: any } | { callback?: (this: PixiAssets) => any })
  )
  constructor(
    props: {
      assets?: typeof PIXI.Assets
      method: 'backgroundLoad'
      urls: string[]
      unload?: boolean
    } & ({ children?: any } | { callback?: (this: PixiAssets) => any })
  )
  constructor(
    props: {
      assets?: typeof PIXI.Assets
      method: 'backgroundLoadBundle'
      bundleId: string
      unload?: boolean
    } & ({ children?: any } | { callback?: (this: PixiAssets) => any })
  )
  constructor(
    props: {
      assets?: typeof PIXI.Assets
      method: 'backgroundLoadBundle'
      bundleIds: string[]
      unload?: boolean
    } & ({ children?: any } | { callback?: (this: PixiAssets) => any })
  )
  constructor(props: any) {
    super()
    this.await(
      (props.assets || PIXI.Assets)[props.method](
        props.options ||
          props.url ||
          props.urls ||
          props.bundleId ||
          props.bundleIds ||
          props.data,
        props.onProgress || props.data
      ),
      _await,
      { iam: this, props }
    )
  }
}

export { PixiAssets as Assets }
