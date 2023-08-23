import React, { useEffect } from "react";
import MovieSlider from "./MovieSlider";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecommendedMovies } from "../features/movieSlice";

const RecommendedMovies = ({ type, id }) => {
  const dispatch = useDispatch();
  const recommended = useSelector((state) => state.movie.recommendedMovies);
  const data = recommended?.results;

  useEffect(() => {
    dispatch(fetchRecommendedMovies({ type: type, id: id }));
  }, [id]);

  return (
    <div>
      {data?.length && (
        <MovieSlider data={data} heading="You Might Also Like" />
      )}
    </div>
  );
};

export default RecommendedMovies;
