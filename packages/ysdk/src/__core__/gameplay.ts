// https://yandex.ru/dev/games/doc/ru/sdk/sdk-game-events#gameplay

import { getSDK, logError } from './init'

let isStarted = false

/**
Метод ysdk.features.GameplayAPI.start() нужно вызывать в случаях, когда игрок начинает или возобновляет игровой процесс:

запуск уровня;
закрытие меню;
снятие с паузы;
возобновление игры после показа рекламы;
возвращение в текущую вкладку браузера.

Убедитесь, после отправки события GameplayAPI.start() игровой процесс сразу запущен.
*/
export const gameStart = () =>
  isStarted
    ? false
    : ((isStarted = true),
      getSDK()
        .then((ysdk) => isStarted && ysdk.features.GameplayAPI!.start())
        .catch(logError),
      true)

/**
Метод ysdk.features.GameplayAPI.stop() нужно вызывать в случаях, когда игрок приостанавливает или завершает игровой процесс:

прохождение уровня или проигрыш;
вызов меню;
пауза в игре;
показ полноэкранной или rewarded-рекламы;
уход в другую вкладку браузера.
Убедитесь, что после отправки события GameplayAPI.stop() игровой процесс остановлен.
*/
export const gameStop = () =>
  isStarted
    ? ((isStarted = false),
      getSDK()
        .then((ysdk) => isStarted || ysdk.features.GameplayAPI!.stop())
        .catch(logError),
      true)
    : false

export const gameIsStarted = () => isStarted
