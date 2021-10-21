import { Ctools } from 'preload/common';
import { IPC, Utils } from 'preload/main/utils';

declare global {
    interface Window {
        ctools: Ctools;
        utils: Utils;
        ipc: IPC;
    }
}
