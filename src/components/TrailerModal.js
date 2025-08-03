import React from 'react';
import { X, Play, Loader } from 'lucide-react';

const TrailerModal = ({ isOpen, onClose, trailer, loading }) => {
  if (!isOpen) return null;

  const getTrailerUrl = () => {
    if (!trailer || !trailer.key) return null;
    
    // Check if it's a YouTube video
    if (trailer.site === 'YouTube') {
      return `https://www.youtube.com/embed/${trailer.key}?autoplay=1&rel=0`;
    }
    
    // For other video sources, return the direct URL
    return trailer.url;
  };

  const trailerUrl = getTrailerUrl();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-4xl mx-4 bg-dark-800 rounded-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-dark-700">
          <h3 className="text-lg font-semibold text-white">
            {trailer?.name || 'Movie Trailer'}
          </h3>
          <button
            onClick={onClose}
            className="p-2 text-dark-400 hover:text-white hover:bg-dark-700 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Content */}
        <div className="relative">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <Loader className="h-8 w-8 animate-spin text-primary-500" />
            </div>
          ) : trailerUrl ? (
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                src={trailerUrl}
                title={trailer?.name || 'Movie Trailer'}
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 p-8 text-center">
              <Play className="h-16 w-16 text-dark-400 mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">No Trailer Available</h4>
              <p className="text-dark-300">
                Sorry, no trailer is available for this movie at the moment.
              </p>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t border-dark-700">
          <button
            onClick={onClose}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrailerModal; 