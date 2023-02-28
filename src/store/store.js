import {compose, createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import { rootReducer } from './root-reducer';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk'
const middleware = [logger,thunk];

const composeEnhancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)|| compose;

const composeEnhancers = composeEnhancer(applyMiddleware(...middleware));

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}

const persistedReducer = persistReducer(persistConfig,rootReducer);
//root reducer
// export const store = createStore(rootReducer,undefined,composeEnhancer);

export const store = createStore(persistedReducer,undefined,composeEnhancers);
export const persistStored = persistStore(store);