import React, { useState } from "react";
import MovieCard from "../MovieCard";
import Videoicon from '../assets/movie.svg';
import Searchicon from '../assets/search.svg';

const API_URL = `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_TMDB_API_KEY}`;

const HomePage = () => {
    const [movies, setMovies] = useSessionStorage('movies', '');

    const [searchInput, setSearchInput] = useState('');
    
    function useSessionStorage(key,initialValue) {
        const [storedValue, setStoredValue] = useState(() => {
            if (typeof window === "undefined") {
              return initialValue;
            }
        
            try {
              // Get from local storage by key
              const item = window.sessionStorage.getItem(key);
              // Parse stored json or if none return initialValue
              return item ? JSON.parse(item) : initialValue;
            } catch (error) {
              // If error also return initialValue
              console.log(error);
              return initialValue;
            }
          });

        // Return a wrapped version of useState's setter function that ...
        // ... persists the new value to localStorage.
        const setValue = (value) => {
        try {
        // Allow value to be a function so we have same API as useState
        const valueToStore =
            value instanceof Function ? value(storedValue) : value;
        // Save state
        setStoredValue(valueToStore);
        // Save to session storage
        if (typeof window !== "undefined") {
            window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
        }
        } catch (error) {
        // A more advanced implementation would handle the error case
        console.log(error);
        }
  };

  return [storedValue, setValue];
    }
    
    const searchMovie = async(title) => {
        let response;
        let data;
        try {
            response = await fetch(encodeURI(`${API_URL}&query=${title}&include_adult=false`));
            if (response.status >= 200 && response.status <= 299) {
                data = await response.json();
              } else {
                return handleFetchError(response.status, response.statusText);
              }
        } catch (error) {
            return handleFetchError('Network Error', error.message);
        }
        document.getElementById('status').style.display = 'none';
        document.getElementById('error').style.display = 'none';
        setMovies(data.results);
    }

    const handleFetchError = (status,text) => {
        document.getElementById('status').innerHTML = status;
        document.getElementById('error').innerHTML = text;
    };

    return (
        <div className="App">
            <section className="AppTitle">
                <h1>MovieInfo</h1>
                <img src={Videoicon} alt="Video Icon"/>
            </section>
            <section className="Search">
                <input type={'text'} placeholder="Search a movie..." onChange={(e)=>setSearchInput(e.target.value)}></input>
                <img onClick={()=>searchMovie(searchInput)} src={Searchicon} alt="Search Icon"/>
            </section>
            <div id="status" style={{color:"red", fontSize: '26px', marginBottom: '20px'}}></div>
            <div id="error" style={{color:"white", marginBottom: '40px'}}></div>
            <section className="movies">
                <div className="Movies">
                    {movies 
                    ?
                    (movies.length > 0 
                    ?
                    movies.map((movie)=>{
                        if (movie.media_type === 'movie' || movie.media_type ==='tv'){
                            return <MovieCard movie={movie} key={movie.id} />
                        }
                        return null;
                    })
                    :
                    <div className="NoMovies">
                        <h2>No movies found.</h2>
                    </div>
                    )
                    : 
                    <div className="NoMovies">
                    <h2>Search movie information.</h2>
                    <br />
                    <br />                   
                    </div>
                    }
                </div>
            </section>
            <div className="attribution">
                <h3 style={{color:"#1DB954"}}>Content provided by:</h3>
                <br />
                <a href="https://www.themoviedb.org" target="_blank" rel="noreferrer">
                <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" alt="TMDB.org" />
            </a>
            </div>
            <footer>
                <hr/>
                <p>© Created by Dennis Tomno</p>
            </footer>
        </div>
    );
}


export default HomePage;