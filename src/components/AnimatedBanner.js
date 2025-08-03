import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

const AnimatedBanner = ({ movies }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Get top 5 movies for carousel (trending or highest rated)
  const bannerMovies = movies?.slice(0, 5) || [];

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (bannerMovies.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerMovies.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [bannerMovies.length]);





  if (bannerMovies.length === 0) {
    return (
      <section className="relative h-96 bg-gradient-to-r from-dark-800 to-dark-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-transparent"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold text-white animate-pulse">
              Welcome to <span className="text-primary-500">CineSearch</span>
            </h1>
            <p className="text-xl text-dark-300 max-w-2xl mx-auto">
              Discover the latest movies, explore trending films, and find your next favorite
            </p>
          </div>
        </div>
      </section>
    );
  }

  const currentMovie = bannerMovies[currentSlide];

  return (
    <section className="relative h-28rem overflow-hidden">
      {/* Background Carousel */}
      <div className="absolute inset-0">
        {bannerMovies.map((movie, index) => (
          <div
            key={movie.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
            }`}
          >
                         <img
               src={
                 movie.backdrop_path
                   ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                   : 'https://via.placeholder.com/1920x1080/282828/ffffff?text=No+Image'
               }
               alt={movie.title}
               className="w-full h-full object-cover"
               style={{
                 transform: `translateY(${scrollY * 0.5}px)`,
                 transition: 'transform 0.1s ease-out'
               }}
             />
            <div className="absolute inset-0 bg-gradient-to-r from-dark-900/90 via-dark-900/70 to-dark-900/50" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center h-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-4xl">
            {/* Text Content */}
            <div className="space-y-6 text-white">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight animate-fade-in">
                  {currentMovie.title}
                </h1>
                <p className="text-lg md:text-xl text-dark-200 max-w-2xl line-clamp-3 animate-fade-in-delay">
                  {currentMovie.overview}
                </p>
              </div>

              {/* Rating and Year */}
              <div className="flex items-center space-x-4 animate-fade-in-delay-2">
                <div className="flex items-center space-x-1 bg-primary-500 text-white px-3 py-1 rounded-full">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="font-semibold">{currentMovie.vote_average?.toFixed(1)}</span>
                </div>
                <span className="text-dark-200 font-medium">
                  {new Date(currentMovie.release_date).getFullYear()}
                </span>
              </div>

              {/* CTA Button */}
              <div className="animate-fade-in-delay-3">
                <Link
                  to={`/movie/${currentMovie.id}`}
                  className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 inline-flex items-center justify-center space-x-2 group"
                >
                  <span>Watch Now</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      

      {/* Animated Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-transparent to-transparent animate-pulse" />
    </section>
  );
};

export default AnimatedBanner; 