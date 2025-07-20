import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ContentItem } from "@/types"; // 1. Import the type

interface FavoritesState {
  items: ContentItem[];
}

const initialState: FavoritesState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<ContentItem>) => {
      const existingIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingIndex >= 0) {
        // Item exists, so remove it
        state.items.splice(existingIndex, 1);
      } else {
        // Item does not exist, so add it
        state.items.push(action.payload);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;
