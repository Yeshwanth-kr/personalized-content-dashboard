import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { toggleFavorite } from "@/store/slices/favoritesSlice";
import { ContentItem } from "@/types"; // Import
import Image from "next/image";

interface ContentCardProps {
  item: ContentItem;
}

export const ContentCard: React.FC<ContentCardProps> = ({ item }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { items: favoriteItems } = useSelector(
    (state: RootState) => state.favorites
  );

  // Check if the current item is in the favorites list
  const isFavorite = favoriteItems.some((favItem) => favItem.id === item.id);

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(item));
  };

  const title = item.title;
  const description = item.description || item.overview || item.text;
  const image =
    item.imageUrl ||
    item.urlToImage ||
    (item.poster_path
      ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
      : "https://via.placeholder.com/600x400.png?text=No+Image");
  const sourceName = item.source?.name || item.platform;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 relative">
      {/* Favorite Button */}
      <button
        onClick={handleToggleFavorite}
        className="absolute top-2 right-2 p-2 rounded-full bg-black bg-opacity-50 text-white z-10" // Added z-10 to ensure it's on top
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill={isFavorite ? "yellow" : "none"}
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      </button>

      <div className="relative w-full h-48">
        <Image
          src={image}
          alt={title || "Content Image"}
          fill
          priority={true}
          style={{ objectFit: "cover" }}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      <div className="p-4">
        {sourceName && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            {sourceName}
          </p>
        )}
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
          {description}
        </p>
      </div>
    </div>
  );
};
