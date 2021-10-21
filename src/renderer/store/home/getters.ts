import { computed } from 'vue';

import { HomeState } from './state';

export function initGetters(state: HomeState) {
    const curFeature = computed(() => {
        return state.features[state.curFeatureIdx];
    });

    return {
        curFeature,
    };
}