// src/components/FavoritesSection.tsx
"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { ContentCard } from "./ContentCard";
import { motion } from "framer-motion";

export const FavoritesSection = () => {
  const { items: favoriteItems } = useSelector(
    (state: RootState) => state.favorites
  );

  if (favoriteItems.length === 0) {
    return (
      <div className="text-center p-10">
        <h2 className="text-2xl font-bold mb-4">Your Favorites</h2>
        <p>
          You haven't favorited any content yet. Click the star on any item to
          save it here!
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-4 md:p-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          Your Favorites
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteItems.map((item, index) => (
            <ContentCard key={`${item.id}-${index}`} item={item} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};
