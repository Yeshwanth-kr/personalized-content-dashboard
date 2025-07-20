"use client";

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { setSearchTerm } from "@/store/slices/contentSlice";
import { ThemeToggleButton } from "./ThemeToggleButton";

export const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [inputValue, setInputValue] = useState("");
  const debouncedSearchTerm = useDebounce(inputValue, 500);

  useEffect(() => {
    dispatch(setSearchTerm(debouncedSearchTerm));
  }, [debouncedSearchTerm, dispatch]);

  return (
    <header className="p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between flex-shrink-0">
      <div className="w-1/3">
        <input
          type="text"
          placeholder="Search for content..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex items-center space-x-4">
        <ThemeToggleButton />
        <div className="w-10 h-10 bg-blue-500 rounded-full"></div>
      </div>
    </header>
  );
};
