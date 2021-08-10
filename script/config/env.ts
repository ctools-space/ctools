import * as fs from 'fs';

import * as dotenv from 'dotenv';
import { assign, merge, sureArray } from '@pokemonon/knife';

import { ENV } from '../../typings/common';
import { resolve } from '../utils/helpers';

/**
 * 按paths的顺序加载变量 后面的覆盖前面的
 * @param paths 
 * @returns 
 */
function loadEnv(path: string): Record<string, string>
function loadEnv(paths: string[]): Record<string, string>
function loadEnv(paths) {
    return merge(...sureArray(paths).map(p => dotenv.parse(fs.readFileSync(p))));
}

/**
 * 加载环境变量
 */
export const getEnv = (() => {
    let res = {};
    return (): Record<string, string> => {
        if (Object.keys(res).length) return res;
        const {
            NODE_ENV = ENV.PRODUCTION,
            DEPLOY_ENV = ENV.PRODUCTION,
        } = process.env;
        const buildEnvs = loadEnv(['.env', `.env.${NODE_ENV}`].map(f => resolve(`env/build/${f}`)));
        const deployEnvs = loadEnv(['.env', `.env.${DEPLOY_ENV}`].map(f => resolve(`env/deploy/${f}`)));
        res = {
            NODE_ENV,
            DEPLOY_ENV,
            ...buildEnvs,
            ...deployEnvs,
        };
        
        assign(process.env, res);
        
        return res;
    };
})();

/**
 * 加载环境变量 全拼 process.env.key
 * @returns 
 */
export function getEnvWhole(): Record<string, string> {
    const envs = getEnv();
    return Object.keys(envs).reduce((res, k) => {
        res[`process.env.${k}`] = JSON.stringify(envs[k]);
        return res;
    }, {
        'process.platform': JSON.stringify(process.env.platform || 'darwin'),
    });
}