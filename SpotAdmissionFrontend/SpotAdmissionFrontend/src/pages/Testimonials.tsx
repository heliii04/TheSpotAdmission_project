import { useState } from 'react';
import { Star, Quote, GraduationCap, Users, Heart, Award, ChevronLeft, ChevronRight } from 'lucide-react';

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Stories' },
    { id: 'parents', name: 'Parents' },
    { id: 'students', name: 'Students' },
    { id: 'schools', name: 'Schools' }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      role: "Mother of Aarav (Grade 5)",
      category: "parents",
      rating: 5,
      image: "https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=300",
      content: "EduGuide helped us find the perfect school for our son Aarav. The counselling was incredibly detailed and personalized. They understood our requirements and presented us with options that were exactly what we were looking for. The admission process became so much smoother with their guidance.",
      school: "Greenwood International School",
      year: "2024"
    },
    {
      id: 2,
      name: "Rohit Patel",
      role: "Engineering Student",
      category: "students",
      rating: 5,
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300",
      content: "Thanks to EduGuide's expert counselling, I got admission into my dream engineering college. Their guidance on entrance exam preparation and college selection was invaluable. The mock interviews they conducted really boosted my confidence. I couldn't have done it without their support.",
      school: "IIT Delhi",
      year: "2024"
    },
    {
      id: 3,
      name: "Dr. Meera Gupta",
      role: "Parent & Pediatrician",
      category: "parents",
      rating: 5,
      image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=300",
      content: "As a working mother, I was overwhelmed with the school selection process. EduGuide's team took care of everything - from shortlisting schools to handling applications. Their professionalism and attention to detail impressed me greatly. My daughter is now thriving in her new school.",
      school: "Cambridge International School",
      year: "2024"
    },
    {
      id: 4,
      name: "Anita Desai",
      role: "MBA Graduate",
      category: "students",
      rating: 5,
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300",
      content: "The MBA admission process seemed daunting until I connected with EduGuide. Their expertise in business school admissions is remarkable. They helped me craft compelling essays, prepare for interviews, and navigate the complex application process. I'm now at my dream B-school!",
      school: "IIM Ahmedabad",
      year: "2023"
    },
    {
      id: 5,
      name: "Principal Sarah Johnson",
      role: "St. Mary's International School",
      category: "schools",
      rating: 5,
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=300",
      content: "We've been partnering with EduGuide for three years now, and they consistently send us well-prepared, motivated students and families. Their understanding of our admission process and school culture is exceptional. They truly bridge the gap between families and schools.",
      school: "St. Mary's International School",
      year: "2024"
    },
    {
      id: 6,
      name: "Rajesh Kumar",
      role: "Father of Kavya (Pre-Primary)",
      category: "parents",
      rating: 5,
      image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300",
      content: "Choosing a pre-primary school for our daughter was our first major parenting decision. EduGuide's counsellors were patient, understanding, and incredibly knowledgeable. They helped us understand different teaching methodologies and find a school that matches our parenting philosophy.",
      school: "Little Angels Montessori",
      year: "2024"
    },
    {
      id: 7,
      name: "Neha Singh",
      role: "Medical Student",
      category: "students",
      rating: 5,
      image: "https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=300",
      content: "NEET preparation was stressful, but EduGuide's counsellors kept me motivated and focused. They provided excellent study schedules, recommended the best coaching institutes, and helped me manage exam stress. I cleared NEET on my first attempt and am now pursuing MBBS at AIIMS.",
      school: "AIIMS New Delhi",
      year: "2024"
    },
    {
      id: 8,
      name: "Trustee Mr. Vikram Aggarwal",
      role: "Delhi Public School Network",
      category: "schools",
      rating: 5,
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300",
      content: "EduGuide has been instrumental in connecting us with families who truly value quality education. Their screening process ensures that we receive applications from committed parents and motivated students. This partnership has significantly improved our admission process efficiency.",
      school: "Delhi Public School Network",
      year: "2024"
    }
  ];

  const filteredTestimonials = selectedCategory === 'all' 
    ? testimonials 
    : testimonials.filter(testimonial => testimonial.category === selectedCategory);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(filteredTestimonials.length / 3));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(filteredTestimonials.length / 3)) % Math.ceil(filteredTestimonials.length / 3));
  };

  const stats = [
    { number: "2500+", label: "Happy Families", icon: Heart },
    { number: "98%", label: "Success Rate", icon: Award },
    { number: "150+", label: "Partner Schools", icon: GraduationCap },
    { number: "1000+", label: "College Admissions", icon: Users }
  ];

  return (
    <div className="py-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-500 to-primary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Success Stories & Testimonials</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-green-100">
              Real stories from families and students whose educational dreams we helped turn into reality
            </p>
            <div className="flex items-center justify-center">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-8 w-8 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="ml-4 text-2xl font-semibold">4.9/5</span>
              <span className="ml-2 text-green-100">from 2500+ reviews</span>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-primary-500" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="flex flex-wrap gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setCurrentSlide(0);
                  }}
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
        </div>
      </section>

      {/* Featured Testimonial */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Success Story</h2>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 md:p-12 relative">
            <Quote className="h-12 w-12 text-primary-500 absolute top-6 left-6" />
            <div className="text-center">
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed italic">
                "The Spot Admission transformed our college admission journey from overwhelming to achievable. Their personalized approach, deep knowledge of admission processes, and unwavering support made all the difference. Today, I'm studying at my dream university, and I owe it to their expert guidance."
              </p>
              <div className="flex items-center justify-center">
                <img 
                  src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100" 
                  alt="Anita Desai"
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div className="text-left">
                  <h4 className="font-bold text-gray-900">Anita Desai</h4>
                  <p className="text-gray-600">MBA Student, IIM Ahmedabad</p>
                  <p className="text-blue-600 text-sm">Class of 2023</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600">
              Authentic reviews from families and students we've helped
            </p>
          </div>

          <div className="relative">
            {/* Carousel Container */}
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {Array.from({ length: Math.ceil(filteredTestimonials.length / 3) }).map((_, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {filteredTestimonials.slice(slideIndex * 3, slideIndex * 3 + 3).map((testimonial) => (
                        <div key={testimonial.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6">
                          <div className="flex mb-4">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                            ))}
                          </div>
                          <p className="text-gray-700 mb-6 italic leading-relaxed">"{testimonial.content}"</p>
                          <div className="flex items-center">
                            <img 
                              src={testimonial.image} 
                              alt={testimonial.name}
                              className="w-12 h-12 rounded-full mr-4"
                            />
                            <div>
                              <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                              <p className="text-gray-600 text-sm">{testimonial.role}</p>
                              <p className="text-blue-600 text-sm">{testimonial.school} • {testimonial.year}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            {Math.ceil(filteredTestimonials.length / 3) > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow duration-200"
                >
                  <ChevronLeft className="h-6 w-6 text-gray-600" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow duration-200"
                >
                  <ChevronRight className="h-6 w-6 text-gray-600" />
                </button>
              </>
            )}

            {/* Dots Indicator */}
            {Math.ceil(filteredTestimonials.length / 3) > 1 && (
              <div className="flex justify-center mt-8 space-x-2">
                {Array.from({ length: Math.ceil(filteredTestimonials.length / 3) }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                      currentSlide === index ? 'bg-primary-500' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Video Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Video Testimonials</h2>
            <p className="text-xl text-gray-600">
              Hear directly from our satisfied clients
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((index) => (
              <div key={index} className="bg-gray-100 rounded-xl aspect-video flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors duration-200">
                <div className="text-center">
                  <div className="bg-primary-500 rounded-full p-4 mb-4 inline-block">
                    <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <p className="text-gray-600 font-semibold">Video Testimonial {index}</p>
                  <p className="text-gray-500 text-sm">Coming Soon</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Write Your Success Story?</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Join thousands of satisfied families who found their perfect educational path with our expert guidance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white border-2 border-white hover:bg-transparent hover:text-white text-primary-500 px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200">
              Start Your Journey
            </button>
            <button className="bg-transparent border-2 border-white hover:bg-white hover:text-primary-500 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200">
              Book Free Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;