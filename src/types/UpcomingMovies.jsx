import React from "react";
import MovieSlider from "./MovieSlider";
import { useSelector } from "react-redux";

const UpcomingMovies = () => {
  const upcomingMovies = useSelector((state) => state.movie.upcomingMovies);
  const data = upcomingMovies.results;
  return (
    <div>
      <MovieSlider data={data} heading="Upcoming Movies" />
    </div>
  );
};

export default UpcomingMovies;
