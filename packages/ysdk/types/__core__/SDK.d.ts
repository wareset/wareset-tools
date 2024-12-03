export declare const SDK: {
    IS_DEV: boolean;
    environment: {
        app: {
            id: string;
        };
        i18n: {
            lang: string;
            tld: string;
        };
        payload: string;
    };
    serverTime: () => number;
    getStorage: () => Promise<Storage>;
    getPlayer: (_props?: {
        scopes: boolean;
    }) => Promise<{
        IS_DEV: boolean;
        getUniqueID: () => string;
        getName: () => string;
        getMode: () => "" | "lite";
        getPhoto: (_size: 'small' | 'medium' | 'large') => string;
        getPayingStatus: () => "unknown" | "paying" | "partially_paying" | "not_paying";
        getData: (keys?: string[]) => Promise<{
            [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | {
                [key: string]: string | number | boolean | any | any;
            })[] | {
                [key: string]: string | number | boolean | any | any;
            })[] | {
                [key: string]: string | number | boolean | any | any;
            })[] | {
                [key: string]: string | number | boolean | any | any;
            })[] | {
                [key: string]: string | number | boolean | any | any;
            })[] | {
                [key: string]: string | number | boolean | any | any;
            })[] | {
                [key: string]: string | number | boolean | any | any;
            })[] | {
                [key: string]: string | number | boolean | any | any;
            })[] | {
                [key: string]: string | number | boolean | any | any;
            })[] | {
                [key: string]: string | number | boolean | any | any;
            })[] | {
                [key: string]: string | number | boolean | any | any;
            })[] | {
                [key: string]: string | number | boolean | any | any;
            };
        }>;
        setData: (data: {
            [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | {
                [key: string]: string | number | boolean | any | any;
            })[] | {
                [key: string]: string | number | boolean | any | any;
            })[] | {
                [key: string]: string | number | boolean | any | any;
            })[] | {
                [key: string]: string | number | boolean | any | any;
            })[] | {
                [key: string]: string | number | boolean | any | any;
            })[] | {
                [key: string]: string | number | boolean | any | any;
            })[] | {
                [key: string]: string | number | boolean | any | any;
            })[] | {
                [key: string]: string | number | boolean | any | any;
            })[] | {
                [key: string]: string | number | boolean | any | any;
            })[] | {
                [key: string]: string | number | boolean | any | any;
            })[] | {
                [key: string]: string | number | boolean | any | any;
            })[] | {
                [key: string]: string | number | boolean | any | any;
            };
        }, _flush?: boolean) => Promise<void>;
        getStats: (keys?: string[]) => Promise<{
            [key: string]: number;
        }>;
        setStats: (data: {
            [key: string]: number;
        }) => Promise<void>;
        incrementStats: (increments: {
            [key: string]: number;
        }) => Promise<{
            [key: string]: number;
        }>;
    }>;
    getFlags: (props?: {
        defaultFlags?: {
            [key: string]: string;
        };
        clientFeatures?: {
            name: string;
            value: string;
        }[];
    }) => Promise<{
        [x: string]: string;
    }>;
    features: {
        LoadingAPI: {
            ready: () => void;
        };
        GameplayAPI: {
            start: () => void;
            stop: () => void;
        };
    };
    auth: {
        openAuthDialog: () => Promise<never>;
    };
    adv: {
        showFullscreenAdv: (props: {
            callbacks: {
                onClose?: (wasShown: boolean) => void;
                onOpen?: () => void;
                onError?: (error: Error) => void;
                onOffline?: () => void;
            };
        }) => void;
        showRewardedVideo: (props: {
            callbacks: {
                onClose?: (wasShown: boolean) => void;
                onOpen?: () => void;
                onError?: (error: Error) => void;
                onRewarded?: () => void;
            };
        }) => void;
    };
    feedback: {
        canReview: () => Promise<{
            value: true;
        } | {
            value: false;
            reason: 'NO_AUTH' | 'GAME_RATED' | 'REVIEW_ALREADY_REQUESTED' | 'REVIEW_WAS_REQUESTED' | 'UNKNOWN';
        }>;
        requestReview: () => Promise<{
            feedbackSent: boolean;
        }>;
    };
    shortcut: {
        canShowPrompt: () => Promise<{
            canShow: boolean;
        }>;
        showPrompt: () => Promise<{
            outcome: "" | "accepted";
        }>;
    };
};
