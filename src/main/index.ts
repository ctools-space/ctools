import { app } from 'electron';

import { createMainWin } from 'main/browsers';

import { initIPC } from './ipc';
import { init, initDev } from './utils';

app
    .whenReady()
    .then(createMainWin)
    .then(initIPC)
    .then(init)
    .then(initDev);

console.log('node version:', process.versions.node);
console.log('electron version: ', process.versions.electron);
console.log('process.versions.modules', process.versions.modules);