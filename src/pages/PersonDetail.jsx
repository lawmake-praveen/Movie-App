import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPerson, clearPersonDetails } from "../features/movieSlice";
import noImage from "../assets/user.png";
import { AiFillHeart, AiOutlineLink } from "react-icons/ai";

const PersonDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPerson(id));

    return () => {
      dispatch(clearPersonDetails());
    };
  }, [id]);
  const data = useSelector((state) => state.movie.personDetails);

  return (
    <div className="movie-tv-detail-page">
      <div className="details">
        <div className="details-container">
          <div className="img-title">
            <div className="img-container">
              <img
                className="img"
                src={
                  data?.profile_path
                    ? `https://image.tmdb.org/t/p/w500` + data?.profile_path
                    : noImage
                }
              />
            </div>
            <div className="title-summary">
              <h2 className="title">{data?.name}</h2>
              {data?.also_known_as?.length > 0 && (
                <p className="tagline">
                  Also Known as:{" "}
                  {data?.also_known_as?.map((item) => {
                    return <span key={item}>{item} | &nbsp;</span>;
                  })}
                </p>
              )}
              {data?.known_for_department && (
                <p>Profession: {data?.known_for_department}</p>
              )}
              {data?.birthday && (
                <p className="b-day">
                  Date of Birth : {data?.birthday?.slice(8, 10)}/
                  {data?.birthday?.slice(5, 7)}/{data?.birthday?.slice(0, 4)}
                </p>
              )}
              {data?.place_of_birth && <p>Place: {data?.place_of_birth}</p>}
              {data?.deathday && (
                <p className="b-day">
                  Date of Demise: {data?.deathday?.slice(8, 10)}/
                  {data?.deathday?.slice(5, 7)}/{data?.deathday?.slice(0, 4)}
                </p>
              )}
              <div className="release-website">
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
              {data?.popularity > 0 && (
                <p className="rating">
                  <span>
                    <AiFillHeart />
                  </span>
                  <span>{data?.popularity.toFixed(1)}</span>
                </p>
              )}
              {data?.biography && (
                <div>
                  <p className="story-line">Biography</p>
                  <p className="overview">{data?.biography}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonDetailPage;
