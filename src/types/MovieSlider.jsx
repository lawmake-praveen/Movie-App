import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import noImage from "../assets/unavailable-img.png";

const MovieSlider = ({ data, heading }) => {
  const [showNav, setShowNav] = useState(false);

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
  const breakpoints = {
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
  };
  return (
    <div className="movie-slider">
      <h2 className="heading">{heading}</h2>
      <Swiper
        className="movie-swiper-container"
        spaceBetween={30}
        navigation={showNav}
        speed={600}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Navigation]}
        breakpoints={breakpoints}
        slidesPerGroup={showNav ? 2 : 1}
      >
        {data &&
          data?.map((item) => {
            return (
              <SwiperSlide className="movie-swiper" key={item?.id}>
                <Link
                  to={`/${item?.first_air_date ? 'tv': 'movie'}/${item?.id}`}
                  className="link-to-movie"
                >
                  <img
                    src={
                      item.poster_path
                        ? `https://image.tmdb.org/t/p/w400` + item?.poster_path
                        : noImage
                    }
                    className="img"
                  />

                  <p className="title">{item?.title || item?.name}</p>
                </Link>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
};

export default MovieSlider;
