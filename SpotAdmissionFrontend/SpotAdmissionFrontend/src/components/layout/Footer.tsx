import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube, ArrowRight } from 'lucide-react';
import Logo from '../layout/The Spot Admission_Logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0f172a] text-white overflow-hidden">
      {/* Decorative Top Border (Matching Header Indigo) */}
      <div className="h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Identity */}
          <div className="space-y-6">
            <Link to="/" className="inline-block transition-transform hover:scale-105">
              <div className="bg-white p-2 rounded-2xl shadow-xl shadow-black/20">
                <img src={Logo} alt="The Spot Admission" className="h-16 w-auto object-contain" />
              </div>
            </Link>
            <p className="text-indigo-100/60 text-sm leading-relaxed font-medium">
              Transforming education through expert guidance. We empower students to find their true identity and the right spot in their academic journey.
            </p>
            <div className="flex space-x-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, idx) => (
                <a 
                  key={idx} 
                  href="#" 
                  className="bg-indigo-800/40 p-2.5 rounded-xl text-indigo-300 hover:bg-indigo-600 hover:text-white transition-all duration-300 border border-indigo-700/50"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white flex items-center gap-2">
              <span className="w-1.5 h-6 bg-indigo-500 rounded-full"></span>
              Explore
            </h4>
            <ul className="space-y-3">
              {['About Us', 'Counselling Services', 'Admission Process', 'Our Content', 'Success Stories'].map((link) => (
                <li key={link}>
                  <Link 
                    to={`/${link.toLowerCase().replace(/\s+/g, '-')}`} 
                    className="text-indigo-100/60 hover:text-indigo-400 text-[15px] transition-colors flex items-center group"
                  >
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Specialty Services */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white flex items-center gap-2">
              <span className="w-1.5 h-6 bg-indigo-500 rounded-full"></span>
              Our Expertise
            </h4>
            <ul className="space-y-3">
              {['Pre-Primary Counselling', 'College Admission Support', 'Career Guidance', 'Stream Selection', 'Entrance Preparation'].map((service) => (
                <li key={service} className="text-indigo-100/60 text-[15px] hover:text-white transition-colors cursor-default">
                  • {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white flex items-center gap-2">
              <span className="w-1.5 h-6 bg-indigo-500 rounded-full"></span>
              Get In Touch
            </h4>
            <div className="space-y-4">
              <a href="tel:+918780596840" className="flex items-start group">
                <div className="bg-indigo-800/40 p-2 rounded-lg mr-3 group-hover:bg-indigo-600 transition-colors">
                  <Phone className="h-4 w-4 text-indigo-300 group-hover:text-white" />
                </div>
                <span className="text-indigo-100/60 group-hover:text-white transition-colors text-sm font-medium mt-1">+91 87805 96840</span>
              </a>
              <a href="mailto:info@thespotadmission.co.in" className="flex items-start group">
                <div className="bg-indigo-800/40 p-2 rounded-lg mr-3 group-hover:bg-indigo-600 transition-colors">
                  <Mail className="h-4 w-4 text-indigo-300 group-hover:text-white" />
                </div>
                <span className="text-indigo-100/60 group-hover:text-white transition-colors text-sm font-medium mt-1">info@thespotadmission.co.in</span>
              </a>
              <div className="flex items-start">
                <div className="bg-indigo-800/40 p-2 rounded-lg mr-3">
                  <MapPin className="h-4 w-4 text-indigo-300" />
                </div>
                <span className="text-indigo-100/60 text-sm leading-relaxed font-medium">
                  Shalin Complex, 905, Sector 11,<br /> Gandhinagar, Gujarat 382011
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-indigo-900/50 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-indigo-100/40 text-xs font-medium tracking-wide">
              © {currentYear} TheSpotAdmission. All rights reserved.
            </p>
            <div className="flex space-x-6 text-[11px] font-bold uppercase tracking-widest text-indigo-100/30">
              <Link to="/privacy" className="hover:text-indigo-400 transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-indigo-400 transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;