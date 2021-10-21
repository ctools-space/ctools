import { Emitter } from '@pokemonon/knife';

import { requestPluginMain } from 'main/browsers';

import { PluginFeature } from '../common/config';
import { LOAD_MAIN_WINDOW, PLUGIN_ACTIVATED, SELECTED_FEATURE } from '../common/events';
import { PluginMainPageData } from '../common/types';
import { Comm, pluginComm } from './ipc';

export const featureEmitter = new Emitter();

export class PluginComm {
    comm: Comm
    constructor() {
        this.comm = pluginComm();
        this.init();
    }

    init() {
        this.addListeners();
    }

    addListeners() {
        this.listenSelectedFeature();
    }

    loadMainWindow(url, opts) {
        this.comm.emit(LOAD_MAIN_WINDOW, {
            url,
            opts,
        });
    }

    /**
     * 监听功能的选择
     */
    listenSelectedFeature() {
        this.comm.on(SELECTED_FEATURE, (evt, feature: PluginFeature, payload) => {
            const { code } = feature;
            featureEmitter.emit(code);
        });
    }

    pluginActivated() {
        this.comm.emit(PLUGIN_ACTIVATED);
    }
}