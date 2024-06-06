import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import 'aos/dist/aos.css';

const FiltredMovies = ({ filterCriteria }) => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get('http://localhost:8080/movies');
                setMovies(response.data);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };
        fetchMovies();
    }, []);

    const handleAddToWishlist = (movie) => {
        let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        
        const isAlreadyInWishlist = wishlist.some(item => item.id === movie.id);
        
        if (!isAlreadyInWishlist) {
            wishlist.push(movie);
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            alert('Movie added to wishlist successfully!');
        } else {
            alert('Movie already exists in wishlist');
        }
    };
    
    

    const filteredMovies = movies.filter(
        (movie) =>
            movie[filterCriteria] >= 8 || movie.categoryName === filterCriteria
    );

    return (
        <div className='filteredMovies'>
            {filteredMovies.map((movie) => (
                <Link to={`/movies/${movie.id}`}>

                <div className='card' key={movie.id} data-aos='fade-up'>
                    <div className='image'>
                        <img src={`/${movie.image}`} alt={movie.movieName} width={"100%"} height={'100%'} />
                    </div>
                    <div className='description'>
                        <div>
                            <h4>{movie.movieName}</h4>
                            <p>{movie[filterCriteria]}</p>
                        </div>
                        <button onClick={() => handleAddToWishlist(movie)}>
                            + Wish list
                        </button>
                        <a
                            href={movie.trailerUrl}
                            target='_blank'
                            rel='noopener noreferrer'>
                            <h4 className='trailer'>
                                <FontAwesomeIcon icon={faPlay} /> Trailer
                            </h4>
                        </a>
                    </div>
                </div>
                </Link>
            ))}
        </div>
    );
};

export default FiltredMovies;