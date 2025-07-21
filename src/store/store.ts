import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./slices/uiSlice";
import contentReducer from "./slices/contentSlice";
import favoritesReducer from "./slices/favoritesSlice";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    content: contentReducer,
    favorites: favoritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
