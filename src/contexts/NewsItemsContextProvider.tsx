import { newsQueryOptions } from "@/lib/API";
import { useFilterContext } from "@/lib/hooks";
import { Article } from "@/lib/types";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createContext, ReactNode, useEffect, useState } from "react";

type NewsItemsContextProviderProps = {
  children: ReactNode;
};

type TNewsItemsContext = {
  articles: Article[];
  error: Error | null;
  page: number;
  isLoading: boolean;
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

  const { data, isLoading, error } = useSuspenseQuery(
    newsQueryOptions(
      page,
      selectedCategory,
      selectedSource,
      selectedFromDate,
      debouncedSearchText
    )
  );

  useEffect(() => {
    setArticles((prev) => [...prev, ...data]);
  }, [data]);

  console.log("NewsItemsContext state: ", articles, data);
  return (
    <NewsItemsContext.Provider
      value={{
        articles,
        page,
        setPage,
        error,
        isLoading,
      }}
    >
      {children}
    </NewsItemsContext.Provider>
  );
}
