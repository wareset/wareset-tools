export const SDK = ((setTimeout, resolve, reject, random) => {
  const noop = () => {}

  const run_adv = (
    onClose?: (wasShown: boolean) => any,
    onOpen?: () => any,
    onError?: (error: Error) => any,
    onOffline?: () => any
  ) => {
    switch ((random() * 4) | 0) {
      case 0:
        onClose && onClose(random() < 0.5)
        break
      case 1:
        onOpen && onOpen()
        break
      case 2:
        onError && onError(new Error('dev'))
        break
      case 3:
        onOffline && onOffline()
        break
    }
  }

  type IValidForJSON =
    | string
    | number
    | boolean
    | IValidForJSON[]
    | { [key: string]: IValidForJSON }

  let PLAYER_DATA: { [key: string]: string } = {}
  let PLAYER_STATS: { [key: string]: number } = {}
  const PLAYER = {
    IS_DEV: true,

    getUniqueID: () => '1',
    getName: () => 'player',
    getMode: () => 'lite' as 'lite' | '',
    etPhoto: (_size: 'small' | 'medium' | 'large') => '',

    getPayingStatus: () =>
      'unknown' as 'paying' | 'partially_paying' | 'not_paying' | 'unknown',

    getData: (keys?: string[]) => {
      try {
        const res = {} as { [key: string]: IValidForJSON }
        if (keys) {
          for (let i = keys.length, k: string; i-- > 0; )
            if (PLAYER_DATA.hasOwnProperty((k = keys[i]))) res[k] = JSON.parse(PLAYER_DATA[k])
        } else {
          for (const k in PLAYER_DATA) res[k] = JSON.parse(PLAYER_DATA[k])
        }
        return resolve(res)
      } catch (e) {
        return reject(e)
      }
    },
    setData: (data: { [key: string]: IValidForJSON }, _flush = false) => {
      try {
        const res = {} as any
        for (const k in data) res[k] = JSON.stringify(data[k])
        PLAYER_DATA = res
        return resolve()
      } catch (e) {
        return reject(e)
      }
    },

    getStats: (keys?: string[]) => {
      try {
        const res = {} as { [key: string]: number }
        if (keys) {
          for (let i = keys.length, k: string; i-- > 0; )
            if (PLAYER_STATS.hasOwnProperty((k = keys[i]))) res[k] = PLAYER_STATS[k]
        } else {
          for (const k in PLAYER_STATS) res[k] = PLAYER_STATS[k]
        }
        return resolve(res)
      } catch (e) {
        return reject(e)
      }
    },
    setStats: (data: { [key: string]: number }) => {
      try {
        const res = {} as any
        for (const k in data)
          if (typeof (res[k] = data[k]) !== 'number') new Error('Stats is not valid')
        PLAYER_STATS = res
        return resolve()
      } catch (e) {
        return reject(e)
      }
    },
    incrementStats: (increments: { [key: string]: number }) => {
      try {
        const res = {} as { [key: string]: number }
        for (const k in increments)
          if (typeof increments[k] !== 'number') new Error('Increments is not valid')
          else if (increments[k] !== PLAYER_STATS[k]) res[k] = increments[k]
        PLAYER_STATS = { ...PLAYER_STATS, ...increments }
        return resolve(res)
      } catch (e) {
        return reject(e)
      }
    },
  }

  return {
    IS_DEV: true,
    environment: {
      app: {
        id: '',
      },
      i18n: {
        lang: '',
        tld: '',
      },
      payload: void 0 as string | undefined,
    },

    serverTime: () => Date.now(),
    getStorage: () => resolve(localStorage),
    getPlayer: (_props?: { scopes: boolean }) => resolve(PLAYER),
    getFlags: (
      props: {
        defaultFlags?: { [key: string]: string }
        clientFeatures?: { name: string; value: string }[]
      } = {}
    ) => resolve({ ...props.defaultFlags }),

    features: {
      LoadingAPI: {} as { ready: () => void } | undefined,
      GameplayAPI: {} as { start: () => void; stop: () => void } | undefined,
    },

    auth: {
      openAuthDialog: () => reject(),
    },

    adv: {
      showFullscreenAdv: (props: {
        callbacks: {
          onClose?: (wasShown: boolean) => void
          onOpen?: () => void
          onError?: (error: Error) => void
          onOffline?: () => void
        }
      }) => {
        const { onClose, onOpen, onError, onOffline } = props.callbacks
        setTimeout(() => run_adv(onClose, onOpen, onError, onOffline), random() * 500)
      },
      showRewardedVideo: (props: {
        callbacks: {
          onClose?: (wasShown: boolean) => void
          onOpen?: () => void
          onError?: (error: Error) => void
          onRewarded?: () => void
        }
      }) => {
        const { onClose, onOpen, onError, onRewarded } = props.callbacks
        setTimeout(() => run_adv(onClose, onOpen, onError, onRewarded), random() * 500)
      },
    },

    feedback: {
      canReview: (): Promise<
        | { value: true }
        | {
            value: false
            reason:
              | 'NO_AUTH'
              | 'GAME_RATED'
              | 'REVIEW_ALREADY_REQUESTED'
              | 'REVIEW_WAS_REQUESTED'
              | 'UNKNOWN'
          }
      > => resolve({ value: false, reason: 'UNKNOWN' }),
      requestReview: () => resolve({ feedbackSent: false }),
    },

    shortcut: {
      canShowPrompt: () => resolve({ canShow: true }),
      showPrompt: () => resolve({ outcome: 'accepted' as 'accepted' | '' }),
    },
  }
})(setTimeout, Promise.resolve, Promise.reject, Math.random)
