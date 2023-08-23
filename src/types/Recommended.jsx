import React, { useEffect } from "react";
import { MovieSlider } from "./exportTypes";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecommended } from "../features/movieSlice";

const Recommended = ({ type, id }) => {
  const dispatch = useDispatch();
  const recommended = useSelector((state) => state.movie.recommended);
  const data = recommended?.results;

  useEffect(() => {
    dispatch(fetchRecommended({ type: type, id: id }));
  }, [id]);

  return (
    <div>
      {data?.length && (
        <MovieSlider data={data} heading="You Might Also Like" />
      )}
    </div>
  );
};

export default Recommended;
