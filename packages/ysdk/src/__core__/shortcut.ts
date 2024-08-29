import { init, logError } from './init'

/**
Проверка возможности добавления ярлыка
Доступность опции зависит от платформы, внутренних правил браузера и ограничений платформы Яндекс Игры. Чтобы убедиться, что ярлык можно добавить, используйте метод ysdk.shortcut.canShowPrompt():
*/
export const shortcutCan = () =>
  init()
    .then((ysdk) => ysdk.shortcut.canShowPrompt())
    .then((prompt) => !!prompt.canShow)
    .catch(logError)

/**
Вызов диалогового окна
После проверки можно показать в игре кнопку (или другой элемент интерфейса), по нажатию на которую будет вызван диалог добавления ярлыка. Для вызова диалога используйте метод ysdk.shortcut.showPrompt():
*/
export const shortcutRun = () =>
  init()
    .then((ysdk) => ysdk.shortcut.showPrompt())
    .then((result) => result.outcome === 'accepted')
    .catch(logError)
