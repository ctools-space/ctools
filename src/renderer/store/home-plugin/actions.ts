import { commit } from './index';
import { HomePluginState } from './state';

export function initActions(state: HomePluginState) {
    async function getPluginFeature(id: string) {
        const info = await window.utils.searchPluginFeature(id);
        commit.setPluginFeature(info);
    }

    return {
        getPluginFeature,
    };
}
