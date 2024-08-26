import { init, showError} from './init'

export const getServerTime = () =>
  init()
    .then((ysdk) => (ysdk ? ysdk.serverTime() : Date.now()))
    .catch((e) => (showError(e), Date.now()))
