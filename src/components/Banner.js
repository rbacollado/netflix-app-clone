import React, { useEffect, useState } from "react";
import "./styles.css";
import axios from "../axios";
import requests from "../requests";

import Play from "@material-ui/icons/PlayArrow";
import Add from "@material-ui/icons/Add";

function Banner() {
  const [movie, setMovie] = useState("");
  const imgUrl = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );

      return request;
    }

    fetchData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("${imgUrl}${movie.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__content">
        <h1 className="banner__title">
          {movie?.name || movie?.title || movie?.original_name}
        </h1>
        <div className="banner__buttons">
          <button>
            <span> Play </span>
          </button>
          <button>
            <span> My List</span>
          </button>
        </div>
        <h1 className="banner__description">
          {truncate(movie?.overview, 200)}
        </h1>
      </div>
      <div className="banner__fade"></div>
    </header>
  );
}

export default Banner;
