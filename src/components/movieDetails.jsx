import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/movieDetails.css";
import Reviews from "./Reviews";
import FiltredMovies from "./FiltredMovies";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const MovieDetails = ({ movies, filterCriteria }) => {
    const { movieID } = useParams();
    const [movieItem, setMovieItem] = useState(null);
    const [similarMovies, setSimilarMovies] = useState([]);
    const [reviews, setReviews] = useState(null);

    useEffect(() => {
        const getMovieItem = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/movies/${movieID}`);
                console.log('Fetched movie:', response.data);
                setMovieItem(response.data);
            } catch (error) {
                console.error('Error fetching movie:', error);
            }
        };
        getMovieItem();
    }, [movieID]);

    useEffect(() => {
        const getSimilarMovies = async () => {
            try {
                if (movieItem) {
                    const response = await axios.get(`http://localhost:8080/movies`);
                    console.log('Fetched similar movies:', response.data);
                    setSimilarMovies(response.data.filter(movie => movie.id !== movieID));
                }
            } catch (error) {
                console.error('Error fetching similar movies:', error);
            }
        };
        getSimilarMovies();
    }, [movieItem, movieID]);

    useEffect(() => {
        const getReviews = async () => {
            try{
                const response = await axios.get("http://localhost:8080/reviews");
                console.log("fetched reviews : " + response.data)
                setReviews(response.data)
            } catch (e){
                console.error('Error fetching movie:', e);
            }
        }
        getReviews()
    }, [])

    const getVideoId = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        if (match && match[2].length === 11) {
            return match[2];
        } else {
            console.error("Invalid YouTube URL:", url);
            return null;
        }
    };

    const handleAddToWishlist = (movie) => {
        let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        
        const isAlreadyInWishlist = wishlist.some(item => item.id === movie.id);
        
        if (!isAlreadyInWishlist) {
            wishlist.push(movie);
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
        } else {
            console.log('Movie already exists in wishlist');
        }
    };
    

    return ( 
        <div className="movieDetails">
            {movieItem && (
                <>
                    <div className="movieInfo">
                        <div className="header">
                            <div >
                                <p className="movieName"> {movieItem.movieName} </p>
                            </div>
                        </div>
                        <div className="trailer">
                            <div className="left">
                                {movieItem.trailerUrl && (
                                    <iframe
                                        src={`https://www.youtube.com/embed/${getVideoId(movieItem.trailerUrl)}`}
                                        title="YouTube video player"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                )}
                            </div>
                            <div className="right">
                                <img src={`/${movieItem.image}`} alt={movieItem.movieName} />
                                <div className="heartIcon">
                                    <div onClick={() => handleAddToWishlist(movieItem)}>
                                        <FontAwesomeIcon icon={faHeart} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="details">
                            <div className="top">
                                <div> {movieItem.categoryName} </div>
                                <div> {movieItem.releaseDate} </div>
                                <div> {movieItem.durationMinutes} min </div>
                            </div>
                            <p className="resume"> Resume : {movieItem.resume}</p>
                            <p> Director - <span>{movieItem.director}</span></p>
                            <p> Writers - <span>{movieItem.writers ? movieItem.writers.join(" - ") : ""}</span> </p>
                            <p> Stars - <span>{movieItem.stars ? movieItem.stars.join(" - ") : ""}</span> </p>
                        </div>
                    </div>
                    <Reviews reviews={reviews} />
                    <h1>MORE LIKE THIS</h1>
                    {similarMovies.length > 0 && (
                        <div className="similarMovies">
                            <FiltredMovies movies={similarMovies} filterCriteria={movieItem.categoryName} />
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default MovieDetails;
