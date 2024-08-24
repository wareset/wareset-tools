import type { RollupOptions, Plugin } from 'rollup';
import { type RollupInjectOptions } from '@rollup/plugin-inject';
export default function ({ sdkUrl, srcDir, appDir, zipDir, staticDirName, injects, plugins, globals, indexHtmlFile, scriptFileList }?: {
    sdkUrl?: string;
    srcDir?: string;
    appDir?: string;
    zipDir?: string;
    staticDirName?: string;
    injects?: RollupInjectOptions;
    plugins?: Plugin<any>[];
    globals?: {
        [key: string]: string;
    };
    indexHtmlFile?: string;
    scriptFileList?: string[];
}): RollupOptions[];
