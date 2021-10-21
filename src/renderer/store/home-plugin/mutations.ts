import { setState } from '.';
import { HomePluginState } from './state';

export const initMutations = (state: HomePluginState) => {
    function setPluginFeature(info) {
        state.pluginFeature = info;
    }

    function setPluginMainPageData(data) {
        // state.pluginMainPageData = data;
        console.log(data);
        setState({
            pluginMainPageData: data,
        });
    }

    return {
        setPluginFeature,
        setPluginMainPageData,
    };
};
