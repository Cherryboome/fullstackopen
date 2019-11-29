import React from "react";
import Header from "./Header";
import Part from "./Part";

const Course = ({ courses }) => {
  return (
    <div>
      {courses.map(course => {
        return (
          <div key={course.id}>
            <Header name={course.name} />
            {course.parts.map(part => (
              <Part key={part.id} name={part.name} exercises={part.exercises} />
            ))}
            <h4>
              total of{" "}
              {course.parts.reduce((sum, part) => sum + part.exercises, 0)}{" "}
              exercises
            </h4>
          </div>
        );
      })}
    </div>
  );
};

export default Course;
