import { init, logError } from './init'

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
  init()
    .then((ysdk) =>
      isStarted ? false : ((isStarted = true), ysdk.features.GameplayAPI!.start(), true)
    )
    .catch(logError)

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
  init()
    .then((ysdk) =>
      isStarted ? ((isStarted = false), ysdk.features.GameplayAPI!.stop(), true) : false
    )
    .catch(logError)
