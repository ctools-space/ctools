<style lang="less">
.co-home-header {
    .header-input {
        // font-size: 30px;
    }
}
</style>

<template>
    <q-toolbar class="tw-h-[56px]">
        <q-btn
            color="primary"
            :label="routeName"
            icon-right="cancel"
            @click="$router.replace('/')" />
        <q-space />
    </q-toolbar>
</template>

<script lang="ts">
import { ComponentPublicInstance, computed, ref } from 'vue';
import { useRoute } from 'vue-router';

import { home, mapState } from 'renderer/store';
import { Keys } from 'renderer/utils';

export default {
    setup() {
        const route = useRoute();
        const routeName = computed(() => {
            return route.meta.title;
        });

        return {
            routeName,
        };
    },
};
</script>