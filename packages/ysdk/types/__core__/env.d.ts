declare let env: {
    app: {
        id: string;
    };
    i18n: {
        lang: string;
        tld: string;
    };
};
export declare const getEnv: () => Promise<typeof env>;
export {};
