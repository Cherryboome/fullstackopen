import React, { useState, useEffect } from "react";

import "./index.css";

import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Notification from "./components/Notification";

import { getAll, create, deleteObj, update } from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  useEffect(() => {
    getAll().then(initialPersons => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = event => {
    event.preventDefault();
    const addPerson = { name: newName, number: newNumber };
    const filteredPerson = persons.find(
      person => person.name.toLocaleLowerCase() === newName.toLocaleLowerCase()
    );

    const changedNumber = { ...filteredPerson, number: newNumber };

    if (filteredPerson) {
      window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      update(filteredPerson.id, changedNumber)
        .then(returnedPerson => {
          setPersons(
            persons.map(person =>
              person.id !== filteredPerson.id ? person : returnedPerson
            )
          );
          setMessageType("success");

          setErrorMessage(
            `${filteredPerson.name}'s number was successfully updated in the phonebook.`
          );

          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);

          setNewName("");
          setNewNumber("");
        })
        .catch(error => {
          setMessageType("failure");
          setErrorMessage(
            `${filteredPerson.name} cannot be found on the server.`
          );
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    } else {
      create(addPerson).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
        setMessageType("success");
        setErrorMessage(
          `${addPerson.name} was successfully added to the phonebook.`
        );

        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
    }
  };

  const handleNameChange = event => setNewName(event.target.value);

  const handleNumberChange = event => setNewNumber(event.target.value);

  const handleSearchChange = event => {
    setNewSearch(event.target.value);
    setShowAll(false);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      deleteObj(id);
      setPersons(persons.filter(person => person.id !== id));
    }
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
      <Notification message={errorMessage} messageType={messageType} />
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
      <Persons searchResults={searchResults} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
