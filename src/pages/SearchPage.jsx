import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ExploreTemplate } from "../components/exportComponents";
import { fetchSearchMovie, clearSearchMovie } from "../features/movieSlice";

const SearchPage = () => {
  const { name } = useParams();
  const dispatch = useDispatch();
  const searchMovies = useSelector((state) => state.movie.searchMovie);

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(clearSearchMovie());
    dispatch(fetchSearchMovie({ searchInput: name, page: 1 }));
  }, [name]);

  const fetchNextPage = () => {
    setPage((count) => count + 1);
    dispatch(fetchSearchMovie({ searchInput: name, page: page + 1 }));
  };

  return (
    <div>
      <ExploreTemplate
        heading={`Results for "${name}"`}
        data={searchMovies}
        fetchNextPage={fetchNextPage}
      />
    </div>
  );
};

export default SearchPage;
