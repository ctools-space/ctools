import { PluginPublicConfig } from './config';

export interface PluginMainPageData {
    info: {
        url: string;
        title?: string;
    },
    pluginConfig: PluginPublicConfig
}