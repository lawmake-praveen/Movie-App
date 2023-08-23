import React from "react";
import { MovieSlider } from "./exportTypes";
import { useSelector } from "react-redux";

const PopularMovies = () => {
  const popularMovies = useSelector((state) => state.movie.popularMovies);
  const data = popularMovies.results;

  return (
    <div>
      <MovieSlider data={data} heading="Popular Movies" />
    </div>
  );
};

export default PopularMovies;
