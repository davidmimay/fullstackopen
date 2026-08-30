import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

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
        }
        setPersons(persons.concat(personObject))
        setNewName('')    
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div><i>debug: {newName}</i></div>
      {persons.map(person => <p key={person.name}>{person.name}</p>)}
    </div>
  )
}

export default App