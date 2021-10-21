import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuejsx from '@vitejs/plugin-vue-jsx';
import tsconfigPaths from 'vite-tsconfig-paths';

import { resolve } from './script/utils/helpers';
import { getEnvWhole } from './script/config/env';

const userEnv = getEnvWhole();

export default defineConfig({
    root: resolve('src/renderer'),
    server: {
        port: +userEnv.port,
    },
    define: {
        ...userEnv,
    },
    plugins: [
        tsconfigPaths({
            root: resolve('.'),
            loose: false,
        }),
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
        outDir: resolve('dist/renderer'),
    },
});