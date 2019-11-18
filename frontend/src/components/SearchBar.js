import React from "react";

const SearchBar = ({ handleChange }) => {
  return (
    <React.Fragment>
      <input
        name="searchTerm"
        className="my-1 mx-auto"
        type="text"
        placeholder="Enter Search Term"
        onChange={handleChange}
      ></input>
    </React.Fragment>
  );
};

export default SearchBar;
