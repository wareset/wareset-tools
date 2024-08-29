import { init, logError, SDK, type ISDK } from './init'

let _environment: ISDK['environment']
export const getEnv = (): Promise<typeof _environment> =>
  init()
    .then((ysdk) => (_environment = ysdk.environment))
    .catch((e) => (logError(e), _environment || SDK.environment))
