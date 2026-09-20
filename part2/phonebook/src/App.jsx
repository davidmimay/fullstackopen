import { useState, useEffect } from 'react'
import personService from './services/persons'

// Components
const Filter = ({filterName, handleFilterChange}) => (
  <p>Filter shown with <input value={filterName} onChange={handleFilterChange}/></p>
)

const PersonsForm = ({addName, newName, handleNameChange, newNumber, handleNumberChange}) => (
  <div>
    <form onSubmit={addName}>
      <div>name: <input value={newName} onChange={handleNameChange}/></div>
      <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
      <div><button type="submit">add</button></div>
    </form>
  </div>
)

const Person = ({person, deletePerson}) => (
  <p>
    {person.name} {person.number}
    <button onClick={() => deletePerson(person.id, person.name)}>X</button>
  </p>
)

const Persons = ({filterDisplay, deletePerson}) => (
  <div>
    {filterDisplay.map(person => <Person key={person.id} person={person} deletePerson={deletePerson} />)}
  </div>
)

const App = () => {
  // States
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilter] = useState('')

  // Event handlers
  const addName = (event) => {
    event.preventDefault()
    console.log('Button clicked', event.target);

    const oldName = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())

    if (oldName) {
      console.log('Cannot add it, perhaps update')
      const confirmUpdate = window.confirm(`${newName} is already added to phonebook, want to update?`)
      if (confirmUpdate) {
        const updatedPerson = { ...oldName, number: newNumber}
        personService
          .update(oldName.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== oldName.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
          console.log('Error updating person', error)
          })
      }
    }

    else {
      const personObject = {
        name: newName,
        number: newNumber,
      }
      
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          console.log('Error saving person', error)
        })
    }
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          console.log(`The person ${name} was already deleted from server`, error)
          alert(`${name} was already deleted`)
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  // Array
  const filterDisplay = persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))
  
  // Effect
  useEffect (() => {
    console.log('Effect')
    personService
      .getAll()
      .then(initialPersons => setPersons (initialPersons))
      .catch((err) => {
        console.log(err)
      })
  }, [])

  // Interface
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} handleFilterChange={handleFilterChange}/>
      <PersonsForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <div><i>debug: {newName} {newNumber}</i></div>
      <Persons filterDisplay={filterDisplay} deletePerson={deletePerson}/>
    </div>
  )
}

export default App