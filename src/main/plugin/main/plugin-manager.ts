/**
 * 管理所有的插件
 */
import * as path from 'path';

import { isString } from '@pokemonon/knife';

import { hash, normalURI } from 'main/utils/common/index';
import { goPluginMain } from 'main/browsers';

import { FeatureBase, FeatureMatch, FeatureType } from '../../feature';
import { loadAllPlugins } from './load';
import { pluginActivator } from './activator';
import { PluginFeature, PluginPublicConfig } from '../common/config';

export class PluginManager {
    list!: PluginPublicConfig[]
    features!: PluginFeature[]
    listMap: Map<string, PluginPublicConfig> = new Map()

    constructor() {

    }

    async init() {
        return this.reload();
    }

    async reload() {
        this.list = await loadAllPlugins();
        this.features = this.getAllFeatures();
        
        for (const item of this.list) {
            this.listMap.set(item.path, item);
        }
    }

    /**
     * 获取所有的功能
     */
    getAllFeatures() {
        const result: PluginFeature[] = [];
        for (const plugin of this.list) {
            const { features, name, logo, path: pluginPath, status, type } = plugin;
            for (const feature of features) {
                const { code, cmds, explain, icon } = feature;
                const f: PluginFeature = {
                    id: hash(pluginPath + code),
                    type: FeatureType.PLUGIN,
                    name,
                    logo: normalURI(logo, pluginPath),
                    path: pluginPath,

                    pluginType: type,
                    status,
                    code,
                    explain,
                    icon: normalURI(icon, pluginPath),

                    matches: cmds,
                    matchField: '',
                    matchFieldHTML: '',
                };
                result.push(f);
            }
        }
        return result;
    }

    async selectedFeature(feature: PluginFeature) {
        const pluginConfig = this.listMap.get(feature.path);
        if (!pluginConfig) return;
        pluginActivator.selectedFeature(pluginConfig, feature);
    }
}