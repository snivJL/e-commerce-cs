import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const SearchBar = ({ classes, admin }) => {
  const history = useHistory();
  const [keywords, setKeywords] = useState("");
  const handleChange = (e) => setKeywords(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    keywords.trim()
      ? admin
        ? history.push(`/admin/search/${keywords}`)
        : history.push(`/search/${keywords}`)
      : history.push("");
    setKeywords("");
  };
  return (
    <>
      <div className={`searchbar ${classes}`}>
        <form onSubmit={handleSubmit}>
          <input
            className="searchbar-input"
            type="text"
            placeholder={admin ? "Filter" : "What are you looking for ?"}
            onChange={handleChange}
          />
          <i className="fas fa-search"></i>
        </form>
      </div>
    </>
  );
};

export default SearchBar;
