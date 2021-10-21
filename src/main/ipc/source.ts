import { MainComm } from '@pokemonon/electron-ipc-encapsulation/dist/main';
import { stringifyQuery } from 'vue-router';

import { featureManager, MatchInfo } from 'main/feature';

import * as eventTypes from './event-types';

export async function initSource(ipc: MainComm) {
    const { on } = ipc;
    // loadFeatures();

    featureManager.init();

    on(eventTypes.SEARCH_FEATURES, async(evt, matchInfo: MatchInfo, resolve) => {
        // const features = keyword.trim() ? searchFeatures(keyword) : [];
        const features = featureManager.find(matchInfo);
        resolve(features);
    });

    on(eventTypes.SELECT_FEATURE, async(evt, id: string, resolve) => {
        featureManager.selectedFeature(id);
        resolve();
    });
    
    on(eventTypes.SEARCH_PLUGIN_FEATURE, async(evt, id: string, resolve) => {
        // const result = await getFeatureInfo(id);
        const result = featureManager.findById(id);
        resolve(result);
    });
}
