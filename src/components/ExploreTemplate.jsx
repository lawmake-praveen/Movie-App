import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeMovieSortType, fetchAllMovies } from "../features/movieSlice";
import { Link } from "react-router-dom";
import { Img } from "../components/exportComponents";
import NoImage from "../assets/img-unavailable.png";
import InfiniteScroll from "react-infinite-scroll-component";
import { Oval } from "react-loader-spinner";

const ExploreTemplate = ({ heading, data, type, fetchNextPage }) => {
  const sort = [
    {
      label: "Popularity High to Low",
      value: "popularity.desc",
    },
    {
      label: "New Movies",
      value: "primary_release_date.desc",
    },
  ];

  console.log(data);
  const dispatch = useDispatch();

  const changeCategory = (e) => {
    dispatch(changeMovieSortType(e.target.value));
    console.log(e.target.value);
  };

  return (
    <div className="explore-page">
      <header className="explore-heading">
        <div className="heading">{heading}</div>
        <div className="category">
          <select onChange={changeCategory} className="change-category">
            {sort.map((item, index) => {
              return (
                <option key={index} value={item.value}>
                  {item.label}
                </option>
              );
            })}
          </select>
        </div>
      </header>
      <InfiniteScroll
        className="all-content"
        next={fetchNextPage}
        dataLength={data && data.length}
        hasMore={true}
        loader={
          <div className="loader">
            <Oval
              height={80}
              width={80}
              color="#ffffff"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#444"
              strokeWidth={3}
              strokeWidthSecondary={2}
            />
          </div>
        }
      >
        {data
          ? data.map((item, index) => {
              return (
                <Link
                  to={`/${type}/${item.id}`}
                  className="movie-card"
                  key={index}
                >
                  <Img
                    src={
                      item.poster_path
                        ? "https://image.tmdb.org/t/p/w200" + item.poster_path
                        : NoImage
                    }
                    className="img"
                  />
                  <div className="title-date">
                    <p className="title">{item.title}</p>
                    <span className="release-date">
                      {item.release_date?.slice(0, 4)}
                    </span>
                  </div>
                </Link>
              );
            })
          : "No Content"}
      </InfiniteScroll>
    </div>
  );
};

export default ExploreTemplate;
