import { MatchType } from 'main/feature/types';
import { HeaderHeight, FeatureItemHeight } from 'renderer/utils';
// import 'electron';

import { HomeState } from './state';

export function initActions(state: HomeState) {
    async function searchFeature(keyword: string) {
        const features = await window.utils.searchFeatures({
            type: MatchType.command,
            payload: keyword,
        });
        await window.utils.setWinHeight(HeaderHeight + FeatureItemHeight * features.length);
        return state.features = features;
    }
    return {
        searchFeature,
    };
}
