import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const MovieContext = createContext();

export const useMovies = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovies must be used within a MovieProvider');
  }
  return context;
};

export const MovieProvider = ({ children }) => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = '5d72a0ee3d073c888b3214a716ffb9e8'; // Your TMDB API Key
  const BASE_URL = 'https://api.themoviedb.org/3';

  const fetchMovies = async (endpoint) => {
    try {
      const response = await axios.get(`${BASE_URL}${endpoint}?api_key=${API_KEY}&language=en-US&page=1`);
      return response.data.results;
    } catch (err) {
      console.error('Error fetching movies:', err);
      setError('Failed to fetch movies');
      return [];
    }
  };

  const searchMovies = async (query) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=1&include_adult=false`
      );
      setLoading(false);
      return response.data.results;
    } catch (err) {
      console.error('Error searching movies:', err);
      setError('Failed to search movies');
      setLoading(false);
      return [];
    }
  };

  const getMovieDetails = async (movieId) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US&append_to_response=videos,credits,similar`
      );
      return response.data;
    } catch (err) {
      console.error('Error fetching movie details:', err);
      setError('Failed to fetch movie details');
      return null;
    }
  };

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      const [trending, popular, topRated] = await Promise.all([
        fetchMovies('/trending/movie/week'),
        fetchMovies('/movie/popular'),
        fetchMovies('/movie/top_rated')
      ]);
      
      setTrendingMovies(trending);
      setPopularMovies(popular);
      setTopRatedMovies(topRated);
      setLoading(false);
    };

    loadInitialData();
  }, []);

  const value = {
    trendingMovies,
    popularMovies,
    topRatedMovies,
    loading,
    error,
    searchMovies,
    getMovieDetails,
    setError
  };

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
}; 