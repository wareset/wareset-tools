import { init, logError, SDK, type ISDK } from './init'

/*
Если вам достаточно знать идентификатор, а имя и аватар пользователя не нужны, используйте опциональный параметр scopes: false. В этом случае диалоговое окно с запросом доступа не будет показано.
*/

let _player: ReturnType<ISDK['getPlayer']> | null
export const player = () =>
  _playerWithAuth ||
  _player ||
  (_player = init()
    .then((ysdk) => ysdk.getPlayer({ scopes: false }))
    .catch((e) => (logError(e), SDK.getPlayer())))

let _playerWithAuth: ReturnType<ISDK['getPlayer']> | null
export const playerWithScopes = () =>
  _playerWithAuth ||
  (_player = _playerWithAuth =
    init()
      .then((ysdk) => ysdk.getPlayer({ scopes: true }))
      .catch((e) => (logError(e), SDK.getPlayer())))

const _getPlayerForData = () => _playerWithAuth || _player || player()

type IValidPlayerData =
  | string
  | number
  | boolean
  | IValidPlayerData[]
  | { [key: string]: IValidPlayerData }

//
// PlayerData
//
export const getData = (keys?: string[]) =>
  _getPlayerForData()
    .then((player) => (player ? player.getData(keys) : {}))
    .then((data) => (data ? { ...data } : {}))
    .catch((e) => (logError(e), {}))

export const setData = (data: { [key: string]: IValidPlayerData }, flush = false) =>
  _getPlayerForData()
    .then((player) => (player ? player.setData(data, flush).then(() => true) : false))
    .catch((e) => (logError(e), false))

export const incrementData = (data: { [key: string]: IValidPlayerData }, flush = false) =>
  // getData().then((oldData) => setData({ ...oldData, ...data }, flush))
  _getPlayerForData()
    .then((player) =>
      player
        ? player
            .getData()
            .then((oldData: any) =>
              player.setData({ ...oldData, ...data }, flush).then(() => true)
            )
        : false
    )
    .catch((e) => (logError(e), false))

//
// PlayerStats
//
export const getStats = (keys?: string[]) =>
  _getPlayerForData()
    .then((player) => (player ? player.getStats(keys) : {}))
    .then((data) => (data ? { ...data } : {}))
    .catch((e) => (logError(e), {}))

export const setStats = (stats: { [key: string]: number }) =>
  _getPlayerForData()
    .then((player) => (player ? player.setStats(stats).then(() => true) : false))
    .catch((e) => (logError(e), false))

export const incrementStats = (stats: { [key: string]: number }) =>
  _getPlayerForData()
    .then((player) => (player ? player.incrementStats(stats).then(() => true) : false))
    .catch((e) => (logError(e), false))
