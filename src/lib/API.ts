import { queryOptions } from "@tanstack/react-query";
import { addDays, format } from "date-fns";
import axios from "redaxios";
import {
  Article,
  NewsApiArticle,
  NewsApiResponse,
  NyTimesArticle,
} from "./types";
import { buildNyTimesQuery } from "./utils";

const NEWS_API_URL = "https://newsapi.org/v2";
const NY_TIMES_API_URL = "https://api.nytimes.com/svc/search/v2";

async function fetchAllNews(
  page: number,
  selectedCategory: string,
  selectedSource: string | null,
  fromDate?: Date,
  searchText?: string
): Promise<Article[]> {
  if (selectedSource) {
    if (selectedSource !== "ny-times") {
      return executeNewsApiCallBasedOnCategory(
        page,
        selectedCategory,
        selectedSource,
        fromDate,
        searchText
      );
    } else {
      return fetchNYTimes(page, selectedCategory, fromDate, searchText);
    }
  } else {
    const newsApiPromise = executeNewsApiCallBasedOnCategory(
      page,
      selectedCategory,
      selectedSource,
      fromDate,
      searchText
    );
    const [newsApiResults, nyTimesApiResults] = await Promise.all([
      newsApiPromise,
      fetchNYTimes(page, selectedCategory, fromDate, searchText),
    ]);
    const combinedResult = [...newsApiResults, ...nyTimesApiResults];

    const sortedArticles = combinedResult.sort(
      (a: Article, b: Article) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    return sortedArticles;
  }
}

async function executeNewsApiCallBasedOnCategory(
  page: number,
  selectedCategory: string,
  selectedSource: string | null,
  fromDate?: Date,
  searchText?: string
) {
  return selectedCategory
    ? fetchNewsApiTopNews(page, selectedCategory, searchText)
    : fetchNewsApiEverything(page, selectedSource, fromDate, searchText);
}

export function newsQueryOptions(
  page: number,
  selectedCategory: string,
  selectedSource: string | null,
  fromDate?: Date,
  searchText?: string
) {
  return queryOptions({
    queryKey: [
      "news",
      page,
      searchText,
      selectedCategory,
      selectedSource,
      fromDate,
    ],
    queryFn: () =>
      fetchAllNews(
        page,
        selectedCategory,
        selectedSource,
        fromDate,
        searchText
      ),
    staleTime: 0,
    gcTime: 0,
    retry: false,
  });
}

async function fetchNewsApiEverything(
  page: number,
  source: string | null,
  fromDate?: Date,
  searchText?: string
): Promise<Article[]> {
  const { data } = await axios.get<NewsApiResponse>(
    `${NEWS_API_URL}/everything`,
    {
      params: {
        pageSize: 10,
        page: page,
        q: searchText,
        language: "en",
        sources: source || "google-news,fox-news,the-washington-post",
        from: fromDate ? fromDate.toISOString() : "",
        to: fromDate ? addDays(fromDate, 1).toISOString() : "",
      },
      headers: {
        "X-Api-Key": import.meta.env.VITE_NEWS_API_KEY,
      },
    }
  );
  return data.articles.map((article: NewsApiArticle) => ({
    title: article.title,
    description: article.description,
    source: article.source.name,
    publishedAt: article.publishedAt,
    url: article.url,
    imageUrl: article.urlToImage || "https://picsum.photos/168/168",
  }));
}

async function fetchNewsApiTopNews(
  page: number,
  category: string,
  searchText?: string
): Promise<Article[]> {
  const { data } = await axios.get<NewsApiResponse>(
    `${NEWS_API_URL}/top-headlines`,
    {
      params: {
        pageSize: 10,
        page: page,
        q: searchText,
        sources: !category ? "google-news,fox-news,the-washington-post" : "",
        category: category,
        country: "",
      },
      headers: {
        "X-Api-Key": import.meta.env.VITE_NEWS_API_KEY,
      },
    }
  );
  return data.articles.map((article: NewsApiArticle) => ({
    title: article.title,
    description: article.description,
    source: article.source.name,
    publishedAt: article.publishedAt,
    url: article.url,
    imageUrl: article.urlToImage || "https://picsum.photos/168/168",
  }));
}

const fetchNYTimes = async (
  page: number,
  selectedCategory: string,
  fromDate?: Date,
  searchText?: string
): Promise<Article[]> => {
  const beginDate = fromDate ? format(fromDate, "yyyyMMdd") : "";
  const endDate = fromDate ? format(addDays(fromDate, 1), "yyyyMMdd") : "";

  try {
    const { data } = await axios.get(
      `${NY_TIMES_API_URL}/articlesearch.json?`,
      {
        params: {
          "api-key": import.meta.env.VITE_NYTIMES_API_KEY,
          q: searchText,
          page: page,
          ...buildNyTimesQuery(selectedCategory, beginDate, endDate),
        },
      }
    );
    return data.response.docs.map((article: NyTimesArticle) => ({
      title: article.headline.main,
      description: article.abstract,
      source: "The New York Times",
      publishedAt: article.pub_date,
      url: article.web_url,
      imageUrl:
        article.multimedia.length > 0
          ? `https://www.nytimes.com/${article.multimedia[0].url}`
          : "https://picsum.photos/168/168",
    }));
  } catch (e) {
    console.error(e);
    return [];
  }
};
