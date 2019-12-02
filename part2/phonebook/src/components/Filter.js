import React from "react";

const Filter = ({ newSearch, handleSearchChange }) => {
  return (
    <div>
      Search the phonebook:{" "}
      <input value={newSearch} onChange={handleSearchChange} />
    </div>
  );
};

export default Filter;
