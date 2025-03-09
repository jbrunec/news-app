import { newsQueryOptions } from "@/lib/API";
import { useFilterContext } from "@/lib/hooks";
import { Article } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { createContext, ReactNode, useEffect, useState } from "react";

type NewsItemsContextProviderProps = {
  children: ReactNode;
};

type TNewsItemsContext = {
  articles: Article[];
  error: Error | null;
  page: number;
  isLoading: boolean;
  isFetching: boolean;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

export const NewsItemsContext = createContext<TNewsItemsContext | null>(null);

export default function NewsItemsContextProvider({
  children,
}: NewsItemsContextProviderProps) {
  const {
    debouncedSearchText,
    selectedCategory,
    selectedFromDate,
    selectedSource,
  } = useFilterContext();

  useEffect(() => {
    setPage(1);
    setArticles([]);
  }, [debouncedSearchText, selectedCategory, selectedFromDate, selectedSource]);

  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState<Article[]>([]);

  const { data, isLoading, error, isFetching } = useQuery(
    newsQueryOptions(
      page,
      selectedCategory,
      selectedSource,
      selectedFromDate,
      debouncedSearchText
    )
  );

  useEffect(() => {
    if (data) {
      setArticles((prev) => [...prev, ...data]);
    }
  }, [data]);

  return (
    <NewsItemsContext.Provider
      value={{
        articles,
        page,
        setPage,
        error,
        isLoading,
        isFetching,
      }}
    >
      {children}
    </NewsItemsContext.Provider>
  );
}
