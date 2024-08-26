type IFlags = {
    [key: string]: string;
};
type IFlagsParams = {
    defaultFlags?: IFlags;
    clientFeatures?: {
        name: string;
        value: string;
    }[];
};
export declare const getFlags: (params?: IFlagsParams) => Promise<IFlags>;
export {};
