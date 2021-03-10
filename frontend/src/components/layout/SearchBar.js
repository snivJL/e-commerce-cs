import React from "react";

const SearchBar = ({ classes }) => {
  return (
    <>
      <div className={`searchbar ${classes}`}>
        <input
          className="searchbar-input"
          type="text"
          placeholder="What are you looking for ?"
        />
        <i className="fa fa-search icon-searchbar"></i>
      </div>
    </>
  );
};

export default SearchBar;
