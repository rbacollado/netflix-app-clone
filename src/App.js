import React from "react";
import requests from "./requests";
import "./App.css";
import Row from "./components/Row";
import Banner from "./components/Banner";
import Nav from "./components/Nav";

function App() {
  return (
    <div className="app">
      <Nav />
      <Banner />
      <Row
        title="Netflix Originals"
        isLarge={true}
        fetchUrl={requests.fetchNetflixOriginals}
      />
      <Row title="Trending" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Action" fetchUrl={requests.fetchAction} />
      <Row title="Comedy" fetchUrl={requests.fetchComedy} />
      <Row title="Romance" fetchUrl={requests.fetchRomance} />
      <Row title="Animation" fetchUrl={requests.fetchAnimation} />
      <Row title="Sci Fi" fetchUrl={requests.fetchSciFi} />
    </div>
  );
}

export default App;
