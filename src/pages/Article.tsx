
import { useParams, Link } from "react-router-dom";
import { Calendar, User, ArrowLeft, Share2, Bookmark, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const Article = () => {
  const { id } = useParams();

  // Mock article data - in a real app, this would come from an API
  const article = {
    id: parseInt(id || "1"),
    title: "Breaking: Major Technology Breakthrough Announced",
    excerpt: "Scientists have made a groundbreaking discovery that could revolutionize the way we think about renewable energy...",
    content: `
      <p>In a groundbreaking announcement today, researchers at the International Institute of Technology have unveiled a revolutionary breakthrough that promises to transform the renewable energy sector forever.</p>

      <p>The discovery, which has been years in the making, involves a new type of solar cell that can achieve unprecedented efficiency rates of over 50%, nearly doubling the performance of current commercial solar panels.</p>

      <h2>The Science Behind the Breakthrough</h2>

      <p>Dr. Sarah Chen, lead researcher on the project, explained that the team developed a novel perovskite-silicon tandem structure that captures a broader spectrum of sunlight than traditional silicon cells alone.</p>

      <p>"We've essentially created a multi-layered approach where each layer is optimized to capture different wavelengths of light," Dr. Chen said during a press conference at the institute.</p>

      <h2>Implications for the Future</h2>

      <p>The implications of this breakthrough are far-reaching:</p>

      <ul>
        <li>Significantly reduced costs for solar energy installations</li>
        <li>Faster adoption of renewable energy worldwide</li>
        <li>Potential to accelerate climate change mitigation efforts</li>
        <li>New job opportunities in the clean energy sector</li>
      </ul>

      <p>Industry experts predict that this technology could be commercially available within the next 3-5 years, pending further testing and regulatory approval.</p>

      <h2>Market Response</h2>

      <p>Stock markets have responded positively to the news, with renewable energy companies seeing significant gains in early trading. Solar panel manufacturers are already expressing interest in licensing this new technology.</p>

      <p>Environmental groups have praised the breakthrough as a "game-changer" in the fight against climate change, while energy analysts predict it could accelerate the world's transition away from fossil fuels.</p>

      <p>The research has been published in the latest issue of Nature Energy and has already garnered attention from the international scientific community.</p>
    `,
    category: "Technology",
    author: "John Smith",
    date: "2024-06-13",
    image: "/placeholder.svg",
    readTime: "5 min read",
    tags: ["Technology", "Renewable Energy", "Solar Power", "Climate Change"]
  };

  const relatedArticles = [
    {
      id: 2,
      title: "Global Climate Summit Reaches Historic Agreement",
      category: "Environment",
      date: "2024-06-12",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      title: "Stock Markets Show Strong Recovery",
      category: "Business",
      date: "2024-06-12",
      image: "/placeholder.svg"
    },
    {
      id: 4,
      title: "New Archaeological Discovery Sheds Light on Ancient Civilization",
      category: "Science",
      date: "2024-06-11",
      image: "/placeholder.svg"
    }
  ];

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Article link copied to clipboard!");
  };

  const handleBookmark = () => {
    toast.success("Article bookmarked!");
  };

  const handleLike = () => {
    toast.success("Thanks for liking this article!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>

      {/* Article Content */}
      <article className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Article Header */}
            <header className="mb-8">
              <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                <Badge variant="secondary">{article.category}</Badge>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(article.date).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {article.author}
                </div>
                <span>{article.readTime}</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                {article.title}
              </h1>
              
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                {article.excerpt}
              </p>

              {/* Article Actions */}
              <div className="flex items-center gap-4 pb-6 border-b">
                <Button variant="outline" onClick={handleShare} size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" onClick={handleBookmark} size="sm">
                  <Bookmark className="h-4 w-4 mr-2" />
                  Bookmark
                </Button>
                <Button variant="outline" onClick={handleLike} size="sm">
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  Like
                </Button>
              </div>
            </header>

            {/* Featured Image */}
            <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden mb-8">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Article Body */}
            <div 
              className="prose prose-lg max-w-none mb-8"
              dangerouslySetInnerHTML={{ __html: article.content }}
              style={{
                lineHeight: '1.7',
                fontSize: '18px'
              }}
            />

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8 pb-8 border-b">
              {article.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  #{tag.toLowerCase().replace(/\s+/g, '')}
                </Badge>
              ))}
            </div>

            {/* Author Bio */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex-shrink-0"></div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">{article.author}</h3>
                    <p className="text-gray-600">
                      {article.author} is a senior technology reporter with over 10 years of experience covering breakthrough innovations and emerging technologies. He specializes in renewable energy, artificial intelligence, and sustainable technology solutions.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle) => (
                <Card key={relatedArticle.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="aspect-video bg-gray-200 overflow-hidden">
                    <img
                      src={relatedArticle.image}
                      alt={relatedArticle.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <Badge variant="outline" className="text-xs mb-2">
                      {relatedArticle.category}
                    </Badge>
                    <h3 className="font-bold mb-2 line-clamp-2">
                      <Link 
                        to={`/article/${relatedArticle.id}`}
                        className="hover:text-blue-600 transition-colors"
                      >
                        {relatedArticle.title}
                      </Link>
                    </h3>
                    <p className="text-sm text-gray-600">
                      {new Date(relatedArticle.date).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Article;
