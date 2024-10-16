import { init, logError } from './init'

let isReady = false

/**
Метод ysdk.features.LoadingAPI.ready() нужно вызывать, когда игра загрузила все ресурсы и готова к взаимодействию с пользователем.

Убедитесь, что в момент вызова в игре:

все элементы готовы к взаимодействию с игроком;
нет экранов загрузки.
*/
export const ready = () =>
  init()
    .then((ysdk) => isReady || ((isReady = true), ysdk.features.LoadingAPI!.ready(), isReady))
    .catch(logError)
