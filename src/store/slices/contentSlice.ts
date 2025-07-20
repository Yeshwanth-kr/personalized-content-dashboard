import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { ContentItem } from "@/types";

// Define the state structure
interface ContentState {
  news: ContentItem[];
  recommendations: ContentItem[];
  searchTerm: string;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
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
    const omdbApiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY;

    const newsPromise = axios.get("/api/news");
    const recommendationsPromise = axios.get(
      `https://www.omdbapi.com/?s=space&type=movie&apikey=${omdbApiKey}`
    );

    const [newsResponse, recommendationsResponse] = await Promise.all([
      newsPromise,
      recommendationsPromise,
    ]);

    const normalizedNews = newsResponse.data.articles.map(
      (article: ContentItem, index: number) => ({
        ...article,
        id: `news-${article.url || index}`,
      })
    );

    const normalizedRecommendations = recommendationsResponse.data.Search.map(
      (movie: ContentItem, index:number) => ({
        title: movie.Title,
        poster_path: movie.Poster,
        id: `movie-${movie.imdbID || index}`,
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
