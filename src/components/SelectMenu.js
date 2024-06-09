import React from "react";

const SelectMenu = ({ setQuery }) => {
  return (
    <select
      className="filter-by-region"
      onChange={(e) => {
        console.log("event,", e.target.value.toLowerCase());
        setQuery(e.target.value);
      }}>
      <option hidden>Filter by Region</option>
      <option value="Africa">Africa</option>
      <option value="America">Americas</option>
      <option value="Asia">Asia</option>
      <option value="Europe">Europe</option>
      <option value="Oceania">Oceania</option>
    </select>
  );
};

export default SelectMenu;
