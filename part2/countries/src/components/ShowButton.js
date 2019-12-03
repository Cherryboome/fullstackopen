import React from "react";

const ShowButton = ({ value, handleSearchChange }) => {
  return (
    <div style={{ display: "inline-block", padding: "5px" }}>
      <button value={value} onClick={event => handleSearchChange(event)}>
        Show
      </button>
    </div>
  );
};

export default ShowButton;
