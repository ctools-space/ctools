<style lang="less">
.co-home-header {
    .header-input {
        // font-size: 30px;
    }
}
</style>

<template>
    <div class="co-home-header">
        <q-input
            filled
            borderless
            input-class="header-input tw-text-2xl"
            autofocus
            ref="ipt"
            :modelValue="keyword"
            :placeholder="placeholder"
            @update:modelValue="search">
            <!-- <template #prepend>
                <q-btn
                    color="white"
                    text-color="black"
                    :label="tagName" />
            </template> -->
            <template #append>
                <q-avatar
                    class="cursor-pointer"
                    rounded
                    color="red"
                    text-color="white"
                    icon="directions"
                    @click="openTabs" />
            </template>
        </q-input>
    </div>
</template>

<script lang="ts">
import { ComponentPublicInstance, computed, ref } from 'vue';
import { useRoute } from 'vue-router';

import { home, mapState } from 'renderer/store';
import { Keys } from 'renderer/utils';
export const HeaderHeight = 56;

export default {
    setup() {
        const ipt = ref<ComponentPublicInstance | null>(null);
        const curIdx = ref(-1);
        const placeholder = ref('Hi, ctools');
        const { keyword, curFeatureIdx } = mapState(home.state, ['keyword', 'curFeatureIdx']);
        // const { setCurFeatureIdx } = home.commit;
        // const route = useRoute();

        // const isFeaturesPage = computed(() => {
        //     return route.name === 'home-features';
        // });

        // const tagName = computed(() => {
        //     return '';
        // });

        // 设置选中的下标
        function setCurIdx(idx: number) {
            curIdx.value = idx;
        }

        function openTabs() {

        }

        function search(str: string) {
            home.commit.setKeyword(str);
            // 搜索功能
            home.dispatch.searchFeature(str);
            // if (isFeaturesPage.value) {
            // }
        }


        return { 
            keyword,
            placeholder,
            openTabs,
            search,
            curIdx,
            setCurIdx,
            // tagName,
        };
    },
};
</script>