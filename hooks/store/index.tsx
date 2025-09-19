import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import themeConfigSlice from "./themeConfigSlice";
import loaderSlice from "./loaderSlice";
import authSlice from "./authSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  themeConfig: themeConfigSlice,
  auth: authSlice,
  loader: loaderSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  })
});

export const persistor = persistStore(store);

export type IRootState = ReturnType<typeof rootReducer>;
