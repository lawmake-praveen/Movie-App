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
import {} from "../features/commonSlice";
import { fetchPopularMovies } from "../features/movieSlice";
import { fetchPopularTv } from "../features/tvSlice";
import {
  fetchTopRated,
  fetchTrending,
  fetchUpcoming,
} from "../features/swiperSlice";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPopularMovies());
    dispatch(fetchPopularTv());
    dispatch(fetchTopRated());
    dispatch(fetchUpcoming());
    dispatch(fetchTrending());
    document.title = "TMDB App";
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
