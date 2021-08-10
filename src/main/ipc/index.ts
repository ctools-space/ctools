import createMainComm, { MainComm } from '@pokemonon/electron-ipc-encapsulation/dist/main';

import { initWin } from './win';
import { initSource } from './source';

let ipc: MainComm;
export function initIPC() {
    ipc = createMainComm();
    initWin(ipc);
    initSource(ipc);

    return ipc;
}

export function getIPC() {
    return ipc;
}
