# Personalized Content Dashboard [Live App](https://personalized-content-dashboard-yeshwanthkr.vercel.app/)

This project is a dynamic and interactive "Personalized Content Dashboard" built as a solution to the SDE Intern - Frontend Development Assignment. The application allows users to track and interact with personalized content from various sources like news and movie recommendations in an engaging interface.

## Features

- Personalised content feed:

  1. User Preferences: Configure content preferences (e.g., favorite categories) via a settings panel, with settings persisted using Redux and Local Storage.
  2. Unified Feed: Displays news and movie recommendations in a single, cohesive feed.

- API Integration:

  1.  Fetches the latest news from the News API (proxied to prevent CORS issues).
  2.  Shows movie recommendations from the OMDb API.

- Interactive Dashboard Layout:

  1. Responsive Design: A modern, responsive layout with a sidebar for navigation and a header for search and settings.
  2. Favorites Section: Users can mark content as a favorite and view all their selections in a dedicated section.

- Advanced Search:

  1. Debounced Search: A performant search bar that filters content across all categories without making excessive requests while typing.

- Polished UI/UX:

  1. Drag-and-Drop: Users can drag and reorder content cards within their feed to organize it as they wish.
  2. Dark Mode: A fully functional dark mode toggle for comfortable viewing in low-light environments.
  3. Animations: Smooth transitions between sections and loading spinners provide a fluid user experience.

- Comprehensive Testing:
  1. Unit Tests: Key logic and hooks (useDebounce) are tested using Jest.
  2. Integration Tests: Components like the FavoritesSection are tested to handle different states (e.g., empty state).
  3. End-to-End (E2E) Tests: Critical user flows like search and favoriting are tested using Cypress.

## Tech Stack

| Category                   | Tech                                 |
| -------------------------- | ------------------------------------ |
| Framework                  | Next.js (with App Router)            |
| Language                   | TypeScript                           |
| State Management           | Redux Toolkit                        |
| Styling                    | Tailwind CSS                         |
| Animations & Drag-and-Drop | Framer Motion & React DnD            |
| API Fetching               | Axios                                |
| Testing                    | Jest, React Testing Library, Cypress |

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/Yeshwanth-kr/personalized-content-dashboard.git
   cd personalized-content-dashboard
   ```
2. Install dependencies
   ```bash
   npm install
   ```

### Environment Variables

This project requires API keys to fetch content.

1. Create a new file named `.env.local` in the root of your project.
2. Add the following variables, replacing the placeholder values with your actual keys:

```
# Get your key from https://newsapi.org/
NEXT_PUBLIC_NEWS_API_KEY="YOUR_NEWS_API_KEY"

# Get your key from http://www.omdbapi.com/apikey.aspx
NEXT_PUBLIC_OMDB_API_KEY="YOUR_OMDB_API_KEY"
```

### Running the Application

1. Start the development server:
   ```bash
   npm run dev
   ```
   Open http://localhost:3000 with your browser to see the result.
2. Running Tests:
   - To run Jest tests (Unit & Integration):
     ```bash
     npm test
     ```
   - To run E2E tests with Cypress:
     1. Make sure the development server is running (`npm run dev`).
     2. In a separate terminal, open the Cypress test runner:
     ```bash
     npx cypress open
     ```
