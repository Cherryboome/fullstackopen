import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" }
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addPerson = event => {
    event.preventDefault();
    const addPerson = { name: newName, number: newNumber };

    if (
      persons.find(
        person =>
          person.name.toLocaleLowerCase() === newName.toLocaleLowerCase()
      )
    ) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      setNewNumber("");
    } else {
      setPersons(persons.concat(addPerson));
      setNewName("");
      setNewNumber("");
    }
  };

  const handleNameChange = event => {
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  };

  const list = persons.map(person => {
    return (
      <p key={person.name}>
        {person.name} {person.number}
      </p>
    );
  });

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} required />
        </div>
        <div>
          number:
          <input
            type="tel"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            placeholder="040-123-4567"
            value={newNumber}
            onChange={handleNumberChange}
            required
          />
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
