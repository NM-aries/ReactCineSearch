const API_KEY = '5d72a0ee3d073c888b3214a716ffb9e8'; // Replace with your TMDB API key
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';
const IMAGE_BASE_URL500 = 'https://image.tmdb.org/t/p/w500';
const YOUTUBE_BASE_URL = 'https://www.youtube.com/watch?v=';



// DOM Elements
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const carouselPopular = document.getElementById('CarouselPopular');
const movieResults = document.getElementById('movie-results');
const TrendingResult = document.getElementById('trending-results');
const genreList = document.getElementById('genre-list');

// Load Most Popular Movies on Page Load
document.addEventListener('DOMContentLoaded', () => {
  fetchMostPopularMovies();
  fetchTrendingMovies();
  fetchGenres();
});

// Event Listener for Search
searchBtn.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (query) {
    searchMovies(query);
  }
});

// Fetch Most Popular Movies
async function fetchMostPopularMovies() {
  try {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
    const data = await response.json();
    displayMovies(data.results);
  } catch (error) {
    console.error('Error fetching popular movies:', error);
  }
}

// Display Movies
function displayMovies(movies) {
    carouselPopular.innerHTML = ''; // Clear previous results
  if (movies.length === 0) {
    carouselPopular.innerHTML = '<p class="text-center">No results found.</p>';
    return;
  }
  let isFirst = true;
  movies.forEach((movie) => {
    const { id,title, overview,backdrop_path, poster_path, release_date } = movie;

    const backdropUrl = backdrop_path
    ? `${IMAGE_BASE_URL}original${backdrop_path}`
    : 'https://via.placeholder.com/1280x720?text=No+Image'; // Placeholder for landscape images
  // Placeholder for landscape images
  
    // Add 'active' class only to the first item dynamically
    const movieCard = `
        <div class="carousel-item  w-100  ${isFirst ? 'active' : ''}">
            <div class="row align-items-center ps-4">
        
                <div class="col-6 col-md-4 text-white h-100 ps-5">
					<h1 class="fw-bold" id="movieTittle">${title}</h1>
					<p>${overview}</p>
					<button class="btn button-primary rounded-0 p-3 px-4 btn-trailer text-white" data-id="${id}" onclick="displayTrailer('${id}')"><i class="fa-solid fa-video me-2"></i> Watch Trailer</button>
                </div>
                <div class="col-8" style="height: 800px;
                        -webkit-mask-image: linear-gradient(to left, rgba(1,1,1,1) 0%, rgba(255,255,255,0.5) 20%, rgba(0,0,0,0) 100%); 
                    background-image: url(${backdropUrl});
                    background-position: center; 
                    background-size: cover;">
				

                </div>
            </div>
        </div>
      `;
  
    carouselPopular.innerHTML += movieCard;
    isFirst = false; // Set flag to false after the first item
  });

   // Attach event listeners to trailer buttons
  document.querySelectorAll('.btn-trailer').forEach((button) => {
    button.addEventListener('click', (e) => {
      const movieId = e.target.getAttribute('data-id');
      openTrailerInNewTab(movieId);
    });
  });
}

// Fetch Movies by Search Query
async function searchMovies(query) {
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=1&include_adult=false`
    );
    const data = await response.json();
    SearchResult(data.results);
  } catch (error) {
    console.error('Error searching movies:', error);
  }
}

// Display Movies
function SearchResult(movies) {
    movieResults.innerHTML = ''; // Clear previous results
    if (movies.length === 0) {
      carouselPopular.innerHTML = '<p class="text-center">No results found.</p>';
      return;
    }
    let isFirst = true;
    movies.forEach((movie) => {
      console.table(movie)
      const { title, overview,backdrop_path, poster_path, release_date } = movie;
  
      const backdropUrl = backdrop_path
      ? `${IMAGE_BASE_URL}original${backdrop_path}`
      : 'https://via.placeholder.com/1280x720?text=No+Image'; // Placeholder for landscape images
    // Placeholder for landscape images
    
      // Add 'active' class only to the first item dynamically
      const movieCard = `
        <div class="col-md-4 col-sm-6 movie-card">
         <div class="card">
           <img src="" class="card-img-top movie-poster" alt="">
           <div class="card-body">
             <h5 class="card-title movie-title"></h5>
             <p class="card-text"><strong>Release Date:</strong> ${
               release_date || 'N/A'
             }</p>
             <p class="card-text movie-overview">${overview || 'No description available.'}</p>
           </div>
         </div>
       </div>
        `;
    
        movieResults.innerHTML += movieCard;
      isFirst = false; // Set flag to false after the first item
    });
}

async function fetchTrendingMovies() {
    try {
      const response = await fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`);
      const data = await response.json();
      displayTrendingMovies(data.results);
      console.table(data.results);
    } catch (error) {
      console.error('Error fetching trending movies:', error);
    }
}

function displayTrendingMovies(movies) {
    TrendingResult.innerHTML = ''; // Clear previous results
    if (movies.length === 0) {
        TrendingResult.innerHTML = '<p class="text-center">No results found.</p>';
      return;
    }
 // Create Owl Carousel items
 movies.forEach((movie) => {
    const { title, poster_path } = movie;
    const posterUrl = poster_path
      ? `${IMAGE_BASE_URL500}${poster_path}`
      : 'https://via.placeholder.com/500x750?text=No+Image'; // Fallback for missing images

    const movieCard = `
      <div class="item mx-3 trending-poster" >
        <div class="card border-0">
          <img src="${posterUrl}" class="card-img-top rounded-0 movie-poster" alt="${title}">
        </div>
      </div>
    `;
    TrendingResult.innerHTML += movieCard;
  });

  // Initialize Owl Carousel after adding movie cards
  $('#trending-results').owlCarousel({
    loop: true, // Infinite loop
    margin: 10, // Space between items
    nav: false,
	autoplay:true,
	animateOut: 'fadeOut',
    autoplayTimeout:5000,// Show navigation buttons
    responsive: {
      0: { items: 1.8 }, // 1 item on mobile
      500: { items: 3.5 }, // 2 items on tablets
      900: { items: 4.5 }, // 2 items on tablets
      1000: { items: 5.5} // 4 items on desktop
    }
  });
}

// Fetch All Genres
async function fetchGenres() {
    try {
      const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`);
      const data = await response.json();
      displayGenres(data.genres.slice(0,10));
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
}
  
  // Display Genres
function displayGenres(genres) {
    genreList.innerHTML = ''; // Clear previous results
  
    if (genres.length === 0) {
      genreList.innerHTML = '<p class="text-center">No genres found.</p>';
      return;
    }
  
    genres.forEach((genre) => {
      const genreItem = `
		<div class="col-3 mb-3">
				<button class="btn btn-outline-warning w-100 py-4 rounded-0 fw-semibold" href="#">${genre.name}</button>
		</div>
      `;
      genreList.innerHTML += genreItem;
    });
}

const trailerContainer = document.getElementById('trailer-container');

// Open Trailer in a New Tab
async function openTrailerInNewTab(movieId) {
	try {
	  const response = await fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`);
	  const data = await response.json();
	  const trailer = data.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
  
	  if (trailer) {
		const trailerUrl = `${YOUTUBE_BASE_URL}${trailer.key}`;
		window.open(trailerUrl, '_blank');
	  } else {
		alert('No trailer available for this movie.');
	  }
	} catch (error) {
	  console.error('Error fetching movie trailer:', error);
	}
}