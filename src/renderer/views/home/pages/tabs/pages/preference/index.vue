<style lang="postcss">
.pg-home-preference {
    .q-tab {
        @apply !tw-justify-start;
    }
}
</style>
<template>
    <q-splitter
        class="pg-home-preference"
        unit="px"
        :model-value="180">

        <template v-slot:before>
            <q-tabs
                vertical
                inline-label
                align="left"
                content-class="tw-justify-start"
                v-model="tab">
                <q-tab
                    v-for="tab in tabList"
                    :key="tab.name"
                    :name="tab.name"
                    :icon="tab.logo"
                    :label="tab.title" />
            </q-tabs>
        </template>

        <template v-slot:after>
            <q-tab-panels
                class="tw-h-full"
                animated
                transition-prev="slide-down"
                transition-next="slide-up"
                v-model="tab">
                <q-tab-panel
                    v-for="tab in tabList"
                    :key="tab.name"
                    :name="tab.name">
                    <component :is="tab.component"></component>
                </q-tab-panel>
            </q-tab-panels>
        </template>

    </q-splitter>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import CoBase from './components/base.vue';
import CoSuperpanel from './components/superpanel.vue';
import CoShortcut from './components/shortcut.vue';

export default defineComponent({
    components: {
        CoBase,
        CoSuperpanel,
        CoShortcut,
    },
    setup() {
        const tab = ref('base');

        const tabList = [
            {
                title: '基本设置',
                name: 'base',
                logo: 'build',
                component: 'CoBase',
            },
            {
                title: '超级面板',
                name: 'superpanel',
                logo: 'mouse',
                component: 'CoSuperpanel',
            },
            {
                title: '全局快捷键',
                name: 'shortcut',
                logo: 'keyboard',
                component: 'CoShortcut',
            },
        ];

        return {
            tab,
            tabList,
        };
    },
});
</script>