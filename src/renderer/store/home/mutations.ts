import { HomeState } from './state';

export const initMutations = (state: HomeState) => {
    function setKeyword(keyword: string) {
        state.keyword = keyword;
    }
    const setCurFeatureIdx = (idx: number) => {
        const lastIdx = state.features.length - 1;
        state.curFeatureIdx = idx < 0 ? lastIdx : idx > lastIdx ? 0 : idx;
    };
    return {
        setKeyword,
        setCurFeatureIdx,
    };
};
