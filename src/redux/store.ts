import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { persistReducer, persistStore } from 'redux-persist';
import persistConfig from './persistConfig';


const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
});

export default store;

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>; 
