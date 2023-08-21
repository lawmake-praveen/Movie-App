import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const BackdropRows = () => {
  const popularMovies = useSelector((state) => state.movie.popularMovies);
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
  return (
    <Swiper
      className="backdrop-container"
      spaceBetween={0}
      centeredSlides={true}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      navigation={showNav}
      modules={[Autoplay, Pagination, Navigation]}
    >
      <div className="shading-effect"></div>
      {popularMovies.results ? (
        popularMovies.results.map((item, index) => {
          return (
            <SwiperSlide key={index} className="backdropImg">
              <Link to={`/movie/${item.id}`} className="link-to-movie">
                <img
                  src={`https://image.tmdb.org/t/p/w1280` + item.backdrop_path}
                />
                <div className="detail">
                  <h2 className="movie-title">{item.title}</h2>
                  <p className="overview">{item.overview}</p>
                </div>
              </Link>
            </SwiperSlide>
          );
        })
      ) : (
        <div>hi</div>
      )}
    </Swiper>
  );
};

export default BackdropRows;
