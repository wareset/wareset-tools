// https://yandex.ru/dev/games/doc/ru/sdk/sdk-adv

import { getSDK, log, logError, type ISDK } from './init'

/**
Полноэкранный блок рекламы
Полноэкранный блок рекламы — блоки с рекламой, которые полностью закрывают фон приложения и показываются между запросом какой-то информации пользователем (например, при переходе на следующий уровень игры) и ее получением.

Чтобы вызвать рекламу, используйте метод ysdk.adv.showFullscreenAdv({callbacks:{}}).

callbacks — опциональные callback-функции. Настраиваются индивидуально для каждого рекламного блока.

onClose — вызывается при закрытии рекламы, после ошибки, а также, если реклама не открылась по причине слишком частого вызова. Используется с аргументом wasShown (тип boolean), по значению которого можно узнать была ли показана реклама.

onOpen — вызывается при успешном открытии рекламы.

onError — вызывается при возникновении ошибки. Объект ошибки передается в callback-функцию.

onOffline — вызывается при потере сетевого соединения (переходе в офлайн-режим).
*/
export const advImage = (
  callbacks: Parameters<ISDK['adv']['showFullscreenAdv']>[0]['callbacks'] = {}
) =>
  getSDK()
    .then((ysdk) => (log('advImage'), ysdk.adv.showFullscreenAdv({ callbacks })))
    .catch(logError)

/**
Видеореклама с вознаграждением (rewarded video)
Видео с вознаграждением — блоки с видеорекламой, которые используются для монетизации игр. За просмотр видеоролика пользователь получает награду или внутриигровую валюту.

Чтобы вызвать рекламу, используйте метод ysdk.adv.showRewardedVideo({callbacks:{}}).

callbacks — опциональные callback-функции. Настраиваются индивидуально для каждого рекламного блока.

onClose — вызывается при закрытии видеорекламы.

onOpen — вызывается при отображении видеорекламы на экране.

onError — вызывается при возникновении ошибки. Объект ошибки передается в callback-функцию.

onRewarded — вызывается, когда засчитывается просмотр видеорекламы. Укажите в данной функции, какую награду пользователь получит после просмотра.
*/
export const advVideo = (
  callbacks: Parameters<ISDK['adv']['showRewardedVideo']>[0]['callbacks'] = {}
) =>
  getSDK()
    .then((ysdk) => (log('advVideo'), ysdk.adv.showRewardedVideo({ callbacks })))
    .catch(logError)
