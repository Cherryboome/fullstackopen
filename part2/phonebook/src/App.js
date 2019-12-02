import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123-4567" },
    { name: "Ada Lovelace", number: "639-444-5323" },
    { name: "Dan Abramov", number: "126-430-2343" },
    { name: "Mary Poppendieck", number: "239-232-6423" }
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [showAll, setShowAll] = useState(true);

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

  const handleNameChange = event => setNewName(event.target.value);

  const handleNumberChange = event => setNewNumber(event.target.value);

  const handleSearchChange = event => {
    setNewSearch(event.target.value);
    setShowAll(false);
  };

  const searchResults = showAll
    ? persons
    : persons.filter(person => {
        let filteredName = person.name.toLocaleLowerCase();
        let searchName = newSearch.toLowerCase();
        return filteredName.includes(searchName);
      });

  const list = searchResults.map(person => {
    return (
      <p key={person.name}>
        {person.name} {person.number}
      </p>
    );
  });

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Search the phonebook:{" "}
        <input value={newSearch} onChange={handleSearchChange} />
      </div>
      <h2>Add a new listing</h2>
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
