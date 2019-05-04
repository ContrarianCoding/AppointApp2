import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from './reducers/root.reducer';

import apiMiddleware from './middlewares/api.middleware';
import notificatinosMiddleware from './middlewares/alerts.middleware';

const middlewares = [apiMiddleware];

const storeEnhancers = compose(
  applyMiddleware(...middlewares)
);

const persistConfig = {
  key: 'appointapp',
  storage,
  whitelist: ['user', 'app']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, {}, storeEnhancers);
export const persistor = persistStore(store);
