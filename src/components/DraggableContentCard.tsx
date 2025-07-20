"use client";

import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ContentCard } from "./ContentCard";
import { ContentItem } from "@/types"; // Import

const ItemType = "CARD"; // Defines the type of item being dragged

interface DraggableContentCardProps {
  item: ContentItem; // Replace any with ContentItem
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}

export const DraggableContentCard: React.FC<DraggableContentCardProps> = ({
  item,
  index,
  moveCard,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: ItemType,
    hover(draggedItem: { index: number }) {
      if (draggedItem.index !== index) {
        moveCard(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Initialize the refs for drag and drop
  drag(drop(ref));

  return (
    <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1, cursor: "move" }}>
      <ContentCard item={item} />
    </div>
  );
};
