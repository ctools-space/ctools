import { RendererComm } from '@pokemonon/electron-ipc-encapsulation/dist/renderer';

import * as EventTypes from 'main/ipc/event-types';

export function initSource(ipc: RendererComm) {
    const { emit, on } = ipc;

    function searchFeatures(keyword = '') {
        return emit(EventTypes.SEARCH_FEATURES, keyword);
    }

    function selectFeature(id: string) {
        return emit(EventTypes.SELECT_FEATURE, id);
    }

    return {
        searchFeatures,
        selectFeature,
    };
}