import { RendererComm } from '@pokemonon/electron-ipc-encapsulation/dist/renderer';

import { MatchInfo } from 'main/feature';
import * as EventTypes from 'main/ipc/event-types';

export function initSource(ipc: RendererComm) {
    const { emit, on } = ipc;

    function searchFeatures(matchInfo: MatchInfo) {
        return emit(EventTypes.SEARCH_FEATURES, matchInfo);
    }

    function selectFeature(id: string) {
        return emit(EventTypes.SELECT_FEATURE, id);
    }

    function searchPluginFeature(id: string) {
        return emit(EventTypes.SEARCH_PLUGIN_FEATURE, id);
    }

    return {
        searchFeatures,
        selectFeature,
        searchPluginFeature,
    };
}