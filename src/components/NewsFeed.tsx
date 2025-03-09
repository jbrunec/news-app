import { useNewsItemsContext } from "@/lib/hooks";
import { Article } from "@/lib/types";
import { NewsCard } from "./NewsCard";
import { Button } from "./ui/button";
import Spinner from "./ui/spinner";

const NewsFeed = () => {
  const { articles, setPage, error, isFetching } = useNewsItemsContext();
  const onLoadMore = () => {
    setPage((old) => old + 1);
  };

  if (error) return <div>Error fetching news</div>;

  return (
    <>
      <div className="space-y-4">
        {articles.length === 0 && !isFetching && (
          <div className="w-full">No news found for provided criteria.</div>
        )}
        {articles.length === 0 && isFetching && (
          <div className="flex justify-center">
            <Spinner />
          </div>
        )}
        {articles.length > 0 && (
          <>
            {articles.map((article: Article) => (
              <NewsCard key={article.url} article={article} />
            ))}
            {isFetching && (
              <div className="flex justify-center">
                <Spinner />
              </div>
            )}
          </>
        )}
      </div>
      <Button
        disabled={isFetching}
        onClick={onLoadMore}
        className="w-full mt-5 text-xl h-14 hover:cursor-pointer"
      >
        Load more
      </Button>
    </>
  );
};

export default NewsFeed;
