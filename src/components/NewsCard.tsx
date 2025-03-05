// src/components/NewsCard.tsx

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface NewsCardProps {
  title: string;
  description: string;
  source: string;
  publishedAt: string;
}

export const NewsCard = ({
  title,
  description,
  source,
  publishedAt,
}: NewsCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {source} - {new Date(publishedAt).toLocaleDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
    </Card>
  );
};
