import React from "react";
import PositiveCalc from "./positive";
import AverageCalc from "./average";

const Statistics = ({ good, bad, neutral, all }) => {
  return (
    <div>
      <h1>Statistics</h1>
      <p>good: {good}</p>
      <p>neutral: {neutral}</p>
      <p>bad: {bad}</p>
      <p>all: {all}</p>
      <AverageCalc good={good} bad={bad} all={all} />
      <PositiveCalc good={good} all={all} />
    </div>
  );
};

export default Statistics;
