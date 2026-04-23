import { FileText, CheckCircle, Users, Download, Calendar, AlertCircle, BookOpen, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Admissions = () => {
  const admissionSteps = [
    {
      phase: "Pre-Primary (Ages 2-6)",
      color: "border-blue-200 bg-blue-50/50",
      accent: "bg-blue-600",
      steps: [
        "Research and shortlist schools",
        "Visit schools and attend open houses",
        "Collect application forms",
        "Submit applications with documents",
        "Parent-child interaction sessions",
        "Wait for admission results",
        "Complete admission formalities"
      ]
    },
    {
      phase: "Primary & Secondary (Ages 6-16)",
      color: "border-indigo-200 bg-indigo-50/50",
      accent: "bg-indigo-600",
      steps: [
        "Academic performance evaluation",
        "Selection based on curriculum",
        "Application submission",
        "Entrance test (if required)",
        "Document verification",
        "Interview rounds",
        "Fee payment & confirmation"
      ]
    },
    {
      phase: "College & Higher Education (18+)",
      color: "border-purple-200 bg-purple-50/50",
      accent: "bg-purple-600",
      steps: [
        "Career counselling & stream selection",
        "Entrance exam registration",
        "College research & shortlisting",
        "Application form filling",
        "Document submission",
        "Merit list & counselling",
        "Seat allotment & confirmation"
      ]
    }
  ];

  const requiredDocuments = {
    prePrimary: ["Birth Certificate", "Passport Photos", "Address Proof", "Parent's ID Proof", "Immunization Records", "Medical Certificate"],
    school: ["Birth Certificate", "Previous School Records", "Transfer Certificate", "Character Certificate", "Passport Photos", "Address Proof", "Income Proof"],
    college: ["10th & 12th Mark Sheets", "Transfer Certificate", "Migration Certificate", "Character Certificate", "Entrance Score Card", "Category Certificate", "Passport Photos", "ID Proof"]
  };

  const admissionTimeline = [
    { month: "Nov - Dec", activity: "Pre-Primary Applications", desc: "Most schools release their admission forms" },
    { month: "Jan - Feb", activity: "School Entrance Tests", desc: "Primary and secondary admissions begin" },
    { month: "Mar - Apr", activity: "College Entrance Exams", desc: "Major exams like JEE, NEET, GUJCET" },
    { month: "May - Jun", activity: "Counselling Rounds", desc: "Admission forms and seat allotments" },
    { month: "Jul - Aug", activity: "Classes Begin", desc: "Final verification and session start" }
  ];

  const services = [
    { icon: FileText, title: "Form Assistance", desc: "Help with complex admission forms" },
    { icon: BookOpen, title: "Exam Strategy", desc: "Preparation for entrance examinations" },
    { icon: Users, title: "Mock Interviews", desc: "Preparation for selection rounds" },
    { icon: CheckCircle, title: "Verification", desc: "Document auditing for error-free submission" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-indigo-900 py-20 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-white blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-indigo-400 blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            Admission <span className="text-indigo-400">Process Guide</span>
          </h1>
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-indigo-100/80 leading-relaxed">
            Your comprehensive roadmap for academic success, from early childhood to professional degrees.
          </p>
          <Link
            to="/admissionsform"
            className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-indigo-500/20 active:scale-95"
          >
            Get Expert Guidance <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Step-by-Step Roadmap</h2>
            <div className="h-1.5 w-20 bg-indigo-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="space-y-16">
            {admissionSteps.map((phase, idx) => (
              <div key={idx} className={`rounded-3xl border ${phase.color} p-8 md:p-12 shadow-sm`}>
                <h3 className="text-2xl font-bold text-gray-800 mb-8">{phase.phase}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-6">
                  {phase.steps.map((step, sIdx) => (
                    <div key={sIdx} className="group relative">
                      <div className="flex flex-col items-center text-center">
                        <div className={`z-10 flex h-10 w-10 items-center justify-center rounded-full ${phase.accent} text-white font-bold mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                          {sIdx + 1}
                        </div>
                        <p className="text-sm font-medium text-gray-700 leading-snug">{step}</p>
                      </div>
                      {sIdx < phase.steps.length - 1 && (
                        <div className="hidden xl:block absolute top-5 -right-3 w-6 h-[2px] bg-gray-200"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 1. Support Services Section - Now Moved Here */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Admission Support Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive assistance throughout your admission journey
            </p>
            <div className="h-1.5 w-20 bg-indigo-600 mx-auto rounded-full mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((s, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 group">
                <div className="bg-indigo-50 group-hover:bg-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300">
                  <s.icon className="h-8 w-8 text-indigo-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{s.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Required Documents Checklist Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Essential Checklist</h2>
            <p className="text-lg text-gray-600">Necessary documents for a hassle-free application</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(requiredDocuments).map(([key, docs], i) => (
              <div key={i} className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm hover:border-indigo-300 transition-colors">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-indigo-50 rounded-2xl">
                    <FileText className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 capitalize">
                    {key === 'prePrimary' ? 'Pre-Primary' : key === 'school' ? 'Schooling' : 'Higher Ed'}
                  </h3>
                </div>
                <ul className="space-y-4">
                  {docs.map((d, di) => (
                    <li key={di} className="flex items-start gap-3 group">
                      <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                      <span className="text-gray-600 text-sm font-medium">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-indigo-50/50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Annual Admission Timeline</h2>
            <p className="text-gray-600">Stay ahead with important dates and deadlines</p>
          </div>
          <div className="space-y-4">
            {admissionTimeline.map((item, i) => (
              <div key={i} className="flex items-center gap-6 bg-white p-6 rounded-2xl shadow-sm border border-indigo-100 hover:border-indigo-300 transition-all">
                <div className="hidden sm:flex shrink-0 w-32 font-bold text-indigo-600 text-sm items-center gap-2">
                  <Calendar className="h-4 w-4" /> {item.month}
                </div>
                <div className="flex-1">
                  <div className="sm:hidden text-xs font-bold text-indigo-600 mb-1">{item.month}</div>
                  <h4 className="font-bold text-gray-900">{item.activity}</h4>
                  <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW: Important Admission Tips Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Important Admission Tips</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Key points to remember for successful admissions
            </p>
            <div className="h-1.5 w-20 bg-indigo-600 mx-auto rounded-full mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Start Early", desc: "Begin your research and documentation at least 6 months before the deadline." },
              { title: "Multiple Applications", desc: "Apply to at least 3-5 institutions to ensure a better chance of selection." },
              { title: "Verify Credentials", desc: "Double-check that all your certificates are updated and officially stamped." },
              { title: "Entrance Prep", desc: "Focus on syllabus-specific topics and take regular mock tests." },
              { title: "Financial Planning", desc: "Keep track of registration fees, tuition costs, and available scholarships." },
              { title: "Professional Review", desc: "Get your SOPs and application forms reviewed by experts to avoid errors." }
            ].map((tip, idx) => (
              <div key={idx} className="flex gap-4 p-6 rounded-2xl bg-indigo-50/30 border border-transparent hover:border-indigo-200 hover:bg-white transition-all duration-300">
                <div className="mt-1">
                  <AlertCircle className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{tip.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto bg-indigo-600 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight relative z-10">Start Your Journey Today</h2>
            <p className="text-xl text-indigo-200 mb-12 max-w-2xl mx-auto relative z-10">
              Our experts are ready to handle the stress of admissions while you focus on your future.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-white text-indigo-600 px-8 py-4 rounded-2xl font-bold hover:bg-indigo-50 transition-colors shadow-lg">
                Book Consultation
              </button>
              <button className="bg-indigo-500 border border-indigo-400 px-8 py-4 rounded-2xl font-bold hover:bg-indigo-400 transition-colors">
                Download PDF Guide
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Admissions;