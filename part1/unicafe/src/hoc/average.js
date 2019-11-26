import React from "react";

const AverageCalc = ({ good, bad, all }) => {
  let average;
  if (all === 0) {
    average = 0;
  } else {
    average = (good - bad) / all;
  }

  return (
    <div>
      <p>{`average: ${average}`}</p>
    </div>
  );
};

export default AverageCalc;
