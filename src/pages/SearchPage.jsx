import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const SearchPage = () => {
  const searchMovies = useSelector((state) => state.movie.searchMovie);
  const data = searchMovies.results;

  // return <div className="search-page">
  //   {data && data.map((item,index) => {
  //     return(

  //     )
  //   })}
  // </div>;
};

export default SearchPage;
