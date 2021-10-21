import { join } from 'path';
import * as fs from 'fs';

import { RollupOptions } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import esbuild from 'rollup-plugin-esbuild';
import json from '@rollup/plugin-json';
import copy from 'rollup-plugin-copy';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';
import externals from 'rollup-plugin-node-externals';
import { merge } from '@pokemonon/knife';

import { getEnvWhole } from './config/env';
import { resolve } from './utils/helpers';
import { ENV } from '../src/common/utils';
import { getBuiltInPlugins, getBuiltInPluginStatics } from './build-plugins';
import { getWorkers } from './build-worker';

const userEnv = getEnvWhole();

export default (env: ENV = ENV.PRODUCTION) => {
    const baseConf: RollupOptions = {
        plugins: [
            externals(),
            // commonjs(),
            // nodeResolve(),
            typescriptPaths({
                transform(path) {
                    // todo 介个插件有点问题
                    return fs.existsSync(path) ? path :
                        fs.existsSync(path.replace(/\.js/, '.ts')) ? path.replace(/\.js/, '.ts') : null as any;
                },
            }),
            esbuild({
                minify: env === ENV.PRODUCTION,
                define: {
                    ...userEnv,
                },
            }),
            copy({
                targets: [
                    { src: resolve('src/static'), dest: resolve('dist') },
                    ...getBuiltInPluginStatics(),
                ],
            }),
        ],
    };

    const builds: RollupOptions[] = [
        {
            input: resolve('src/main/index.ts'),
            output: {
                file: resolve('dist/main/index.js'),
                format: 'cjs',
                name: 'ElectronMainBundle',
                sourcemap: true,
            }, 
        },
        {
            // input: resolve('src/preload/index.ts'),
            input: [
                resolve('src/preload/main/index.ts'),
                resolve('src/preload/extension/extension.ts'),
            ],
            output: {
                dir: resolve('dist/preload'),
                format: 'cjs',
                sourcemap: true,
            },
        },
        ...getBuiltInPlugins(),
        ...getWorkers(),
    ];
    
    return builds.map(conf => merge({}, baseConf, conf));
};
