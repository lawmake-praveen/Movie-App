import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ExploreTemplate } from "../components/exportComponents";
import { useDispatch } from "react-redux";
import { clearExplore, fetchExplore } from "../features/movieSlice";

const ExploreMovies = () => {
  const explore = useSelector((state) => state.movie.explore);
  const dispatch = useDispatch();
  const currentCategory = useSelector(
    (state) => state.movie.currentMovieSortType
  );

  const [page, setPage] = useState(1);

  const fetchNextPage = () => {
    setPage((count) => count + 1);
    dispatch(
      fetchExplore({ type: "tv", value: currentCategory, page: page + 1 })
    );
  };

  useEffect(() => {
    dispatch(clearExplore());
    dispatch(fetchExplore({ type: "tv", value: currentCategory, page: 1 }));
  }, [currentCategory]);

  return (
    <div>
      <ExploreTemplate
        heading="Explore TV Shows"
        data={explore}
        type="tv"
        fetchNextPage={fetchNextPage}
      />
    </div>
  );
};

export default ExploreMovies;
