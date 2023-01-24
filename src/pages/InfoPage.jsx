import React, { useEffect } from "react";
import { useLocation} from "react-router-dom";
import NoPosterImage from "../assets/noposter.png";

const InfoPage = () => {
    const { state } = useLocation();

    const {original_language, media_type, vote_average, title, name, first_air_date, overview, poster_path, release_date} = state;
    
    const checkPoster = () => {
        if (!poster_path) {
            return NoPosterImage;
        }
        return `https://image.tmdb.org/t/p/original${poster_path}`;
    }

    useEffect(()=>{
        window.scrollTo(0,0);
    })
    
    return (
        <div className="MovieInfo">
            <h1 style={{color: "#1DB954"}}>Movie Title:</h1>
            <br />
            <h2>{title ? title : name}</h2>
            <br />
            <div className="Poster">
                <img src={checkPoster()} alt={title}></img>
            </div>
            <div className="InfoOverview">
                <h2 style={{display:"block", color: "#1DB954"}}>Media:</h2>
                <p style={{textAlign:"center"}}>{media_type}</p>
                <br />
                <h2 style={{display:"block", color: "#1DB954"}}>Language:</h2>
                <p style={{textAlign:"center"}}>{original_language}</p>
                <br />
                <h2 style={{display:"block", color: "#1DB954"}}>Rating:</h2>
                <p style={{textAlign:"center"}}>{vote_average}</p>
                <br />
                {release_date 
                ? <h2 style={{display:"block", color: "#1DB954"}}>Release Date:</h2>
                : <h2 style={{display:"block", color: "#1DB954"}}>First Air Date:</h2>}
                <p style={{textAlign:"center"}}>{release_date ? release_date: first_air_date}</p>
                <br />
                <h2 style={{display:"block", color: "#1DB954"}}>Plot:</h2>
                <p>{overview}</p>
            </div>
            <footer>
                <hr/>
                <p>© Created by Dennis Tomno</p>
            </footer>
        </div>
    );
}

export default InfoPage;