import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import Notification from './components/Notification';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './server/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((persons) => {
      setPersons(persons);
      console.log('Got it!');
    });
  }, []);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
    console.log(e.target.value);
  };

  const addNewPerson = (e) => {
    e.preventDefault();
    const newPerson = { name: newName, number: newNumber };
    const message = `${newPerson.name} is already added to the phonebook, replace the old number with a new one?`;
    const personNames = persons.map((person) => person.name);
    if (personNames.includes(newPerson.name)) {
      const result = window.confirm(message);
      if (result) {
        const person = persons.find((p) => p.name === newPerson.name);
        const changedPerson = { ...person, number: newPerson.number };
        personService
          .update(person.id, changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== changedPerson.id ? person : returnedPerson
              )
            );
            setMessage(`Updated ${returnedPerson.name}'s number!`);
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          })
          .catch((error) => {
            setErrorMessage(
              `Information of ${newPerson.name} has already been removed from server`
            );
            setPersons(
              persons.filter((person) => person.id !== changedPerson.id)
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          });
      }
    } else {
      personService.create(newPerson).then((person) => {
        setPersons(persons.concat(person));
        setMessage(`Added ${person.name}!`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
    }
    setNewName('');
    setNewNumber('');
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
    console.log(newNumber);
  };

  const handleSearch = (e) => {
    if (search !== '') {
      setShowAll(false);
    } else {
      setShowAll(true);
    }
    setSearch(e.target.value);
  };

  const deletePerson = (id) => {
    console.log(`${id} should be deleted!`);
    personService.deleteReq(id).then((res) => {
      const newPersons = persons.filter((person) => person.id !== id);
      setPersons(newPersons);
      console.log('success!');
    });
  };

  const personsToShow = showAll
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().includes(search.toLowerCase())
      );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} errorMessage={errorMessage} />
      <Filter search={search} handleSearch={handleSearch} />
      <h2>Add New</h2>
      <PersonForm
        formSubmit={addNewPerson}
        nameValue={newName}
        nameChange={handleNameChange}
        numberValue={newNumber}
        numberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons showPersons={personsToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
