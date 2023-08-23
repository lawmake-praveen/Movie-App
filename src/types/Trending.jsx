import React from "react";
import { MovieSlider } from "./exportTypes";
import { useSelector } from "react-redux";

const Trending = () => {
  const trending = useSelector((state) => state.movie.trending);
  const data = trending?.results;
  return (
    <div>
      <MovieSlider data={data} heading="Trending Now" />
    </div>
  );
};

export default Trending;
