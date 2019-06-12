/**
 * Create the store with dynamic reducers
 */

import { createStore } from 'redux';
import createReducer from './reducers';

export default function configureStore(initialState = {}) {
  const store = createStore(
    createReducer(),
    initialState,
  );

  // Extensions
  store.injectedReducers = {}; // Reducer registry
  store.injectedSagas = {}; // Saga registry

  return store;
}
