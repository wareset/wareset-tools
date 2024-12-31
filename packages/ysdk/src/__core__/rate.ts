// https://yandex.ru/dev/games/doc/ru/sdk/sdk-review

import { getSDK, logError } from './init'

/**
Чтобы узнать, можно ли запросить оценку игры, используйте метод ysdk.feedback.canReview().

Метод возвращает Promise<Object>, который переходит в состояние resolved. Возвращаемый объект содержит ключ value со значением true/false, по которому можно узнать, есть ли возможность запросить оценку:

value: true — запросить можно.

value: false — запросить нельзя. Причина отказа указывается в виде строкового значения в ключе reason:

NO_AUTH — пользователь не авторизован.
GAME_RATED — пользователь уже оценивал игру.
REVIEW_ALREADY_REQUESTED — запрос уже отправлен, ожидаются действия пользователя.
REVIEW_WAS_REQUESTED — запрос уже отправлен, пользователь совершил действие: поставил оценку или закрыл всплывающее окно.
UNKNOWN — запрос не был отправлен, ошибка на стороне Яндекса.
*/
export const rateCheck = () =>
  getSDK()
    .then((ysdk) => ysdk.feedback.canReview())
    .catch(logError)

/**
Чтобы предложить пользователю оценить игру, используйте метод ysdk.feedback.requestReview().

Метод возвращает Promise<Object>, который переходит в состояние resolved. Возвращаемый объект содержит ключ feedbackSent со значением true/false, по которому можно узнать, оценил ли пользователь игру (true) или закрыл всплывающее окно (false).

Если перед выполнением запроса вы проигнорировали метод ysdk.feedback.canReview(), значение feedbackSent: false может сопровождаться ошибкой use canReview before requestReview.
*/
export const rateOpen = () =>
  getSDK()
    .then((ysdk) => ysdk.feedback.requestReview())
    .then((result) => result.feedbackSent)
    .catch(logError)
