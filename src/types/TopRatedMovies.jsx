import React from "react";
import { useSelector } from "react-redux";
import { MovieSlider } from "./exportTypes";

const TopRatedMovies = () => {
  const topRatedMovies = useSelector((state) => state.movie.topRatedMovies);
  const data = topRatedMovies.results;
  return (
    <div>
      <MovieSlider data={data} heading="Top Rated Movies" />
    </div>
  );
};

export default TopRatedMovies;
