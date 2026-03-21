import React, { useState } from 'react';
import { Play, Eye, Calendar, School, GraduationCap, Baby } from 'lucide-react';

const VirtualTour = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Tours', icon: Eye },
    { id: 'pre-primary', name: 'Pre-Primary', icon: Baby },
    { id: 'schools', name: 'Schools', icon: School },
    { id: 'colleges', name: 'Colleges', icon: GraduationCap }
  ];

  const tours = [
    {
      id: 1,
      title: "Greenwood International School - Complete Campus Tour",
      category: "schools",
      duration: "12 min",
      views: "2.5K",
      thumbnail: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Explore our state-of-the-art facilities including smart classrooms, science labs, and sports facilities.",
      highlights: ["Smart Classrooms", "Science Labs", "Sports Complex", "Library"]
    },
    {
      id: 2,
      title: "St. Mary's College - Academic Block & Hostel Tour",
      category: "colleges",
      duration: "15 min",
      views: "3.8K",
      thumbnail: "https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Virtual walkthrough of our academic buildings, hostel facilities, and campus amenities.",
      highlights: ["Lecture Halls", "Research Labs", "Hostel Rooms", "Cafeteria"]
    },
    {
      id: 3,
      title: "Little Angels Montessori - Learning Environment Tour",
      category: "pre-primary",
      duration: "8 min",
      views: "1.2K",
      thumbnail: "https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "See how we create a nurturing environment for early childhood development and learning.",
      highlights: ["Play Areas", "Activity Rooms", "Garden", "Learning Materials"]
    },
    {
      id: 4,
      title: "Delhi Public School - Sports & Recreation Facilities",
      category: "schools",
      duration: "10 min",
      views: "1.9K",
      thumbnail: "https://images.pexels.com/photos/159775/library-books-education-literature-159775.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Comprehensive tour of our sports facilities, gymnasium, and recreational areas.",
      highlights: ["Swimming Pool", "Basketball Court", "Cricket Ground", "Gymnasium"]
    },
    {
      id: 5,
      title: "Cambridge International School - IB Program Facilities",
      category: "schools",
      duration: "14 min",
      views: "2.1K",
      thumbnail: "https://images.pexels.com/photos/289737/pexels-photo-289737.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Discover our specialized facilities for the International Baccalaureate program.",
      highlights: ["Language Labs", "Art Studios", "Music Rooms", "Theatre"]
    },
    {
      id: 6,
      title: "International School of Business - MBA Campus Tour",
      category: "colleges",
      duration: "18 min",
      views: "4.2K",
      thumbnail: "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Experience our world-class MBA facilities including case study rooms and business incubator.",
      highlights: ["Case Study Rooms", "Business Incubator", "Conference Hall", "Library"]
    }
  ];

  const filteredTours = selectedCategory === 'all' 
    ? tours 
    : tours.filter(tour => tour.category === selectedCategory);

  const featuredTour = {
    title: "Complete Educational Journey - From Pre-Primary to College",
    duration: "25 min",
    views: "8.5K",
    thumbnail: "https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "A comprehensive virtual tour showcasing the complete educational journey from early childhood to higher education."
  };

  return (
    <div className="py-12">
      {/* Hero Section */} 
      <section className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Virtual Tours</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-blue-100">
              Explore schools and colleges from the comfort of your home with our immersive virtual tours
            </p>
            <button className="bg-transparent border-2 border-white hover:bg-white hover:text-primary-500  px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 flex items-center justify-center mx-auto">
              <Calendar className="mr-2 h-5 w-5" />
              Request Live Tour
            </button>
          </div>
        </div>
      </section>

      {/* Featured Tour */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Virtual Tour</h2>
            <p className="text-xl text-gray-600">
              Our most comprehensive educational tour experience
            </p>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl overflow-hidden shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="relative group cursor-pointer">
                <img 
                  src={featuredTour.thumbnail} 
                  alt={featuredTour.title}
                  className="w-full h-80 lg:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-4">
                    <Play className="h-12 w-12 text-white fill-white" />
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
                  {featuredTour.duration}
                </div>
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">{featuredTour.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{featuredTour.description}</p>
                <div className="flex items-center mb-6">
                  <div className="flex items-center mr-6">
                    <Eye className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-gray-600">{featuredTour.views} views</span>
                  </div>
                  <div className="flex items-center">
                    <Play className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-gray-600">{featuredTour.duration}</span>
                  </div>
                </div>
                <button className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 flex items-center justify-center">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Now
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
                className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-colors duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-primary-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-primary-600'
                }`}
              >
                <category.icon className="h-5 w-5 mr-2" />
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTours.map((tour) => (
              <div key={tour.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
                <div className="relative cursor-pointer">
                  <img 
                    src={tour.thumbnail} 
                    alt={tour.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-3">
                      <Play className="h-8 w-8 text-white fill-white" />
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                    {tour.duration}
                  </div>
                  <div className="absolute top-3 left-3 bg-primary-500 text-white px-2 py-1 rounded text-sm capitalize">
                    {tour.category.replace('-', ' ')}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{tour.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{tour.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {tour.highlights.slice(0, 2).map((highlight, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                        {highlight}
                      </span>
                    ))}
                    {tour.highlights.length > 2 && (
                      <span className="text-blue-600 text-xs font-medium">
                        +{tour.highlights.length - 2} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-gray-500 text-sm">
                      <Eye className="h-4 w-4 mr-1" />
                      <span>{tour.views} views</span>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Play className="h-4 w-4 mr-1" />
                      <span>{tour.duration}</span>
                    </div>
                  </div>

                  <button className="w-full bg-primary-500 hover:bg-primary-600 text-white py-2 rounded-lg font-semibold transition-colors duration-200">
                    Watch Tour
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* Request Tour */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl text-white p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Can't Find the Tour You're Looking For?</h2>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              Request a personalized virtual tour of any school or college you're interested in
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="text"
                placeholder="Enter school/college name"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              />
              <button className="bg-transparent border-2 border-white hover:bg-white hover:text-primary-500  px-6 py-3 rounded-lg font-semibold transition-colors duration-200 whitespace-nowrap">
                Request Tour
              </button>
            </div>
            <p className="text-sm text-blue-200 mt-4">
              We'll arrange a live virtual tour within 48 hours
            </p>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Virtual Tour Impact</h2>
            <p className="text-xl text-gray-600">
              See how our virtual tours are helping families make informed decisions
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-500 mb-2">50+</div>
              <div className="text-gray-600">Schools & Colleges</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-500 mb-2">25K+</div>
              <div className="text-gray-600">Tour Views</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-500 mb-2">1.5K+</div>
              <div className="text-gray-600">Live Tours Conducted</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-500 mb-2">95%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VirtualTour;