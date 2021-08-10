import { state } from './state';
import { initMutations } from './mutations';
import { initActions } from './actions';

const commit = initMutations(state);
const dispatch = initActions(state);

export {
    state,
    commit,
    dispatch,
};