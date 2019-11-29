import React from "react";
import Part from "./Part";

const Course = ({ course }) => {
  const { name, parts } = course;
  return (
    <div>
      <h1>{name}</h1>
      {parts.map(part => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};

export default Course;
