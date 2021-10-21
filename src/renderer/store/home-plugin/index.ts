import { state as homePluginState } from './state';
import { initMutations } from './mutations';
import { initActions } from './actions';
import { initState } from '..';

const { state, setState } = initState('home-plugin', homePluginState);

const commit = initMutations(state);
const dispatch = initActions(state);

export {
    state,
    commit,
    dispatch,
    setState,
};