import { newsApiTopNewsQueryOptions } from "@/lib/API";
import { useSuspenseQuery } from "@tanstack/react-query";
import { NewsCard } from "./NewsCard";
import { Key } from "react";

const NewsFeed = () => {
  const { data, isLoading, error } = useSuspenseQuery(
    newsApiTopNewsQueryOptions()
  );

  console.log("DATA: ", data);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching news</div>;

  return (
    <div className="space-y-4">
      {data.articles.map(
        (article: {
          url: Key | null | undefined;
          title: string;
          description: string;
          source: { name: string };
          publishedAt: string;
        }) => (
          <NewsCard
            key={article.url}
            title={article.title}
            description={article.description}
            source={article.source.name}
            publishedAt={article.publishedAt}
          />
        )
      )}
    </div>
  );
};

export default NewsFeed;
