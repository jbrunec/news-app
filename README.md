# News Aggregator

This is a news aggregator web application built with React, Vite, react-query, axios, shadcn, and Tailwind CSS.

## Data used

Data for the app is pulled from 3 sources (in case the source is not selected from the UI):

- The Washington Post
- Google News
- Fox News

## Running the Project

Firstly, the app uses 2 API endpoints to retrieve data (NY Times API & NewsAPI), therefore a key is required to authorize with these two API providers. You need to register to get the keys.

1. https://newsapi.org/
2. https://developer.nytimes.com/

Once you obtain the keys, create a .env file in the root of the project and add the keys:

```
VITE_NEWS_API_KEY=your_key_here
VITE_NYTIMES_API_KEY=your_key_here
```

### With Docker

1. Build and run the Docker container:

   ```bash
   docker compose up --build
   ```

2. Visit the exposed URL https://localhost:5173/
