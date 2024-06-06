import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/home.css";
import "../styles/movieSlider.css"
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import 'aos/dist/aos.css'; 


const MoviesSlider = () => {
    const [movies, setMovies] = useState([]);
    const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get('http://localhost:8080/movies');
                console.log('Fetched movies:', response.data);
                setMovies(response.data);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!isPaused) {
                setCurrentMovieIndex((prevIndex) => (prevIndex + 1) % movies.length);
            }
        }, 3000);

        return () => clearTimeout(timer);
    }, [currentMovieIndex, isPaused, movies]);

    

        
    return ( 
        <Link to={movies.length > 0 && movies[currentMovieIndex] ? `/movies/${movies[currentMovieIndex].id}` : '#'}>
                    <div className="slider"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                        style={{
                            backgroundImage: movies.length > 0 && movies[currentMovieIndex] ? `url(${movies[currentMovieIndex].cover})` : '',
                            backgroundSize: 'cover'
                        }}>
                        {movies[currentMovieIndex] && (
                            <div className='description'>
                                <img src={movies[currentMovieIndex].image} alt="" />
                                <div className='desc'>
                                <div className='playIcon'>
                                    <FontAwesomeIcon icon={faPlay} className='icon'/>
                                </div>
                                <div className='title'>
                                    <h3> {movies[currentMovieIndex].movieName} - {movies[currentMovieIndex].durationMinutes} min </h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias eligendi </p>
                                </div>
                                </div>
                                
                            </div>
                        )}
                    </div>
                </Link>
    );
}

export default MoviesSlider;