// FavoriteMovies.js
import React from 'react';
import '../styles/FavoriteMovies.css';

const FavoriteMovies = () => {
    const favorites = JSON.parse(localStorage.getItem('wishlist')) || [];

    return (
        <div className='fav'>
            <h2>YOUR FAVORITE MOVIES</h2>
            <div className='favorite-movies-list'>
                {favorites.map((movie, index) => (
                    <div className='favorite-movie' key={index}>
                        <img src={`/${movie.image}`} alt={movie.movieName} />
                        <h3>{movie.movieName}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FavoriteMovies;
