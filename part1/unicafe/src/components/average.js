import React from "react";

const AverageCalc = ({ text, good, bad, all }) => {
  let average;
  if (all === 0) {
    average = 0;
  } else {
    average = (good - bad) / all;
  }

  return (
    <div>
      <p>{`${text}: ${average}`}</p>
    </div>
  );
};

export default AverageCalc;
