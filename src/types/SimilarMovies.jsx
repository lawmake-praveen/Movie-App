import React, { useEffect } from "react";
import MovieSlider from "./MovieSlider";
import { useDispatch, useSelector } from "react-redux";
import { fetchSimilarMovies } from "../features/movieSlice";

const SimilarMovies = ({ type, id }) => {
  const dispatch = useDispatch();
  const similar = useSelector((state) => state.movie.similarMovies);
  const data = similar?.results;

  useEffect(() => {
    dispatch(fetchSimilarMovies({ type: type, id: id }));
  }, [id]);

  return (
    <div>
      {data?.length && <MovieSlider data={data} heading="Similar to this" />}
    </div>
  );
};

export default SimilarMovies;
