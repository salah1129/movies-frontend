import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home';
import CategoryPage from './components/CategoryPage';
import Login from './components/Login';
import Register from './components/Register';
import FavoriteMovies from './components/FavoriteMovies';
import MovieDetails from './components/movieDetails';
import MovieNotFound from './components/MovieNotFound';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/movies/:movieID" element={<MovieDetails />} />
          <Route path="/favorite-movies" element={<FavoriteMovies />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/movieNotFound" element={<MovieNotFound />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;