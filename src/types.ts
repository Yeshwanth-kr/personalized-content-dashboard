// src/types.ts
export interface ContentItem {
  // Consistent ID for all items
  id: string;

  // News-specific fields
  title?: string;
  url?: string; // Add this line
  description?: string;
  urlToImage?: string;
  source?: { name: string };

  // Movie-specific fields
  overview?: string;
  poster_path?: string;

  // Social media-specific fields
  platform?: string;
  user?: string;
  imageUrl?: string;
  text?: string; // Add this line
  caption?: string; // Add this line
}
