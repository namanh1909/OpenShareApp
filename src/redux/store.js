import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import { rootReducer } from './reducers';
import storage from 'redux-persist/es/storage' // defaults to localStorage for web


const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['auth', 'users', 'post', 'type']
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
        serializableCheck: false
});
export let persistor = persistStore(store);

export default store;
