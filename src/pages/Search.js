import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useMovies } from '../context/MovieContext';
import MovieGrid from '../components/MovieGrid';
import { Search as SearchIcon, Loader } from 'lucide-react';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const { searchMovies } = useMovies();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    const results = await searchMovies(searchQuery);
    setSearchResults(results);
    setSearchParams({ q: searchQuery });
    setIsSearching(false);
  };

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchQuery(query);
      handleSearchFromParams(query);
    }
  }, [searchParams]);

  const handleSearchFromParams = async (query) => {
    if (!query) return;
    
    setIsSearching(true);
    const results = await searchMovies(query);
    setSearchResults(results);
    setIsSearching(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Search Movies</h1>
        <p className="text-dark-300 text-lg">
          Find your favorite movies and discover new ones
        </p>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-dark-800 border border-dark-600 rounded-lg pl-12 pr-4 py-4 text-white placeholder-dark-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500 text-lg"
          />
          <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-dark-400" />
          <button
            type="submit"
            disabled={isSearching}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-md transition-colors duration-200 disabled:opacity-50"
          >
            {isSearching ? (
              <Loader className="h-5 w-5 animate-spin" />
            ) : (
              'Search'
            )}
          </button>
        </div>
      </form>

      {/* Search Results */}
      {searchQuery && (
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">
            Search Results for "{searchQuery}"
          </h2>
          <MovieGrid 
            movies={searchResults} 
            loading={isSearching}
            title={searchResults.length > 0 ? `${searchResults.length} movies found` : null}
          />
        </div>
      )}

      {/* Empty State */}
      {!searchQuery && !isSearching && (
        <div className="text-center py-12">
          <SearchIcon className="h-16 w-16 text-dark-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Start Searching</h3>
          <p className="text-dark-400">
            Enter a movie title to begin your search
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchPage; 