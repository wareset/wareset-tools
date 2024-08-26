import { init, showError} from './init'

/*
Метод ysdk.features.GameplayAPI.start() нужно вызывать в случаях, когда игрок начинает или возобновляет игровой процесс:

запуск уровня;
закрытие меню;
снятие с паузы;
возобновление игры после показа рекламы;
возвращение в текущую вкладку браузера.

Убедитесь, после отправки события GameplayAPI.start() игровой процесс сразу запущен.
*/

let isStarted = false
export const gameStart = () =>
  init()
    .then(
      (ysdk) => isStarted || (ysdk && ysdk.features.GameplayAPI.start(), (isStarted = true))
    )
    .catch((e) => (showError(e), isStarted))

/*
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
    .then(
      (ysdk) => !(isStarted && (ysdk && ysdk.features.GameplayAPI.stop(), (isStarted = false)))
    )
    .catch((e) => (showError(e), !isStarted))
