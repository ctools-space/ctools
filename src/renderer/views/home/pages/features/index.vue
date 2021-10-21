<template>
    <div ref="wrapper">
        <q-list>
            <q-item
                v-for="(item, idx) in features"
                :key="item.path"
                clickable
                v-ripple
                manual-focus
                :ref="setFeatureItem"
                :focused="curFeatureIdx === idx"
                @click="selectFeature(item.id)">
                <q-item-section
                    avatar
                    class="tw-relative">
                    <q-avatar
                        v-if="item.logo"
                        color="transparent"
                        square>
                        <img :src="transImage(item.logo)">
                    </q-avatar>
                    <q-avatar
                        v-else
                        color="primary"></q-avatar>
                    <q-avatar
                        v-if="showChooseKey && idx >= firstFeatureIdx && idx < firstFeatureIdx + FeatureCount"
                        class="!tw-absolute tw-top-0 tw-left-0 tw-bg-black/60"
                        text-color="white"
                        square>{{(idx - firstFeatureIdx + 1).toString().slice(-1)[0]}}</q-avatar>
                </q-item-section>

                <q-item-section>
                    <q-item-label><span v-html="item.matchFieldHTML"></span></q-item-label>
                    <q-item-label caption lines="1">{{ item.path }}</q-item-label>
                </q-item-section>

                <q-item-section side v-if="false">
                    <q-icon name="chat_bubble" color="green" />
                </q-item-section>
            </q-item>
        </q-list>
    </div>
</template>

<script lang="ts">
import { Component, ComponentPublicInstance, computed, defineComponent, getCurrentInstance, nextTick, onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import { isNumber } from '@pokemonon/knife';
import { onBeforeRouteLeave } from 'vue-router';

import { home, mapState } from 'renderer/store';
import { checkInScrollView, FeatureItemHeight, getClosestParentScroller, Keys, scrollInThrottle, transImage, FeatureCount, WinHeight, HeaderHeight } from 'renderer/utils';

export default defineComponent({
    setup() {
        const wrapper = ref<HTMLElement | null>(null);
        const showChooseKey = ref(false);
        const firstFeatureIdx = ref(0); // 屏幕中第一个元素的列表下标
        const featureItems = reactive<ComponentPublicInstance[]>([]);
        const { features, curFeatureIdx } = mapState(home.state, ['features', 'curFeatureIdx']);
        const { setCurFeatureIdx } = home.commit;

        const curFeatureItem = computed(() => {
            return featureItems[curFeatureIdx.value];
        });

        // 搜集列表元素
        const setFeatureItem = (ref) => {
            ref && featureItems.push(ref);
        };
        watch(features, () => {
            setCurFeatureIdx(0);
            featureItems.length = 0;
            nextTick(() => wrapper.value && wrapper.value.scrollTo(0, 0));
            // featureItems[curFeatureIdx.value].$el.scrollIntoView
            // window.scrollTo(0, 0);
        });

        // ! curFeatureIdx变化的时候 确保curFeature在可视区域内
        watch(curFeatureIdx, (idx) => {
            nextTick(() => {
                if (checkIfFeatureItemInView()) return;
                const featureItemEl: HTMLElement = curFeatureItem.value.$el;
                const wrapperEl: HTMLElement = wrapper.value!;
                const bounds = featureItemEl.getBoundingClientRect();
                const parentBounds = wrapperEl.getBoundingClientRect();
                if (bounds.top < parentBounds.top) {
                    wrapperEl.scrollTo(0, idx * FeatureItemHeight);
                } else {
                    wrapperEl.scrollTo(0, (idx + 1) * FeatureItemHeight - wrapperEl.clientHeight);
                }
            });
        });

        // 点击选择功能
        function selectFeature(id: string) {
            window.utils.selectFeature(id);
        }

        // 获取可视内第一个功能
        function getFirstFeatureIdx() {
            const scrollTop = wrapper.value!.scrollTop;
            return scrollTop / FeatureItemHeight;
        }

        // 按键
        function keydown(evt: KeyboardEvent) {
            contrChooseFeature(evt);
        }
        function keyup(evt: KeyboardEvent) {
            showChooseKey.value = false;
        }

        function contrChooseFeature(evt: KeyboardEvent) {
            const { key, metaKey } = evt;
            if (key === Keys.ArrowUp) {
                setCurFeatureIdx(curFeatureIdx.value - 1);
            }
            if (key === Keys.ArrowDown) {
                setCurFeatureIdx(curFeatureIdx.value + 1);
            }
            if (key === Keys.Enter) {
                const feature = features.value[curFeatureIdx.value];
                selectFeature(feature.id);
            }

            // command选择
            if (key === Keys.Meta) {
                showChooseKey.value = true;
            }
            if (metaKey && !isNaN(+key)) {
                const count = +key === 0 ? 10 : +key;
                const feature = features.value[getFirstFeatureIdx() + count - 1];
                selectFeature(feature.id);
                showChooseKey.value = false;
            }
        }

        function checkIfFeatureItemInView() {
            const featureItemEl: HTMLElement = curFeatureItem.value.$el;
            const wrapperEl: HTMLElement = wrapper.value!;
            return !curFeatureItem.value || checkInScrollView(featureItemEl, wrapperEl);
        }

        function listenKeyboard() {
            window.addEventListener('keydown', keydown);
            window.addEventListener('keyup', keyup);
        }
        function rmListenKeyboard() {
            window.removeEventListener('keydown', keydown);
            window.removeEventListener('keyup', keyup);
        }

        let rmListenScrollInThrottle = () => {};
        function listenScrollInThrottle() {
            rmListenScrollInThrottle = scrollInThrottle(wrapper.value!, { throttle: 10 }, (evt) => {
                const { deltaY } = evt;
                wrapper.value?.scrollBy(0, deltaY > 0 ? FeatureItemHeight : -FeatureItemHeight);
                if (checkIfFeatureItemInView()) {
                    //
                } else {
                    setCurFeatureIdx(curFeatureIdx.value + (deltaY > 0 ? 1 : -1));
                }
            });
        }

        let rmListenScroll = () => {};
        function listenScroll() {
            function listener() {
                firstFeatureIdx.value = getFirstFeatureIdx();
            }
            wrapper.value?.addEventListener('scroll', listener);
            rmListenScroll = () => {
                wrapper.value?.removeEventListener('scroll', listener);
            };
        }

        window.utils.setWinHeight(HeaderHeight + FeatureItemHeight * features.value.length);

        onMounted(() => {
            listenKeyboard();
            listenScrollInThrottle();
            listenScroll();
        });

        onUnmounted(() => {
            rmListenKeyboard();
            rmListenScrollInThrottle();
            rmListenScroll();
        });

        onBeforeRouteLeave((to, from, next) => {
            window.utils.setWinHeight(WinHeight);
            next();
        });


        return {
            wrapper,
            features,
            transImage,
            selectFeature,
            curFeatureIdx,
            featureItems,
            setFeatureItem,
            FeatureCount,
            showChooseKey,
            firstFeatureIdx,
        };
    },
});
</script>