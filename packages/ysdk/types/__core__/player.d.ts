export declare const playerWithoutScopes: () => Promise<any>;
export declare const playerWithScopes: () => Promise<any>;
export declare const openAuthDialog: () => Promise<any>;
type IValidPlayerData = string | number | boolean | IValidPlayerData[] | {
    [key: string]: IValidPlayerData;
};
export declare const getData: (keys?: string[]) => Promise<any>;
export declare const setData: (data: {
    [key: string]: IValidPlayerData;
}, flush?: boolean) => Promise<any>;
export declare const incrementData: (data: {
    [key: string]: IValidPlayerData;
}, flush?: boolean) => Promise<any>;
export declare const getStats: (keys?: string[]) => Promise<any>;
export declare const setStats: (stats: {
    [key: string]: number;
}) => Promise<any>;
export declare const incrementStats: (stats: {
    [key: string]: number;
}) => Promise<any>;
export declare const safeStorage: () => Promise<any>;
export {};
