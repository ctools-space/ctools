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
import { computed, ComputedRef } from 'vue';

import * as home from './home';

export function mapState<S, K extends keyof S>(state: S, keys: K[]) {
    return keys.reduce((res, k) => {
        res[k] = computed(() => state[k]);
        return res;
    }, {} as { [key in K]: ComputedRef<S[key]>});
}

export {
    home,
};