import { init, showError } from './init'

/*
Если вам достаточно знать идентификатор, а имя и аватар пользователя не нужны, используйте опциональный параметр scopes: false. В этом случае диалоговое окно с запросом доступа не будет показано.
*/

let _playerWithoutAuth: Promise<any>
export const playerWithoutScopes = () =>
  _playerWithoutAuth ||
  (_playerWithoutAuth = init()
    .then((ysdk) => (ysdk ? ysdk.getPlayer({ scopes: false }) : null))
    .catch((e) => (showError(e), null)))

let _playerWithAuth: Promise<any>
export const playerWithScopes = () =>
  _playerWithAuth ||
  (_playerWithAuth = init()
    .then((ysdk) => (ysdk ? ysdk.getPlayer({ scopes: true }) : null))
    .catch((e) => (showError(e), null)))

let _playerForData: Promise<any>
const _getPlayerForData = () =>
  _playerForData ||
  (_playerForData = _playerWithAuth || _playerWithoutAuth || playerWithoutScopes())

let authDialog: Promise<void> | null
export const openAuthDialog = () =>
  authDialog ||
  (authDialog = init()
    .then((ysdk) =>
      ysdk
        ? ysdk.auth
            .openAuthDialog()
            .then(() => ((authDialog = null), true))
            .catch(() => ((authDialog = null), false))
        : false
    )
    .catch((e) => (showError(e), ((authDialog = null), false))))

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
    .catch((e) => (showError(e), {}))

export const setData = (data: { [key: string]: IValidPlayerData }, flush = false) =>
  _getPlayerForData()
    .then((player) => (player ? player.setData(data, flush).then(() => true) : false))
    .catch((e) => (showError(e), false))

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
    .catch((e) => (showError(e), false))

//
// PlayerStats
//
export const getStats = (keys?: string[]) =>
  _getPlayerForData()
    .then((player) => (player ? player.getStats(keys) : {}))
    .then((data) => (data ? { ...data } : {}))
    .catch((e) => (showError(e), {}))

export const setStats = (stats: { [key: string]: number }) =>
  _getPlayerForData()
    .then((player) => (player ? player.setStats(stats).then(() => true) : false))
    .catch((e) => (showError(e), false))

export const incrementStats = (stats: { [key: string]: number }) =>
  _getPlayerForData()
    .then((player) => (player ? player.incrementStats(stats).then(() => true) : false))
    .catch((e) => (showError(e), false))

//
// OTHER
//

// export async function getPlayerUniqueID() {
//   let res = '1'
//   if (player || (await getPlayer())) {
//     try {
//       res = player.getUniqueID() + ''
//     } catch (e) {
//       console.error(e)
//     }
//   }
//   return res
// }

// export async function getPlayerName() {
//   let res = 'Player'
//   if (player || (await getPlayer())) {
//     try {
//       res = player.getName() + ''
//     } catch (e) {
//       console.error(e)
//     }
//   }
//   return res
// }

// export async function getPlayerPhoto(size: 'small' | 'medium' | 'large') {
//   let res = ''
//   if (player || (await getPlayer())) {
//     try {
//       res = player.getPhoto(size)
//     } catch (e) {
//       console.error(e)
//     }
//   }
//   return res
// }

//
// Storage
//
let _safeStorage: Promise<typeof localStorage>
export const safeStorage = () =>
  _safeStorage ||
  (_safeStorage = init()
    .then((ysdk) => (ysdk ? ysdk.getStorage() : localStorage))
    .catch((e) => (showError(e), localStorage)))
