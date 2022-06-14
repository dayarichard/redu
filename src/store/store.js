import { createStore, applyMiddleware } from "redux";
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import authorization from "./reducer";
import { configureStore } from "@reduxjs/toolkit";
const middleware = [thunk];

const persistConfig = {
    key: 'userdetails',
    storage:storage,
    blackList :['key1']
};

const persistedReducer = persistReducer(persistConfig, authorization);
export default configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
    });
// const store = createStore(
//   authorization,
//   composeWithDevTools(applyMiddleware(...middleware))
// );
// export default store;


