import React, { useEffect } from "react";
import ExploreTemplate from "../components/ExploreTemplate";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTvShows } from "../features/movieSlice";

const ExploreTVShows = () => {
  const dispatch = useDispatch();
  const allTvShows = useSelector((state) => state.movie.allTvShows);

  const currentCategory = useSelector(
    (state) => state.movie.currentMovieSortType
  );
  console.log(allTvShows);
  const data = allTvShows.results;
  console.log(data);

  useEffect(() => {
    dispatch(fetchAllTvShows(currentCategory));
  }, [currentCategory]);
  return (
    <div>
      <ExploreTemplate heading="Explore TV Shows" data={data} />
    </div>
  );
};

export default ExploreTVShows;
