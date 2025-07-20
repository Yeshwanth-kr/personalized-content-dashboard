"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchAllContent } from "@/store/slices/contentSlice";
import { DraggableContentCard } from "./DraggableContentCard"; // We will create this next
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Spinner } from "./Spinner";
import { motion } from "framer-motion";
import { ContentItem } from "@/types";

export const PersonalizedFeed = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { news, recommendations, status, error, searchTerm } = useSelector(
    (state: RootState) => state.content
  );

  // Use local state to manage the order of cards
  const [cards, setCards] = useState<ContentItem[]>([]); // Use ContentItem[]

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllContent());
    }
  }, [status, dispatch]);

  // Update local state when Redux data changes
  useEffect(() => {
    const allContent = [...news, ...recommendations];
    const filteredContent = allContent.filter((item) => {
      const title = item.title || "";
      const description = item.description || item.overview || item.text || "";
      return (
        title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setCards(filteredContent);
  }, [news, recommendations, searchTerm]);

  const moveCard = (dragIndex: number, hoverIndex: number) => {
    const dragCard = cards[dragIndex];
    const newCards = [...cards];
    newCards.splice(dragIndex, 1);
    newCards.splice(hoverIndex, 0, dragCard);
    setCards(newCards);
  };

  if (status === "loading") return <Spinner />;
  if (status === "failed")
    return <div className="text-center p-10 text-red-500">Error: {error}</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <DndProvider backend={HTML5Backend}>
        <div className="p-4 md:p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            Your Feed
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cards.map((card, index) => (
              <DraggableContentCard
                key={`${card.id || card.title}-${index}`}
                index={index}
                item={card}
                moveCard={moveCard}
              />
            ))}
          </div>
          {cards.length === 0 && status === "succeeded" && (
            <p className="text-center col-span-full">
              No content matches your search.
            </p>
          )}
        </div>
      </DndProvider>
    </motion.div>
  );
};
