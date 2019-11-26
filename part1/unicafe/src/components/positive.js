import React from "react";

const PositiveCalc = ({ text, good, all }) => {
  let positive;
  if (good === 0 && all === 0) {
    positive = 0;
  } else {
    positive = (good / all) * 100;
  }

  return (
    <div>
      <p>{`${text}: ${positive}%`}</p>
    </div>
  );
};

export default PositiveCalc;
