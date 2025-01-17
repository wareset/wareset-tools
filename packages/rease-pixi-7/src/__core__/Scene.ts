import { Rease } from 'rease'

import { IProps } from './types'

import { Renderer } from './Renderer'

import { parse_props_before_insert, parse_props_after_insert } from './utils'

//
// DisplayObject
class __PixiScene__ extends Rease {
  readonly pixi: any
  PixiRenderer?: Renderer | undefined
  constructor(props: IProps<any>, pixi: any) {
    super()
    this.pixi = pixi
    // this.pixi._rease = this
    this.onMove(this.hookMove, this), move(this)
    parse_props_before_insert(this, props)
    this.insert(props.children)
    parse_props_after_insert(this, props)
    this.onDestroy(this.hookDestroy)
  }

  update() {
    this.PixiRenderer && this.PixiRenderer.update()
  }

  protected hookMove(rease: Rease, _from: Rease | null, _to: Rease | null) {
    if (rease && rease !== this) {
      for (let parent = this as Rease; (parent = parent.parent!); ) {
        if (parent instanceof __PixiScene__) {
          this.PixiRenderer = parent.PixiRenderer
          return
        }
        if (parent === rease) break
      }
    }
    move(this)
  }

  protected hookDestroy(iam: this) {
    removePixiRenderer(iam)
    iam.pixi.removeFromParent()
    iam.pixi.destroy()
    iam.update()
  }
}
export { __PixiScene__ as __Scene__ }

function removePixiRenderer(iam: __PixiScene__) {
  const PixiRenderer = iam.PixiRenderer
  if (PixiRenderer) {
    if (PixiRenderer.PixiScene === iam) PixiRenderer.PixiScene = void 0
    iam.PixiRenderer = void 0
  }
}
const PARENT_CLASSES = [Renderer, __PixiScene__]
function move(iam: __PixiScene__) {
  removePixiRenderer(iam)
  const { parent, next } = iam.findParentOrNext(PARENT_CLASSES, __PixiScene__)
  const pixi = iam.pixi
  pixi.removeFromParent()
  if (parent instanceof Renderer) {
    parent.PixiScene = iam
    iam.PixiRenderer = parent
  } else {
    const pixiNext = next && next.pixi
    const pixiParent = (pixiNext && pixiNext.parent) || (parent && parent.pixi)
    if (pixiParent) {
      pixiNext
        ? pixiParent.addChildAt(pixi, pixiParent.getChildIndex(pixiNext))
        : pixiParent.addChild(pixi)
      iam.PixiRenderer = (parent || next).PixiRenderer
    }
  }
  iam.update()
}

// //
// // Container
class PixiSceneContainer extends __PixiScene__ {
  declare readonly pixi: PIXI.Container
  constructor(props: IProps<PixiSceneContainer>) {
    super(props, new PIXI.Container())
  }
}
export { PixiSceneContainer as SceneContainer }

class PixiSceneParticleContainer extends __PixiScene__ {
  declare readonly pixi: PIXI.ParticleContainer
  constructor(
    props: IProps<PixiSceneParticleContainer> & {
      options?: {
        maxSize?: number
        properties?: PIXI.IParticleProperties
        batchSize?: number
        autoResize?: boolean
      }
    }
  ) {
    const op = props.options || {}
    super(
      props,
      new PIXI.ParticleContainer(op.maxSize, op.properties, op.batchSize, op.autoResize)
    )
  }
}
export { PixiSceneParticleContainer as SceneParticleContainer }

// // //
// // // Sprite
class PixiSceneSprite extends __PixiScene__ {
  declare readonly pixi: PIXI.Sprite
  constructor(
    props: IProps<PixiSceneSprite> & {
      options?: {
        texture?: PIXI.Texture
      }
    }
  ) {
    const op = props.options || {}
    super(props, new PIXI.Sprite(op.texture))
  }
}
export { PixiSceneSprite as SceneSprite }

class PixiSceneTilingSprite extends __PixiScene__ {
  declare readonly pixi: PIXI.TilingSprite
  constructor(
    props: IProps<PixiSceneTilingSprite> & {
      options: {
        texture: PIXI.Texture
        width?: number
        height?: number
      }
    }
  ) {
    const op = props.options
    super(props, new PIXI.TilingSprite(op.texture, op.width, op.height))
  }
}
export { PixiSceneTilingSprite as SceneTilingSprite }

class PixiSceneText extends __PixiScene__ {
  declare readonly pixi: PIXI.Text
  constructor(
    props: IProps<PixiSceneText> & {
      options?: {
        text?: string | number
        style?: Partial<PIXI.ITextStyle> | PIXI.TextStyle
        canvas?: PIXI.ICanvas
      }
    }
  ) {
    const op = props.options || {}
    super(props, new PIXI.Text(op.text, op.style, op.canvas))
  }
}
export { PixiSceneText as SceneText }

class PixiSceneAnimatedSprite extends __PixiScene__ {
  declare readonly pixi: PIXI.AnimatedSprite
  constructor(
    props: IProps<PixiSceneAnimatedSprite> & {
      options: {
        textures: PIXI.Texture[] | PIXI.FrameObject[]
        autoUpdate?: boolean
      }
    }
  ) {
    const op = props.options
    super(props, new PIXI.AnimatedSprite(op.textures, op.autoUpdate))
  }
}
export { PixiSceneAnimatedSprite as SceneAnimatedSprite }

class PixiSceneHTMLText extends __PixiScene__ {
  declare readonly pixi: PIXI.HTMLText
  constructor(
    props: IProps<PixiSceneHTMLText> & {
      options?: {
        text?: string
        style?: PIXI.HTMLTextStyle | PIXI.TextStyle | Partial<PIXI.ITextStyle>
      }
    }
  ) {
    const op = props.options || {}
    super(props, new PIXI.HTMLText(op.text, op.style))
  }
}
export { PixiSceneHTMLText as SceneHTMLText }
// // // Sprite
// // //

class PixiSceneGraphics extends __PixiScene__ {
  declare readonly pixi: PIXI.Graphics
  constructor(
    props: IProps<PixiSceneGraphics> & {
      options?: {
        geometry?: PIXI.GraphicsGeometry
      }
    }
  ) {
    const op = props.options || {}
    super(props, new PIXI.Graphics(op.geometry))
  }
}
export { PixiSceneGraphics as SceneGraphics }

// // //
// // //  Mesh
class PixiSceneMesh extends __PixiScene__ {
  declare readonly pixi: PIXI.Mesh
  constructor(
    props: IProps<PixiSceneMesh> & {
      options: {
        geometry: PIXI.Geometry
        shader: PIXI.Shader
        state?: PIXI.State
        drawMode?: PIXI.DRAW_MODES
      }
    }
  ) {
    const op = props.options
    super(props, new PIXI.Mesh(op.geometry, op.shader, op.state, op.drawMode))
  }
}
export { PixiSceneMesh as SceneMesh }

// // // //
// // // // SimplePlane
class PixiSceneSimplePlane extends __PixiScene__ {
  declare readonly pixi: PIXI.SimplePlane
  constructor(
    props: IProps<PixiSceneSimplePlane> & {
      options: {
        texture: PIXI.Texture
        verticesX?: number
        verticesY?: number
      }
    }
  ) {
    const op = props.options
    super(props, new PIXI.SimplePlane(op.texture, op.verticesX, op.verticesY))
  }
}
export { PixiSceneSimplePlane as SceneSimplePlane }

class PixiSceneNineSlicePlane extends __PixiScene__ {
  declare readonly pixi: PIXI.NineSlicePlane
  constructor(
    props: IProps<PixiSceneNineSlicePlane> & {
      options: {
        texture: PIXI.Texture
        leftWidth?: number
        topHeight?: number
        rightWidth?: number
        bottomHeight?: number
      }
    }
  ) {
    const op = props.options
    super(
      props,
      new PIXI.NineSlicePlane(
        op.texture,
        op.leftWidth,
        op.topHeight,
        op.rightWidth,
        op.bottomHeight
      )
    )
  }
}
export { PixiSceneNineSlicePlane as SceneNineSlicePlane }
// // // // SimplePlane
// // // //

class PixiSceneSimpleMesh extends __PixiScene__ {
  declare readonly pixi: PIXI.SimpleMesh
  constructor(
    props: IProps<PixiSceneSimpleMesh> & {
      options?: {
        texture?: PIXI.Texture
        vertices?: PIXI.IArrayBuffer
        uvs?: PIXI.IArrayBuffer
        indices?: PIXI.IArrayBuffer
        drawMode?: PIXI.DRAW_MODES
      }
    }
  ) {
    const op = props.options || {}
    super(props, new PIXI.SimpleMesh(op.texture, op.vertices, op.uvs, op.indices, op.drawMode))
  }
}
export { PixiSceneSimpleMesh as SceneSimpleMesh }

class PixiSceneSimpleRope extends __PixiScene__ {
  declare readonly pixi: PIXI.SimpleRope
  constructor(
    props: IProps<PixiSceneSimpleRope> & {
      options: {
        texture: PIXI.Texture
        points: PIXI.IPoint[]
        textureScale?: number
      }
    }
  ) {
    const op = props.options
    super(props, new PIXI.SimpleRope(op.texture, op.points, op.textureScale))
  }
}
export { PixiSceneSimpleRope as SceneSimpleRope }
// // // Mesh
// // //

class PixiSceneBitmapText extends __PixiScene__ {
  declare readonly pixi: PIXI.BitmapText
  constructor(
    props: IProps<PixiSceneBitmapText> & {
      options: {
        text: string
        style?: Partial<PIXI.IBitmapTextStyle>
      }
    }
  ) {
    const op = props.options
    super(props, new PIXI.BitmapText(op.text, op.style))
  }
}
export { PixiSceneBitmapText as SceneBitmapText }
// // Container
// //

// DisplayObject
//
