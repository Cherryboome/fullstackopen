import React from "react";

const Persons = ({ searchResults }) => {
  return searchResults.map(person => {
    return (
      <p key={person.name}>
        {person.name} {person.number}
      </p>
    );
  });
};

export default Persons;
