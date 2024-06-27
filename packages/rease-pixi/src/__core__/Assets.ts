import { Rease } from 'rease'

import type {
  Assets,
  AssetInitOptions,
  UnresolvedAsset,
  ProgressCallback,
  Texture,
  AssetsBundle
} from 'pixi.js'

function _destroy(this: any) {
  const props = this
  props.assets[/Bundle$/.test(props.method) ? 'unloadBundle' : 'unload'](
    props.url || props.urls || props.bundleId || props.bundleIds
  )
}

function _await(this: { iam: PixiAssets; props: any }, v: any) {
  const { iam, props } = this
  if (props.unset) iam.onDestroy(_destroy, props)
  if (!iam.destroyed) {
    const children = props.children
    iam.insert(typeof children === 'function' ? children.call(iam, v) : children)
  }
}

class PixiAssets extends Rease {
  constructor(props: {
    pixi: typeof Assets
    method: 'init'
    options?: AssetInitOptions
    children?: (this: PixiAssets) => any
  })
  constructor(props: {
    pixi: typeof Assets
    method: 'add'
    assets: AssetsBundle['assets']
  })
  constructor(props: {
    pixi: typeof Assets
    method: 'addBundle'
    bundleId: string
    assets: AssetsBundle['assets']
  })
  constructor(props: {
    pixi: typeof Assets
    method: 'load'
    url: string | UnresolvedAsset
    onProgress?: ProgressCallback
    children?: (this: PixiAssets, texture: Texture) => any
    unload?: Boolean
  })
  constructor(props: {
    pixi: typeof Assets
    method: 'load'
    urls: string[] | UnresolvedAsset[]
    onProgress?: ProgressCallback
    children?: (this: PixiAssets, textures: Record<string, Texture>) => any
    unload?: Boolean
  })
  constructor(props: {
    pixi: typeof Assets
    method: 'loadBundle'
    bundleId: string
    onProgress?: ProgressCallback
    children?: (this: PixiAssets, texture: Texture) => any
    unload?: Boolean
  })
  constructor(props: {
    pixi: typeof Assets
    method: 'loadBundle'
    bundleIds: string[]
    onProgress?: ProgressCallback
    children?: (this: PixiAssets, textures: Record<string, Texture>) => any
    unload?: Boolean
  })
  constructor(props: {
    pixi: typeof Assets
    method: 'backgroundLoad'
    url: string
    children?: (this: PixiAssets) => any
    unload?: Boolean
  })
  constructor(props: {
    pixi: typeof Assets
    method: 'backgroundLoad'
    urls: string[]
    children?: (this: PixiAssets) => any
    unload?: Boolean
  })
  constructor(props: {
    pixi: typeof Assets
    method: 'backgroundLoadBundle'
    bundleId: string
    children?: (this: PixiAssets) => any
    unload?: Boolean
  })
  constructor(props: {
    pixi: typeof Assets
    method: 'backgroundLoadBundle'
    bundleIds: string[]
    children?: (this: PixiAssets) => any
    unload?: Boolean
  })
  constructor(props: any) {
    super()
    this.await(
      props.pixi[props.method](
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
