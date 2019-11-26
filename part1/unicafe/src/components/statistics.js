import React from "react";
import Statistic from "./statistic";

const Statistics = ({ good, neutral, bad, all }) => {
  return (
    <div>
      <Statistic text="good" value={good} />
      <Statistic text="neutral" value={neutral} />
      <Statistic text="bad" value={bad} />
      <Statistic text="all" value={all} />
      <Statistic text="average" value={(good - bad) / all} />
      <Statistic text="positive" value={(good / all) * 100 + "%"} />
    </div>
  );
};

export default Statistics;
