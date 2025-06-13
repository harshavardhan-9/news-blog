import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { useNewsAPI, NewsArticle } from '@/hooks/useNewsAPI';
import NewsChart from './NewsChart';
import PayoutTable from './PayoutTable';
import ExportOptions from './ExportOptions';
import ProjectDocumentation from './ProjectDocumentation';
import Header from './Header';
import Footer from './Footer';
import { 
  Search, 
  Filter, 
  Calendar,
  User,
  Tag,
  FileText,
  TrendingUp,
  BarChart3,
  LogOut
} from 'lucide-react';

const Dashboard = () => {
  const { user, logout, isAdmin } = useAuth();
  const { articles, loading, error } = useNewsAPI();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'news' | 'blog'>('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  // Filter articles based on search criteria
  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const matchesSearch = searchTerm === '' || 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.author.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesAuthor = selectedAuthor === '' || article.author === selectedAuthor;
      const matchesType = selectedType === 'all' || article.type === selectedType;

      let matchesDate = true;
      if (dateRange.start && dateRange.end) {
        try {
          const articleDate = parseISO(article.publishedAt);
          const startDate = parseISO(dateRange.start);
          const endDate = parseISO(dateRange.end);
          matchesDate = isWithinInterval(articleDate, { start: startDate, end: endDate });
        } catch {
          matchesDate = true;
        }
      }

      return matchesSearch && matchesAuthor && matchesType && matchesDate;
    });
  }, [articles, searchTerm, selectedAuthor, selectedType, dateRange]);

  // Get unique authors for filter dropdown
  const authors = useMemo(() => {
    return Array.from(new Set(articles.map(article => article.author)));
  }, [articles]);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = filteredArticles.length;
    const newsCount = filteredArticles.filter(a => a.type === 'news').length;
    const blogCount = filteredArticles.filter(a => a.type === 'blog').length;
    
    return { total, newsCount, blogCount };
  }, [filteredArticles]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading news data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600">
            {isAdmin ? 'Admin Dashboard' : 'User Dashboard'} - Manage your news content and analytics
          </p>
        </div>

        {/* Project Documentation Section */}
        <div className="mb-8">
          <ProjectDocumentation />
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">News Articles</CardTitle>
              <Badge variant="outline">{stats.newsCount}</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.newsCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
              <Badge variant="outline">{stats.blogCount}</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.blogCount}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filters & Search</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={selectedAuthor}
                onChange={(e) => setSelectedAuthor(e.target.value)}
                className="px-3 py-2 border rounded-md"
              >
                <option value="">All Authors</option>
                {authors.map(author => (
                  <option key={author} value={author}>{author}</option>
                ))}
              </select>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as 'all' | 'news' | 'blog')}
                className="px-3 py-2 border rounded-md"
              >
                <option value="all">All Types</option>
                <option value="news">News</option>
                <option value="blog">Blog</option>
              </select>
              <Input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                placeholder="Start Date"
              />
              <Input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                placeholder="End Date"
              />
            </div>
          </CardContent>
        </Card>

        {/* Charts Section */}
        <NewsChart articles={filteredArticles} />

        {/* Export Options */}
        <ExportOptions articles={filteredArticles} />

        {/* Payout Table */}
        {isAdmin && <PayoutTable articles={filteredArticles} />}

        {/* Articles Grid */}
        <Card>
          <CardHeader>
            <CardTitle>Articles ({filteredArticles.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredArticles.map(article => (
                <div key={article.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg">{article.title}</h3>
                    <Badge variant={article.type === 'news' ? 'default' : 'secondary'}>
                      {article.type}
                    </Badge>
                  </div>
                  <p className="text-gray-600 mb-3">{article.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {article.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {format(parseISO(article.publishedAt), 'MMM dd, yyyy')}
                    </span>
                    <span>{article.source.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
