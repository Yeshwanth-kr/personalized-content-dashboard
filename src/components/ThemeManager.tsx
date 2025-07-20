// src/components/ThemeManager.tsx
"use client";

import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useEffect } from 'react';

export const ThemeManager = ({ children }: { children: React.ReactNode }) => {
  const isDarkMode = useSelector((state: RootState) => state.ui.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return <>{children}</>;
};