"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { toggleDarkMode } from "@/store/slices/uiSlice";

export const ThemeToggleButton = () => {
  // Read the dark mode state from the Redux store
  const isDarkMode = useSelector((state: RootState) => state.ui.isDarkMode);
  // Get the dispatch function to send actions
  const dispatch = useDispatch();

  return (
    <div className="p-2 bg-slate-200 dark:bg-slate-700 rounded-lg xl:flex xl:flex-row xl:gap-2 xl:items-center">
      <button
        onClick={() => dispatch(toggleDarkMode())}
        className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
      >
        Toggle Theme
      </button>
      <p className="font-mono text-lg text-black dark:text-white">
        Current Mode: {isDarkMode ? "Dark" : "Light"}
      </p>
    </div>
  );
};
