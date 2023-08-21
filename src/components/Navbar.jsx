import { useState, useEffect, useRef } from "react";
import image from "../assets/tmdb-logo.svg";
import { BiSearchAlt2 } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {
  searchInputUpdate,
  pageChange,
  searchMovie,
} from "../features/movieSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(false);
  const navigate = useNavigate();

  const value = useSelector((state) => state.movie.searchInput);
  const page = useSelector((state) => state.movie.currentPage);

  const [inputValue, setInputValue] = useState("");
  const [searchTab, setSearchTab] = useState(false);
  const [currentPage, setCurrentPage] = useState("All");

  useEffect(() => {
    if (searchTab) {
      inputRef.current.focus();
    }
  }, [searchTab]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue) {
      dispatch(searchInputUpdate(inputValue));
      console.log(inputValue);
      dispatch(searchMovie(inputValue));
      navigate(`/search/${inputValue}`);
    }
  };

  const currentPageChange = (e) => {
    console.log(e.target.value);
    setCurrentPage(e.target.value);
    // dispatch(pageChange(currentPage));
    navigate(e.target.value);
  };

  return (
    <div className="navbar">
      <div className="logo-div">
        <img src={image} alt="TMDB logo" />
      </div>
      <div className="right-div">
        <select
          className="change-genre"
          value={currentPage}
          onChange={currentPageChange}
        >
          <option value="/">All</option>
          <option value="/discover/movie">Movies</option>
          <option value="/discover/tv">TV Shows</option>
        </select>
        <span className="search-icon" onClick={() => setSearchTab(!searchTab)}>
          <BiSearchAlt2 />
        </span>
      </div>
      <form
        className={`search-tab ${searchTab ? "show-search-tab" : ""}`}
        onSubmit={handleSubmit}
      >
        <input
          ref={inputRef}
          type="text"
          placeholder="Search"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">
          <BiSearchAlt2 className="icon" />
        </button>
      </form>
    </div>
  );
};

export default Navbar;
