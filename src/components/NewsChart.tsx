
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { NewsArticle } from '@/hooks/useNewsAPI';

interface NewsChartProps {
  articles: NewsArticle[];
}

const NewsChart: React.FC<NewsChartProps> = ({ articles }) => {
  // Process data for charts
  const authorData = React.useMemo(() => {
    const authorCounts = articles.reduce((acc, article) => {
      acc[article.author] = (acc[article.author] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(authorCounts).map(([author, count]) => ({
      author,
      count
    }));
  }, [articles]);

  const typeData = React.useMemo(() => {
    const typeCounts = articles.reduce((acc, article) => {
      acc[article.type] = (acc[article.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(typeCounts).map(([type, count]) => ({
      type: type.charAt(0).toUpperCase() + type.slice(1),
      count,
      color: type === 'news' ? '#3B82F6' : '#10B981'
    }));
  }, [articles]);

  const categoryData = React.useMemo(() => {
    const categoryCounts = articles.reduce((acc, article) => {
      acc[article.category] = (acc[article.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(categoryCounts).map(([category, count]) => ({
      category,
      count
    }));
  }, [articles]);

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Articles by Author */}
      <Card>
        <CardHeader>
          <CardTitle>Articles by Author</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={authorData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="author" 
                angle={-45}
                textAnchor="end"
                height={60}
                fontSize={12}
              />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Articles by Type */}
      <Card>
        <CardHeader>
          <CardTitle>Articles by Type</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={typeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ type, count }) => `${type}: ${count}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {typeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Articles by Category */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Articles by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewsChart;
