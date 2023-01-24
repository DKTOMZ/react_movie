import React, { useRef, useState } from "react";
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
              const item = window.sessionStorage.getItem(key);
              return item ? JSON.parse(item) : initialValue;
            } catch (error) {
              return initialValue;
            }
          });

          
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
        }
  };

  return [storedValue, setValue];
    }

    let status = useRef(null);
    let error = useRef(null);

    const handleKeyDown = event => {
        if (event.key === 'Enter') {
            inputValidation(searchInput);
        }
    };

    const showErrors = (statusText,errorText) => {
        status.current.innerHTML = statusText;
        error.current.innerHTML = errorText;
        status.current.style.display = 'block';
        error.current.style.display = 'block';
    };

    const clearErrors = () => {
        status.current.style.display = 'none';
        error.current.style.display = 'none';
    }

    const inputValidation = (input) => {
        if (!input?.trim()) {
            showErrors('Invalid input', 'Search text is empty');
            return;
        }
        else if (input[0] === '#' || input[0] === '+') {
            showErrors('Invalid input', 'Search should not begin with # or +');
            return;
        }
        else {
        clearErrors();
        searchMovie(input);
        }
    }
    
    const searchMovie = async(title) => {
        let response;
        let data;
        try {
            response = await fetch(encodeURI(`${API_URL}&query=${title}&include_adult=false`));
            if (response.status >= 200 && response.status <= 299) {
                data = await response.json();
              }
        } catch (error) {
            return showErrors('Network Error', error.message);
        }
        saveData(data);
    }

    const saveData = (data) => {
        setMovies(data.results);
    };

    return (
        <div className="App">
            <section className="AppTitle">
                <h1>MovieInfo</h1>
                <img src={Videoicon} alt="Video Icon"/>
            </section>
            <section className="Search">
                <input type={'text'} onKeyDown={handleKeyDown} placeholder="Search a movie..." onChange={(e)=>setSearchInput(e.target.value)} required/>
                <img onClick={()=>inputValidation(searchInput)} src={Searchicon} alt="Search Icon"/>
            </section>
            <div ref={status} style={{color:"red", fontSize: '26px', marginBottom: '20px'}}></div>
            <div ref={error} style={{color:"white", marginBottom: '40px'}}></div>
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