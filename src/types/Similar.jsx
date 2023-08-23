import React, { useEffect } from "react";
import { MovieSlider } from "./exportTypes";
import { useDispatch, useSelector } from "react-redux";
import { fetchSimilar } from "../features/movieSlice";

const Similar = ({ type, id }) => {
  const dispatch = useDispatch();
  const similar = useSelector((state) => state.movie.similar);
  const data = similar?.results;

  useEffect(() => {
    dispatch(fetchSimilar({ type: type, id: id }));
  }, [id]);

  return (
    <div>
      {data?.length && <MovieSlider data={data} heading="Similar to this" />}
    </div>
  );
};

export default Similar;
