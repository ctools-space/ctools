// import { BrowserWindow } from 'electron';
import { MainComm } from '@pokemonon/electron-ipc-encapsulation/dist/main';
import { assign } from '@pokemonon/knife';

import { loadPluginMain, openPreference } from 'main/browsers';
import { featureManager } from 'main/feature';
import { PluginFeature } from 'main/plugin/main';
import { SetBoundsInDisOpts , BrowserWindow, winMaxHeight } from 'main/utils';

import * as eventTypes from './event-types';

export function initWin(ipc: MainComm) {
    const { on } = ipc;

    on(eventTypes.SET_WIN_BOUNDS, (evt, opts: SetBoundsInDisOpts) => {
        const win = BrowserWindow.fromWebContents(evt.sender);
        win?.setBoundsInDis(assign(opts, { center: false }));
    });
    
    on(eventTypes.SET_WIN_HEIGHT, (evt, height: number, resolve) => {
        const win = BrowserWindow.fromWebContents(evt.sender);
        win?.setBounds({ height: Math.min(winMaxHeight, height) });
        resolve();
    });

    on(eventTypes.SET_WIN_VISIABLE, (evt, visiable: boolean, resolve) => {
        const win = BrowserWindow.fromWebContents(evt.sender);
        visiable ? win?.show() : win?.hide();
        resolve();
    });

    on(eventTypes.OPEN_PREFERENCE, (evt, resolve) => {
        openPreference();
        resolve();
    });

    on(eventTypes.LOAD_PLUGIN_MAIN, (evt, id, resolve) => {
        const feature = featureManager.findById(id) as PluginFeature;
        loadPluginMain(feature);
        resolve();
    });
}
