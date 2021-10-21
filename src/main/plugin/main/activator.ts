import * as cp from 'child_process';

import { resolveRoot } from 'main/utils';

import { MainEvent } from './ipc';
import { PluginFeature, PluginPublicConfig } from '../common/config';
import { PluginComm } from './communicate';

/**
 * 管理插件运行
 */
export class PluginActivator {
    pluginProcessMap: Map<string, cp.ChildProcess> = new Map()
    pluginCommMap: Map<string, PluginComm> = new Map()

    constructor() {

    }

    async loadPlugin(pluginConfig: PluginPublicConfig) {
        const { path: pluginPath } = pluginConfig;
        let pluginProcess = this.pluginProcessMap.get(pluginPath);
        if (pluginProcess) {
            return pluginProcess;
        }
        pluginProcess = cp.fork(resolveRoot('main/plugin/host.js'), {
            env: {
                PLUGIN_PATH: pluginPath,
            },
        });

        const mainEvent: MainEvent = {
            pluginConfig,
        };
        // const comm = new PluginComm(pluginProcess, mainEvent);
        const comm = await PluginComm.createInstance(pluginProcess, mainEvent);
        
        this.pluginCommMap.set(pluginPath, comm);
        this.pluginProcessMap.set(pluginPath, pluginProcess);
    }

    async selectedFeature(pluginConfig: PluginPublicConfig, feature: PluginFeature) {
        const { path } = feature;
        
        await this.loadPlugin(pluginConfig);
        const pluginComm = this.pluginCommMap.get(path);
        pluginComm?.selectedFeature(feature);
    }
}

export const pluginActivator = new PluginActivator();
