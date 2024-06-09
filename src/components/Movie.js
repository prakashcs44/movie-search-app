import React from "react";

function Movie({ movie, overlayTitle, overlayAction }) {
  return (
    <div className="movie-container">
      <img src={movie?.Poster} />

      <button
        className="overlay"
        onClick={()=>overlayAction(movie)}
      >
       {overlayTitle}
      </button>
    </div>
  );
}

export default Movie;
