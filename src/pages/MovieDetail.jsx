import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AiOutlineLink } from "react-icons/ai";
import { Credits, SelectedDetails } from "../components/exportComponents";
import { Similar, Recommended } from "../types/exportTypes";
import noImage from "../assets/no-poster-img.png";
import {
  clearSelected,
  fetchSelectedCredits,
  fetchSelectedVideos,
  fetchSelected,
} from "../features/selectedSlice";

const MovieDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.selected.selected);
  const videoData = useSelector((state) => state.selected.selectedVideos);
  const credits = useSelector((state) => state.selected.selectedCredits);

  useEffect(() => {
    dispatch(fetchSelected({ type: "movie", id: id }));
    dispatch(fetchSelectedVideos({ type: "movie", id: id }));
    dispatch(fetchSelectedCredits({ type: "movie", id: id }));
    return () => {
      dispatch(clearSelected());
    };
  }, [dispatch, id]);

  const array = credits?.cast?.concat(credits?.crew);
  const actors = array
    ?.filter((e) => e.known_for_department?.includes("Acting"))
    .slice(0, 10);

  useEffect(() => {
    if (data?.title) {
      document.title = `${data?.title}`;
    }
  }, [data?.title]);

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
                <h2 className="title">{data?.title}</h2>
                <p className="tagline">{data?.tagline}</p>
                <p className="genres">
                  {data?.runtime > 1 && <span>{data?.runtime} min</span>}
                  {data?.genres?.map((item, index) => {
                    return <span key={index}>{item?.name}</span>;
                  })}
                </p>
                <div className="release-website">
                  <div className="release">
                    Release:{" "}
                    {data?.release_date?.slice(8, 10) +
                      "/" +
                      data?.release_date?.slice(5, 7) +
                      "/" +
                      data?.release_date?.slice(0, 4)}
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
          </div>
          <div className="additional-details">
            {actors?.length && <Credits heading="Top Cast" actors={actors} />}
            <Recommended type="movie" id={id} />
            <Similar type="movie" id={id} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
