import { Filter as PIXI_Filter, type Container as PIXI_Container } from './__pixi__'

import type { IPropsWithRequiredPixi } from './utils'
import { __PixiRease__ } from './__PixiRease__'
import { watch_props, run_oncreate_and_onrender, watch_on_signal } from './utils'
import { _PixiDisplayObject_ } from './DisplayObject'

function _move(iam: PixiFilter<any>) {
  const { parent, next } = iam.findParentOrNext(_PixiDisplayObject_, PixiFilter)
  const pixi = iam.pixi
  const pixiNext = next && next.pixi
  const pixiParent = parent && parent.pixi

  const pixiNextLast = iam._pixiNextLast
  const pixiParentLast = iam._pixiParentLast

  let idx: number
  if (pixiParentLast) {
    const filters = pixiParentLast.filters
    if (filters && (idx = filters.indexOf(pixi)) > -1) {
      filters.splice(idx, 1)
      if (pixiParentLast !== pixiParent) pixiParentLast.filters = filters.slice()
    }
  }

  if (pixiParent) {
    let filters = pixiParent.filters
    filters = Array.isArray(filters) ? filters.slice() : filters ? [filters] : []
    pixiNextLast && (idx = filters.indexOf(pixi)) > -1
      ? filters.splice(idx, 0, pixi)
      : filters.push(pixi)
    pixiParent.filters = filters
  }

  iam._pixiNextLast = pixiNext
  iam._pixiParentLast = pixiParent
}
function _destroy(iam: PixiFilter<any>) {
  _move(iam)
  iam.pixi.destroy()
}

export class PixiFilter<Filter extends PIXI_Filter> extends __PixiRease__ {
  readonly pixi: Filter
  constructor({
    onCreate,
    onRender,
    $onSignal$,
    children,
    $props$,
    pixi
  }: IPropsWithRequiredPixi<PixiFilter<Filter>, Filter>) {
    super()
    this.pixi = pixi
    watch_props(this, $props$)
    _move(this)
    this.onMove(_move)
    run_oncreate_and_onrender(this, onCreate, onRender)
    this.insert(children)
    watch_on_signal(this, $onSignal$)
    this.onDestroy(_destroy)
  }

  _pixiNextLast: PIXI_Filter | undefined
  _pixiParentLast: PIXI_Container | undefined
}
