import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import { Img } from "../components/exportComponents";

const MovieSlider = ({ data, heading }) => {
  const [showNav, setShowNav] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleNav = () => {
    if (window.innerWidth > 800) {
      setShowNav(true);
    } else {
      setShowNav(false);
    }
  };
  useEffect(() => {
    handleNav();
  }, []);
  window.addEventListener("resize", handleNav);
  if (!data) {
    return null;
  }
  return (
    <div className="movie-slider">
      <h2 className="heading">{heading}</h2>
      <Swiper
        className="movie-swiper-container"
        spaceBetween={30}
        navigation={showNav}
        speed={1000}
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Navigation]}
        breakpoints={{
          200: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          600: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          800: {
            slidesPerView: 4,
          },
          1000: {
            slidesPerView: 5,
          },
          1200: {
            slidesPerView: 6,
          },
        }}
      >
        {data ? (
          data.map((item, index) => {
            return (
              <SwiperSlide className="movie-swiper" key={index}>
                <Link to={`movie/${item.id}`} className="link-to-movie">
                  <Img
                    className="img"
                    src={`https://image.tmdb.org/t/p/w400` + item.poster_path}
                  />
                  <p className="title">{item.title}</p>
                </Link>
              </SwiperSlide>
            );
          })
        ) : (
          <>
            <LoadingScreen />
            <LoadingScreen />
            <LoadingScreen />
          </>
        )}
      </Swiper>
    </div>
  );
};

const LoadingScreen = () => {
  return <SwiperSlide className="movie-swiper-loading"></SwiperSlide>;
};

export default MovieSlider;
