"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePickerWithRange } from "@/components/date-range-picker";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
  author: string;
}

export default function NewsPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("publishedAt");
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });

  const categories = [
    "all",
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
  ];

  const sortOptions = [
    { value: "publishedAt", label: "Date" },
    { value: "relevancy", label: "Relevance" },
    { value: "popularity", label: "Popularity" },
  ];

  const fetchNews = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        apiKey: process.env.NEXT_PUBLIC_NEWS_API_KEY || "",
        q: searchQuery,
        sortBy: sortBy,
        ...(category !== "all" && { category }),
        ...(dateRange.from && {
          from: format(dateRange.from, "yyyy-MM-dd"),
        }),
        ...(dateRange.to && {
          to: format(dateRange.to, "yyyy-MM-dd"),
        }),
      });

      const response = await fetch(
        `https://newsapi.org/v2/everything?${params.toString()}`
      );
      const data = await response.json();
      setArticles(data.articles || []);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">News Explorer</h1>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Input
            placeholder="Search news..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
          
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <DatePickerWithRange date={dateRange} setDate={setDateRange} />
        </div>

        <Button 
          onClick={fetchNews}
          className="mt-4 w-full md:w-auto"
        >
          Search
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          // Loading skeletons
          Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="h-48 w-full" />
              <CardHeader>
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-20 w-full" />
              </CardContent>
            </Card>
          ))
        ) : (
          articles.map((article, index) => (
            <Card key={index} className="overflow-hidden">
              {article.urlToImage && (
                <div className="relative h-48">
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle className="line-clamp-2 text-lg">
                  {article.title}
                </CardTitle>
                <div className="text-sm text-muted-foreground">
                  {article.source.name} • {format(new Date(article.publishedAt), "PPP")}
                </div>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3 text-sm text-muted-foreground">
                  {article.description}
                </p>
                <Button
                  variant="link"
                  className="mt-2 p-0"
                  onClick={() => window.open(article.url, "_blank")}
                >
                  Read more
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
} 