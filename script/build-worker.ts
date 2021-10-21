import { RollupOptions } from 'rollup';

import { resolve } from './utils/helpers';

export function getWorkers(): RollupOptions[] {
    return [
        {
            input: resolve('src/main/plugin/plugin/host.ts'),
            output: {
                dir: resolve('dist/main/plugin'),
                format: 'cjs',
                sourcemap: true,
            },
        },
    ];
}
