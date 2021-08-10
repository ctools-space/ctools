import { contextBridge } from 'electron';
import createRendererComm, { EmitterPromise } from '@pokemonon/electron-ipc-encapsulation/dist/renderer';

import { initWin } from './win';

const ipc = createRendererComm();

export function mountAPI() {
    const ctoolAPI = {
        ...initWin(ipc),
    };
    contextBridge.exposeInMainWorld('ctools', ctoolAPI);
    return ctoolAPI;
}

export type Ctools = ReturnType<typeof mountAPI>