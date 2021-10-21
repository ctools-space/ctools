import { contextBridge } from 'electron';
import createRendererComm from '@pokemonon/electron-ipc-encapsulation/dist/renderer';

import { initWin } from './win';
import { initSource } from './source';

const ipc = createRendererComm();

export function mountAPI() {
    const ctoolAPI = {
        ...initWin(ipc),
        ...initSource(ipc),
    };
    contextBridge.exposeInMainWorld('utils', ctoolAPI);
    contextBridge.exposeInMainWorld('ipc', ipc);
    return ctoolAPI;
}

export type Utils = ReturnType<typeof mountAPI>
export type IPC = typeof ipc