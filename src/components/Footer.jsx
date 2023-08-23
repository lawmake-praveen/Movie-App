import React from "react";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="footer">
      <p>
        This site was created By{" "}
        <a href="https://lawmake.vercel.app/" target="_blank">
          Lawmake Praveen,{" "}
        </a>
        using React and the&nbsp;
        <a href="https://www.themoviedb.org" target="_blank">
          TMDB API.
        </a>
      </p>
      <div className="social">
        <a href="https://github.com/lawmake-praveen" target="_blank">
          <span className="icon">
            <AiFillGithub />
          </span>
        </a>
        <a
          href="https://www.linkedin.com/in/lawmake-praveen-928a15239/"
          target="_blank"
        >
          <span className="icon">
            <AiFillLinkedin />
          </span>
        </a>
      </div>
    </div>
  );
};

export default Footer;
