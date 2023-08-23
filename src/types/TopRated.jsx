import React from "react";
import { useSelector } from "react-redux";
import { MovieSlider } from "./exportTypes";

const TopRated = () => {
  const topRated = useSelector((state) => state.movie.topRated);
  const data = topRated.results;
  return (
    <div>
      <MovieSlider data={data} heading="Top Rated" />
    </div>
  );
};

export default TopRated;
