import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, Mail, LogIn, GraduationCap, LayoutDashboard, LogOut } from 'lucide-react';
import Logo from '../layout/The Spot Admission_Logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Check login status
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [location]); // Re-check on route change

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate('/login');
    setIsMenuOpen(false);
  };

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Counselling', href: '/counselling' },
    { name: 'Admissions', href: '/admissions' },
    { name: 'Our Content', href: '/content' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <div className="sticky top-0 z-[100] w-full shadow-lg">
        {/* 1. TOP BAR */}
        <div className="bg-indigo-600 text-indigo-100 py-2.5 border-b border-indigo-500/30">
          <div className="w-full px-6 lg:px-12">
            <div className="flex justify-between items-center text-[11px] md:text-xs font-medium tracking-wide">
              <div className="flex items-center space-x-5">
                <a href="tel:+918780596840" className="flex items-center space-x-1.5 hover:text-white transition-colors">
                  <Phone className="h-3.5 w-3.5 text-indigo-100" />
                  <span>+91 8780596840</span>
                </a>
                <a href="mailto:info@thespotadmission.co.in" className="hidden sm:flex items-center space-x-1.5 hover:text-white transition-colors">
                  <Mail className="h-3.5 w-3.5 text-indigo-100" />
                  <span>info@thespotadmission.co.in</span>
                </a>
              </div>
              
              <div className="flex items-center space-x-6">
                <span className="hidden md:block italic text-indigo-100/90">🎓 ज्ञाननिर्धूतकल्मषा:</span>
                
                {/* Auth Button Logic (Top Bar)
                {!isLoggedIn ? (
                  <Link 
                    to="/login" 
                    className="flex items-center space-x-1.5 bg-white/15 px-3 py-1 rounded-full hover:bg-white hover:text-indigo-700 transition-all duration-300 border border-white/20"
                  >
                    <LogIn className="h-3 w-3" />
                    <span>Login</span>
                  </Link>
                ) : (
                  <button 
                    onClick={handleLogout}
                    className="flex items-center space-x-1.5 bg-red-500/20 px-3 py-1 rounded-full hover:bg-red-500 hover:text-white transition-all duration-300 border border-red-500/30"
                  >
                    <LogOut className="h-3 w-3" />
                    <span>Logout</span>
                  </button>
                )} */}
                {/* Auth Button Logic (Top Bar) */}
                {!isLoggedIn ? (
                  <Link 
                    to="/login" 
                    className="flex items-center space-x-1.5 bg-white/15 px-3 py-1 rounded-full hover:bg-white hover:text-indigo-700 transition-all duration-300 border border-white/20 text-xs font-bold"
                  >
                    <LogIn className="h-3 w-3" />
                    <span>Login</span>
                  </Link>
                ) : (
                  <div className="flex items-center gap-2">
                    {/* Dashboard Button */}
                    <Link 
                      to="/dashboard" 
                      className="flex items-center space-x-1.5 bg-indigo-500 px-3 py-1 rounded-full hover:bg-indigo-600 text-white transition-all duration-300 border border-indigo-400 text-xs font-bold shadow-sm"
                    >
                      <LayoutDashboard className="h-3 w-3" />
                      <span>Dashboard</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 2. MAIN NAVIGATION */}
        <header className="bg-white/95 backdrop-blur-md w-full">
          <div className="w-full px-6 lg:px-12">
            <div className="flex justify-between items-center py-2 md:py-3">
              <Link to="/" className="flex-shrink-0 transition-transform hover:scale-105">
                <img src={Logo} alt="Logo" className="h-14 md:h-16 w-auto object-contain" />
              </Link>

              <nav className="hidden lg:flex items-center space-x-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${
                      isActive(item.href)
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                        : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              <div className="hidden lg:flex items-center gap-3">
                {/* {isLoggedIn && (
                  <Link
                    to="/dashboard"
                    className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${
                      isActive('/dashboard') 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                    }`}
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Link>
                )} */}
                <Link
                  to="/contact"
                  className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center gap-2"
                >
                  <GraduationCap className="h-4 w-4" />
                  Apply Now
                </Link>
              </div>

              <button
                className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </header>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[110] lg:hidden animate-in fade-in duration-300">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>
          <div className="fixed right-0 top-0 h-full w-[280px] bg-white shadow-2xl p-6 space-y-4 animate-in slide-in-from-right duration-300">
             <div className="flex justify-between items-center mb-8 border-b pb-4">
                <img src={Logo} className="h-10 object-contain" alt="Logo" />
                <button onClick={() => setIsMenuOpen(false)} className="p-1.5 bg-gray-100 rounded-full text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all">
                  <X className="h-5 w-5" />
                </button>
             </div>
             {navigation.map((item) => (
               <Link
                 key={item.name}
                 to={item.href}
                 className={`block px-4 py-3 rounded-xl font-bold transition-colors ${
                   isActive(item.href) ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-700 bg-gray-50 hover:bg-indigo-50 hover:text-indigo-600'
                 }`}
                 onClick={() => setIsMenuOpen(false)}
               >
                 {item.name}
               </Link>
             ))}
             
             {isLoggedIn && (
               <Link
                 to="/dashboard"
                 className={`block px-4 py-3 rounded-xl font-bold transition-colors mt-2 ${
                   isActive('/dashboard') ? 'bg-indigo-600 text-white' : 'bg-emerald-50 text-emerald-600'
                 }`}
                 onClick={() => setIsMenuOpen(false)}
               >
                 Dashboard
               </Link>
             )}

             <div className="pt-6 border-t mt-6">
                {!isLoggedIn ? (
                  <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block w-full text-center bg-gray-100 text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 py-3.5 rounded-xl font-bold transition-colors">Login</Link>
                ) : (
                  <button onClick={handleLogout} className="block w-full text-center bg-red-50 text-red-600 hover:bg-red-100 py-3.5 rounded-xl font-bold transition-colors">Logout</button>
                )}
             </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;