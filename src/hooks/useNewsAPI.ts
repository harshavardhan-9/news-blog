
import { useState, useEffect } from 'react';

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  content: string;
  author: string;
  publishedAt: string;
  urlToImage: string;
  url: string;
  source: {
    name: string;
  };
  category: string;
  type: 'news' | 'blog';
}

interface UseNewsAPIResult {
  articles: NewsArticle[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useNewsAPI = (): UseNewsAPIResult => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);

    try {
      // Using News API - you'll need to sign up for a free API key at https://newsapi.org/
      // For demo purposes, I'm using mock data that simulates the API response
      
      // In a real implementation, you would use:
      // const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
      
      // Mock data that simulates News API response
      const mockArticles: NewsArticle[] = [
        {
          id: '1',
          title: 'Breaking: Major Technology Breakthrough Announced',
          description: 'Scientists have made a groundbreaking discovery that could revolutionize the way we think about renewable energy...',
          content: 'Full content of the article would be here...',
          author: 'John Smith',
          publishedAt: '2024-06-13T10:00:00Z',
          urlToImage: '/placeholder.svg',
          url: 'https://example.com/article1',
          source: { name: 'Tech News' },
          category: 'Technology',
          type: 'news'
        },
        {
          id: '2',
          title: 'Global Climate Summit Reaches Historic Agreement',
          description: 'World leaders have come together to sign the most comprehensive climate action plan in history...',
          content: 'Full content of the article would be here...',
          author: 'Sarah Johnson',
          publishedAt: '2024-06-12T15:30:00Z',
          urlToImage: '/placeholder.svg',
          url: 'https://example.com/article2',
          source: { name: 'Environment Today' },
          category: 'Environment',
          type: 'news'
        },
        {
          id: '3',
          title: 'Stock Markets Show Strong Recovery',
          description: 'Major indices have bounced back following yesterday\'s volatility, with tech stocks leading the charge...',
          content: 'Full content of the article would be here...',
          author: 'Mike Davis',
          publishedAt: '2024-06-12T12:45:00Z',
          urlToImage: '/placeholder.svg',
          url: 'https://example.com/article3',
          source: { name: 'Financial Times' },
          category: 'Business',
          type: 'blog'
        },
        {
          id: '4',
          title: 'New Archaeological Discovery Sheds Light on Ancient Civilization',
          description: 'Researchers have uncovered artifacts that provide new insights into how ancient peoples lived and worked...',
          content: 'Full content of the article would be here...',
          author: 'Dr. Emma Wilson',
          publishedAt: '2024-06-11T09:15:00Z',
          urlToImage: '/placeholder.svg',
          url: 'https://example.com/article4',
          source: { name: 'Science Daily' },
          category: 'Science',
          type: 'news'
        },
        {
          id: '5',
          title: 'Championship Final Set for This Weekend',
          description: 'Two powerhouse teams prepare for what promises to be the most exciting championship match in years...',
          content: 'Full content of the article would be here...',
          author: 'Tom Rodriguez',
          publishedAt: '2024-06-11T18:20:00Z',
          urlToImage: '/placeholder.svg',
          url: 'https://example.com/article5',
          source: { name: 'Sports Weekly' },
          category: 'Sports',
          type: 'blog'
        }
      ];

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setArticles(mockArticles);
    } catch (err) {
      setError('Failed to fetch news articles. Please try again later.');
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return {
    articles,
    loading,
    error,
    refetch: fetchNews
  };
};
