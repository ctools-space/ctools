import { isString, sureArray } from '@pokemonon/knife';

import { Key } from 'typings/common';

interface RecentListConfig {
    key?: string | (() => string);
    sort?: Parameters<typeof Array.prototype.sort>[0];
}

export class RecentList<T extends any> {
    #map = new Map<Key, T>();
    #list: T[] = []
    #conf: RecentListConfig;
    
    constructor(conf: RecentListConfig = {}) {
        this.#conf = conf;
    }

    get key() {
        const { key = 'id' } = this.#conf;
        return isString(key) ? key : key();
    }
    get sort() {
        const { sort = () => 0 } = this.#conf;
        return sort;
    }

    load(list: any[]) {
        this.#list = list.sort(this.sort);

        this.#map = new Map();
        this.#list.forEach(i => {
            this.#map.set(i[this.key], i);
        });
        return this;
    }

    patch(list) {
        const newList = list.sort(this.sort);

        this.#list.forEach((i, idx) => {
            const findIdx = newList.findIndex(item => item[this.key] == i[this.key]);
            if (findIdx > -1) {
                newList.splice(findIdx, 1);
            } else {
                // 删除不存在的元素
                this.rm(i);
            }
        });

        this.add(newList);
    }

    dump() {
        return this.#list;
    }

    add(items) {
        items = sureArray(items);
        this.#list.unshift(...items);
        items.forEach(i => {
            this.#map.set(i[this.key], i);
        });
    }

    rm(items) {
        items = sureArray(items);
        items.forEach(i => {
            const findIdx = this.#list.findIndex(item => item[this.key] === i[this.key]);
            if (findIdx > -1) {
                this.#list.splice(findIdx, 1);
                this.#map.delete(i[this.key]);
            }
        });
    }

    find(key) {
        return this.#map.get(key);
    }

    findIndex(key) {
        return this.#list.findIndex(i => i[this.key] === key);
    }

    use(key) {
        const findIdx = this.findIndex(key);
        if (findIdx === -1) return;
        const item = this.#list[findIdx];
        this.#list.splice(findIdx, 1);
        this.#list.unshift(item);
    }

    clear() {
        this.#map = new Map();
        this.#list = [];
    }
    
    reset() {
        this.#list = this.#list.sort(this.sort);
    }
}
