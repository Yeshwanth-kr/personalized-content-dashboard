import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UiState {
  isDarkMode: boolean;
}

const initialState: UiState = {
  isDarkMode: false, // Default to light mode
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
  },
});

export const { toggleDarkMode, setDarkMode } = uiSlice.actions;
export default uiSlice.reducer;
