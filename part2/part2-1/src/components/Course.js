import React from "react";
import Part from "./Part";

const Course = ({ course }) => {
  const { name, parts } = course;

  const sum = parts.reduce((sum, part) => {
    return sum + part.exercises;
  }, 0);

  return (
    <div>
      <h1>{name}</h1>
      {parts.map(part => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
      <div>
        <h4>total of {sum} exercises</h4>
      </div>
    </div>
  );
};

export default Course;
