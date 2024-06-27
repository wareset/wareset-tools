import {
  Container as PIXI_Container,
  ParticleContainer as PIXI_ParticleContainer,
  type IParticleProperties as PIXI_IParticleProperties,
  Sprite as PIXI_Sprite,
  type Texture as PIXI_Texture,
  TilingSprite as PIXI_TilingSprite,
  Text as PIXI_Text,
  type TextStyle as PIXI_TextStyle,
  type ITextStyle as PIXI_ITextStyle,
  type ICanvas as PIXI_ICanvas,
  AnimatedSprite as PIXI_AnimatedSprite,
  type FrameObject as PIXI_FrameObject,
  HTMLText as PIXI_HTMLText,
  type HTMLTextStyle as PIXI_HTMLTextStyle,
  Graphics as PIXI_Graphics,
  type GraphicsGeometry as PIXI_GraphicsGeometry,
  Mesh as PIXI_Mesh,
  type Shader as PIXI_Shader,
  type MeshMaterial as PIXI_MeshMaterial,
  type Geometry as PIXI_Geometry,
  type State as PIXI_State,
  type DRAW_MODES as PIXI_DRAW_MODES,
  SimplePlane as PIXI_SimplePlane,
  NineSlicePlane as PIXI_NineSlicePlane,
  SimpleMesh as PIXI_SimpleMesh,
  type IArrayBuffer as PIXI_IArrayBuffer,
  SimpleRope as PIXI_SimpleRope,
  type IPoint as PIXI_IPoint,
  type IBitmapTextStyle as PIXI_IBitmapTextStyle,
  BitmapText as PIXI_BitmapText
} from './__pixi__'

import { type IMaybeSubscribable } from 'rease'

import type { IDeepPartial } from './utils'
import type {
  IPropsWithoutOptions,
  IPropsWithOptionalOptions,
  IPropsWithRequiredOptions
} from './utils'
import { __PixiRease__ } from './__PixiRease__'
import { watch_props, run_oncreate_and_onrender, watch_on_signal } from './utils'

function _move(iam: _PixiDisplayObject_) {
  const { parent, next } = iam.findParentOrNext(_PixiDisplayObject_, _PixiDisplayObject_)
  const pixi = iam.pixi
  const pixiNext = next && next.pixi
  const pixiParent = (pixiNext && pixiNext.parent) || (parent && parent.pixi)
  if (pixiParent) {
    pixiNext
      ? // @ts-ignore
        pixiParent.addChildAt(pixi, pixiParent.getChildIndex(pixiNext))
      : // @ts-ignore
        pixiParent.addChild(pixi)
  } else {
    pixi.removeFromParent()
  }
}
function _destroy(iam: _PixiDisplayObject_) {
  _move(iam)
  iam.pixi.destroy()
}

//
//
// DisplayObject
export class _PixiDisplayObject_<DO extends PIXI_Container = PIXI_Container> extends __PixiRease__ {
  readonly pixi: DO
  constructor({
    onCreate,
    onRender,
    $onSignal$,
    children,
    $props$,
    pixi
  }: {
    onCreate: any
    onRender: any
    $onSignal$: any
    children: any
    $props$: IMaybeSubscribable<IDeepPartial<DO>> | undefined
    pixi: DO
  }) {
    super()
    this.pixi = pixi
    // console.log(this)
    watch_props(this, $props$)
    _move(this)
    this.onMove(_move)
    run_oncreate_and_onrender(this, onCreate, onRender)
    this.insert(children)
    watch_on_signal(this, $onSignal$)
    this.onDestroy(_destroy)
  }
}

// //
// //
// // Container
export class PixiContainer extends _PixiDisplayObject_<PIXI_Container> {
  constructor({
    onCreate,
    onRender,
    $onSignal$,
    children,
    $props$,
    pixi
  }: IPropsWithoutOptions<PixiContainer, PIXI_Container>) {
    super({
      onCreate,
      onRender,
      $onSignal$,
      children,
      $props$,
      pixi: pixi || new PIXI_Container()
    })
  }
}

// @ts-ignore
export class PixiParticleContainer extends _PixiDisplayObject_<PIXI_ParticleContainer> {
  constructor({
    onCreate,
    onRender,
    $onSignal$,
    children,
    options,
    $props$,
    pixi
  }: IPropsWithOptionalOptions<
    PixiParticleContainer,
    PIXI_ParticleContainer,
    {
      maxSize?: number
      properties?: PIXI_IParticleProperties
      batchSize?: number
      autoResize?: boolean
    }
  >) {
    options || (options = {})
    super({
      onCreate,
      onRender,
      $onSignal$,
      children,
      $props$,
      pixi:
        pixi ||
        new PIXI_ParticleContainer(
          options.maxSize,
          options.properties,
          options.batchSize,
          options.autoResize
        )
    })
  }
}

// // //
// // //
// // // Sprite
export class PixiSprite extends _PixiDisplayObject_<PIXI_Sprite> {
  constructor({
    onCreate,
    onRender,
    $onSignal$,
    children,
    options,
    $props$,
    pixi
  }: IPropsWithOptionalOptions<PixiSprite, PIXI_Sprite, { texture?: PIXI_Texture }>) {
    options || (options = {})
    super({
      onCreate,
      onRender,
      $onSignal$,
      children,
      $props$,
      pixi: pixi || new PIXI_Sprite(options.texture)
    })
  }
}

export class PixiTilingSprite extends _PixiDisplayObject_<PIXI_TilingSprite> {
  constructor({
    onCreate,
    onRender,
    $onSignal$,
    children,
    options,
    $props$,
    pixi
  }: IPropsWithRequiredOptions<
    PixiTilingSprite,
    PIXI_TilingSprite,
    { texture: PIXI_Texture; width?: number; height?: number }
  >) {
    super({
      onCreate,
      onRender,
      $onSignal$,
      children,
      $props$,
      pixi: pixi || new PIXI_TilingSprite(options.texture, options.width, options.height)
    })
  }
}

export class PixiText extends _PixiDisplayObject_<PIXI_Text> {
  constructor({
    onCreate,
    onRender,
    $onSignal$,
    children,
    options,
    $props$,
    pixi
  }: IPropsWithOptionalOptions<
    PixiText,
    PIXI_Text,
    {
      text?: string | number
      style?: Partial<PIXI_ITextStyle> | PIXI_TextStyle
      canvas?: PIXI_ICanvas
    }
  >) {
    options || (options = {})
    super({
      onCreate,
      onRender,
      $onSignal$,
      children,
      $props$,
      pixi: pixi || new PIXI_Text(options.text, options.style, options.canvas)
    })
  }
}

export class PixiAnimatedSprite extends _PixiDisplayObject_<PIXI_AnimatedSprite> {
  constructor({
    onCreate,
    onRender,
    $onSignal$,
    children,
    options,
    $props$,
    pixi
  }: IPropsWithRequiredOptions<
    PixiAnimatedSprite,
    PIXI_AnimatedSprite,
    { textures: PIXI_Texture[] | PIXI_FrameObject[]; autoUpdate?: boolean }
  >) {
    super({
      onCreate,
      onRender,
      $onSignal$,
      children,
      $props$,
      pixi: pixi || new PIXI_AnimatedSprite(options.textures, options.autoUpdate)
    })
  }
}

export class PixiHTMLText extends _PixiDisplayObject_<PIXI_HTMLText> {
  constructor({
    onCreate,
    onRender,
    $onSignal$,
    children,
    options,
    $props$,
    pixi
  }: IPropsWithOptionalOptions<
    PixiHTMLText,
    PIXI_HTMLText,
    { text?: string; style?: PIXI_HTMLTextStyle | PIXI_TextStyle | Partial<PIXI_ITextStyle> }
  >) {
    options || (options = {})
    super({
      onCreate,
      onRender,
      $onSignal$,
      children,
      $props$,
      pixi: pixi || new PIXI_HTMLText(options.text, options.style)
    })
  }
}
// // // Sprite
// // //
// // //

export class PixiGraphics extends _PixiDisplayObject_<PIXI_Graphics> {
  constructor({
    onCreate,
    onRender,
    $onSignal$,
    children,
    options,
    $props$,
    pixi
  }: IPropsWithOptionalOptions<PixiGraphics, PIXI_Graphics, { geometry?: PIXI_GraphicsGeometry }>) {
    options || (options = {})
    super({
      onCreate,
      onRender,
      $onSignal$,
      children,
      $props$,
      pixi: pixi || new PIXI_Graphics(options.geometry)
    })
  }
}

// // //
// // //
// // //  Mesh
export class PixiMesh<T extends PIXI_Shader = PIXI_MeshMaterial> extends _PixiDisplayObject_<
  PIXI_Mesh<T>
> {
  constructor({
    onCreate,
    onRender,
    $onSignal$,
    children,
    options,
    $props$,
    pixi
  }: IPropsWithRequiredOptions<
    PixiMesh<T>,
    PIXI_Mesh<T>,
    { geometry: PIXI_Geometry; shader: T; state?: PIXI_State; drawMode?: PIXI_DRAW_MODES }
  >) {
    super({
      onCreate,
      onRender,
      $onSignal$,
      children,
      $props$,
      pixi:
        pixi || new PIXI_Mesh<T>(options.geometry, options.shader, options.state, options.drawMode)
    })
  }
}

// // // //
// // // //
// // // // SimplePlane
export class PixiSimplePlane extends _PixiDisplayObject_<PIXI_SimplePlane> {
  constructor({
    onCreate,
    onRender,
    $onSignal$,
    children,
    options,
    $props$,
    pixi
  }: IPropsWithRequiredOptions<
    PixiSimplePlane,
    PIXI_SimplePlane,
    { texture: PIXI_Texture; verticesX?: number; verticesY?: number }
  >) {
    super({
      onCreate,
      onRender,
      $onSignal$,
      children,
      $props$,
      pixi: pixi || new PIXI_SimplePlane(options.texture, options.verticesX, options.verticesY)
    })
  }
}

export class PixiNineSlicePlane extends _PixiDisplayObject_<PIXI_NineSlicePlane> {
  constructor({
    onCreate,
    onRender,
    $onSignal$,
    children,
    options,
    $props$,
    pixi
  }: IPropsWithRequiredOptions<
    PixiNineSlicePlane,
    PIXI_NineSlicePlane,
    {
      texture: PIXI_Texture
      leftWidth?: number
      topHeight?: number
      rightWidth?: number
      bottomHeight?: number
    }
  >) {
    super({
      onCreate,
      onRender,
      $onSignal$,
      children,
      $props$,
      pixi:
        pixi ||
        new PIXI_NineSlicePlane(
          options.texture,
          options.leftWidth,
          options.topHeight,
          options.rightWidth,
          options.bottomHeight
        )
    })
  }
}
// // // // SimplePlane
// // // //
// // // //

export class PixiSimpleMesh extends _PixiDisplayObject_<PIXI_SimpleMesh> {
  constructor({
    onCreate,
    onRender,
    $onSignal$,
    children,
    options,
    $props$,
    pixi
  }: IPropsWithOptionalOptions<
    PixiSimpleMesh,
    PIXI_SimpleMesh,
    {
      texture?: PIXI_Texture
      vertices?: PIXI_IArrayBuffer
      uvs?: PIXI_IArrayBuffer
      indices?: PIXI_IArrayBuffer
      drawMode?: PIXI_DRAW_MODES
    }
  >) {
    options || (options = {})
    super({
      onCreate,
      onRender,
      $onSignal$,
      children,
      $props$,
      pixi:
        pixi ||
        new PIXI_SimpleMesh(
          options.texture,
          options.vertices,
          options.uvs,
          options.indices,
          options.drawMode
        )
    })
  }
}

export class PixiSimpleRope extends _PixiDisplayObject_<PIXI_SimpleRope> {
  constructor({
    onCreate,
    onRender,
    $onSignal$,
    children,
    options,
    $props$,
    pixi
  }: IPropsWithRequiredOptions<
    PixiSimpleRope,
    PIXI_SimpleRope,
    { texture: PIXI_Texture; points: PIXI_IPoint[]; textureScale?: number }
  >) {
    super({
      onCreate,
      onRender,
      $onSignal$,
      children,
      $props$,
      pixi: pixi || new PIXI_SimpleRope(options.texture, options.points, options.textureScale)
    })
  }
}
// // // Mesh
// // //
// // //

export class PixiBitmapText extends _PixiDisplayObject_<PIXI_BitmapText> {
  constructor({
    onCreate,
    onRender,
    $onSignal$,
    children,
    options,
    $props$,
    pixi
  }: IPropsWithRequiredOptions<
    PixiBitmapText,
    PIXI_BitmapText,
    { text: string; style?: Partial<PIXI_IBitmapTextStyle> }
  >) {
    super({
      onCreate,
      onRender,
      $onSignal$,
      children,
      $props$,
      pixi: pixi || new PIXI_BitmapText(options.text, options.style)
    })
  }
}
// // Container
// //
// //

// DisplayObject
//
//
