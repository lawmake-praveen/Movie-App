import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Explore } from "../components/exportComponents";
import { fetchSearch, clearSearch } from "../features/movieSlice";

const SearchPage = () => {
  const { name } = useParams();
  const dispatch = useDispatch();
  const searchMovies = useSelector((state) => state.movie.search);

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(clearSearch());
    dispatch(fetchSearch({ searchInput: name, page: 1 }));
  }, [name]);

  const fetchNextPage = () => {
    setPage((count) => count + 1);
    dispatch(fetchSearch({ searchInput: name, page: page + 1 }));
  };

  return (
    <div>
      <Explore
        heading={`Search Results for "${name}"`}
        data={searchMovies}
        fetchNextPage={fetchNextPage}
      />
    </div>
  );
};

export default SearchPage;
