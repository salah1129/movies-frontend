import "../styles/home.css";
import 'aos/dist/aos.css'; 
import MoviesSlider from './MoviesSlider';
import NewMovies from './NewMovies';
import HeroCategories from './HeroCategories';
import FiltredMovies from "./FiltredMovies";
import "../styles/filtredMovies.css"

const Home = () => {
    return (
        <div className="home">
            <div className="hero" data-aos="fade-up">
            <MoviesSlider />
            <NewMovies />
            </div>
            <h1>WATCH BY CATEGORY</h1>
            <HeroCategories />
            <h1> HIGHLY RATED MOVIES</h1>
            <FiltredMovies filterCriteria = "evaluation"/>
        </div>
    );
}
export default Home;
