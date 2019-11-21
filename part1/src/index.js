import React from "react";
import ReactDOM from "react-dom";

const App = () => {
  const course = "Half Stack application development";
  const part1 = {
    name: "Fundamentals of React",
    exercises: 10
  };
  const part2 = {
    name: "Using props to pass data",
    exercises: 7
  };
  const part3 = {
    name: "State of a component",
    exercises: 14
  };

  const Header = props => {
    return (
      <div>
        <h1>{props.course}</h1>
      </div>
    );
  };

  const Part = props => {
    return (
      <div>
        <p>
          {props.part} {props.exercise}
        </p>
      </div>
    );
  };

  const Content = () => (
    <>
      <Part part={part1.name} exercise={part1.exercises} />
      <Part part={part2.name} exercise={part2.exercises} />
      <Part part={part3.name} exercise={part3.exercises} />
    </>
  );

  const Total = ({ exercises1, exercises2, exercises3 }) => {
    return (
      <div>
        <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
      </div>
    );
  };

  return (
    <div>
      <Header course={course} />
      <Content />
      <Total
        exercises1={part1.exercises}
        exercises2={part2.exercises}
        exercises3={part3.exercises}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
