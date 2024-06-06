import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/home.css";
import "../styles/newMovies.css"
import { Link } from 'react-router-dom';

import 'aos/dist/aos.css'; 

const NewMovies = () => {
    const [movies, setMovies] = useState([]);
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


    return ( 
        <div className="newMovies">
                    <h3>Up Next</h3>
                    {movies.map(movie => (
                        <div>
                            <Link to={`/movies/${movie.id}`}>
                                <img src={movie.image} alt={movie.movieName} />
                            </Link>
                            <div className="description">
                                <h4>{movie.movieName} </h4>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias</p>
                            </div>
                        </div>
                    ))}
                </div>
    );
}

export default NewMovies;