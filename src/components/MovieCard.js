import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Calendar, Clock } from 'lucide-react';

const MovieCard = ({ movie }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).getFullYear();
  };

  const formatRating = (rating) => {
    return rating ? rating.toFixed(1) : 'N/A';
  };

  return (
    <Link to={`/movie/${movie.id}`} className="group">
      <div className="movie-card h-full flex flex-col">
        <div className="relative overflow-hidden">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : 'https://via.placeholder.com/300x450/1f2937/ffffff?text=No+Image'
            }
            alt={movie.title}
            className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Rating Badge */}
          <div className="absolute top-2 right-2 bg-primary-600 text-white px-2 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
            <Star className="h-3 w-3 fill-current" />
            <span>{formatRating(movie.vote_average)}</span>
          </div>
        </div>
        
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-semibold text-base text-white group-hover:text-primary-400 transition-colors duration-200 mb-2 min-h-[3rem] line-clamp-2">
            {movie.title}
          </h3>
          
          <div className="flex items-center justify-between text-xs text-dark-400 mb-3">
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(movie.release_date)}</span>
            </div>
            
            {movie.vote_count && (
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{movie.vote_count.toLocaleString()}</span>
              </div>
            )}
          </div>
          
          {movie.overview && (
            <p className="text-xs text-dark-300 line-clamp-3 flex-1 leading-relaxed">
              {movie.overview.length > 120 ? `${movie.overview.substring(0, 120)}...` : movie.overview}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default MovieCard; 