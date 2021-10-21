import { reactive } from 'vue';

import { PluginConfig } from 'main/plugin/common/config';
import { PluginFeature } from 'main/plugin/main';
import { PluginMainPageData } from 'main/plugin/common/types';

export interface HomePluginState {
    pluginFeature?: {
        url: string;
        feature: PluginFeature;
        pluginConf: PluginConfig;
    },
    pluginMainPageData?: PluginMainPageData
}
export const state = reactive<HomePluginState>({
    pluginFeature: undefined,
    pluginMainPageData: undefined,
});

