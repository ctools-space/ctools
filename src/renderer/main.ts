import 'tailwindcss/tailwind.css';
import 'renderer/styles/index.less';
import 'renderer/styles/theme.css';

import { createApp } from 'vue';

import router from 'renderer/router';

import { init } from './utils';
import App from './App.vue';

const app = createApp(App)
    .use(router);

init(app);

app.mount('#app');
