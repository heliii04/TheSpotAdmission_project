import { Users, Target, Eye, Handshake, Award, BookOpen, Heart, CheckCircle2, Star } from 'lucide-react';
import Bhoomi from '../image/bhoomi.jpeg';
import aswin from '../image/aswin.jpeg';
import niraj from '../image/niraj.png';

const About = () => {
  const teamMembers = [
    {
      name: "Niraj Thakor",
      role: "Founder & Lead Counsellor",
      experience: "11+ Years",
      specialization: "With over 11 years of dedicated experience, Niraj Sir has guided countless students toward finding their true calling. Known for his empathetic approach, students trust him to shape their future with care.",
      image: niraj
    },
    {
      name: "Ashwin Sharma",
      role: "Senior Education Consultant",
      experience: "7+ Years",
      specialization: "Ashwin Sharma empowers students to overcome academic challenges. His guidance combines deep industry expertise with genuine passion, ensuring every student receives tailored advice.",
      image: aswin
    },
    {
      name: "Bhoomiba Thakor",
      role: "Social Media & Counselling Manager",
      experience: "3+ Years",
      specialization: "Bhoomiba connects students to the right guidance through digital engagement. Her dedicated approach ensures a supportive and smooth admission journey for every aspirant.",
      image: Bhoomi
    }
  ];

  const milestones = [
    { number: "2500+", label: "Students Guided", icon: Users },
    { number: "150+", label: "Partner Schools", icon: BookOpen },
    { number: "10+", label: "Years Experience", icon: Award },
    { number: "98%", label: "Success Rate", icon: Target }
  ];

  return (
    <div className="bg-white">
      {/* --- HERO SECTION --- */}
      <section className="relative bg-indigo-900 py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-black tracking-widest text-indigo-200 uppercase bg-indigo-800/50 rounded-full border border-indigo-700">
            Our Story & Vision
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            The Spot <span className="text-indigo-400">Admission</span>
          </h1>
          <p className="text-xl text-indigo-100 max-w-3xl mx-auto leading-relaxed font-medium">
            Empowering students and parents with expert educational guidance since 2016. We don't just find colleges; we build careers.
          </p>
        </div>
        {/* Abstract shape */}
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl"></div>
      </section>

      {/* --- STATS SECTION (Floating) --- */}
      <section className="relative -mt-12 z-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
          {milestones.map((m, i) => (
            <div key={i} className="bg-white p-6 rounded-[2rem] shadow-xl border border-indigo-50 flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-300">
              <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600 mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <m.icon size={24} />
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-indigo-950">{m.number}</h3>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{m.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- MISSION & VISION (Grid) --- */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="relative p-10 bg-indigo-50 rounded-[3rem] overflow-hidden group">
            <Target className="absolute -right-8 -bottom-8 h-40 w-40 text-indigo-100 group-hover:rotate-12 transition-transform duration-500" />
            <h2 className="text-3xl font-black text-indigo-950 mb-6 flex items-center gap-3">
              Our Mission <div className="h-1 w-12 bg-indigo-600 rounded-full"></div>
            </h2>
            <p className="text-gray-600 leading-relaxed font-medium text-lg relative z-10">
              To provide comprehensive, personalized educational counselling that empowers students to make informed decisions. We bridge the gap between aspirations and reality through structured guidance.
            </p>
          </div>
          <div className="relative p-10 bg-purple-50 rounded-[3rem] overflow-hidden group">
            <Eye className="absolute -right-8 -bottom-8 h-40 w-40 text-purple-100 group-hover:rotate-12 transition-transform duration-500" />
            <h2 className="text-3xl font-black text-purple-950 mb-6 flex items-center gap-3">
              Our Vision <div className="h-1 w-12 bg-purple-600 rounded-full"></div>
            </h2>
            <p className="text-gray-600 leading-relaxed font-medium text-lg relative z-10">
              To be India's most trusted educational platform, helping every student find their perfect academic path through quality support and innovative counselling solutions.
            </p>
          </div>
        </div>
      </section>

      {/* --- TEAM SECTION --- */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-indigo-950 mb-4">Meet Our Experts</h2>
            <p className="text-gray-500 max-w-2xl mx-auto font-medium">Guided by sincerity, driven by your success.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-[2.5rem] overflow-hidden shadow-lg border border-white hover:shadow-2xl transition-all group">
                <div className="h-72 overflow-hidden bg-slate-200 relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-indigo-600 uppercase">
                    {member.experience} Exp.
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-black text-indigo-950 mb-1">{member.name}</h3>
                  <p className="text-indigo-600 font-bold text-sm mb-4 uppercase tracking-tighter">{member.role}</p>
                  <p className="text-gray-500 text-sm leading-relaxed italic">"{member.specialization}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- VALUES SECTION --- */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-indigo-950">Our Core Values</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Heart, title: "Personalized Care", color: "bg-red-50 text-red-500" },
            { icon: Award, title: "Excellence", color: "bg-amber-50 text-amber-500" },
            { icon: BookOpen, title: "Full Support", color: "bg-blue-50 text-blue-500" },
            { icon: Handshake, title: "Trust", color: "bg-green-50 text-green-500" }
          ].map((val, i) => (
            <div key={i} className="p-8 rounded-[2rem] bg-white border border-slate-100 text-center hover:border-indigo-200 transition-all">
              <div className={`w-16 h-16 ${val.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm`}>
                <val.icon size={30} />
              </div>
              <h4 className="text-lg font-black text-indigo-950 mb-2">{val.title}</h4>
              <p className="text-gray-500 text-sm font-medium">We prioritize transparency and long-term success for every student.</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- PARTNERSHIP CTA --- */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto bg-indigo-900 rounded-[3.5rem] p-12 md:p-20 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-8">150+ Partner <br/>Institutions</h2>
              <div className="space-y-4">
                {['Direct Committee Collaboration', 'Real-time Criteria Updates', 'Exclusive Admission Insights', 'Priority Support for Students'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-indigo-100">
                    <CheckCircle2 size={20} className="text-indigo-400" />
                    <span className="font-bold">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-[2.5rem] p-10 border border-white/10 text-center">
              <Star className="h-16 w-16 text-indigo-400 mx-auto mb-6" />
              <p className="text-white text-xl font-medium italic">"Collaborating with premier colleges across India to ensure your seat is secured with the best possible guidance."</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;