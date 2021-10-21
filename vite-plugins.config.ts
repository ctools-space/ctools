import * as fs from 'fs';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuejsx from '@vitejs/plugin-vue-jsx';
import tsconfigPaths from 'vite-tsconfig-paths';

import { resolve } from './script/utils/helpers';
// import { getEnvWhole } from './script/config/env';

// const userEnv = getEnvWhole();
const plugins = fs.readdirSync(resolve('src/plugins'));

export default defineConfig({
    // root: resolve('src/renderer'),
    root: resolve('src/plugins'),
    server: {
        port: 3002,
    },
    plugins: [
        vue({
            template: {
                compilerOptions: {
                    isCustomElement(tag) {
                        const customElements = ['webview'];
                        return customElements.includes(tag);
                    },
                },
            },
        }),
        vuejsx(),
    ],
    build: {
        outDir: resolve('dist/plugins'),
        rollupOptions: {
            input: plugins.reduce((pages, name) => {
                pages[name] = resolve(`src/plugins/${name}/index.html`);
                return pages;
            }, {}),
        },
    },
});