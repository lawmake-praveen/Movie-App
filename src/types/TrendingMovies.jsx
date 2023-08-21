import React from "react";
import MovieSlider from "./MovieSlider";
import { useSelector } from "react-redux";

const TrendingMovies = () => {
  const trendingMovies = useSelector((state) => state.movie.trending);
  const data = trendingMovies.results;
  return (
    <div>
      <MovieSlider data={data} heading="Trending" />
    </div>
  );
};

export default TrendingMovies;
