import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  clearSelected,
  fetchSelected,
  fetchSelectedCredits,
  fetchSelectedVideos,
} from "../features/selectedSlice";
import { AiOutlineLink } from "react-icons/ai";
import { Credits, SelectedDetails } from "../components/exportComponents";
import { Similar, Recommended } from "../types/exportTypes";
import noImage from "../assets/no-poster-img.png";

const TvDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.selected.selected);
  const videoData = useSelector((state) => state.selected.selectedVideos);
  const credits = useSelector((state) => state.selected.selectedCredits);

  useEffect(() => {
    dispatch(fetchSelected({ type: "tv", id: id }));
    dispatch(fetchSelectedVideos({ type: "tv", id: id }));
    dispatch(fetchSelectedCredits({ type: "tv", id: id }));
    return () => {
      dispatch(clearSelected());
    };
  }, [dispatch, id]);

  const array = credits?.cast?.concat(credits?.crew);
  const actors = array
    ?.filter((e) => e.known_for_department?.includes("Acting"))
    .slice(0, 10);

  useEffect(() => {
    if (data?.name) {
      document.title = `${data?.name}`;
    }
  }, [data?.name]);

  return (
    <div className="movie-tv-detail-page">
      {data?.id && (
        <div className="details">
          <div className="details-container">
            {data?.backdrop_path && (
              <div className="backdrop-container">
                <img
                  className="backdrop-img"
                  src={`https://image.tmdb.org/t/p/w500${data?.backdrop_path}`}
                />
              </div>
            )}
            <div className="img-title">
              <div className="img-container">
                <img
                  className="img"
                  src={
                    data?.poster_path
                      ? `https://image.tmdb.org/t/p/w500` + data?.poster_path
                      : noImage
                  }
                />
              </div>
              <div className="title-summary">
                <h2 className="title">{data?.name}</h2>
                <p className="tagline">{data?.tagline}</p>
                <p className="genres">
                  {data?.episode_run_time?.length > 0 && (
                    <span>Episode: {data?.episode_run_time[0]} min</span>
                  )}
                  {data?.genres?.map((item, index) => {
                    return <span key={index}>{item?.name}</span>;
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
                    {data?.in_production === true ? " (Running)" : " (Ended)"}
                  </div>
                  <div className="website">
                    {data?.homepage && (
                      <a href={data?.homepage} target="_blank">
                        <span>
                          <AiOutlineLink />
                        </span>{" "}
                        Website
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
          </div>
          <div className="additional-details">
            {actors?.length && <Credits actors={actors} />}
            <Recommended type="tv" id={id} />
            <Similar type="tv" id={id} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TvDetail;
