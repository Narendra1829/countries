import React from "react";

const SearchBar = (props) => {
  const { setQuery } = props;
  return (
    <div className="search-container">
      <i className="fa-solid fa-magnifying-glass"></i>
      <input
        onChange={(e) => setQuery(e.target.value.toLowerCase())}
        type="text"
        placeholder="Search for a country..."
      />
    </div>
  );
};

export default SearchBar;
