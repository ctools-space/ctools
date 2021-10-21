<style lang="postcss">
.co-home-plugin-header {

}
</style>
<template>
    <q-toolbar class="tw-h-[56px]">
        <q-btn
            v-if="pluginMainPageData"
            color="primary"
            :label="pluginMainPageData.info.title || pluginMainPageData.pluginConfig.name"
            icon-right="cancel"
            @click="$router.replace('/')" />
        <q-space />
    </q-toolbar>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { homePlugin, mapState } from 'renderer/store';

export default defineComponent({
    setup() {
        const { pluginMainPageData } = mapState(homePlugin.state, ['pluginMainPageData']);

        return {
            pluginMainPageData,
        };
    },
});
</script>