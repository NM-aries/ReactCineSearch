import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Calendar, Clock } from 'lucide-react';

const MovieListItem = ({ movie }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Link to={`/movie/${movie.id}`} className="group">
      <div className="bg-dark-800 rounded-lg overflow-hidden hover:bg-dark-700 transition-all duration-300 hover:scale-[1.02]">
        <div className="flex items-center space-x-4 p-4">
          {/* Movie Poster */}
          <div className="flex-shrink-0">
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                  : 'https://via.placeholder.com/150x225/282828/ffffff?text=No+Image'
              }
              alt={movie.title}
              className="w-20 h-30 object-cover rounded-lg shadow-md"
            />
          </div>

          {/* Movie Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white group-hover:text-primary-400 transition-colors duration-200 truncate">
                  {movie.title}
                </h3>
                {movie.overview && (
                  <p className="text-sm text-dark-300 mt-2 line-clamp-2">
                    {movie.overview}
                  </p>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-1 bg-primary-500 text-white px-2 py-1 rounded-full ml-4">
                <Star className="h-3 w-3 fill-current" />
                <span className="text-xs font-semibold">{movie.vote_average?.toFixed(1)}</span>
              </div>
            </div>

            {/* Meta Info */}
            <div className="flex items-center space-x-4 mt-3 text-xs text-dark-400">
              <div className="flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span>{formatDate(movie.release_date)}</span>
              </div>
              {movie.vote_count && (
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{movie.vote_count.toLocaleString()} votes</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieListItem; 