import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = props => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(
    Array.apply(null, new Array(anecdotes.length)).map(
      Number.prototype.valueOf,
      0
    )
  );

  const handleClick = array => {
    const random = Math.round(Math.random() * (array.length - 1));
    setSelected(random);
  };

  const handleVote = array => {
    const votesCopy = [...votes];
    for (let i = 0; i < array.length; i++) {
      if (array[i] === array[selected]) {
        votesCopy[i] += 1;
      }
    }

    setVotes(votesCopy);
  };

  const mostVotes = array => {
    const max = Math.max(...array);
    return array.map((item, index) => {
      if (item === max && max !== 0) {
        return (
          <div key={index}>
            <div>{props.anecdotes[index]}</div>
            <div>
              <p>has {max} votes</p>
            </div>
          </div>
        );
      } else {
        return null;
      }
    });
  };

  return (
    <>
      <div>
        <h1>Anecdote of the day</h1>
      </div>
      <div>{props.anecdotes[selected]}</div>
      <div>
        <p>has {votes[selected]} votes</p>
      </div>
      <div>
        <button
          onClick={() => handleVote(anecdotes)}
          style={{ marginRight: "5px" }}
        >
          Vote
        </button>
        <button onClick={() => handleClick(anecdotes)}>Next anecdote</button>
      </div>
      <div>
        <h1>Anecdote with most votes</h1>
      </div>
      {mostVotes(votes)}
    </>
  );
};

export default App;

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
