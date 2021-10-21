// import { createStore, Store } from 'vuex';
// import { InjectionKey } from 'vue';

// import { state, RootState } from './state';
// import { modules } from './modules';


// export const key: InjectionKey<Store<RootState>> = Symbol();
// const store = createStore({
//     state,
//     modules,
// });

// export { store };

// export * from './modules';
import { getJsonData, merge } from '@pokemonon/knife';
import { computed, ComputedRef } from 'vue';

import * as home from './home';
import * as homePlugin from './home-plugin';

export function mapState<S, K extends keyof S>(state: S, keys: K[]) {
    return keys.reduce((res, k) => {
        res[k] = computed(() => state[k]);
        return res;
    }, {} as { [key in K]: ComputedRef<S[key]>});
}

export function initState<S>(namespace: string, state: S) {
    namespace = `store_${namespace}`;
    const stateCache = getJsonData(localStorage.getItem(namespace));

    merge(state, stateCache);

    return {
        state,
        setState(s: Partial<S>) {
            const cache = getJsonData(localStorage.getItem(namespace));
            merge(cache, s);
            localStorage.setItem(namespace, JSON.stringify(cache));
            merge(state, s);
        },
    };
}

export {
    home,
    homePlugin,
};