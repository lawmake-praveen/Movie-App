import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Explore } from "../components/exportComponents";
import { useDispatch } from "react-redux";
import { clearExplore, fetchExplore } from "../features/commonSlice";

const ExploreMovies = () => {
  const explore = useSelector((state) => state.common.explore);
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

  useEffect(() => {
    document.title = "Explore TV";
  }, []);
  return (
    <div>
      <Explore
        heading="Explore TV Shows"
        data={explore}
        type="tv"
        fetchNextPage={fetchNextPage}
      />
    </div>
  );
};

export default ExploreMovies;
