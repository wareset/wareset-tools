export const showError = (error: any) => {
  error === void 0 || console.error(error)
}

let _init: Promise<any>
export const init =
  // @ts-ignore
  typeof YaGames !== 'undefined'
    ? (): Promise<null | any> =>
        _init ||
        // @ts-ignore
        (_init = YaGames.init()
          .then((ysdk: any) => ysdk)
          .catch((e: any) => (showError(e), null)))
    : (): Promise<null | any> => _init || (_init = Promise.resolve(null))
