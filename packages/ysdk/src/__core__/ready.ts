import { init, showError} from './init'

/*
Метод ysdk.features.LoadingAPI.ready() нужно вызывать, когда игра загрузила все ресурсы и готова к взаимодействию с пользователем.

Убедитесь, что в момент вызова в игре:

все элементы готовы к взаимодействию с игроком;
нет экранов загрузки.
*/

let isReady = false
export const ready = () =>
  init()
    .then((ysdk) => isReady || (ysdk && ysdk.features.LoadingAPI.ready(), (isReady = true)))
    .catch((e) => (showError(e), isReady))
