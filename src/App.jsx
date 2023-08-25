import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  ExploreMovies,
  ExploreTVShows,
  Home,
  MovieDetail,
  SearchPage,
  TvDetail,
  PersonDetail,
  PageNotAvailable,
} from "./pages/exportPages";
import { Footer, Navbar } from "./components/exportComponents";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/tv/:id" element={<TvDetail />} />
          <Route path="/person/:id" element={<PersonDetail />} />
          <Route path="/search/:name" element={<SearchPage />} />
          <Route path="/discover/movie" exact element={<ExploreMovies />} />
          <Route path="/discover/tv" element={<ExploreTVShows />} />
          <Route path="*" element={<PageNotAvailable />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
