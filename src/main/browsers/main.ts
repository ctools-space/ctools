import * as path from 'path';

import { BrowserWindow } from 'main/utils/browser';
import { ENV } from 'typings/common';

import { isProd, resolveRoot, winSize } from '../utils';

// todo 
let win: BrowserWindow;
const url = isProd ?
    `file://${path.join(__dirname, '../render/index.html')}` :
    `http://localhost:${process.env.PORT}`;

export function createMainWin() {
    win = new BrowserWindow({
        display: process.env.NODE_ENV === ENV.PRODUCTION ? 0 : 1,
        x: process.env.NOE_ENV === ENV.PRODUCTION ? undefined : 10,
        y: process.env.NODE_ENV === ENV.PRODUCTION ? 200 : 40,
        ...winSize,
        center: true,
        frame: false,
        webPreferences: {
            // nodeIntegration: true,
            contextIsolation: true,
            preload: resolveRoot('preload/index.js'),
        },
        show: process.env.NODE_ENV !== ENV.PRODUCTION,
    });

    if (isProd) {
        win.on('blur', () => {
            win.hide();
        });
    }


    win?.loadURL(url);

    return win;
}

export function openPreference() {
    // todo optimize
    !win.isVisible && win.show();
    const curUrl = win.webContents.getURL();
    const preferencePath = '/home/tabs/preference';
    if (curUrl.includes(preferencePath)) {
        return;
    }
    win.loadURL(`${url}#${preferencePath}`);
}

// export function initWin