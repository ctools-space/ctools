import * as fs from 'fs';

import { API } from './api';
import { PluginConfig, resolvePluginConfig } from '../common/config';
import { PluginModule } from '../types';
import { PluginComm } from './communicate';
import { PLUGIN_ACTIVATED } from '../common/events';

const fsPromises = fs.promises;

/**
 * 插件宿主
 */
export class PluginHost {
    static async createInstance(pluginPath: string) {
        const pluginHost = new PluginHost(pluginPath);

        pluginHost.run();
        pluginHost.activate();

        return pluginHost;
    }

    config: PluginConfig
    module!: PluginModule
    comm = new PluginComm()
    api: API
    
    constructor(pluginPath: string) {
        this.config = resolvePluginConfig(pluginPath)!;
        this.api = new API(this);
    }

    /**
     * 启动插件
     */
    async run() {
        const { main } = this.config;
        console.log(main);
        this.module = require(main)(this.api);
    }

    /**
     * 执行hook
     */
    activate() {
        this.module.activate?.();
    }

    /**
     * 执行hook
     */
    deactivate() {
        this.module.deactivate?.();
    }
}

const pluginPath = process.env.PLUGIN_PATH!;

async function start() {
    const pluginHost = await PluginHost.createInstance(pluginPath);
    pluginHost.comm.pluginActivated();
}

start();