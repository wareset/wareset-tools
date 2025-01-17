// https://yandex.ru/dev/games/doc/ru/sdk/sdk-game-events#gameplay

import { getSDK, log, logError } from './init'

let isStarted = false
let isPaused = false

export const gameIsStarted = () => isStarted
export const gameIsPaused = () => isStarted && isPaused

let _started = false
let _need_start = true
/**
Метод ysdk.features.GameplayAPI.start() нужно вызывать в случаях, когда игрок начинает или возобновляет игровой процесс:

запуск уровня;
закрытие меню;
снятие с паузы;
возобновление игры после показа рекламы;
возвращение в текущую вкладку браузера.

Убедитесь, после отправки события GameplayAPI.start() игровой процесс сразу запущен.
*/
const _start = (logs: string) => {
  log(logs)
  _need_start = true
  getSDK()
    .then(
      (ysdk) =>
        _need_start &&
        (_started ||
          ((_started = true), log('gameplayStart'), ysdk.features.GameplayAPI!.start()))
    )
    .catch(logError)
}
/**
Метод ysdk.features.GameplayAPI.stop() нужно вызывать в случаях, когда игрок приостанавливает или завершает игровой процесс:

прохождение уровня или проигрыш;
вызов меню;
пауза в игре;
показ полноэкранной или rewarded-рекламы;
уход в другую вкладку браузера.
Убедитесь, что после отправки события GameplayAPI.stop() игровой процесс остановлен.
*/
const _stop = (logs: string) => {
  log(logs)
  _need_start = false
  getSDK()
    .then(
      (ysdk) =>
        _need_start ||
        (_started &&
          ((_started = false), log('gameplayStop'), ysdk.features.GameplayAPI!.stop()))
    )
    .catch(logError)
}

export const gameStart = () =>
  !isStarted ? (_start('gameStart'), (isStarted = !(isPaused = false))) : false

export const gameStop = () =>
  isStarted ? (_stop('gameStop'), !(isPaused = isStarted = false)) : false

export const gameResume = () =>
  isStarted && isPaused ? (_start('gameResume'), !(isPaused = false)) : false

export const gamePause = () =>
  isStarted && !isPaused ? (_stop('gamePause'), (isPaused = true)) : false
