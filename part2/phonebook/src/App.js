import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const addName = event => {
    event.preventDefault();
    const addPerson = { name: newName };

    setPersons(persons.concat(addPerson));
    setNewName("");
  };

  const handleNameChange = event => {
    setNewName(event.target.value);
  };

  const list = persons.map(person => {
    return <p key={person.name}>{person.name}</p>;
  });

  return (
    <div>
      <div>debug: {newName}</div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {list}
    </div>
  );
};

export default App;
