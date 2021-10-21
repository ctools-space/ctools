import * as fs from 'fs';
import * as path from 'path';

import { ensureDirSync } from 'fs-extra';
import { app } from 'electron';

import { resolveRoot } from 'main/utils';

import { PluginConfig, PluginPublicConfig, PluginPublicConfigStatus, PluginPublicConfigType, resolvePluginConfig } from '../common/config';

const fsPromises = fs.promises;


export const BuiltinPluginsPath = resolveRoot('plugins');
export const ExtensionPluginsPath = path.resolve(app.getPath('userData'), 'plugins');

/**
 * 确保插件路径存在
 */
ensureDirSync(ExtensionPluginsPath);



export async function loadPlugins(dir: string, type: PluginPublicConfigType, status = PluginPublicConfigStatus.prod)  {
    const names = await fsPromises.readdir(dir);
    const result: PluginPublicConfig[] = [];
    for (const name of names) {
        const pluginPath = path.resolve(dir, name);
        const pluginConfig = resolvePluginConfig(pluginPath);
        if (pluginConfig) {
            result.push({
                type,
                status,
                path: pluginPath,
                ...pluginConfig,
            });
        }
    }
    return result;
}

/**
 * 加载内置的插件
 * @returns
 */
export async function loadBuiltinPlugins() {
    return loadPlugins(BuiltinPluginsPath, PluginPublicConfigType.builtin);
}

/**
 * 加载自定义插件
 * @returns 
 */
export async function loadExtensionPlugins() {
    return loadPlugins(ExtensionPluginsPath, PluginPublicConfigType.extension);
}

/**
 * 加载所有的插件
 * @returns 
 */
export async function loadAllPlugins() {
    return Promise.all([
        loadBuiltinPlugins(),
        loadExtensionPlugins(),
    ]).then(list => ([] as PluginPublicConfig[]).concat(...list));
}