import { Link } from 'react-router-dom';
import { 
  Users, Award, BookOpen, Heart, Play, Headphones, 
  FileText, MessageCircle, ArrowRight, CheckCircle2, GraduationCap 
} from 'lucide-react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination, EffectFade } from "swiper/modules";

// Swiper Styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import slider1 from '../image/slider1.jpg';
import slider2 from '../image/slider2.jpg';

const Home = () => {
  const slides = [
    {
      title: "Counselling & Admission",
      highlight: "Support for Schools & Colleges",
      desc: "Your trusted partner in finding the right educational path. Expert guidance for students and parents.",
      img: slider1,
      btn1: { text: "Start Counselling", link: "/counselling" },
      btn2: { text: "Explore Schools", link: "/admissions" },
    },
    {
      title: "Find the Right Path",
      highlight: "For Every Student",
      desc: "Personalized counselling tailored to student aspirations and strengths.",
      img: slider2,
      btn1: { text: "Get Guidance", link: "/counselling" },
      btn2: { text: "Learn More", link: "/about" },
    }
  ];

  const services = [
    { icon: Users, title: "Counselling Services", desc: "Expert guidance for career and education choices", link: "/counselling", color: "bg-blue-50 text-blue-600" },
    { icon: FileText, title: "Admission Support", desc: "Complete assistance with admission processes", link: "/admissions", color: "bg-indigo-50 text-indigo-600" },
    { icon: Play, title: "Virtual Tours", desc: "Explore schools and colleges virtually from home", link: "/content", color: "bg-purple-50 text-purple-600" },
    { icon: Headphones, title: "Podcasts", desc: "Educational insights from top industry experts", link: "/content", color: "bg-pink-50 text-pink-600" }
  ];

  return (
    <div className="bg-white">
      {/* --- HERO SECTION --- */}
      <section className="relative h-[85vh] overflow-hidden">
        <Swiper
          modules={[Navigation, Autoplay, Pagination, EffectFade]}
          effect="fade"
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          loop={true}
          className="h-full"
        >
          {slides.map((slide, i) => (
            <SwiperSlide key={i}>
              <div 
                className="relative w-full h-full bg-cover bg-center flex items-center"
                style={{ backgroundImage: `url(${slide.img})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 via-indigo-900/40 to-transparent"></div>
                
                <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
                  <div className="max-w-2xl text-white space-y-6 animate-in fade-in slide-in-from-left duration-1000">
                    <span className="inline-block px-4 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-sm font-bold tracking-widest uppercase">
                      The Spot Admission
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black leading-[1.1]">
                      {slide.title} <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-200">
                        {slide.highlight}
                      </span>
                    </h1>
                    <p className="text-lg md:text-xl text-indigo-100/80 leading-relaxed max-w-xl">
                      {slide.desc}
                    </p>
                    <div className="flex flex-wrap gap-4 pt-4">
                      <Link to={slide.btn1.link} className="bg-white text-indigo-900 px-8 py-4 rounded-2xl font-bold hover:bg-indigo-50 transition-all flex items-center shadow-xl shadow-black/20">
                        {slide.btn1.text} <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                      <Link to={slide.btn2.link} className="bg-indigo-500/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-2xl font-bold hover:bg-white/20 transition-all">
                        {slide.btn2.text}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* --- QUICK SERVICES GRID --- */}
      <section className="relative z-20 -mt-20 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, idx) => (
              <Link key={idx} to={s.link} className="group bg-white p-8 rounded-[2rem] shadow-xl shadow-indigo-900/5 border border-indigo-50 hover:-translate-y-2 transition-all duration-300">
                <div className={`${s.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <s.icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{s.desc}</p>
                <div className="flex items-center text-indigo-600 font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn More <ArrowRight size={16} className="ml-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* --- WELCOME SECTION --- */}
      <section className="py-24 bg-indigo-50/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 space-y-8">
              <h2 className="text-4xl md:text-5xl font-black text-indigo-900 leading-tight">
                Welcome to <br />
                <span className="text-indigo-600">The Spot Admission</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Start your educational journey with guidance, clarity, and confidence. Our team connects students with the right schools and colleges by understanding individual goals and capacities.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {['Verified Data', 'Expert Guidance', 'Transparent Process', 'Career Focused'].map((item) => (
                  <div key={item} className="flex items-center space-x-3 text-gray-700 font-semibold">
                    <CheckCircle2 className="text-indigo-600 h-6 w-6" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/about" className="inline-flex items-center font-bold text-indigo-600 hover:text-indigo-800 underline decoration-2 underline-offset-8">
                Learn more about our mission <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
            <div className="lg:w-1/2 relative">
               <div className="absolute -inset-4 bg-indigo-200 rounded-[3rem] rotate-3 opacity-30"></div>
               <img 
                 src={slider1} 
                 alt="Students" 
                 className="relative z-10 rounded-[3rem] shadow-2xl object-cover h-[500px] w-full"
               />
               <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-2xl z-20 hidden md:block border border-indigo-50">
                  <div className="flex items-center gap-4">
                    <div className="bg-indigo-600 p-3 rounded-2xl text-white">
                      <GraduationCap size={32} />
                    </div>
                    <div>
                      <p className="text-3xl font-black text-indigo-900">1000+</p>
                      <p className="text-gray-500 font-medium">Successful Admissions</p>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto bg-indigo-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-indigo-900/20">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
             <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-400 rounded-full blur-[100px]"></div>
             <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-400 rounded-full blur-[100px]"></div>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight relative z-10">
            Ready to Start Your <br /> Educational Journey?
          </h2>
          <p className="text-xl text-indigo-200 mb-12 max-w-2xl mx-auto relative z-10">
            Get personalized counselling and admission support from our expert team. Your future spot is waiting!
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
            <Link to="/contact" className="bg-white text-indigo-900 px-10 py-5 rounded-2xl font-black text-lg hover:bg-indigo-50 transition-all shadow-xl">
              Book Free Consultation
            </Link>
            <Link to="/content" className="bg-indigo-800 text-white border border-indigo-700 px-10 py-5 rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all">
              Watch Virtual Tours
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;