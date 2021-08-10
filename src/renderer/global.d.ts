import { Ctools } from 'preload/common';
import { Utils } from 'preload/main/utils';

declare global {
    interface Window {
        ctools: Ctools;
        utils: Utils;
    }
}
