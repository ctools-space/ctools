import * as path from 'path';

import { BrowserView } from 'electron';

import { BrowserWindow } from 'main/utils/browser';
import { isProd, WinHeight, HeaderHeight, WinWidth } from 'common/utils';
import { routes } from 'main/config';
import { PluginFeature } from 'main/plugin/main';
// import { PluginPublicConfigStatus } from 'main/plugin/main/load';
import { PluginPublicConfigStatus, resolvePluginConfig } from 'main/plugin/common/config';
import { getIPC } from 'main/ipc';
import { LOAD_PLUGIN_MAIN, OPEN_PLUGIN_MAIN } from 'main/ipc/event-types';

import { features, resolveRoot, winSize } from '../utils';

// todo 
let win: BrowserWindow;
let mainWebview: BrowserView;

export function createMainWin() {
    win = new BrowserWindow({
        display: isProd ? 0 : 1,
        x: isProd ? undefined : 10,
        y: isProd ? 200 : 40,
        ...winSize,
        center: true,
        frame: false,
        webPreferences: {
            nodeIntegration: !isProd,
            contextIsolation: true,
            preload: resolveRoot('preload/index.js'),
            devTools: !isProd,
            webviewTag: true,
        },
        show: !isProd,
    });

    if (isProd) {
        win.on('blur', () => {
            win.hide();
        });
    }

    win?.loadURL(routes.home());

    return win;
}

export function openDevTools() {
    win.webContents.openDevTools();
}

export function openPreference() {
    // todo optimize
    !win.isVisible && win.show();
    const curUrl = win.webContents.getURL();
    // const preferencePath = '/home/tabs/preference';
    if (curUrl.includes(routes.preference())) {
        return;
    }
    win.loadURL(routes.preference());
}

// export function initWin
export function getMainWin() {
    return win;
}

/**
 * 请求渲染进程加载插件首页
 * @param data 
 */
export function requestPluginMain(data) {
    const ipc = getIPC();
    ipc.emit(win.webContents, OPEN_PLUGIN_MAIN, data);
}

export function loadPluginMain(feature?: PluginFeature) {
    // if (!feature) return;

    // const { path: pluginPath, status } = feature;
    // const resolvePlugin = (...p: string[]) => path.resolve(pluginPath, ...p);
    // const pluginConf = resolvePluginConfig(pluginPath)!;
    // const { main } = pluginConf;
    // if (!main) return false;

    // const url = status === PluginPublicConfigStatus.prod ?
    //     resolvePlugin(main) :
    //     development.main;
    
    // const webview = new BrowserView({
    //     webPreferences: {
    //         //
    //     },
    // });
    // win.addBrowserView(webview);
    // webview.webContents.loadURL(url);
    // webview.setBounds({
    //     x: 0,
    //     y: HeaderHeight,
    //     width: WinWidth,
    //     height: WinHeight - HeaderHeight,
    // });
}

/**
 * 跳转到plugin首页
 * @param feature 
 * @returns 
 */
export function goPluginMain(feature: PluginFeature) {
    // const { path: pluginPath, id } = feature;
    // const pluginConf = resolvePluginConfig(pluginPath);
    // const { main } = pluginConf;
    // if (!main) return false;

    // win.loadURL(routes.plugin(id));
}