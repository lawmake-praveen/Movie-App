import React from "react";
import { MovieSlider } from "./exportTypes";
import { useSelector } from "react-redux";

const PopularTv = () => {
  const popularTv = useSelector((state) => state.tv.popularTv);
  const data = popularTv?.results;

  return (
    <div>
      <MovieSlider data={data} heading="Popular Tv Shows" />
    </div>
  );
};

export default PopularTv;
