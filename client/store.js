import { applyMiddleware, createStore as reduxCreateStore, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { loadState, saveState } from './localStorage';

const middlewares = [];

// Add state logger
if (process.env.NODE_ENV !== 'production') {
  try {
    middlewares.push(createLogger());
  } catch (e) {}
}

export function createStore(state) {
  const persistedState = loadState();
  return reduxCreateStore(
    reducers,
    persistedState,
    applyMiddleware(thunk, ...middlewares)
  );
}

export let store = null;
export function getStore() { return store; }
export function setAsCurrentStore(s) {
  store = s;
  if (process.env.NODE_ENV !== 'production'
    && typeof window !== 'undefined') {
    window.store = store;
  }
}
