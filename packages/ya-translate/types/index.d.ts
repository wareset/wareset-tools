export declare const listLanguages: () => Promise<{
    code: string;
    name?: string;
}[]>;
export declare const detectLanguage: (text: string, languageCodeHints?: string[]) => Promise<string>;
export declare const translate: {
    (text: string, from: string, to: string): Promise<string>;
    (text: string[], from: string, to: string): Promise<string[]>;
};
