import { init, showError } from './init'

let env = {
  app: {
    id: '',
  },
  i18n: {
    lang: '',
    tld: '',
  },
}

export const getEnv = (): Promise<typeof env> =>
  init()
    .then((ysdk) => (env = (ysdk && ysdk.environment) || env))
    .catch((e) => (showError(e), env))
