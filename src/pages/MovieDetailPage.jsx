import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  clearSelectedMovie,
  fetchSelectedMovie,
  fetchSelectedMovieVideos,
} from "../features/movieSlice";

const MovieDetail = () => {
  const { id } = useParams();
  console.log(id);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.movie.selectedMovie);
  const videoData = useSelector((state) => state.movie.selectedMovieVideos);

  useEffect(() => {
    dispatch(fetchSelectedMovie(id));
    dispatch(fetchSelectedMovieVideos(id));

    return () => {
      dispatch(clearSelectedMovie());
    };
  }, [dispatch, id]);
  return (
    <div className="movie-detail-page">
      {data.id && (
        <div className="details">
          <div className="img-title">
            <img src={`https://image.tmdb.org/t/p/w1280` + data.poster_path} />
            <div className="title-summary">
              <h2 className="title">{data.title}</h2>
              <p className="tagline">{data.tagline}</p>
              <div className="genres">
                {data.genres.map((item, index) => {
                  return <span key={index}>{item.name}</span>;
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
