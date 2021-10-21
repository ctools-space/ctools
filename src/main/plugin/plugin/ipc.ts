
import { eventToP } from '@pokemonon/knife';

/**
 * 简化iframe间通信api
 * @category Comm
 */
export const pluginComm = () => {
    return eventToP({
        onAdapter(cb) {
            const callback = (msgData) => {
                // const msgData = e.data;
                const { eventName, data } = msgData;
                cb(eventName, {}, data);
            };
            process.on('message', callback);
            return () => {
                // cp.removeListener('message', callback);
            };
        },
        emitAdapter(info) {
            const { data, eventName } = info;
            if (!eventName) {
                return;
            }
            process.send?.({ eventName, data });
        },
    });
};

export type Comm = ReturnType<typeof pluginComm>