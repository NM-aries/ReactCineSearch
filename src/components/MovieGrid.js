import React from 'react';
import MovieCard from './MovieCard';
import MovieListItem from './MovieListItem';
import { Loader } from 'lucide-react';

const MovieGrid = ({ movies, loading, title, viewMode = 'grid' }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader className="h-8 w-8 animate-spin text-primary-500" />
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-dark-400 text-lg">No movies found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {title && (
        <h2 className="text-2xl font-bold text-white">{title}</h2>
      )}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <div key={movie.id} className="h-full">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {movies.map((movie) => (
            <MovieListItem key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieGrid; 