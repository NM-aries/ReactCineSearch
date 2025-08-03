import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import SearchPage from './pages/Search';
import { MovieProvider } from './context/MovieContext';

function App() {
  return (
    <MovieProvider>
      <div className="min-h-screen bg-dark-900 flex flex-col">
        <Navbar />
        <main className="pt-16 flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </MovieProvider>
  );
}

export default App; 