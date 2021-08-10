import { app, BrowserWindow, globalShortcut } from 'electron';

import { openPreference } from 'main/browsers';

export function registerMainVisiable() {
    const mainWin = BrowserWindow.getAllWindows()[0];
    globalShortcut.register('Command+Control+Option+Space', () => {
        mainWin.isVisible() ? mainWin.hide() : mainWin.show();
    });
}

export function registryOpenPreference() {
    const key = 'Command+,';
    app.on('browser-window-focus', () => {
        globalShortcut.register(key, () => {
            openPreference();
        });
    });
    app.on('browser-window-blur', () => {
        globalShortcut.unregister(key);
    });
}

export function initShortcut() {
    registerMainVisiable();
    registryOpenPreference();
}