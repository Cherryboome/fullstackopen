import React from "react";

const ShowButton = ({ countryView }) => {
  return (
    <div style={{ display: "inline-block", padding: "5px" }}>
      <button onClick={countryView}>Show</button>
    </div>
  );
};

export default ShowButton;
