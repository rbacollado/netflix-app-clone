import React, { useState, useEffect } from "react";
import "./styles.css";
import axios from "../axios";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import Alert from "@material-ui/lab/Alert";

function Row({ title, fetchUrl, isLarge }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [trailer404, setTrailer404] = useState(false);

  const posterUrl = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    async function fetchData() {
      const req = await axios.get(fetchUrl);
      setMovies(req.data.results);
      return req;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
      setTrailer404(false);
    } else {
      movieTrailer(movie?.name || movie?.title || movie.original_name || "")
        .then((url) => {
          console.log(movie?.name);
          console.log(url);
          //url = "www.youtube.com/watch?v=XtMThy8QKqU&t=9833s"
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((err) => {
          console.log(err);
          console.log(movie?.name);
          setTrailerUrl("");
          setTrailer404(true);
        });
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row__poster ${isLarge ? "row__posterLarge" : null}`}
            src={`${posterUrl}${
              isLarge ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie?.name || movie?.title}
          />
        ))}
      </div>

      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      {trailer404 && <Alert severity="error">Sorry! No trailer found.</Alert>}
    </div>
  );
}

export default Row;
