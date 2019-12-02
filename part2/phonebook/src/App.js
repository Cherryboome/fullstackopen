import React, { useState } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";

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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newSearch={newSearch} handleSearchChange={handleSearchChange} />
      <h3>Add a new listing</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons searchResults={searchResults} />
    </div>
  );
};

export default App;
