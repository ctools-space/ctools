import { ChildProcess } from 'child_process';

import { eventToP } from '@pokemonon/knife';

import { PluginPublicConfig } from '../common/config';


/**
 * 简化iframe间通信api
 * @category Comm
 */
export interface MainEvent {
    pluginConfig: PluginPublicConfig
}
export const mainComm = (cp: ChildProcess, evt: MainEvent) => {
    return eventToP<MainEvent>({
        onAdapter(cb) {
            const callback = (msgData) => {
                // const msgData = e.data;
                const { eventName, data } = msgData;
                cb(eventName, evt, data);
            };
            cp.on('message', callback);
            return () => {
                cp.removeListener('message', callback);
            };
        },
        emitAdapter(info) {
            const { emitTarget, data, eventName } = info;
            const target = emitTarget || cp;
            if (!target) {
                throw new Error('not exist target');
            }
            if (!eventName) {
                return;
            }
            target.send({ eventName, data });
        },
    });
};

