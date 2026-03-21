import React, { useState, useEffect } from 'react';
import { 
  Calendar, User, Clock, Search, TrendingUp, 
  ChevronRight, BookOpen, ArrowRight, Share2, 
  Bookmark, MessageCircle, ArrowUpRight 
} from 'lucide-react';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [scrolled, setScrolled] = useState(0);

  // Scroll Progress Logic
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrolled(scrolled);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Safe User Data Retrieval (Prevents "undefined" JSON Error)
  const getAuthorName = () => {
    try {
      const user = localStorage.getItem('user');
      if (user && user !== "undefined") {
        const parsed = JSON.parse(user);
        return parsed.name || "Education Expert";
      }
    } catch (e) {
      console.error("Auth error", e);
    }
    return "Education Expert";
  };

  const categories = [
    { id: 'all', name: 'All Articles', color: 'bg-indigo-600' },
    { id: 'parenting', name: 'Parenting', color: 'bg-rose-500' },
    { id: 'early-education', name: 'Early Education', color: 'bg-amber-500' },
    { id: 'college-selection', name: 'College Selection', color: 'bg-blue-600' },
    { id: 'exam-prep', name: 'Exam Prep', color: 'bg-emerald-600' },
    { id: 'career-tips', name: 'Career Tips', color: 'bg-purple-600' },
  ];

  const articles = [
  {
    id: 1,
    title: "Choosing the Right School: A Guide for Modern Parents",
    excerpt: "Navigate the complex landscape of curriculum and facilities to find the perfect fit for your child's future academic success.",
    category: "parenting",
    author: "Dr. Ananya Sharma",
    date: "Mar 8, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=1200", 
    featured: true,
    tags: ["Schooling", "Admissions"]
  },
  {
    id: 2,
    title: "Crack the Competitive Exams: 10 Proven Strategies",
    excerpt: "Top rankers from Gujarat Technological University share their secret revision techniques and stress management tips.",
    category: "exam-prep",
    author: getAuthorName(), // Yeh function aapke current user ka naam uthayega
    date: "Mar 9, 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1200",
    featured: true,
    tags: ["JEE", "NEET", "Preparation"]
  },
  {
    id: 3,
    title: "Why Early Education Matters for Long-term Growth",
    excerpt: "Understanding the psychological impact of preschool environment on a child's cognitive development.",
    category: "early-education",
    author: "Academic Panel",
    date: "Mar 5, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1200",
    featured: false,
    tags: ["Development", "Learning"]
  }
];

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticles = articles.filter(article => article.featured);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 z-[100] bg-gray-100">
        <div className="h-full bg-indigo-600 transition-all duration-150" style={{ width: `${scrolled}%` }}></div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-[#0F172A] py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-[1.1]">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">Knowledge</span> Hub
            </h1>
            <p className="text-xl text-slate-400 mb-10 leading-relaxed">
              Your comprehensive guide to admissions, career counseling, and academic excellence in India.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
              <input
                type="text"
                placeholder="Search for articles, exams, or colleges..."
                className="w-full pl-14 pr-32 py-5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 backdrop-blur-xl transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="absolute right-2 top-2 bottom-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 rounded-xl font-bold transition-all flex items-center gap-2">
                Find <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-8">
            
            {/* Featured Section */}
            {selectedCategory === 'all' && !searchTerm && (
              <section className="mb-16">
                <h2 className="text-sm font-black text-indigo-600 uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
                  <span className="w-10 h-[2px] bg-indigo-600"></span> Featured Insights
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {featuredArticles.map(article => (
                    <div key={article.id} className="group cursor-pointer">
                      <div className="relative h-72 rounded-[2rem] overflow-hidden mb-6 shadow-xl shadow-slate-200/50">
                        <img src={article.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-6 left-6 right-6">
                           <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase rounded-lg border border-white/30">
                            {article.category}
                           </span>
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-3">
                        {article.title}
                      </h3>
                      <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed mb-4">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                        <span className="flex items-center gap-2"><User className="h-4 w-4" /> {article.author}</span>
                        <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> {article.readTime}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Category Filter */}
            <div className="sticky top-4 z-50 flex overflow-x-auto gap-3 pb-6 no-scrollbar">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-6 py-3 rounded-xl text-sm font-bold whitespace-nowrap transition-all border ${
                    selectedCategory === cat.id 
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-100' 
                    : 'bg-white text-slate-600 border-slate-100 hover:border-indigo-200'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Article Feed */}
            <div className="space-y-10 mt-8">
              {filteredArticles.length > 0 ? (
                filteredArticles.map(article => (
                  <article key={article.id} className="bg-white rounded-[2.5rem] p-5 border border-slate-100 hover:shadow-2xl hover:shadow-indigo-50 transition-all duration-500 group flex flex-col md:flex-row gap-8 items-center">
                    <div className="w-full md:w-64 h-56 shrink-0 overflow-hidden rounded-[2rem]">
                      <img src={article.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg">
                          {article.category}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="text-xs font-semibold text-slate-400">{article.date}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-slate-500 text-sm mb-6 leading-relaxed line-clamp-2">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                         <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-xs">
                             {article.author[0]}
                           </div>
                           <span className="text-xs font-bold text-slate-600">{article.author}</span>
                         </div>
                         <button className="flex items-center gap-2 text-indigo-600 font-bold text-sm group/btn">
                           Read Full Story <ArrowUpRight className="h-4 w-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                         </button>
                      </div>
                    </div>
                  </article>
                ))
              ) : (
                <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
                  <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="h-10 w-10 text-slate-300" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">No matches found</h3>
                  <p className="text-slate-500">Try adjusting your search or category filters.</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Newsletter */}
            <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-xl shadow-indigo-200">
              <div className="relative z-10">
                <div className="bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 tracking-tight">Stay in the Loop</h3>
                <p className="text-indigo-100/80 text-sm mb-6 leading-relaxed">
                  Join 5,000+ students and parents. Get the latest admission alerts directly.
                </p>
                <div className="space-y-3">
                  <input 
                    type="email" 
                    placeholder="your@email.com" 
                    className="w-full bg-white/10 border border-white/20 px-5 py-4 rounded-2xl placeholder:text-indigo-200 text-sm focus:outline-none focus:ring-2 focus:ring-white/50 transition-all" 
                  />
                  <button className="w-full bg-white text-indigo-600 py-4 rounded-2xl font-black text-sm hover:shadow-xl transition-all active:scale-95">
                    Subscribe Now
                  </button>
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            </div>

            {/* Trending Topics */}
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
              <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-indigo-600" /> Hot Topics
              </h3>
              <div className="flex flex-wrap gap-2">
                {["JEE 2026", "NEET Cutoff", "Board Exams", "Career Counselling", "MBA Admissions", "Foreign Education"].map(tag => (
                  <span key={tag} className="px-4 py-2 bg-slate-50 text-slate-600 text-xs font-bold rounded-xl border border-slate-100 hover:border-indigo-300 hover:text-indigo-600 cursor-pointer transition-all">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white">
               <h3 className="text-xl font-bold mb-4">Need Help?</h3>
               <p className="text-slate-400 text-sm mb-6">Talk to our expert counselors for personalized admission guidance.</p>
               <button className="flex items-center gap-3 bg-indigo-600 px-6 py-3 rounded-xl font-bold hover:bg-indigo-500 transition-colors">
                 Get Free Call <ArrowUpRight className="h-4 w-4" />
               </button>
            </div>
          </aside>

        </div>
      </main>
    </div>
  );
};

export default Blog;