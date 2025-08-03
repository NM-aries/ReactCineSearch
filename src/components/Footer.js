import React from 'react';
import { Facebook, Github, Film, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-dark-800 border-t border-dark-700 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Film className="h-8 w-8 text-primary-500" />
              <span className="text-2xl font-bold text-white">CineSearch</span>
            </div>
            <p className="text-dark-300 max-w-md">
              Discover the latest movies, explore trending films, and find your next favorite. 
              Your ultimate movie discovery platform.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-dark-300 hover:text-primary-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/search" className="text-dark-300 hover:text-primary-400 transition-colors">
                  Search Movies
                </a>
              </li>
              <li>
                <a href="#trending" className="text-dark-300 hover:text-primary-400 transition-colors">
                  Trending
                </a>
              </li>
              <li>
                <a href="#popular" className="text-dark-300 hover:text-primary-400 transition-colors">
                  Popular
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media & Developer */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Connect With Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://web.facebook.com/aRhiExz"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-dark-300 hover:text-primary-400 transition-colors"
              >
                <Facebook className="h-5 w-5" />
                <span>aRies Yap</span>
              </a>
            </div>
            <div className="flex space-x-4">
              <a
                href="https://github.com/NM-aries"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-dark-300 hover:text-primary-400 transition-colors"
              >
                <Github className="h-5 w-5" />
                <span>NM-aries</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-dark-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-dark-400 text-sm">
              © 2024 CineSearch. All rights reserved.
            </p>
            <div className="flex items-center space-x-2 text-dark-400 text-sm">
              <span>Developed with</span>
              <Heart className="h-4 w-4 text-primary-500 fill-current" />
              <span>by</span>
              <span className="text-primary-400 font-medium">Akhel Yap</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 