import { reactive } from 'vue';

import { FeatureInfo } from 'main/ipc/source';

export interface HomeState {
    loading: boolean;
    keyword: string; // 输入框
    features: FeatureInfo[];
    curFeatureIdx: number;
}

export const state = reactive<HomeState>({
    loading: false,
    keyword: '',
    features: [],
    curFeatureIdx: 0,
});


