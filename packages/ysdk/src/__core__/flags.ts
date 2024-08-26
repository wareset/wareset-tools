import { init, showError } from './init'

type IFlags = { [key: string]: string }

type IFlagsParams = {
  defaultFlags?: IFlags
  clientFeatures?: { name: string; value: string }[]
}

const defFlags = (params?: IFlagsParams) => (params && params.defaultFlags) || {}
export const getFlags = (params?: IFlagsParams): Promise<IFlags> =>
  init()
    .then((ysdk) => (ysdk ? ysdk.getFlags(params) : defFlags(params)))
    .catch((e) => (showError(e), defFlags(params)))
