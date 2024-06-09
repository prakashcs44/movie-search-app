import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import SearchBox from "./components/SearchBox.js";
import Movie from "./components/Movie.js";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const getMovieRequest = async (searchValue) => {
    const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8`;
    try {
      const response = await fetch(url);

      const responseJson = await response.json();

      if (responseJson.Search) {
        setMovies(responseJson.Search);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem("react-movie-app-favourites")
    );

    if (movieFavourites) {
      setFavourites(movieFavourites);
    }
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem("react-movie-app-favourites", JSON.stringify(items));
  };

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );

    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  

  return (
    <div>
      <header >
        <h1>Movies</h1>
        <SearchBox setSearchValue={setSearchValue} />
      </header>

      <main className="d-flex align-items-center gap-5 overflow-x-scroll py-5">
        {movies.map((movie) => (
          <Movie
            movie={movie}
            overlayTitle="Add to Favourites"
            overlayAction={addFavouriteMovie}
          />
        ))}
        <Movie />
      </main>

      <div className=" mt-5 ">
        <h1 className="text-center">Favourites</h1>
        <div className="d-flex align-items-center gap-5 overflow-x-scroll py-5 px-5">
          {favourites.map((fav) => (
            <Movie
              movie={fav}
              overlayTitle="Remove From Favourites"
              overlayAction={removeFavouriteMovie}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
