import { queryOptions } from "@tanstack/react-query";
import axios from "redaxios";

const NEWS_API_URL = "https://newsapi.org/v2";

async function fetchNewsApiEverything() {
  return axios
    .get(`${NEWS_API_URL}/everything?pageSize=${10}`, {
      headers: {
        "X-Api-Key": import.meta.env.VITE_NEWS_API_API_KEY,
      },
    })
    .then((res) => res.data);
}
async function fetchNewsApiTopNews() {
  return axios
    .get(`${NEWS_API_URL}/top-headlines`, {
      params: {
        pageSize: 10,
        country: "us",
      },
      headers: {
        "X-Api-Key": import.meta.env.VITE_NEWS_API_API_KEY,
      },
    })
    .then((res) => res.data);
}

export function newsApiQueryOptions() {
  return queryOptions({
    queryKey: ["newsApi"],
    queryFn: () => fetchNewsApiEverything(),
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
}

export function newsApiTopNewsQueryOptions() {
  return queryOptions({
    queryKey: ["newsApiTopNews"],
    queryFn: () => fetchNewsApiTopNews(),
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
}
