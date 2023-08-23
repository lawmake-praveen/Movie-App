import React from "react";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import noCastImg from "../assets/user.png";
import { Link } from "react-router-dom";

const Credits = ({ heading, actors }) => {
  return <ShowCredits data={actors} heading={heading} />;
};

const ShowCredits = ({ data, heading }) => {
  return (
    <div>
      <h1 className="heading">{heading}</h1>
      <Swiper
        className="credits"
        spaceBetween={10}
        breakpoints={{
          200: {
            slidesPerView: 3,
          },
          600: {
            slidesPerView: 5,
          },
          800: {
            slidesPerView: 6,
          },
          1000: {
            slidesPerView: 7,
          },
          1200: {
            slidesPerView: 8,
          },
        }}
      >
        {data?.map((item) => {
          return (
            <SwiperSlide className="line-credits" key={item.id}>
              <Link to={`/person/${item.id}`}>
                <div className="image">
                  <img
                    src={
                      item?.profile_path
                        ? `https://image.tmdb.org/t/p/w185${item.profile_path}`
                        : noCastImg
                    }
                  />
                </div>
                <div className="name-details">
                  <p className="name">{item.original_name}</p>
                  <p className="charactor">{item.character}</p>
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Credits;