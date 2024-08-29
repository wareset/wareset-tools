import { SDK } from './SDK'

export { SDK }
export type ISDK = typeof SDK
export type IPlayer = Awaited<ReturnType<ISDK['getPlayer']>>

export const logError = (error: any) => {
  error === void 0 || console.error(error)
}

let _init: Promise<ISDK>
export const init = () =>
  // @ts-ignore
  _init ||
  (_init =
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
export const openAuthDialog = () =>
  _authDialog ||
  (_authDialog = init()
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
export const getStorage = () =>
  _getStorage ||
  (_getStorage = init()
    .then((ysdk) => ysdk.getStorage())
    .catch((e) => (logError(e), SDK.getStorage())))

//
// Flags
//
export const getFlags = (params?: Parameters<ISDK['getFlags']>[0]) =>
  init()
    .then((ysdk) => ysdk.getFlags(params))
    .catch((e) => (logError(e), SDK.getFlags(params)))

//
// Player
//
let _player: IPlayer
let _getPlayer: any
let _scopes: boolean
const throwPlayer = () => {
  throw new Error('getPlayer: scopes must be ' + _scopes)
}
export const getPlayer = (params?: Parameters<ISDK['getPlayer']>[0]) =>
  _getPlayer
    ? _scopes !== (!params || params.scopes)
      ? throwPlayer()
      : _getPlayer
    : ((_scopes = !params || params.scopes),
      (_getPlayer = init()
        .then((ysdk) => ysdk.getPlayer(params))
        .then((player) => (_player = player))
        .catch((e) => (logError(e), _player || SDK.getPlayer(params)))))
