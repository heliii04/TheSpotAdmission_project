import React, { useState } from 'react';
import { MapPin, Star, Phone, Globe, Filter, Search, Heart } from 'lucide-react';

const Directory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    type: '',
    curriculum: '',
    location: '',
    fees: ''
  });

  const schools = [
    {
      id: 1,
      name: "Greenwood International School",
      type: "School",
      curriculum: "CBSE",
      location: "Mumbai, Maharashtra",
      fees: "₹2.5L - 3.5L",
      rating: 4.8,
      image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=400",
      facilities: ["Swimming Pool", "Library", "Computer Lab", "Sports Ground"],
      phone: "+91 98765-12345",
      website: "www.greenwood.edu.in",
      established: "2005",
      students: "1200+"
    },
    {
      id: 2,
      name: "St. Mary's College",
      type: "College",
      curriculum: "Arts & Science",
      location: "Bangalore, Karnataka",
      fees: "₹3.0L - 4.0L",
      rating: 4.6,
      image: "https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=400",
      facilities: ["Auditorium", "Research Labs", "Hostel", "Cafeteria"],
      phone: "+91 98765-12346",
      website: "www.stmarys.edu.in",
      established: "1995",
      students: "2500+"
    },
    {
      id: 3,
      name: "Delhi Public School",
      type: "School",
      curriculum: "CBSE",
      location: "Delhi, NCR",
      fees: "₹1.8L - 2.8L",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1000&auto=format&fit=crop",
      facilities: ["Smart Classrooms", "Science Labs", "Art Studio", "Playground"],
      phone: "+91 98765-12347",
      website: "www.dps.edu.in",
      established: "1990",
      students: "1800+"
    },
    {
      id: 4,
      name: "International School of Business",
      type: "College",
      curriculum: "MBA",
      location: "Pune, Maharashtra",
      fees: "₹8.0L - 12.0L",
      rating: 4.9,
      image: "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=400",
      facilities: ["Business Incubator", "Conference Hall", "Library", "WiFi Campus"],
      phone: "+91 98765-12348",
      website: "www.isb.edu.in",
      established: "2000",
      students: "800+"
    },
    {
      id: 5,
      name: "Little Angels Montessori",
      type: "Pre-Primary",
      curriculum: "Montessori",
      location: "Chennai, Tamil Nadu",
      fees: "₹1.2L - 1.8L",
      rating: 4.5,
      image: "https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=400",
      facilities: ["Play Area", "Activity Rooms", "Garden", "Medical Room"],
      phone: "+91 98765-12349",
      website: "www.littleangels.edu.in",
      established: "2010",
      students: "300+"
    },
    {
      id: 6,
      name: "Cambridge International School",
      type: "School",
      curriculum: "IB",
      location: "Hyderabad, Telangana",
      fees: "₹4.0L - 6.0L",
      rating: 4.8,
      image: "https://images.pexels.com/photos/289737/pexels-photo-289737.jpeg?auto=compress&cs=tinysrgb&w=400",
      facilities: ["International Curriculum", "Language Lab", "Theatre", "Sports Complex"],
      phone: "+91 98765-12350",
      website: "www.cambridge.edu.in",
      established: "2008",
      students: "900+"
    }
  ];

  const filterOptions = {
    type: ['School', 'College', 'Pre-Primary'],
    curriculum: ['CBSE', 'ICSE', 'IB', 'Arts & Science', 'MBA', 'Montessori'],
    location: ['Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Chennai', 'Hyderabad'],
    fees: ['Under ₹2L', '₹2L - ₹5L', '₹5L - ₹10L', 'Above ₹10L']
  };

  const filteredSchools = schools.filter(school => {
    const matchesSearch = school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         school.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         school.curriculum.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = !selectedFilters.type || school.type === selectedFilters.type;
    const matchesCurriculum = !selectedFilters.curriculum || school.curriculum === selectedFilters.curriculum;
    const matchesLocation = !selectedFilters.location || school.location.includes(selectedFilters.location);
    
    return matchesSearch && matchesType && matchesCurriculum && matchesLocation;
  });

  const handleFilterChange = (filterType: string, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType as keyof typeof prev] === value ? '' : value
    }));
  };

  return (
  <div className="min-h-screen bg-slate-50 font-sans">
    {/* Hero Section - Matching image_f14cc2.png */}
    <section className="bg-[#0A1128] pt-32 pb-20 text-center px-4">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
        Find Your Perfect <span className="text-indigo-500">Institution</span>
      </h1>
      <p className="text-slate-400 text-lg">Explore top-rated schools and colleges with detailed facilities.</p>
    </section>

    {/* Search Bar - Floating Glass Effect */}
    <div className="max-w-6xl mx-auto px-4 -mt-8 mb-12">
      <div className="bg-white p-2 rounded-2xl shadow-xl flex flex-col md:flex-row gap-2 border border-slate-100">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search institutions..." 
            className="w-full pl-12 pr-4 py-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-indigo-500 font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {['type', 'curriculum', 'location'].map((filter) => (
            <select 
              key={filter}
              className="bg-slate-50 border-none rounded-xl px-4 py-3 text-sm font-bold text-slate-500 uppercase cursor-pointer"
              onChange={(e) => handleFilterChange(filter, e.target.value)}
            >
              <option value="">{filter}</option>
              {filterOptions[filter as keyof typeof filterOptions].map(opt => <option key={opt}>{opt}</option>)}
            </select>
          ))}
        </div>
      </div>
    </div>

    {/* Results Grid - Compact & Polished */}
    <section className="max-w-6xl mx-auto px-4 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredSchools.map((school) => (
          <div key={school.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col sm:flex-row">
            {/* Image */}
            <div className="sm:w-2/5 relative">
              <img src={school.image} alt={school.name} className="w-full h-48 sm:h-full object-cover" />
              <span className="absolute top-3 left-3 bg-indigo-600 text-white text-[10px] font-bold px-2 py-1 rounded-lg uppercase">
                {school.type}
              </span>
            </div>

            {/* Content */}
            <div className="sm:w-3/5 p-6 flex flex-col">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold text-slate-900 leading-tight">{school.name}</h3>
                <Heart size={18} className="text-slate-300 hover:text-red-500 cursor-pointer transition-colors" />
              </div>

              <div className="flex items-center gap-3 mt-2 mb-4">
                <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                  <Star size={14} className="fill-current" /> {school.rating}
                </div>
                <span className="text-slate-400 text-xs flex items-center gap-1 uppercase font-bold">
                  <MapPin size={12} /> {school.location.split(',')[0]}
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {school.facilities.slice(0, 3).map((f, i) => (
                  <span key={i} className="bg-slate-100 text-slate-500 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase">
                    {f}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
                <span className="text-emerald-600 font-bold text-md">{school.fees}</span>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl font-bold text-xs transition-all shadow-lg shadow-indigo-100">
                  DETAILS
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  </div>
);
};

export default Directory;