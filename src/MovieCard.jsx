import React from "react";
import { useNavigate } from "react-router-dom";

const MovieCard = (props) => {
    const navigate = useNavigate();
    
    const {title, name, first_air_date, poster_path, release_date} = props.movie;
    
    const navigateToInfoPage = () => {
        navigate(`/movieinfo/${title}`, {state: props.movie});
    }

    const checkPoster = () => {
        if (!poster_path) {
            return `https://via.placeholder.com/400?text=NOPOSTER`;
        }
        return `https://image.tmdb.org/t/p/original${poster_path}`;
    }
    
    return (
        <div className="Movie" onClick={navigateToInfoPage}>
            <div className='Title'><div className='text'>{title ? title : name}</div></div>
            <img src={checkPoster()} alt="movie"></img>
            <div className='Year'>{release_date? release_date: first_air_date}</div>
        </div>
    );
}

export default MovieCard;