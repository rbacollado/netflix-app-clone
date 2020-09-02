import React, { useState, useEffect } from "react";
import "./styles.css";
import axios from "../axios";

function Row({ title, fetchUrl, isLarge }) {
  const [movies, setMovies] = useState([]);

  const posterUrl = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    async function fetchData() {
      const req = await axios.get(fetchUrl);
      setMovies(req.data.results);
      return req;
    }
    fetchData();
  }, [fetchUrl]);

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            className={`row__poster ${isLarge ? "row__posterLarge" : null}`}
            src={`${posterUrl}${
              isLarge ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie?.name || movie?.title}
          />
        ))}
      </div>
    </div>
  );
}

export default Row;
