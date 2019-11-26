import React, { useState } from "react";
import Button from "./button/Button";
import "./App.css";

const PositiveCalc = ({ good, all }) => {
  let positive;
  if (good === 0 && all === 0) {
    positive = 0;
  } else {
    positive = (good / all) * 100;
  }

  return (
    <div>
      <p>{`positive: ${positive}%`}</p>
    </div>
  );
};

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

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
    setAll(all + 1);
  };

  const handleNeutral = () => {
    setNeutral(neutral + 1);
    setAll(all + 1);
  };

  const handleBad = () => {
    setBad(bad + 1);
    setAll(all + 1);
  };

  return (
    <div className="container">
      <h1>Give Feedback</h1>
      <div className="wrapper">
        <Button text="good" handleClick={handleGood} />
        <Button text="neutral" handleClick={handleNeutral} />
        <Button text="bad" handleClick={handleBad} />
      </div>
      <h1>Statistics</h1>
      <div>
        <p>good: {good}</p>
        <p>neutral: {neutral}</p>
        <p>bad: {bad}</p>
        <p>all: {all}</p>
        <AverageCalc good={good} bad={bad} all={all} />
        <PositiveCalc good={good} all={all} />
      </div>
    </div>
  );
};

export default App;
