import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/Reviews.css"

const Reviews = () => {
    const { movieID } = useParams();
    const [movieItem, setMovieItem] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [similarMovies, setSimilarMovies] = useState([]);
    const [reviews, setReviews] = useState(null)
    const [newReview, setNewReview] = useState({reviewerName : "", reviewText : ""})

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewReview({ ...newReview, [name]: value });
    };

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/reviews", {
                reviewerName: newReview.reviewerName,
                reviewText: newReview.reviewText,
                movie: {
                    id: parseInt(movieID)
                }
            });
            console.log('Review added successfully:', response.data);
            setReviews([...reviews, response.data]);
            setNewReview({ reviewerName: "", reviewText: "" });
        } catch (error) {
            console.error('Error adding review:', error);
        }
    };
    return ( 
        <div className="reviewSection">
            <form className="reviewForm" onSubmit={handleSubmitReview}>
                        <h2>POST YOUR OWN REVIEW</h2>
                        <input 
                        type="text" 
                        placeholder="Your name"
                        name="reviewerName"
                        value={newReview.reviewerName}
                        onChange={handleInputChange}
                        />
                        <textarea 
                        placeholder="Your review"
                        name="reviewText"
                        value={newReview.reviewText}
                        onChange={handleInputChange}
                        />
                        <button className="submitReview">Submit</button>
            </form>
            <div className="reviews">
                        <h2>REVIEWS</h2>
                        {reviews && reviews
                        .filter(review => review.movieId == movieID)
                        .map(review => (
                            <div key={review.id} className="review">
                                <h3>{review.reviwerName}</h3>
                                <p>{review.reviewText}</p>
                            </div>
                        ))}
            </div>
            
        </div>
    );
}

export default Reviews;
