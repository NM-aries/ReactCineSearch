import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search as SearchIcon, Menu, X, Film } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-900/95 backdrop-blur-md border-b border-dark-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Film className="h-8 w-8 text-primary-500" />
            <span className="text-xl font-bold text-white">CineSearch</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-dark-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/search" className="text-dark-300 hover:text-white transition-colors">
              Search
            </Link>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-dark-800 border border-dark-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-dark-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
              />
              <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-dark-400" />
            </div>
          </form>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-dark-400 hover:text-white hover:bg-dark-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-dark-700">
              <Link
                to="/"
                className="block px-3 py-2 text-dark-300 hover:text-white hover:bg-dark-800 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/search"
                className="block px-3 py-2 text-dark-300 hover:text-white hover:bg-dark-800 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Search
              </Link>
              <form onSubmit={handleSearch} className="px-3 py-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search movies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-dark-800 border border-dark-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-dark-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                  />
                  <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-dark-400" />
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 