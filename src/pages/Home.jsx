import React, { useEffect } from "react";
import {
  BackdropRows,
  Trending,
  PopularMovies,
  PopularTv,
  TopRated,
  Upcoming,
} from "../types/exportTypes";
import { useDispatch } from "react-redux";
import {
  fetchTrending,
  fetchPopularMovies,
  fetchPopularTv,
  fetchTopRated,
  fetchUpcoming,
} from "../features/movieSlice";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPopularMovies());
    dispatch(fetchPopularTv());
    dispatch(fetchTopRated());
    dispatch(fetchUpcoming());
    dispatch(fetchTrending());
  }, []);

  return (
    <div className="home">
      <BackdropRows />
      <div className="home-type-list">
        <Trending />
        <PopularMovies />
        <PopularTv />
        <TopRated />
        <Upcoming />
      </div>
    </div>
  );
};

export default Home;
