export declare const playerWithoutScopes: () => any;
export declare const playerWithScopes: () => any;
export declare const openAuthDialog: () => any;
type IValidPlayerData = string | number | boolean | IValidPlayerData[] | {
    [key: string]: IValidPlayerData;
};
export declare const getData: (keys?: string[]) => any;
export declare const setData: (data: {
    [key: string]: IValidPlayerData;
}, flush?: boolean) => any;
export declare const incrementData: (data: {
    [key: string]: IValidPlayerData;
}, flush?: boolean) => any;
export declare const getStats: (keys?: string[]) => any;
export declare const setStats: (stats: {
    [key: string]: number;
}) => any;
export declare const incrementStats: (stats: {
    [key: string]: number;
}) => any;
export declare const getStorage: () => any;
export {};
