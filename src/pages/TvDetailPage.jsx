import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  clearSelectedMovie,
  fetchSelectedMovie,
  fetchSelectedMovieCredits,
  fetchSelectedMovieVideos,
} from "../features/movieSlice";
import { AiOutlineLink } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Img, Credits, SelectedDetails } from "../components/exportComponents";
import SimilarMovies from "../types/SimilarMovies";
import RecommendedMovies from "../types/RecommendedMovies";
import noImage from "../assets/unavailable-img.png";

const MovieDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.movie.selectedMovie);
  const videoData = useSelector((state) => state.movie.selectedMovieVideos);
  const credits = useSelector((state) => state.movie.selectedMovieCredits);

  useEffect(() => {
    dispatch(fetchSelectedMovie({ type: "tv", id: id }));
    dispatch(fetchSelectedMovieVideos({ type: "tv", id: id }));
    dispatch(fetchSelectedMovieCredits({ type: "tv", id: id }));
    return () => {
      dispatch(clearSelectedMovie());
    };
  }, [dispatch, id]);

  const array = credits?.cast?.concat(credits?.crew);
  const actors = array
    ?.filter((e) => e.known_for_department?.includes("Acting"))
    .slice(0, 10);

  return (
    <div className="movie-tv-detail-page">
      {data.id && (
        <div className="details">
          <div className="backdrop-container">
            <Img
              className="backdrop-img"
              src={`https://image.tmdb.org/t/p/w500${data?.backdrop_path}`}
            />
          </div>
          <div className="details-container">
            <div className="img-title">
              <img
                src={
                  data?.poster_path
                    ? `https://image.tmdb.org/t/p/w500` + data?.poster_path
                    : noImage
                }
              />
              <div className="title-summary">
                <h2 className="title">{data?.name}</h2>
                <p className="tagline">{data?.tagline}</p>
                <p className="genres">
                  {data?.episode_run_time.length > 0 && (
                    <span>Episode: {data?.episode_run_time[0]} min</span>
                  )}
                  {data?.genres.map((item, index) => {
                    return <span key={index}>{item.name}</span>;
                  })}
                </p>
                <p className="type">
                  <span className="seasons-episode">
                    {data?.number_of_seasons}{" "}
                    {data?.number_of_seasons > 1 ? "Seasons" : "Season"} /{" "}
                    {data?.number_of_episodes} Episodes
                  </span>{" "}
                  &nbsp;&nbsp;&nbsp;
                  <span className="type-of">Show Type: {data?.type}</span>
                </p>
                <div className="release-website">
                  <div className="release">
                    Timeline:{" "}
                    {data?.first_air_date?.slice(0, 4) +
                      "-" +
                      data?.last_air_date?.slice(0, 4)}
                    {data?.in_production === true
                      ? " (Running)"
                      : " (Cancelled)"}
                  </div>
                  <div className="website">
                    {data?.homepage && (
                      <a href={data?.homepage} target="_blank">
                        <span>
                          <AiOutlineLink />
                        </span>{" "}
                        Website{" "}
                      </a>
                    )}
                  </div>
                </div>
                <SelectedDetails
                  data={data}
                  videoData={videoData}
                  credits={credits}
                />
              </div>
            </div>
            <div className="additional-details">
              <Credits heading="Top Cast" actors={actors} />
              <RecommendedMovies type="tv" id={id} />
              <SimilarMovies type="tv" id={id} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
