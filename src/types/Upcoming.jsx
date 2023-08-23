import React from "react";
import { MovieSlider } from "./exportTypes";
import { useSelector } from "react-redux";

const Upcoming = () => {
  const upcoming = useSelector((state) => state.movie.upcoming);
  const data = upcoming.results;
  return (
    <div>
      <MovieSlider data={data} heading="Upcoming Movies" />
    </div>
  );
};

export default Upcoming;
