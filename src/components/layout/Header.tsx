import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, User, LogOut } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { useCartStore } from '../../stores/cartStore';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  
  const navigate = useNavigate();
  const { user, isAuthenticated, isAdmin, logout } = useAuthStore();
  const { totalItems } = useCartStore();

  // Change header style on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [navigate]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setUserMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold flex items-center">
            <span className={`transition-colors duration-300 ${isScrolled ? 'text-primary-600' : 'text-primary-500'}`}>Modern</span>
            <span className={`transition-colors duration-300 ${isScrolled ? 'text-gray-800' : 'text-gray-700'}`}>Shop</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-sm font-medium hover:text-primary-600 transition-colors ${
                isScrolled ? 'text-gray-800' : 'text-gray-700'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className={`text-sm font-medium hover:text-primary-600 transition-colors ${
                isScrolled ? 'text-gray-800' : 'text-gray-700'
              }`}
            >
              Products
            </Link>
            {isAdmin && (
              <Link 
                to="/admin" 
                className={`text-sm font-medium hover:text-primary-600 transition-colors ${
                  isScrolled ? 'text-gray-800' : 'text-gray-700'
                }`}
              >
                Admin
              </Link>
            )}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="pl-8 pr-4 py-1 rounded-full text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-[180px] md:w-[220px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-2.5 top-1.5 h-4 w-4 text-gray-400" />
            </form>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon */}
            <Link to="/cart" className="relative">
              <ShoppingCart className={`h-6 w-6 ${isScrolled ? 'text-gray-800' : 'text-gray-700'}`} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold">
                  {totalItems}
                </span>
              )}
            </Link>
            
            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button 
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-1"
                >
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                    <User className="h-4 w-4 text-primary-700" />
                  </div>
                </button>
                
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 animate-fade-in">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                      <p className="font-medium">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <Link 
                      to="/dashboard" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link 
                      to="/dashboard/orders" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      My Orders
                    </Link>
                    <Link 
                      to="/dashboard/profile" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Profile Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                    >
                      <LogOut className="h-4 w-4 mr-2" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link 
                to="/login" 
                className="btn btn-primary py-1.5 px-4 text-xs"
              >
                Sign In
              </Link>
            )}
            
            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-800" />
              ) : (
                <Menu className={`h-6 w-6 ${isScrolled ? 'text-gray-800' : 'text-gray-700'}`} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg mt-2 animate-slide-up">
          <div className="px-4 py-5 space-y-4">
            <form onSubmit={handleSearch} className="relative mb-4">
              <input
                type="text"
                placeholder="Search products..."
                className="pl-8 pr-4 py-2 rounded-md text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            </form>
            
            <Link to="/" className="block py-2 text-gray-800 font-medium">Home</Link>
            <Link to="/products" className="block py-2 text-gray-800 font-medium">Products</Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="block py-2 text-gray-800 font-medium">Dashboard</Link>
                <Link to="/dashboard/orders" className="block py-2 text-gray-800 font-medium">My Orders</Link>
                {isAdmin && (
                  <Link to="/admin" className="block py-2 text-gray-800 font-medium">Admin Panel</Link>
                )}
                <button
                  onClick={handleLogout}
                  className="block w-full text-left py-2 text-red-600 font-medium flex items-center"
                >
                  <LogOut className="h-4 w-4 mr-2" /> Sign Out
                </button>
              </>
            ) : (
              <div className="pt-2 flex space-x-4">
                <Link to="/login" className="btn btn-primary flex-1">Sign In</Link>
                <Link to="/register" className="btn btn-outline flex-1">Register</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;