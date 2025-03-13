import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import recipesReducer from "./recipes/slice.ts";
import filtersReducer from "./filter/slice.ts";

const persistFiltersConfig = {
  key: "basket",
  version: 1,
  storage,
  whitelist: ["basket"],
};

const persistedFiltersReducer = persistReducer(
  persistFiltersConfig,
  filtersReducer
);

export const store = configureStore({
  reducer: {
    recipes: recipesReducer,
    filters: persistedFiltersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
