import { useState, useEffect } from 'react'
import axios from 'axios'

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

const Person = ({person}) => (
  <p>{person.name} {person.number}</p>
)

const Persons = ({filterDisplay}) => (
  <div>
    {filterDisplay.map(person => <Person key={person.id} person={person} />)}
  </div>
)

const App = () => {
  // States
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilter] = useState('')

  const baseUrl = 'http://localhost:3001/persons'
  
  // Event handlers
  const addName = (event) => {
    event.preventDefault()
    console.log('Button clicked', event.target);

    if (persons.some(person => person.name === newName)) {
      console.log('Cannot add it')
      alert(`${newName} is already added to phonebook`)
    }

    else {
      const personObject = {
        name: newName,
        number: newNumber,
      }
      
      axios
        .post(baseUrl, personObject)
        .then(response => {
        setPersons(persons.concat(response.data)),
        setNewName(''),
        setNewNumber('')
      })
      .catch(error => {
        console.log('Error saving person', error)
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
    axios
      .get(baseUrl)
      .then((response) => {
        console.log('promise fullfilled')
        setPersons(response.data)
      }).catch((err) => {
        console.log(err)
      })
  }, [])

  // Intereface
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
      <Persons filterDisplay={filterDisplay}/>
    </div>
  )
}

export default App