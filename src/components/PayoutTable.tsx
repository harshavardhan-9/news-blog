
import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { NewsArticle } from '@/hooks/useNewsAPI';
import { DollarSign, Edit, Save, X } from 'lucide-react';

interface PayoutRates {
  [author: string]: {
    newsRate: number;
    blogRate: number;
  };
}

interface PayoutTableProps {
  articles: NewsArticle[];
}

const PayoutTable: React.FC<PayoutTableProps> = ({ articles }) => {
  const [payoutRates, setPayoutRates] = useState<PayoutRates>({});
  const [editingAuthor, setEditingAuthor] = useState<string | null>(null);
  const [tempRates, setTempRates] = useState({ newsRate: 0, blogRate: 0 });

  // Load payout rates from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('payoutRates');
    if (saved) {
      setPayoutRates(JSON.parse(saved));
    }
  }, []);

  // Save payout rates to localStorage
  const savePayoutRates = (rates: PayoutRates) => {
    setPayoutRates(rates);
    localStorage.setItem('payoutRates', JSON.stringify(rates));
  };

  // Calculate payout data
  const payoutData = useMemo(() => {
    const authorStats = articles.reduce((acc, article) => {
      const author = article.author;
      if (!acc[author]) {
        acc[author] = { newsCount: 0, blogCount: 0, totalCount: 0 };
      }
      
      if (article.type === 'news') {
        acc[author].newsCount++;
      } else {
        acc[author].blogCount++;
      }
      acc[author].totalCount++;
      
      return acc;
    }, {} as Record<string, { newsCount: number; blogCount: number; totalCount: number }>);

    return Object.entries(authorStats).map(([author, stats]) => {
      const rates = payoutRates[author] || { newsRate: 10, blogRate: 15 }; // Default rates
      const newsPayout = stats.newsCount * rates.newsRate;
      const blogPayout = stats.blogCount * rates.blogRate;
      const totalPayout = newsPayout + blogPayout;

      return {
        author,
        newsCount: stats.newsCount,
        blogCount: stats.blogCount,
        totalCount: stats.totalCount,
        newsRate: rates.newsRate,
        blogRate: rates.blogRate,
        newsPayout,
        blogPayout,
        totalPayout
      };
    });
  }, [articles, payoutRates]);

  const totalPayout = payoutData.reduce((sum, row) => sum + row.totalPayout, 0);

  const handleEdit = (author: string, newsRate: number, blogRate: number) => {
    setEditingAuthor(author);
    setTempRates({ newsRate, blogRate });
  };

  const handleSave = (author: string) => {
    const newRates = {
      ...payoutRates,
      [author]: tempRates
    };
    savePayoutRates(newRates);
    setEditingAuthor(null);
  };

  const handleCancel = () => {
    setEditingAuthor(null);
    setTempRates({ newsRate: 0, blogRate: 0 });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Payout Calculator
        </CardTitle>
        <p className="text-sm text-gray-600">
          Set payout rates per article type for each author
        </p>
      </CardHeader>
      <CardContent>
        <div className="mb-4 p-4 bg-blue-50 rounded-lg border">
          <h3 className="font-semibold text-lg mb-2">Total Payout Summary</h3>
          <p className="text-2xl font-bold text-blue-600">${totalPayout.toFixed(2)}</p>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Author</TableHead>
                <TableHead>News Articles</TableHead>
                <TableHead>Blog Posts</TableHead>
                <TableHead>News Rate ($)</TableHead>
                <TableHead>Blog Rate ($)</TableHead>
                <TableHead>News Payout</TableHead>
                <TableHead>Blog Payout</TableHead>
                <TableHead>Total Payout</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payoutData.map((row) => (
                <TableRow key={row.author}>
                  <TableCell className="font-medium">{row.author}</TableCell>
                  <TableCell>{row.newsCount}</TableCell>
                  <TableCell>{row.blogCount}</TableCell>
                  <TableCell>
                    {editingAuthor === row.author ? (
                      <Input
                        type="number"
                        value={tempRates.newsRate}
                        onChange={(e) => setTempRates(prev => ({ ...prev, newsRate: Number(e.target.value) }))}
                        className="w-20"
                      />
                    ) : (
                      `$${row.newsRate}`
                    )}
                  </TableCell>
                  <TableCell>
                    {editingAuthor === row.author ? (
                      <Input
                        type="number"
                        value={tempRates.blogRate}
                        onChange={(e) => setTempRates(prev => ({ ...prev, blogRate: Number(e.target.value) }))}
                        className="w-20"
                      />
                    ) : (
                      `$${row.blogRate}`
                    )}
                  </TableCell>
                  <TableCell className="text-green-600 font-medium">
                    ${row.newsPayout.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-green-600 font-medium">
                    ${row.blogPayout.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-blue-600 font-bold">
                    ${row.totalPayout.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    {editingAuthor === row.author ? (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleSave(row.author)}
                          className="h-8 w-8 p-0"
                        >
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={handleCancel}
                          className="h-8 w-8 p-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(row.author, row.newsRate, row.blogRate)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default PayoutTable;
