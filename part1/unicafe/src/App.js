import React, { useState } from "react";
import Button from "./button/Button";
import "./App.css";

import Statistics from "./components/statistics";

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
      <div>
        <h1>Statistics</h1>
        {all === 0 ? (
          <div>
            <p>No feedback given</p>
          </div>
        ) : (
          <div>
            <Statistics good={good} neutral={neutral} bad={bad} all={all} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
