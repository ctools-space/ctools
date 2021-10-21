import * as path from 'path';
import * as fs from 'fs';

import { merge } from '@pokemonon/knife';

import { Platform } from 'common/utils';
import { FeatureBase, FeatureMatch, FeatureType } from 'main/feature';
import { normalURI } from 'main/utils/common/index';

// export type PluginConfigFeatureMatch = string | {
//     type: 'regex' | 'img' | 'files' | 'window',
//     label: string;
//     match: string | RegExp;
//     minLength: number;
//     maxLength: number;
// }
export type PluginConfigFeature = {
    code: string;
    explain: string; // 描述
    icon: string;
    platform: Platform[];
    cmds: FeatureMatch[]; // 标题
}

/**
 * 插件plugin.json数据结构
 */
export interface PluginConfig {
    name: string;
    displayName: string;
    version: string;
    main: string; // 入口文件
    logo: string;
    platform: Platform[];
    // development: {
    //     // 开发模式
    //     main: string;
    // };
    // pluginSetting: {
    //     single: boolean;
    //     height: number;
    // };
    features: PluginConfigFeature[]
}


/**
 * 插件类型
 */
export enum PluginPublicConfigType {
    builtin = 'builtin',
    extension = 'extension'
}
/**
 * 插件状态 开发|发布
 */
export enum PluginPublicConfigStatus {
    prod = 'prod',
    dev = 'dev'
}
/**
 * 在配置文件的基础上增加字段
 */
export interface PluginPublicConfig extends PluginConfig {
    type: PluginPublicConfigType;
    path: string; // 插件路径
    status: PluginPublicConfigStatus;
}

export interface PluginFeature extends FeatureBase {
    type: FeatureType.PLUGIN;
    pluginType: PluginPublicConfigType;
    status: PluginPublicConfigStatus;
    // cmds: FeatureMatch[];
    code: string;
    path: string;
    explain: string;
    icon: string;
}

/**
 * 加载插件配置信息
 * @param pluginPath 
 * @returns 
 */
export function resolvePluginConfig(pluginPath: string): PluginConfig | undefined {
    const jsonPath = path.resolve(pluginPath, 'plugin.json');
    if (fs.existsSync(jsonPath)) {
        const conf = require(jsonPath) as PluginConfig;

        // format path
        const { main, logo, features } = conf;
        merge(conf, {
            main: path.resolve(pluginPath, main),
            logo: normalURI(logo, pluginPath),
            features: features.map(i => {
                const { icon } = i;
                return {
                    icon: normalURI(icon, pluginPath),
                };
            }),
        });

        return conf;
    }
}