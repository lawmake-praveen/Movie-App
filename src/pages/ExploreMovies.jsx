import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ExploreTemplate } from "../components/exportComponents";
import { useDispatch } from "react-redux";
import { addMovies, fetchAllMovies, options } from "../features/movieSlice";

const ExploreMovies = () => {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();
  const currentCategory = useSelector(
    (state) => state.movie.currentMovieSortType
  );

  const getAllMovie = (value, page) => {
    const response = fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&page=${page}&sort_by=${value}`,
      options
    ).then((response) => response.json());
    return response;
  };

  const fetchNextPage = () => {
    setPage((count) => count + 1);
    console.log(page + 1);
    getAllMovie(currentCategory, page + 1).then((response) => {
      console.log(response.results);
      setData((prev) => [...prev, ...response.results]);
    });
  };

  useEffect(() => {}, []);

  useEffect(() => {
    getAllMovie(currentCategory, 1).then((res) => setData(res.results));
  }, [currentCategory]);

  return (
    <div>
      <ExploreTemplate
        heading="Explore Movies"
        data={data}
        type="movie"
        fetchNextPage={fetchNextPage}
      />
    </div>
  );
};

export default ExploreMovies;
