import React, { useState } from "react";
function SearchForm({ handleSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  function checkSubmit(event) {
    event.preventDefault();

    if (event.key === "Enter") {
      handleSearch(searchQuery);
    }
  }

  return (
    <div className="search-form-wrapper">
      <form onSubmit={checkSubmit}>
        <input
          type="text"
          placeholder="Search for dishes, ingredients"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyUp={checkSubmit}
        />
        <button>Search</button>
      </form>
    </div>
  );
}

export default SearchForm;
