import { init, logError } from './init'

export const serverTime = () =>
  init()
    .then((ysdk) => ysdk.serverTime())
    .catch(logError)
