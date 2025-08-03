import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMovies } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';
import TrailerModal from '../components/TrailerModal';
import { 
  Star, 
  Calendar, 
  Clock, 
  Play, 
  ArrowLeft, 
  Loader,
  Users,
  DollarSign,
  Globe
} from 'lucide-react';

const MovieDetail = () => {
  const { id } = useParams();
  const { getMovieDetails } = useMovies();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isTrailerModalOpen, setIsTrailerModalOpen] = useState(false);
  const [selectedTrailer, setSelectedTrailer] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      const movieData = await getMovieDetails(id);
      setMovie(movieData);
      setLoading(false);
    };

    fetchMovieDetails();
  }, [id, getMovieDetails]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="h-12 w-12 animate-spin text-primary-500" />
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="text-center py-12">
        <p className="text-dark-400 text-lg">Movie not found</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatRuntime = (minutes) => {
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatCurrency = (amount) => {
    if (!amount) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleTrailerClick = (trailer) => {
    setSelectedTrailer(trailer);
    setIsTrailerModalOpen(true);
  };

  const closeTrailerModal = () => {
    setIsTrailerModalOpen(false);
    setSelectedTrailer(null);
  };

  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 mb-4">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-dark-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-5  w-5" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Movie Hero Section */}
      <div className="relative">
        {/* Background Image */}
        <div className="absolute inset-0 h-96">
          <img
            src={
              movie.backdrop_path
                ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                : 'https://via.placeholder.com/1920x1080/1f2937/ffffff?text=No+Image'
            }
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/80 to-transparent" />
        </div>

        {/* Movie Info */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Poster */}
            <div className="flex-shrink-0">
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : 'https://via.placeholder.com/300x450/1f2937/ffffff?text=No+Image'
                }
                alt={movie.title}
                className="w-64 h-96 object-cover rounded-lg shadow-2xl"
              />
            </div>

            {/* Movie Details */}
            <div className="flex-1 space-y-6">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2">
                  {movie.title}
                </h1>
                {movie.tagline && (
                  <p className="text-xl text-primary-400 italic">"{movie.tagline}"</p>
                )}
              </div>

              {/* Rating and Meta */}
              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center space-x-1 bg-primary-600 text-white px-3 py-1 rounded-full">
                  <Star className="h-4 w-4 fill-current" />
                  <span>{movie.vote_average?.toFixed(1)}</span>
                </div>
                <div className="flex items-center space-x-1 text-dark-300">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(movie.release_date)}</span>
                </div>
                <div className="flex items-center space-x-1 text-dark-300">
                  <Clock className="h-4 w-4" />
                  <span>{formatRuntime(movie.runtime)}</span>
                </div>
                {movie.vote_count && (
                  <div className="flex items-center space-x-1 text-dark-300">
                    <Users className="h-4 w-4" />
                    <span>{movie.vote_count.toLocaleString()} votes</span>
                  </div>
                )}
              </div>

              {/* Genres */}
              {movie.genres && movie.genres.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="bg-dark-700 text-white px-3 py-1 rounded-full text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Overview */}
              {movie.overview && (
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Overview</h3>
                  <p className="text-dark-300 leading-relaxed">{movie.overview}</p>
                </div>
              )}

              {/* Additional Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {movie.budget && movie.budget > 0 && (
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-primary-500" />
                    <div>
                      <p className="text-sm text-dark-400">Budget</p>
                      <p className="text-white font-medium">{formatCurrency(movie.budget)}</p>
                    </div>
                  </div>
                )}
                
                {movie.revenue && movie.revenue > 0 && (
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-primary-500" />
                    <div>
                      <p className="text-sm text-dark-400">Revenue</p>
                      <p className="text-white font-medium">{formatCurrency(movie.revenue)}</p>
                    </div>
                  </div>
                )}

                {movie.original_language && (
                  <div className="flex items-center space-x-2">
                    <Globe className="h-5 w-5 text-primary-500" />
                    <div>
                      <p className="text-sm text-dark-400">Language</p>
                      <p className="text-white font-medium uppercase">{movie.original_language}</p>
                    </div>
                  </div>
                )}

                {movie.status && (
                  <div className="flex items-center space-x-2">
                    <Play className="h-5 w-5 text-primary-500" />
                    <div>
                      <p className="text-sm text-dark-400">Status</p>
                      <p className="text-white font-medium">{movie.status}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Watch Trailer Button */}
              {/* {movie.videos?.results?.length > 0 && (
                <div>
                  <button 
                    onClick={() => handleTrailerClick(movie.videos.results[0])}
                    className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
                  >
                    <Play className="h-5 w-5" />
                    <span>Watch Trailer</span>
                  </button>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>

      {/* Similar Movies */}
      {movie.similar?.results && movie.similar.results.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold text-white mb-8">Similar Movies</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {movie.similar.results.slice(0, 10).map((similarMovie) => (
              <MovieCard key={similarMovie.id} movie={similarMovie} />
            ))}
          </div>
        </div>
      )}

      {/* Trailer Modal */}
      <TrailerModal
        isOpen={isTrailerModalOpen}
        onClose={closeTrailerModal}
        trailer={selectedTrailer}
        loading={false}
      />
    </div>
  );
};

export default MovieDetail; 