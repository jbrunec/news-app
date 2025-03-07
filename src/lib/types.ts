export type Article = {
  title: string;
  description: string;
  source: string;
  publishedAt: string;
  url: string;
  imageUrl: string;
};

export type NewsApiResponse = {
  status: string;
  totalResults: number;
  articles: NewsApiArticle[];
};

export type NewsApiArticle = {
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string; //ISO8601 date
  content: string;
};

export type TheGuardianApiResponse = {
  response: {
    status: string;
    userTier: string;
    total: number;
    startIndex: number;
    pageSize: number;
    currentPage: number;
    pages: number;
    orderBy: string;
    results: TheGuardianArticle[];
  };
};

export type TheGuardianArticle = {
  id: string;
  type: string;
  sectionId: string;
  sectionName: string;
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
  apiUrl: string;
  isHosted: boolean;
  pillarId: string;
  pillarName: string;
};

export type NyTimesApiResponse = {
  status: string;
  response: {
    docs: NyTimesArticle;
  };
};

export type NyTimesArticle = {
  headline: {
    main: string;
  };
  pub_date: string;
  abstract: string;
  web_url: string;
  multimedia: {
    url: string;
  }[];
};
