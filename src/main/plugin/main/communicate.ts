/**
 * 主进程和插件进程通信
 */
import { ChildProcess } from 'child_process';

import { requestPluginMain } from 'main/browsers';
import { getIPC } from 'main/ipc';
import { OPEN_PLUGIN_MAIN } from 'main/ipc/event-types';

import { PluginFeature } from '../common/config';
import { LOAD_MAIN_WINDOW, PLUGIN_ACTIVATED, SELECTED_FEATURE } from '../common/events';
import { PluginMainPageData } from '../common/types';
import { mainComm, MainEvent } from './ipc';

export type Comm = ReturnType<typeof mainComm>
export class PluginComm {
    static async createInstance(cp: ChildProcess, evt: MainEvent) {
        const pluginComm = new PluginComm(cp, evt);
        await pluginComm.start();
        pluginComm.init();

        return pluginComm;
    }

    comm: Comm
    constructor(cp: ChildProcess, evt: MainEvent) {
        this.comm = mainComm(cp, evt);
        // this.init();
    }

    start() {
        return new Promise(resolve => {
            this.comm.on(PLUGIN_ACTIVATED, resolve);
        });
    }

    init() {
        this.addListeners();
    }

    addListeners() {
        this.listenerLoadMainWindow();
    }

    listenerLoadMainWindow() {
        this.comm.on(LOAD_MAIN_WINDOW, (evt, payload) => {
            const { pluginConfig } = evt;
            const data: PluginMainPageData = {
                info: payload,
                pluginConfig,
            };
            requestPluginMain(data);
        });
    }

    selectedFeature(feature: PluginFeature) {
        console.log('selected feature in main:', feature.code);
        this.comm.emit(SELECTED_FEATURE, feature);
    }

}