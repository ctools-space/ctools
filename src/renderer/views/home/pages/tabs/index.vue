<style lang="postcss">
.pg-home-tabs {

}
</style>
<template>
    <div class="pg-home-tabs">
        <co-tabs></co-tabs>
        <router-view class="tw-flex-1"></router-view>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import CoTabs from './components/tabs.vue';

export default defineComponent({
    components: {
        CoTabs,
    },
    setup() {

    },
});
</script>