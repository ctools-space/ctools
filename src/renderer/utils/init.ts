import 'quasar/dist/quasar.css';
import '@quasar/extras/material-icons/material-icons.css';
import { App } from 'vue';
import { Quasar } from 'quasar';

import { initShortcut } from './shortcut';
import { initIPC } from './ipc';

function initQuasar(app: App) {
    app.use(Quasar);
}

export function init(app: App) {
    initQuasar(app);
    initShortcut();
    initIPC();
}