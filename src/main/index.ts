import { app } from 'electron';

import { createMainWin } from 'main/browsers';

import { initIPC } from './ipc';
import { init } from './utils';

app
    .whenReady()
    .then(createMainWin)
    .then(initIPC)
    .then(init);
