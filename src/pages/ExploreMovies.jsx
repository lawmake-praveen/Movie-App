import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Explore } from "../components/exportComponents";
import { useDispatch } from "react-redux";
import { clearExplore, fetchExplore } from "../features/commonSlice";

const ExploreMovies = () => {
  const explore = useSelector((state) => state.common.explore);
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  const fetchNextPage = () => {
    setPage((count) => count + 1);
    dispatch(fetchExplore({ type: "movie", page: page + 1 }));
  };

  useEffect(() => {
    dispatch(clearExplore());
    dispatch(fetchExplore({ type: "movie", page: 1 }));
  }, []);

  useEffect(() => {
    document.title = "Explore Movies";
  }, []);

  return (
    <div>
      <Explore
        heading="Explore Movies"
        data={explore}
        type="movie"
        fetchNextPage={fetchNextPage}
      />
    </div>
  );
};

export default ExploreMovies;
