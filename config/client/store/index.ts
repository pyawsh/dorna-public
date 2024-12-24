import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { adminInformationReducer, postResponseReducer } from 'redux/reducer' // Assuming you have separate files for each reducer

// ایجاد تنظیمات persist
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['adminInformation'],
}

const persistedReducer = persistReducer(persistConfig, adminInformationReducer)
const rootReducer = combineReducers({
    adminInformationReducer: persistedReducer,
    postResponseReducer,
})
// Create the Redux store
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
})

// Create the persisted store
export const persistedStore = persistStore(store)
