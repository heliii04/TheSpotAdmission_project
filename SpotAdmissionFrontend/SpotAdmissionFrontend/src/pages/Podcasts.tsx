import  { useState } from 'react';
import { Play, Headphones, Calendar, User, Clock, Search, Bell, Mic } from 'lucide-react';

const Podcasts = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const categories = [
    { id: 'all', name: 'All Episodes' },
    { id: 'trustees', name: 'With Trustees' },
    { id: 'principals', name: 'With Principals' },
    { id: 'counsellors', name: 'With Counsellors' },
    { id: 'experts', name: 'With Experts' }
  ];

  const episodes = [
    {
      id: 1,
      title: "Choosing the Right School: A Parent's Guide",
      category: "counsellors",
      guest: "Dr. Anjali Mehta",
      role: "Senior Education Counsellor",
      duration: "45 min",
      date: "Mar 15, 2025",
      description: "Expert insights on how parents can make the best school choices for their children's future.",
      plays: "2.3K",
      thumbnail: "https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
      id: 2,
      title: "The Future of Education: Principal's Perspective",
      category: "principals",
      guest: "Prof. Rajesh Kumar",
      role: "Principal, Greenwood International",
      duration: "38 min",
      date: "Mar 8, 2025",
      description: "A deep dive into educational trends and what the future holds for students.",
      plays: "3.1K",
      thumbnail: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
      id: 3,
      title: "Building World-Class Educational Institutions",
      category: "trustees",
      guest: "Mr. Vikram Sharma",
      role: "Trustee, Cambridge International",
      duration: "52 min",
      date: "Mar 1, 2025",
      description: "Understanding the vision and challenges of creating exceptional educational environments.",
      plays: "1.8K",
      thumbnail: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
      id: 4,
      title: "Career Guidance in the Digital Age",
      category: "experts",
      guest: "Ms. Priya Patel",
      role: "Career Counselling Expert",
      duration: "41 min",
      date: "Feb 22, 2025",
      description: "How technology is changing career paths and what students need to know.",
      plays: "2.7K",
      thumbnail: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
      id: 5,
      title: "Early Childhood Education: Foundation for Success",
      category: "experts",
      guest: "Dr. Sarah Johnson",
      role: "Early Childhood Development Expert",
      duration: "36 min",
      date: "Feb 15, 2025",
      description: "The importance of quality early education and its impact on lifelong learning.",
      plays: "1.9K",
      thumbnail: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
      id: 6,
      title: "Admission Strategies for Competitive Colleges",
      category: "counsellors",
      guest: "Mr. Arjun Singh",
      role: "College Admission Specialist",
      duration: "47 min",
      date: "Feb 8, 2025",
      description: "Proven strategies to secure admission in top colleges and universities.",
      plays: "4.2K",
      thumbnail: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300"
    }
  ];

  const filteredEpisodes = selectedCategory === 'all' 
    ? episodes 
    : episodes.filter(episode => episode.category === selectedCategory);

  const featuredEpisode = {
    title: "The Complete Guide to Educational Success",
    guest: "Panel Discussion",
    role: "Education Leaders Roundtable",
    duration: "65 min",
    date: "Mar 22, 2025",
    description: "A comprehensive discussion with trustees, principals, and counsellors about the future of education and student success strategies.",
    plays: "5.8K",
    thumbnail: "https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=400"
  };

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
  };

  return (
    <div className="py-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-500 to-secondary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-white bg-opacity-20 p-4 rounded-full">
                <Headphones className="h-12 w-12" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">TheSpotAdmission Podcast</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-blue-100">
              Conversations with education leaders, counsellors, and experts shaping the future of learning
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleSubscribe}
                className={`px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 flex items-center justify-center ${
                  isSubscribed 
                    ? 'bg-white border-2 border-white hover:bg-transparent hover:text-white text-primary-500' 
                    : 'bg-white border-2 border-white hover:bg-transparent hover:text-white text-primary-500'
                }`}
              >
                <Bell className="mr-2 h-5 w-5" />
                {isSubscribed ? 'Subscribed ✓' : 'Subscribe for Updates'}
              </button>
              <button className="bg-transparent border-2 border-white hover:bg-white hover:text-black text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200">
                <Search className="mr-2 h-5 w-5 inline" />
                Browse Episodes
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Episode */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Episode</h2>
            <p className="text-xl text-gray-600">
              Our most popular episode this month
            </p>
          </div>
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl overflow-hidden shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="relative group cursor-pointer">
                <img 
                  src={featuredEpisode.thumbnail} 
                  alt={featuredEpisode.title}
                  className="w-full h-80 lg:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-4">
                    <Play className="h-12 w-12 text-white fill-white" />
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm flex items-center">
                  <Headphones className="h-4 w-4 mr-1" />
                  {featuredEpisode.duration}
                </div>
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">{featuredEpisode.title}</h3>
                <div className="flex items-center mb-4">
                  <User className="h-5 w-5 text-gray-500 mr-2" />
                  <div>
                    <span className="font-semibold text-gray-900">{featuredEpisode.guest}</span>
                    <span className="text-gray-600 text-sm block">{featuredEpisode.role}</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">{featuredEpisode.description}</p>
                <div className="flex items-center mb-6 text-gray-500">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span className="mr-6">{featuredEpisode.date}</span>
                  <Headphones className="h-5 w-5 mr-2" />
                  <span className="mr-6">{featuredEpisode.plays} plays</span>
                  <Clock className="h-5 w-5 mr-2" />
                  <span>{featuredEpisode.duration}</span>
                </div>
                <button className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 flex items-center justify-center">
                  <Play className="mr-2 h-5 w-5" />
                  Listen Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-primary-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-primary-600'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Episodes Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEpisodes.map((episode) => (
              <div key={episode.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
                <div className="relative cursor-pointer">
                  <img 
                    src={episode.thumbnail} 
                    alt={episode.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-3">
                      <Play className="h-8 w-8 text-white fill-white" />
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm flex items-center">
                    <Headphones className="h-4 w-4 mr-1" />
                    {episode.duration}
                  </div>
                  <div className="absolute top-3 left-3 bg-primary-500 text-white px-2 py-1 rounded text-sm capitalize">
                    {episode.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{episode.title}</h3>
                  
                  <div className="flex items-center mb-3">
                    <User className="h-4 w-4 text-gray-500 mr-2" />
                    <div>
                      <span className="font-medium text-gray-900 text-sm">{episode.guest}</span>
                      <span className="text-gray-600 text-xs block">{episode.role}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{episode.description}</p>

                  <div className="flex items-center justify-between text-gray-500 text-sm mb-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{episode.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Headphones className="h-4 w-4 mr-1" />
                      <span>{episode.plays} plays</span>
                    </div>
                  </div>

                  <button className="w-full bg-primary-500 hover:bg-primary-600 text-white py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center">
                    <Play className="mr-2 h-4 w-4" />
                    Listen
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscription CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-primary-500 to-secondary-600 rounded-2xl text-white p-12 text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-white bg-opacity-20 p-4 rounded-full">
                <Mic className="h-12 w-12" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Never Miss an Episode</h2>
            <p className="text-xl mb-8 text-purple-100 max-w-2xl mx-auto">
              Subscribe to get notified about new podcast episodes featuring education experts and industry leaders
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              />
              <button className="bg-transparent border-2 border-white hover:bg-white hover:text-black px-6 py-3 rounded-lg font-semibold transition-colors duration-200 whitespace-nowrap flex items-center justify-center">
                <Bell className="mr-2 h-5 w-5" />
                Subscribe
              </button>
            </div>
            <p className="text-sm text-purple-200 mt-4">
              Weekly episodes • Expert insights • Free forever
            </p>
          </div>
        </div>
      </section>

      {/* Platform Links */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Listen Everywhere</h2>
            <p className="text-xl text-gray-600">
              Available on all major podcast platforms
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4 hover:shadow-lg transition-shadow duration-300">
              <div className="bg-red-100 p-3 rounded-lg">
                <Play className="h-6 w-6 text-red-600" />
              </div>
              <span className="font-semibold text-gray-900">YouTube</span>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4 hover:shadow-lg transition-shadow duration-300">
              <div className="bg-green-100 p-3 rounded-lg">
                <Headphones className="h-6 w-6 text-green-600" />
              </div>
              <span className="font-semibold text-gray-900">Spotify</span>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4 hover:shadow-lg transition-shadow duration-300">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Headphones className="h-6 w-6 text-purple-600" />
              </div>
              <span className="font-semibold text-gray-900">Apple Podcasts</span>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4 hover:shadow-lg transition-shadow duration-300">
              <div className="bg-orange-100 p-3 rounded-lg">
                <Headphones className="h-6 w-6 text-orange-600" />
              </div>
              <span className="font-semibold text-gray-900">Google Podcasts</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Podcasts;