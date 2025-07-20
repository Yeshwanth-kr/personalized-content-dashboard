import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define types for your data
export interface Article {
  title: string;
  description: string;
  urlToImage: string;
  url: string;
  source: { name: string };
}

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
}

// Define the state structure
interface ContentState {
  news: Article[];
  recommendations: Movie[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
  searchTerm: string; // Add this
}

const initialState: ContentState = {
  news: [],
  recommendations: [],
  status: "idle",
  error: null,
  searchTerm: "",
};

// Async Thunk for fetching all content
export const fetchAllContent = createAsyncThunk(
  "content/fetchAll",
  async () => {
    const newsApiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
    const tmdbApiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

    const newsPromise = axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${newsApiKey}`
    );
    const recommendationsPromise = axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${tmdbApiKey}`
    );

    const [newsResponse, recommendationsResponse] = await Promise.all([
      newsPromise,
      recommendationsPromise,
    ]);

    const normalizedNews = newsResponse.data.articles.map(
      (article: Article, index: number) => ({
        ...article,
        id: `news-${article.url || index}`, // Use URL for news as it's unique
      })
    );

    const normalizedRecommendations = recommendationsResponse.data.results.map(
      (movie: Movie) => ({
        ...movie,
        id: `movie-${movie.id}`, // Prefix movie IDs
      })
    );

    return {
      news: normalizedNews,
      recommendations: normalizedRecommendations,
    };
  }
);

// Create the slice
const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllContent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllContent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.news = action.payload.news;
        state.recommendations = action.payload.recommendations;
      })
      .addCase(fetchAllContent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const { setSearchTerm } = contentSlice.actions;

export default contentSlice.reducer;
