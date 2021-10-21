/**
 * provice api for plugin
 */
import { Fn } from '@pokemonon/knife/types/common';
import { Emitter } from '@pokemonon/knife';
// import iohook from 'iohook';

import { LOAD_MAIN_WINDOW } from '../common/events';
import { pluginComm } from './ipc';
import { PluginHost } from './host';
import { featureEmitter } from './communicate';

export class API {
    // iohost: typeof iohook
    #host: PluginHost

    constructor(host: PluginHost) {
        this.#host = host;
        // this.iohost = iohook;
    }
    get features() {
        return {
            // ...featureEmitter,
            on: featureEmitter.on.bind(featureEmitter),
            emit: featureEmitter.emit.bind(featureEmitter),
            getAll() {
    
            },
            set() {
    
            },
            delte() {
    
            },
            has() {
                
            },
    
        };
    }
    get window() {
        return {
            loadMain: (url, opts = {}) => {
                this.#host.comm.loadMainWindow(url, opts);
            },
    
        };
    }
}

export function defineConfig() {
    
}