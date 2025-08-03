# CineSearch - Movie Discovery Website

A modern, responsive movie discovery website built with React and powered by The Movie Database (TMDB) API. Discover trending movies, search for your favorites, and explore detailed movie information.

## 🎬 Features

- **Movie Discovery**: Browse trending, popular, and top-rated movies
- **Advanced Search**: Search for movies by title with real-time results
- **Detailed Movie Pages**: Comprehensive movie information including ratings, cast, budget, and more
- **Responsive Design**: Beautiful UI that works on desktop, tablet, and mobile
- **Modern UI/UX**: Dark theme with smooth animations and hover effects
- **Similar Movies**: Discover related movies based on your selections

## 🚀 Technologies Used

- **React 18** - Modern React with hooks and functional components
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **Lucide React** - Beautiful icons
- **TMDB API** - Movie database API

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd CineSearch
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application.

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.js       # Navigation bar
│   ├── MovieCard.js    # Individual movie card
│   └── MovieGrid.js    # Grid layout for movies
├── context/            # React context for state management
│   └── MovieContext.js # Movie data and API functions
├── pages/              # Page components
│   ├── Home.js         # Home page with featured movies
│   ├── Search.js       # Search functionality
│   └── MovieDetail.js  # Detailed movie information
├── App.js              # Main app component with routing
├── index.js            # React entry point
└── index.css           # Global styles and Tailwind imports
```

## 🎨 Features in Detail

### Home Page
- Hero section with welcome message
- Trending movies section
- Popular movies section
- Top-rated movies section
- Responsive grid layout

### Search Functionality
- Real-time search with TMDB API
- Search results with movie cards
- URL-based search state
- Loading states and error handling

### Movie Details
- Comprehensive movie information
- Movie poster and backdrop images
- Ratings, release date, runtime
- Genre tags
- Budget and revenue information
- Similar movies recommendations
- Responsive layout for all screen sizes

### Navigation
- Fixed navigation bar with backdrop blur
- Mobile-responsive hamburger menu
- Search bar in navigation
- Smooth transitions and hover effects

## 🎯 API Integration

The application uses The Movie Database (TMDB) API for movie data:

- **Base URL**: `https://api.themoviedb.org/3`
- **Endpoints Used**:
  - `/trending/movie/week` - Trending movies
  - `/movie/popular` - Popular movies
  - `/movie/top_rated` - Top-rated movies
  - `/search/movie` - Search movies
  - `/movie/{id}` - Movie details with additional data

## 🎨 Design System

### Colors
- **Primary**: Red theme (`#ef4444`)
- **Dark**: Dark theme with various shades
- **Text**: White and gray variations for readability

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

### Components
- **Cards**: Hover effects with scale and shadow
- **Buttons**: Primary and secondary variants
- **Inputs**: Dark theme with focus states
- **Loading**: Spinner animations

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🚀 Deployment

To build the application for production:

```bash
npm run build
```

The build files will be created in the `build/` directory, ready for deployment to any static hosting service like:
- Vercel
- Netlify
- GitHub Pages
- AWS S3

## 🔧 Customization

### Changing the API Key
Update the API key in `src/context/MovieContext.js`:
```javascript
const API_KEY = 'your-tmdb-api-key-here';
```

### Styling
Modify the Tailwind configuration in `tailwind.config.js` to customize:
- Colors
- Fonts
- Animations
- Spacing

### Adding New Features
The modular structure makes it easy to add new features:
- New pages in the `pages/` directory
- New components in the `components/` directory
- Additional API endpoints in the context

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the movie data API
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide React](https://lucide.dev/) for the beautiful icons
- [React](https://reactjs.org/) for the amazing frontend framework

---

Enjoy exploring movies with CineSearch! 🎬✨ 