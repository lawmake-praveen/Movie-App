import { useState, useEffect, useRef } from "react";
import image from "../assets/tmdb-logo.svg";
import { BiSearchAlt2 } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { fetchSearch } from "../features/movieSlice";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";

const Navbar = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(false);
  const navigate = useNavigate();

  const [searchTab, setSearchTab] = useState(false);

  useEffect(() => {
    if (searchTab) {
      inputRef.current.focus();
    }
  }, [searchTab]);

  const handleSearch = (e) => {
    e.preventDefault();

    if (e.target[0]?.value) {
      setSearchTab(false);

      dispatch(fetchSearch({ searchInput: e.target[0]?.value, page: 1 }));
      navigate(`/search/${e.target[0]?.value}`);

      inputRef.current.value = "";
    }
  };

  const currentPageChange = (e) => {
    setSearchTab(false);
    navigate(e.value);
  };

  const options = [
    { value: "/", label: "All" },
    { value: "/discover/movie", label: "Movies" },
    { value: "/discover/tv", label: "TV Shows" },
  ];

  return (
    <div className="navbar">
      <div className="logo-div">
        <Link to="/">
          <img src={image} alt="TMDB logo" />
        </Link>
      </div>
      <div className="right-div">
        <Select
          isSearchable={false}
          defaultValue={options[0]}
          options={options}
          onChange={currentPageChange}
          placeholder="All"
          name="genre"
          className="change-genre"
          classNamePrefix="react-select"
        />
        <span className="search-icon" onClick={() => setSearchTab(!searchTab)}>
          <BiSearchAlt2 />
        </span>
      </div>
      <form
        className={`search-tab ${searchTab ? "show-search-tab" : ""}`}
        onSubmit={handleSearch}
      >
        <input ref={inputRef} type="text" placeholder="Search" />
        <button type="submit">
          <BiSearchAlt2 className="icon" />
        </button>
      </form>
    </div>
  );
};

export default Navbar;
