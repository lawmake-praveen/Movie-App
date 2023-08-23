import React from "react";
import { Link } from "react-router-dom";
import NoImage from "../assets/unavailable-img.png";
import InfiniteScroll from "react-infinite-scroll-component";
import { ThreeDots } from "react-loader-spinner";

const Explore = ({ heading, data, type, fetchNextPage }) => {
  const fitstLetter = heading.charAt(0);

  return (
    <div className="explore-page">
      <header className="explore-heading">
        <div className="heading">{heading}</div>

        <div
          className={`category ${fitstLetter === "r" ? "hide-category" : ""}`}
        ></div>
      </header>
      <InfiniteScroll
        className="all-content"
        next={fetchNextPage}
        dataLength={data ? data.length : 20}
        hasMore={true}
        loader={
          <div className="loader">
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="#fff"
              ariaLabel="three-dots-loading"
              visible={true}
            />
          </div>
        }
      >
        {data
          ? data.map((item, index) => {
              return (
                <Link
                  to={`/${item?.media_type || type}/${item?.id}`}
                  className="movie-card"
                  key={index}
                >
                  <img
                    src={
                      item?.poster_path
                        ? "https://image.tmdb.org/t/p/w400" + item?.poster_path
                        : NoImage
                    }
                    className="img"
                    effect="blur"
                    alt="Poster"
                  />
                  <div className="title-date">
                    <p className="title">
                      {item?.title ? item?.title : item?.name}
                    </p>
                    <span className="release-date">
                      {item?.release_date
                        ? item?.release_date?.slice(0, 4)
                        : item?.first_air_date?.slice(0, 4)}
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

export default Explore;
