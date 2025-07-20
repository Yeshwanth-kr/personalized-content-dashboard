import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { FavoritesSection } from "./FavoritesSection";

// Initialize the mock store
const mockStore = configureStore([]);

describe("FavoritesSection", () => {
  it("should display a message when there are no favorites", () => {
    // Create a store with an empty favorites list
    const store = mockStore({
      favorites: {
        items: [],
      },
    });

    render(
      <Provider store={store}>
        <FavoritesSection />
      </Provider>
    );

    // Check if the "empty state" message is rendered
    expect(
      screen.getByText(
        "You have not favorited any content yet. Click the star on any item to save it here!"
      )
    ).toBeInTheDocument();
  });

  it("should render favorited items correctly", () => {
    // Create a store with one favorited item
    const store = mockStore({
      favorites: {
        items: [{ id: "movie-123", title: "Test Movie Title" }],
      },
    });

    render(
      <Provider store={store}>
        <FavoritesSection />
      </Provider>
    );

    // Check that the favorited item's title is rendered
    expect(screen.getByText("Test Movie Title")).toBeInTheDocument();
  });
}); // Ensure this final closing brace and parenthesis are present
