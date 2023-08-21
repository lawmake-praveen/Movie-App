import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  ExploreMovies,
  ExploreTVShows,
  Home,
  MovieDetailPage,
  SearchPage,
} from "./pages/exportPages";
import { Navbar } from "./components/exportComponents";
import { useSelector } from "react-redux";

const App = () => {
  const currentPage = useSelector((state) => state.movie.currentPage);
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetailPage />} />
          <Route path="/search/:id" element={<SearchPage />} />
          <Route path="/discover/movie" exact element={<ExploreMovies />} />
          <Route path="/discover/tv" element={<ExploreTVShows />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
