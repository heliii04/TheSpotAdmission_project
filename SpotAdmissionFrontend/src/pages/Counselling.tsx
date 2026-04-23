import { useState } from 'react';
import { 
  Baby, GraduationCap, TrendingUp, User, ChevronDown, 
  ChevronRight, ArrowRight, CheckCircle2, Star, Sparkles 
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const Counselling = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const navigate = useNavigate();
  
  // Auth Check Logic: Change this according to your auth state management
  const isLoggedIn = localStorage.getItem('token') !== null;

  const handleGuidanceClick = (link: string) => {
    navigate(link);
  };

  const services = [
    {
      icon: Baby,
      title: "Pre-Primary to Higher Secondary",
      tag: "School Education",
      description: "We guide parents through Gujarat’s board affiliations (GSEB, CBSE, ICSE), admission timelines, and age criteria to find the perfect fit for your child's early years.",
      features: ["Age-appropriate selection", "Curriculum comparison", "Safety assessment", "Admission process guidance"],
      link: "/preprimarytohigher",
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: GraduationCap,
      title: "College Admission Counselling",
      tag: "Higher Education",
      description: "Simplifying complex procedures governed by ACPC and university guidelines for Engineering, Arts, Science, and Commerce streams across Gujarat.",
      features: ["ACPC merit tracking", "Entrance exam strategy", "Application assistance", "Scholarship guidance"],
      link: "/collegeadmission",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: TrendingUp,
      title: "Career Guidance & Streams",
      tag: "Strategic Planning",
      description: "Using psychometric assessment and market trends to help students align their academic choices with future career paths in evolving job markets.",
      features: ["Aptitude testing", "Career mapping", "Industry insights", "Skill development"],
      link: "/careerguidance",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: User,
      title: "Personalized Student Support",
      tag: "1-on-1 Mentorship",
      description: "Address mental wellness, motivation, and academic strengths with ongoing support before, during, and after the admission cycle.",
      features: ["Goal setting roadmap", "Parent-Counsellor meetings", "Mental wellness support", "Progress monitoring"],
      link: "/personalizedcounseling",
      color: "from-pink-500 to-rose-500"
    }
  ];

  const faqs = [
    { question: "How does the counselling process work?", answer: "Our process begins with an initial assessment of interests and goals, followed by a personalized action plan and end-to-end admission support." },
    { question: "Do you provide online sessions?", answer: "Yes, we offer high-quality video consultation sessions for students and parents across Gujarat." },
    { question: "How much does it cost?", answer: "Packages start from ₹1,999. We offer flexible options based on the depth of support required." }
  ];

  return (
    <div className="bg-white">
      {/* --- PREMIUM HERO SECTION --- */}
      <section className="relative py-24 bg-indigo-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-500 rounded-full blur-[120px]"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-500 rounded-full blur-[120px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center space-x-2 bg-indigo-500/20 border border-indigo-400/30 px-4 py-2 rounded-full mb-8">
            <Sparkles className="h-4 w-4 text-indigo-300" />
            <span className="text-indigo-200 text-xs font-bold uppercase tracking-widest">Expert Guidance Awaits</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            Unlock Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-200">Academic Potential</span>
          </h1>
          <p className="text-xl text-indigo-100/80 max-w-2xl mx-auto mb-10">
            Professional counselling tailored to Gujarat's education system. We don't just find schools; we build futures.
          </p>
          <button 
            onClick={() => handleGuidanceClick('/counselingappointment')}
            className="bg-white text-indigo-900 px-10 py-4 rounded-2xl font-black text-lg shadow-2xl hover:bg-indigo-50 transition-all flex items-center mx-auto"
          >
            Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </section>

      {/* --- SERVICES GRID --- */}
      <section className="py-24 bg-indigo-50/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-indigo-900 mb-4">Our Specializations</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Select a service to get expert guidance curated specifically for your educational stage.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, idx) => (
              <div key={idx} className="group bg-white rounded-[2.5rem] p-1 shadow-xl shadow-indigo-900/5 hover:shadow-indigo-900/10 transition-all duration-500 border border-indigo-50 overflow-hidden">
                <div className="p-8 md:p-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${service.color} text-white shadow-lg`}>
                      <service.icon size={32} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full">{service.tag}</span>
                  </div>
                  
                  <h3 className="text-2xl font-black text-indigo-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-8 flex-grow">{service.description}</p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {service.features.map((f, i) => (
                      <div key={i} className="flex items-center space-x-2 text-xs font-bold text-gray-500">
                        <CheckCircle2 size={14} className="text-green-500" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={() => handleGuidanceClick(service.link)}
                    className={`w-full py-4 rounded-2xl font-black text-white bg-indigo-900 hover:bg-indigo-800 transition-all shadow-lg shadow-indigo-900/20 flex items-center justify-center space-x-2`}
                  >
                    <span>Get Guidance</span>
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PROCESS SECTION --- */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-indigo-900 rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
             <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-12">
                {[
                  { n: "01", t: "Assessment", d: "Understanding your unique goals." },
                  { n: "02", t: "Planning", d: "Creating your custom roadmap." },
                  { n: "03", t: "Execution", d: "Guided application process." },
                  { n: "04", t: "Success", d: "Securing your ideal admission." }
                ].map((step, i) => (
                  <div key={i} className="space-y-4">
                    <span className="text-5xl font-black text-indigo-400/30">{step.n}</span>
                    <h4 className="text-xl font-bold text-white">{step.t}</h4>
                    <p className="text-indigo-200/70 text-sm">{step.d}</p>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="py-24 bg-indigo-50/30">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-black text-indigo-900 text-center mb-12">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl border border-indigo-50 shadow-sm overflow-hidden">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-6 text-left flex justify-between items-center group"
                >
                  <span className="font-bold text-indigo-900 group-hover:text-indigo-600 transition-colors">{faq.question}</span>
                  {openFaq === i ? <ChevronDown className="text-indigo-600" /> : <ChevronRight className="text-gray-400" />}
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6 text-gray-600 leading-relaxed animate-in fade-in slide-in-from-top-2">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Counselling;