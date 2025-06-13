
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Award, Globe, Heart } from "lucide-react";

const About = () => {
  const stats = [
    { icon: Users, label: "Team Members", value: "50+" },
    { icon: Globe, label: "Countries Covered", value: "100+" },
    { icon: Award, label: "Awards Won", value: "25+" },
    { icon: Heart, label: "Daily Readers", value: "1M+" }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Editor-in-Chief",
      bio: "Award-winning journalist with 15+ years of experience in international news."
    },
    {
      name: "Mike Davis",
      role: "Tech Reporter",
      bio: "Technology expert covering the latest innovations in AI, blockchain, and startups."
    },
    {
      name: "Dr. Emma Wilson",
      role: "Science Correspondent",
      bio: "PhD in Environmental Science, specializing in climate change and sustainability."
    },
    {
      name: "Tom Rodriguez",
      role: "Sports Editor",
      bio: "Former professional athlete turned sports journalist, covering major leagues worldwide."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">About NewsHub</h1>
            <p className="text-xl opacity-90">
              Committed to delivering accurate, unbiased, and timely news to readers worldwide
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Our Mission</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">What We Do</h3>
                <p className="text-gray-600 mb-6">
                  NewsHub is dedicated to providing comprehensive news coverage that keeps you informed 
                  about the world around you. We believe in the power of quality journalism to shape 
                  public discourse and drive positive change.
                </p>
                <p className="text-gray-600">
                  Our team of experienced journalists and editors work around the clock to bring you 
                  breaking news, in-depth analysis, and expert commentary on the stories that matter most.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Our Values</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2"></span>
                    <span><strong>Accuracy:</strong> We verify all information before publication</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2"></span>
                    <span><strong>Transparency:</strong> We clearly identify our sources and methods</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2"></span>
                    <span><strong>Independence:</strong> We maintain editorial independence</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2"></span>
                    <span><strong>Diversity:</strong> We represent multiple perspectives and voices</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">NewsHub by the Numbers</h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center p-6">
                <CardContent className="p-0">
                  <stat.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4"></div>
                  <h3 className="font-bold text-lg mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
