import React, { useState } from 'react';
import "../styles/header.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faUserPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 

const Header = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { value } = event.target;
        setSearchQuery(value);
        if (value.trim() === '') {
            setSearchResults([]); 
        } else {
            fetchMovies(value);
        }
    };

    const fetchMovies = async (movieName) => {
        try {
            const response = await axios.get(`http://localhost:8080/searchForMovies/${movieName}`);
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error searching for the movie:', error);
        }
    };

    const handleMovieClick = (movieId) => {
        navigate(`/movies/${movieId}`);
        setSearchResults([]);
    };

    return (
        <div className="header">
            <a className="logo" href="/">MOVIES</a>
            <form className="searchForm">
            <div className='inp'>
            <input
                    className="search"
                    type="text"
                    placeholder="Search your movie here"
                    value={searchQuery}
                    onChange={handleInputChange}
            />
            <div className='searchIcon'>
            <FontAwesomeIcon icon={faSearch}  />
            </div>
            </div>
                
                {searchResults.length > 0 && (
                    <div className="searchResults">
                        {searchResults.map(movie => (
                            <div key={movie.id} className="searchResult" onClick={() => handleMovieClick(movie.id)}>
                                <img src={`/${movie.image}`} alt={movie.image}/>
                                <div>
                                    <h3>{movie.movieName}</h3>
                                    <p>{movie.releaseDate}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </form>
            <div>
                <a href="/favorite-movies">
                    <FontAwesomeIcon icon={faHeart} />
                </a>
                <a href="/login" className='login'>
                    <FontAwesomeIcon icon={faUserPlus} />
                </a>
            </div>
        </div>
    );
}

export default Header;
