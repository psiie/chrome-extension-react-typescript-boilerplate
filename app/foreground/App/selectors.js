import { createSelector } from 'reselect';
import initialState from './reducer';

export const key = 'home';

const selectLocal = state => state[key] || initialState;

const makeSelectCounter = () => createSelector(selectLocal, state => state.counter);

export { selectLocal, makeSelectCounter };
