export interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  author: string;
  source: {
    name: string;
  };
}

export interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

export interface NewsFilters {
  q?: string;
  from?: string;
  to?: string;
  sortBy?: string;
  page?: number;
  pageSize?: number;
  category?: string;
}

export async function fetchNews(filters: NewsFilters): Promise<NewsApiResponse> {
  const params = new URLSearchParams();
  params.append("apiKey", process.env.NEXT_PUBLIC_NEWS_API_KEY || "");
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined) {
      params.append(key, value.toString());
    }
  });

  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
}

export async function fetchTopHeadlines(
  country: string = "us"
): Promise<NewsApiResponse> {
  const params = new URLSearchParams();
  params.append("apiKey", process.env.NEXT_PUBLIC_NEWS_API_KEY || "");
  params.append("country", country);

  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching headlines:", error);
    throw error;
  }
} 