import { state } from './state';
import { initMutations } from './mutations';
import { initActions } from './actions';
import { initGetters } from './getters';

const getters = initGetters(state);
const commit = initMutations(state);
const dispatch = initActions(state);

export {
    state,
    getters,
    commit,
    dispatch,
};