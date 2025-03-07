// src/components/NewsCard.tsx

import { Article } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface NewsCardProps {
  article: Article;
}

export const NewsCard = ({ article }: NewsCardProps) => {
  const onClick = () => {
    window.open(article.url);
  };
  return (
    <Card
      className="flex flex-row hover:translate-y-0.5 hover:cursor-pointer hover:shadow-[0_0_5px_5px_white] active:translate-x-0.5 py-0 border-0"
      onClick={onClick}
    >
      {/* Image Thumbnail */}
      {article.imageUrl && (
        <div className="w-42 h-42 flex-shrink-0 ">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover rounded-l-xl"
          />
        </div>
      )}
      <div className="p-4">
        <CardHeader>
          <CardTitle>{article.title}</CardTitle>
          <CardDescription>
            {article.source} -{" "}
            {new Date(article.publishedAt).toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>{article.description}</p>
        </CardContent>
      </div>
    </Card>
  );
};
