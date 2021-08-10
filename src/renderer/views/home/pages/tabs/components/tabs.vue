<style lang="postcss">
.co-home-tabs {

}
</style>
<template>
    <q-tabs
        inline-label
        class="bg-primary text-white shadow-2"
        align="left">
        <q-route-tab
            v-for="tab in tabList"
            :key="tab.name"
            :name="tab.name"
            :label="tab.title"
            :icon="tab.icon"
            :to="{ name: `home-tabs-${tab.name}` }"
            replace />
    </q-tabs>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

const tabList = [
    {
        name: 'market',
        title: '插件市场',
        icon: 'mail',
    },
    {
        name: 'management',
        title: '插件管理',
        icon: 'alarm',
    },
    {
        name: 'preference',
        title: '偏好设置',
        icon: 'movie',
    },
];
export default defineComponent({
    setup() {
        return {
            tabList,
        };
    },
});
</script>