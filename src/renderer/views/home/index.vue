<style lang="postcss">
.pg-home {
    /* @extend tw-flex; */
    @apply tw-flex tw-flex-col tw-flex-nowrap tw-h-screen tw-overflow-hidden;
}
</style>

<template>
    <div class="pg-home">
        <!-- <co-header></co-header> -->
        <router-view name="header"></router-view> 
        <!-- <co-tabs v-if="showTabs"></co-tabs> -->
        <!-- <div class="tw-flex-1 tw-overflow-y-auto">
            <router-view class="tw-h-full tw-overflow-y-auto"></router-view>
        </div> -->
        <router-view class="tw-flex-1 tw-overflow-y-auto tw-flex tw-flex-col"></router-view>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, watch } from 'vue';
import { useRoute } from 'vue-router';

// import CoHeader from './components/header.vue';
// import CoFeatures from './components/features.vue';
// import CoTabs from './components/tabs.vue';

export default defineComponent({
    components: {
        // CoHeader,
        // CoFeatures,
        // CoTabs,
    },
    setup() {
        // const route = useRoute();

        // const showTabs = computed(() => {
        //     return route.matched.length > 1;
        // });

        // watch(route, () => {
        //     console.log(route);
        // });

        return {
            // showTabs,
        };
    },
});
</script>