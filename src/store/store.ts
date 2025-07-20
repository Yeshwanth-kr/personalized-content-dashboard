import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./slices/uiSlice";
import contentReducer from "./slices/contentSlice"; // Import the new reducer
import favoritesReducer from "./slices/favoritesSlice"; // Import

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    content: contentReducer,
    favorites: favoritesReducer,
    // Add other slices here as you create them (e.g., news, recommendations)
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
