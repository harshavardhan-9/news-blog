
import { useState } from "react";
import { Search, Calendar, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Mock data for news articles
  const articles = [
    {
      id: 1,
      title: "Breaking: Major Technology Breakthrough Announced",
      excerpt: "Scientists have made a groundbreaking discovery that could revolutionize the way we think about renewable energy...",
      category: "Technology",
      author: "John Smith",
      date: "2024-06-13",
      image: "/placeholder.svg",
      featured: true
    },
    {
      id: 2,
      title: "Global Climate Summit Reaches Historic Agreement",
      excerpt: "World leaders have come together to sign the most comprehensive climate action plan in history...",
      category: "Environment",
      author: "Sarah Johnson",
      date: "2024-06-12",
      image: "/placeholder.svg",
      featured: true
    },
    {
      id: 3,
      title: "Stock Markets Show Strong Recovery",
      excerpt: "Major indices have bounced back following yesterday's volatility, with tech stocks leading the charge...",
      category: "Business",
      author: "Mike Davis",
      date: "2024-06-12",
      image: "/placeholder.svg",
      featured: false
    },
    {
      id: 4,
      title: "New Archaeological Discovery Sheds Light on Ancient Civilization",
      excerpt: "Researchers have uncovered artifacts that provide new insights into how ancient peoples lived and worked...",
      category: "Science",
      author: "Dr. Emma Wilson",
      date: "2024-06-11",
      image: "/placeholder.svg",
      featured: false
    },
    {
      id: 5,
      title: "Championship Final Set for This Weekend",
      excerpt: "Two powerhouse teams prepare for what promises to be the most exciting championship match in years...",
      category: "Sports",
      author: "Tom Rodriguez",
      date: "2024-06-11",
      image: "/placeholder.svg",
      featured: false
    },
    {
      id: 6,
      title: "Innovative Startup Secures Major Funding Round",
      excerpt: "A promising tech startup has raised $50 million in Series B funding to expand their AI platform...",
      category: "Business",
      author: "Lisa Chen",
      date: "2024-06-10",
      image: "/placeholder.svg",
      featured: false
    }
  ];

  const categories = ["All", "Technology", "Business", "Environment", "Science", "Sports"];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredArticles = filteredArticles.filter(article => article.featured);
  const regularArticles = filteredArticles.filter(article => !article.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Stay Informed, Stay Ahead</h1>
            <p className="text-xl mb-8 opacity-90">
              Your trusted source for breaking news, in-depth analysis, and expert insights
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search news..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white text-gray-900"
                />
              </div>
              <Button variant="secondary" className="whitespace-nowrap">
                Search News
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Featured Stories</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {featuredArticles.map((article) => (
                <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
                  <div className="aspect-video bg-gray-200 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                      <Badge variant="secondary">{article.category}</Badge>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(article.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {article.author}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
                      <Link to={`/article/${article.id}`}>{article.title}</Link>
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
                    <Link
                      to={`/article/${article.id}`}
                      className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 transition-colors"
                    >
                      Read More <ArrowRight className="h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Regular Articles */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Latest News</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {regularArticles.map((article) => (
              <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group h-full">
                <div className="aspect-video bg-gray-200 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-2 text-sm text-gray-600">
                    <Badge variant="outline" className="text-xs">{article.category}</Badge>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(article.date).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="font-bold mb-2 group-hover:text-blue-600 transition-colors line-clamp-2 flex-grow">
                    <Link to={`/article/${article.id}`}>{article.title}</Link>
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2 flex-grow">{article.excerpt}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {article.author}
                    </span>
                    <Link
                      to={`/article/${article.id}`}
                      className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors"
                    >
                      Read More
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and never miss important news and updates
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input placeholder="Enter your email" className="flex-1" />
            <Button className="whitespace-nowrap">Subscribe</Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
