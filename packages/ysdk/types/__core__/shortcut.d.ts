/**
Проверка возможности добавления ярлыка
Доступность опции зависит от платформы, внутренних правил браузера и ограничений платформы Яндекс Игры. Чтобы убедиться, что ярлык можно добавить, используйте метод ysdk.shortcut.canShowPrompt():
*/
export declare const shortcutCan: () => any;
/**
Вызов диалогового окна
После проверки можно показать в игре кнопку (или другой элемент интерфейса), по нажатию на которую будет вызван диалог добавления ярлыка. Для вызова диалога используйте метод ysdk.shortcut.showPrompt():
*/
export declare const shortcutRun: () => any;
