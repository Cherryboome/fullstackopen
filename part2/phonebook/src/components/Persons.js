import React from "react";
import DeleteButton from "./DeleteButton";

const Persons = ({ searchResults, handleDelete }) => {
  return searchResults.map(person => {
    return (
      <div key={person.name}>
        {person.name} {person.number}{" "}
        <DeleteButton
          id={person.id}
          handleDelete={handleDelete}
          name={person.name}
        />
      </div>
    );
  });
};

export default Persons;
