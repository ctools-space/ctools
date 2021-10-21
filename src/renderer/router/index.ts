import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router';
import { defineAsyncComponent } from 'vue';

import HomeFeatures from 'renderer/views/home/pages/features/index.vue';
import HomeFeaturesHeader from 'renderer/views/home/pages/features/components/header.vue';
import HomeTabs from 'renderer/views/home/pages/tabs/index.vue';
import HomeTabsHeader from 'renderer/views/home/pages/tabs/components/header.vue';
import Home from 'renderer/views/home/index.vue';
import HomeMarket from 'renderer/views/home/pages/tabs/pages/market/index.vue';
import HomeManagement from 'renderer/views/home/pages/tabs/pages/management/index.vue';
import HomePreference from 'renderer/views/home/pages/tabs/pages/preference/index.vue';
import HomePlugin from 'renderer/views/home/pages/plugin/index.vue';
import HomePluginHeader from 'renderer/views/home/pages/plugin/components/header.vue';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            name: 'home',
            path: '/home',
            component: Home,
            redirect: '/home/features',
            children: [
                {
                    name: 'home-features',
                    path: 'features',
                    // component: HomeFeatures,
                    components: {
                        header: HomeFeaturesHeader,
                        default: HomeFeatures,
                    },
                },
                {
                    name: 'home-plugin',
                    path: 'plugin/:id?',
                    components: {
                        header: HomePluginHeader,
                        default: HomePlugin,
                    },
                },
                {
                    name: 'home-tabs',
                    path: 'tabs',
                    // component: HomeTabs,
                    components: {
                        header: HomeTabsHeader,
                        default: HomeTabs,
                    },
                    children: [
                        {
                            name: 'home-tabs-market',
                            path: 'market',
                            component: HomeMarket,
                            meta: {
                                title: '插件市场',
                            },
                        },
                        {
                            name: 'home-tabs-management',
                            path: 'management',
                            component: HomeManagement,
                            meta: {
                                title: '插件管理',
                            },
                        },
                        {
                            name: 'home-tabs-preference',
                            path: 'preference',
                            component: HomePreference,
                            meta: {
                                title: '偏好设置',
                            },
                        },
                    ],
                },
            ],
        },
        {
            path: '/:name(.*)',
            redirect: '/home/features',
        },
    ],
});

export default router;