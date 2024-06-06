import { Link, useParams } from 'react-router-dom';
import "../styles/categoryPage.css";
import { useEffect, useState } from 'react';
import axios from 'axios';
// import FiltredMovies from './FiltredMovies';

const CategoryPage = () => {
    const { categoryName } = useParams();
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get('http://localhost:8080/movies');
                console.log("Fetched movies for category page:", response.data);
                setMovies(response.data);
                setError(null); 
            } catch (error) {
                console.error('Error fetching movies:', error);
                setError(error); 
            }
        };
        fetchMovies(); 
    }, []); 
    if (error) {
        return <div>Error: {error.message}</div>; 
    }
    return ( 
        <div className='categoryPage'>
            <h1>This is category page for {categoryName}</h1>
            {/* <FiltredMovies filterCriteria = {categoryName} /> */}
            <div className="movies">
            {movies 
            .filter(movie => movie.categoryName === categoryName)
            .map(movie => (
                <Link to={`/movies/${movie.id}`}>
                <div key={movie.id} className="movieCard">
                    <img src={`/${movie.image}`} alt={movie.movieName}/>
                    <div className="movieName">{movie.movieName} </div>
                </div>
                </Link>
                
            ))}
            </div>
            
        </div>
    );
}

export default CategoryPage;
