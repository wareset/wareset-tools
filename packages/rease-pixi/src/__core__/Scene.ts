import { Rease } from 'rease'

import { Renderer as PixiRenderer } from './Renderer'

import { type PropsScene, parse_pixi_props } from './utils'

import type {
  // Container
  Container,
  ContainerOptions,
  // Sprite,
  Sprite,
  SpriteOptions,
  Texture,
  // AnimatedSprite,
  AnimatedSprite,
  FrameObject,
  // TilingSprite,
  TilingSprite,
  TilingSpriteOptions,
  // NineSliceSprite,
  NineSliceSprite,
  NineSliceSpriteOptions,
  // Graphics,
  Graphics,
  GraphicsOptions,
  GraphicsContext,
  // Mesh,
  Mesh,
  MeshOptions,
  MeshGeometry,
  TextureShader,
  // MeshSimple,
  MeshSimple,
  SimpleMeshOptions,
  // MeshPlane,
  MeshPlane,
  MeshPlaneOptions,
  // MeshRope,
  MeshRope,
  MeshRopeOptions,
  // Text,
  Text,
  TextOptions,
  // BitmapText,
  BitmapText,
  // HTMLText,
  HTMLText,
  HTMLTextOptions,
} from 'pixi.js'

/*
extends
    | Container
    | Sprite
    | AnimatedSprite
    | TilingSprite
    | NineSliceSprite
    | Graphics
    | Mesh
    | MeshSimple
    | MeshPlane
    | MeshRope
    | Text
    | BitmapText
    | HTMLText
*/

class PixiScene<Pixi extends Container = Container> extends Rease {
  readonly pixi: Pixi & { _rease?: PixiScene<Pixi> }
  PixiRenderer?: PixiRenderer

  constructor(props: PropsScene<Container> & { options?: ContainerOptions })
  constructor(props: PropsScene<Sprite> & { options?: SpriteOptions | Texture })
  constructor(props: PropsScene<AnimatedSprite> & { options: Texture[] | FrameObject[] })
  constructor(props: PropsScene<TilingSprite> & { options?: Texture | TilingSpriteOptions })
  constructor(
    props: PropsScene<NineSliceSprite> & { options: NineSliceSpriteOptions | Texture }
  )
  constructor(props: PropsScene<Graphics> & { options?: GraphicsOptions | GraphicsContext })
  constructor(props: PropsScene<Mesh> & { options: MeshOptions<MeshGeometry, TextureShader> })
  constructor(props: PropsScene<MeshSimple> & { options: SimpleMeshOptions })
  constructor(props: PropsScene<MeshPlane> & { options: MeshPlaneOptions })
  constructor(props: PropsScene<MeshRope> & { options: MeshRopeOptions })
  constructor(props: PropsScene<Text> & { options?: TextOptions })
  constructor(props: PropsScene<BitmapText> & { options?: TextOptions })
  constructor(props: PropsScene<HTMLText> & { options?: HTMLTextOptions })
  constructor(props: PropsScene<Pixi> & { options?: any }) {
    super()
    this.pixi = new props.pixi(props.options)
    this.pixi._rease = this
    this.onMove(this.hookMove, this), move(this)
    parse_pixi_props(this, props)
    this.insert(props.children)
    this.onDestroy(this.hookDestroy)
  }

  update() {
    this.PixiRenderer && this.PixiRenderer.update()
  }

  hookMove(rease: Rease, _from: Rease | null, _to: Rease | null) {
    if (rease && rease !== this) {
      for (let parent = this as Rease; (parent = parent.parent!); ) {
        if (parent instanceof PixiScene) return void (this.PixiRenderer = parent.PixiRenderer)
        if (parent === rease) break
      }
    }

    move(this)
  }

  hookDestroy(iam: this) {
    removePixiRenderer(iam)
    iam.update()
    iam.pixi.removeFromParent()
    iam.pixi.destroy()
  }
}

function removePixiRenderer(iam: PixiScene) {
  const PixiRenderer = iam.PixiRenderer
  if (PixiRenderer) {
    if (PixiRenderer.PixiScene === iam) {
      PixiRenderer.PixiScene = PixiRenderer._renderOptions = void 0
    }
    iam.PixiRenderer = void 0
  }
}
const _PERENT_CLASSES = [PixiRenderer, PixiScene]
function move(iam: PixiScene) {
  removePixiRenderer(iam)
  const { parent, next } = iam.findParentOrNext(_PERENT_CLASSES, PixiScene)
  const pixi = iam.pixi
  pixi.removeFromParent()
  if (parent instanceof PixiRenderer) {
    parent.PixiScene = iam
    parent._renderOptions = { container: pixi }
    iam.PixiRenderer = parent
  } else {
    const pixiNext = next && next.pixi
    const pixiParent = (pixiNext && pixiNext.parent) || (parent && parent.pixi)
    if (pixiParent) {
      pixiNext
        ? pixiParent.addChildAt(pixi, pixiParent.getChildIndex(pixiNext))
        : pixiParent.addChild(pixi)
      // pixiParent.addChild(pixi)

      // const c = pixiParent.children
      // if (pixiNext) {
      //   const i = pixiParent.getChildIndex(pixiNext)
      //   if (c[i - 1] !== pixi) pixiParent.addChildAt(pixi, i)
      // } else {
      //   if (c[c.length - 1] !== pixi) pixiParent.addChild(pixi)
      // }
      iam.PixiRenderer = (parent || next).PixiRenderer
    }
  }
  iam.update()
}
// function _destroy(iam: PixiScene) {
//   removePixiRenderer(iam)
//   iam.pixi.destroy()
// }

export { PixiScene as Scene }
