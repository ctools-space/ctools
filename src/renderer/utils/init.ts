import 'quasar/dist/quasar.css';
// import 'quasar/icon-set/ionicons-v4';
import '@quasar/extras/material-icons/material-icons.css';
import { App } from 'vue';
import { Quasar } from 'quasar';

import { initShortcut } from './shortcut';

function initQuasar(app: App) {
    app.use(Quasar);
}

export function init(app: App) {
    initQuasar(app);
    initShortcut();
}