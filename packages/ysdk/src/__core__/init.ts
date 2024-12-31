import { SDK } from './SDK'

export { SDK }
export type ISDK = typeof SDK
export type IPlayer = Awaited<ReturnType<ISDK['getPlayer']>>

export const logError = (error: any) => {
  error === void 0 || console.error(error)
}

let _sdk: Promise<ISDK>
export const getSDK = (): Promise<ISDK> =>
  _sdk ||
  (_sdk =
    // @ts-ignore
    typeof YaGames !== 'undefined'
      ? // @ts-ignore
        YaGames.init()
          .then((ysdk: any) => ysdk || SDK)
          .catch((e: any) => (logError(e), SDK))
      : Promise.resolve(SDK))

//
// Auth
//
let _authDialog: Promise<boolean> | null
export const openAuthDialog = (): Promise<boolean> =>
  _authDialog ||
  (_authDialog = getSDK()
    .then((ysdk) =>
      ysdk.auth
        .openAuthDialog()
        .then(() => ((_authDialog = null), true))
        .catch(() => ((_authDialog = null), false))
    )
    .catch((e) => (logError(e), ((_authDialog = null), false))))

//
// Storage
//
let _getStorage: Promise<typeof localStorage>
export const getStorage = (): ReturnType<ISDK['getStorage']> =>
  _getStorage ||
  (_getStorage = getSDK()
    .then((ysdk) => ysdk.getStorage())
    .catch((e) => (logError(e), SDK.getStorage())))

//
// Flags
//
export const getFlags = (
  params?: Parameters<ISDK['getFlags']>[0]
): ReturnType<ISDK['getFlags']> =>
  getSDK()
    .then((ysdk) => ysdk.getFlags(params))
    .catch((e) => (logError(e), SDK.getFlags(params)))

//
// Player
//
let _player: IPlayer
let _getPlayer: any
let _scopes = false
const throwPlayer = () => {
  throw new Error('getPlayer: scopes must be ' + _scopes)
}
export const getPlayer = (
  params?: Parameters<ISDK['getPlayer']>[0]
): ReturnType<ISDK['getPlayer']> => (
  params &&
    'scopes' in params &&
    (_getPlayer ? !_scopes !== !params.scopes && throwPlayer() : (_scopes = !!params.scopes)),
  _getPlayer
    ? _getPlayer
    : (_getPlayer = getSDK()
        .then((ysdk) => ysdk.getPlayer({ scopes: _scopes }))
        .then((player) => (_player = player))
        .catch((e) => (logError(e), _player || SDK.getPlayer())))
)
