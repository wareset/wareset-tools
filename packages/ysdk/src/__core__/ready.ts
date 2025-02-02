// https://yandex.ru/dev/games/doc/ru/sdk/sdk-game-events#gameready

import { getSDK, log, logError } from './init'

let isReady = false

/**
Метод ysdk.features.LoadingAPI.ready() нужно вызывать, когда игра загрузила все ресурсы и готова к взаимодействию с пользователем.

Убедитесь, что в момент вызова в игре:

все элементы готовы к взаимодействию с игроком;
нет экранов загрузки.
*/
export const ready = () => {
  isReady ||
    ((isReady = true),
    getSDK()
      .then((ysdk) => (log('ready'), ysdk.features.LoadingAPI!.ready()))
      .catch(logError))
}
