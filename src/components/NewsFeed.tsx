import { useNewsItemsContext } from "@/lib/hooks";
import { Article } from "@/lib/types";
import { Suspense } from "react";
import { NewsCard } from "./NewsCard";
import { Button } from "./ui/button";

const NewsFeed = () => {
  const { articles, page, setPage, isLoading, error } = useNewsItemsContext();
  // const [articles, setArticles] = useState<Article[]>([]);
  // const [page, setPage] = useState(1);
  // const { data, isLoading, error, isPending, isFetching } = useSuspenseQuery(
  //   newsQueryOptions(
  //     page,
  //     selectedCategory,
  //     selectedSource,
  //     selectedFromDate,
  //     debouncedSearchText
  //   )
  // );

  const onLoadMore = () => {
    setPage(page + 1);
  };

  if (isLoading) return <div className="text-4xl text-red-400">Loading...</div>;
  if (error) return <div>Error fetching news</div>;

  return (
    <Suspense fallback={<>ITS LOADING!!!!!</>}>
      <div className="space-y-4">
        {articles.length > 0 ? (
          articles.map((article: Article) => (
            <NewsCard key={article.url} article={article} />
          ))
        ) : (
          <div className="w-full">No news found for this search term</div>
        )}
      </div>
      <Button
        onClick={onLoadMore}
        className="w-full mt-5 text-xl h-14 hover:cursor-pointer"
      >
        Load more
      </Button>
    </Suspense>
  );
};

export default NewsFeed;
