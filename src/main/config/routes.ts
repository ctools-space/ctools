import * as path from 'path';

import { isProd } from 'common/utils';

const url = isProd ?
    `file://${path.join(__dirname, '../render/index.html')}` :
    `http://localhost:${process.env.PORT}`;

export const routes = {
    home() {
        return url;
    },
    preference() {
        return `${url}#/home/tabs/preference`;
    },
    plugin(id) {
        return `${url}#/home/plugin/${id}`;
    },
};