<style lang="postcss">
.pg-home-plugin {

}
</style>
<template>
    <div class="pg-home-plugin">
        <webview
            v-if="pluginMainPageData"
            :style="style"
            :src="pluginMainPageData.info.url"></webview>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';

import { WinWidth } from 'common/utils';
import { HeaderHeight, WinHeight } from 'renderer/utils';
import { homePlugin, mapState } from 'renderer/store';

export default defineComponent({
    setup() {
        const style = {
            height: `${WinHeight - HeaderHeight}px`,
            width: `${WinWidth}px`,
        };
        const route = useRoute();
        const { pluginMainPageData } = mapState(homePlugin.state, ['pluginMainPageData']);
        // const { getPluginFeature } = homePlugin.dispatch;

        // function loadPluginMain() {
        //     const { id } = route.params;
        //     // window.utils.loadPluginMain(id);
        //     getPluginFeature(id as string);
        // }

        // loadPluginMain();

        return {
            style,
            pluginMainPageData,
        };
    },
});
</script>