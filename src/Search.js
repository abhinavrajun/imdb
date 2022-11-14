import { useState } from "react";
import "./App.css";
const Search = ({ search, setSearch }) => {
  const handlechange = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-input"
        value={search}
        onChange={handlechange}
      />
    </div>
  );
};
export default Search;
