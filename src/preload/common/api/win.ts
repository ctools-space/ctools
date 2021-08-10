import { RendererComm } from '@pokemonon/electron-ipc-encapsulation/dist/renderer';

import * as EventTypes from 'main/ipc/event-types';

export function initWin(ipc: RendererComm) {
    const { emit, on } = ipc;

    function setBounds(opts) {
        emit(EventTypes.SET_WIN_BOUNDS, opts);
    }

    function setWinVisiable(visiable: boolean) {
        emit(EventTypes.SET_WIN_VISIABLE, visiable);
    }

    return {
        setBounds,
        setWinVisiable,
    };
}