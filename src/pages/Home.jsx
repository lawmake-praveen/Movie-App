import React, { useEffect } from "react";
import {
  BackdropRows,
  TrendingMovies,
  PopularMovies,
  TopRatedMovies,
  UpcomingMovies,
} from "../types/exportTypes";
import { useDispatch } from "react-redux";
import {
  fetchTrendingMovie,
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovie,
} from "../features/movieSlice";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPopularMovies());
    dispatch(fetchTopRatedMovies());
    dispatch(fetchUpcomingMovie());
    dispatch(fetchTrendingMovie());
  }, []);

  return (
    <div className="home">
      <BackdropRows />
      <div className="home-type-list">
        <TrendingMovies />
        <TopRatedMovies />
        <PopularMovies />
        <UpcomingMovies />
      </div>
    </div>
  );
};

export default Home;
