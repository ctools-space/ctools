import * as fs from 'fs';

import { RollupOptions } from 'rollup';
import { CopyOptions, Target } from 'rollup-plugin-copy';

import { resolve } from './utils/helpers';

const builtinPlugins = fs.readdirSync(resolve('src/plugins'));

export function getBuiltInPlugins(): RollupOptions[] {
    return builtinPlugins
        .filter(name => {
            return fs.existsSync(resolve(`src/plugins/${name}/index.ts`));
        })
        .map(name => {
            return {
                input: resolve(`src/plugins/${name}/index.ts`),
                output: {
                    dir: resolve(`dist/plugins/${name}`),
                    format: 'cjs',
                    sourcemap: true,
                },
            };
        });
}

export function getBuiltInPluginStatics() {
    // return builtinPlugins.map(name => ({
    //     src: resolve(`src/plugins/${name}/static`),
    //     dest: resolve(`dist/plugins/${name}/static`),
    // }));
    return builtinPlugins.reduce((list, name) => {
        list.push(
            {
                src: resolve(`src/plugins/${name}/static`),
                dest: resolve(`dist/plugins/${name}`),
            },
            {
                src: resolve(`src/plugins/${name}/plugin.json`),
                dest: resolve(`dist/plugins/${name}`),
            },
        );
        return list;
    }, [] as Target[]);
}
