import { OPEN_PLUGIN_MAIN } from 'main/ipc/event-types';
import router from 'renderer/router';
import { homePlugin } from 'renderer/store';

const ipc = window.ipc;

export function openPluginMain() {
    ipc.on(OPEN_PLUGIN_MAIN, (evt, data) => {
        router.replace({
            name: 'home-plugin',
        });
        console.log(data);
        homePlugin.commit.setPluginMainPageData(data);
    });   
}

export function initIPC() {
    openPluginMain();
}