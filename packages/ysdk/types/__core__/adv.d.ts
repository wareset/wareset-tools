export declare const advImage: (callbacks?: {
    onClose?: (wasShown: boolean) => any;
    onOpen?: () => any;
    onError?: (error: any) => any;
    onOffline?: () => any;
}) => void;
export declare const advVideo: (callbacks?: {
    onClose?: () => any;
    onOpen?: () => any;
    onError?: (error: any) => any;
    onRewarded?: () => any;
}) => void;
