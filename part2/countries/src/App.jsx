import { useState, useEffect } from 'react'
import countryService from './services/countries'
import './App.css'
// Components

const CountryDetail = ({country}) => {
  const languages = Object.values(country.languages || {})

  return (
    <div>
      <h1 className='title'>{country.name.common}</h1>
      <p>Capital: {country.capital ? country.capital.join(', ') : 'N/A'}</p>
      <p>Area: {country.area}</p>

      <h3>Languages:</h3>
      <ul>
        {languages.map(lang => (<li key={lang}>{lang}</li>))}
      </ul>
      <img
        src={country.flags.png}
        alt={`Flag of ${country.name.common}`}
        width="150"
      />
    </div>
  )
}

const CountryList = ({countries, handleShowCountry}) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify more</p>
  }

  if (countries.length === 1) {
    return <CountryDetail country={countries[0]}/>
  }

  return (
    <div className='result'>
      {countries.map(country => (
        <div key={country.cca3}>{country.name.common}
          <button onClick={() => handleShowCountry(country.name.common)}>Show</button>
        </div>
      ))}
    </div>
  )
}

const App = () => {
  // States
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState([])

  // Effect
  useEffect(() => {
    countryService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
      .catch(error => {
        console.log('Error fetching countries', error)
      })
  }, [])

  // Event handlers
  const handleQueryChange = (event) => {
    setQuery(event.target.value)
  }

  const handleShowCountry = (countryName) => {
    setQuery(countryName)
  }

  const filteredCountries = query.trim() === ''
    ? []
    : countries.filter(country => country.name.common.toLowerCase().includes(query.toLocaleLowerCase()))

  return (
    <div>
      <div>
        Find countries <input value={query} onChange={handleQueryChange} />
      </div>
      <div>
        {query.trim() !== '' && <CountryList countries={filteredCountries} handleShowCountry={handleShowCountry} />}
      </div>
    </div>
  )
  
}

export default App