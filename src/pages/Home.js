import React, { useState } from 'react';
import { useMovies } from '../context/MovieContext';
import MovieGrid from '../components/MovieGrid';
import AnimatedBanner from '../components/AnimatedBanner';
import { TrendingUp, Star, Flame, Grid, List } from 'lucide-react';

const Home = () => {
  const { trendingMovies, popularMovies, topRatedMovies, loading } = useMovies();
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // Combine trending and top rated movies for banner, prioritizing trending
  const bannerMovies = [...(trendingMovies || []), ...(topRatedMovies || [])]
    .filter((movie, index, self) => self.findIndex(m => m.id === movie.id) === index)
    .slice(0, 5);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Limit movies to top 10 for each section
  const trendingTop10 = trendingMovies?.slice(0, 10) || [];
  const popularTop10 = popularMovies?.slice(0, 10) || [];
  const topRatedTop10 = topRatedMovies?.slice(0, 10) || [];

  return (
    <div className="min-h-screen">
      {/* Animated Banner */}
      <AnimatedBanner movies={bannerMovies} />

      {/* Navigation Menu */}
      <div className="bg-dark-800 border-b border-dark-700 sticky top-16 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-8 py-4">
            <button
              onClick={() => scrollToSection('trending')}
              className="flex items-center space-x-2 text-dark-300 hover:text-primary-500 transition-colors duration-200 font-medium"
            >
              <TrendingUp className="h-5 w-5" />
              <span>Trending</span>
            </button>
            <button
              onClick={() => scrollToSection('popular')}
              className="flex items-center space-x-2 text-dark-300 hover:text-primary-500 transition-colors duration-200 font-medium"
            >
              <Flame className="h-5 w-5" />
              <span>Popular</span>
            </button>
            <button
              onClick={() => scrollToSection('top-rated')}
              className="flex items-center space-x-2 text-dark-300 hover:text-primary-500 transition-colors duration-200 font-medium"
            >
              <Star className="h-5 w-5" />
              <span>Top Rated</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Trending Movies */}
        <section id="trending">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-6 w-6 text-primary-500" />
              <h2 className="text-3xl font-bold text-white">Trending This Week</h2>
            </div>
            <div className="flex items-center space-x-2 bg-dark-800 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors duration-200 ${
                  viewMode === 'grid'
                    ? 'bg-primary-500 text-white'
                    : 'text-dark-300 hover:text-white'
                }`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors duration-200 ${
                  viewMode === 'list'
                    ? 'bg-primary-500 text-white'
                    : 'text-dark-300 hover:text-white'
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
          <MovieGrid movies={trendingTop10} loading={loading} viewMode={viewMode} />
        </section>

        {/* Popular Movies */}
        <section id="popular">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Flame className="h-6 w-6 text-primary-500" />
              <h2 className="text-3xl font-bold text-white">Popular Movies</h2>
            </div>
            <div className="flex items-center space-x-2 bg-dark-800 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors duration-200 ${
                  viewMode === 'grid'
                    ? 'bg-primary-500 text-white'
                    : 'text-dark-300 hover:text-white'
                }`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors duration-200 ${
                  viewMode === 'list'
                    ? 'bg-primary-500 text-white'
                    : 'text-dark-300 hover:text-white'
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
          <MovieGrid movies={popularTop10} loading={loading} viewMode={viewMode} />
        </section>

        {/* Top Rated Movies */}
        <section id="top-rated">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Star className="h-6 w-6 text-primary-500" />
              <h2 className="text-3xl font-bold text-white">Top Rated</h2>
            </div>
            <div className="flex items-center space-x-2 bg-dark-800 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors duration-200 ${
                  viewMode === 'grid'
                    ? 'bg-primary-500 text-white'
                    : 'text-dark-300 hover:text-white'
                }`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors duration-200 ${
                  viewMode === 'list'
                    ? 'bg-primary-500 text-white'
                    : 'text-dark-300 hover:text-white'
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
          <MovieGrid movies={topRatedTop10} loading={loading} viewMode={viewMode} />
        </section>
      </div>
    </div>
  );
};

export default Home; 