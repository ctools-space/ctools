import { RendererComm } from '@pokemonon/electron-ipc-encapsulation/dist/renderer';

import * as EventTypes from 'main/ipc/event-types';

export function initWin(ipc: RendererComm) {
    const { emit, on } = ipc;

    function setWinHeight(height: number) {
        return emit(EventTypes.SET_WIN_HEIGHT, height);
    }

    return {
        setWinHeight,
    };
}