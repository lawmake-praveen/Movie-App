import React from "react";
import { AiFillStar } from "react-icons/ai";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";

const SelectedDetails = ({ data, videoData, credits }) => {
  let trailer1;
  let trailer2;
  let trailer3 = videoData.results?.filter((element) => {
    if (element.name.slice(0, 16) === "Official Trailer") {
      trailer1 = element;
    } else if (element.name.slice(0, 7) === "Trailer") {
      trailer2 = element;
    } else {
      return element.name.includes("Trailer");
    }
  });
  trailer1 = trailer1?.key;
  trailer2 = trailer2?.key;
  trailer3 = trailer3?.length ? trailer3[0].key : null;

  const array = credits?.cast?.concat(credits?.crew);

  const directors = array
    ?.filter((e) => e.job?.includes("Director"))
    .slice(0, 10);
  const writer1 = array?.filter((e) => e.job?.includes("Writer")).slice(0, 4);
  const writer2 = array
    ?.filter((e) => e.known_for_department?.includes("Writing"))
    .slice(0, 4);
  const writers = writer1?.concat(writer2);

  return (
    <div>
      {data?.vote_average > 0 && (
        <p className="rating">
          <span>
            <AiFillStar />
          </span>
          <span>{data?.vote_average.toFixed(1)}</span>
        </p>
      )}
      {data?.overview && (
        <>
          <p className="story-line">Story Line</p>
          <p className="overview">{data?.overview}</p>
        </>
      )}
      <span className="trailer-container">
        {trailer1 ? (
          <Trailer trailer={trailer1} />
        ) : trailer2 ? (
          <Trailer trailer={trailer2} />
        ) : trailer3 ? (
          <Trailer trailer={trailer3} />
        ) : (
          ""
        )}
      </span>
      {directors?.length > 1 && (
        <div className="dir">
          <p className="dir-title">
            {directors?.length > 1 ? "Directors:" : "Director:"}
          </p>
          <p className="dir-list">
            {directors?.map((item, index) => {
              return <span key={index}>{item?.name},&nbsp;</span>;
            })}
          </p>
        </div>
      )}
      {writers?.length > 1 && (
        <div className="dir">
          <p className="dir-title">
            {writers?.length > 1 ? "Writers:" : "Writer:"}
          </p>
          <p className="dir-list">
            {writers?.map((item, index) => {
              return <span key={index}>{item?.name},&nbsp;</span>;
            })}
          </p>
        </div>
      )}
    </div>
  );
};

const Trailer = ({ trailer }) => {
  return (
    <Link
      className="link-to-trailer"
      to={`https://www.youtube.com/watch?v=${trailer}`}
      target="_blank"
    >
      <span className="trailer-btn">
        <FaPlay />
      </span>
      <span>Watch Trailer</span>
    </Link>
  );
};

export default SelectedDetails;
