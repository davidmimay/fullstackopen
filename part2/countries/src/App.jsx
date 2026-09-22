import { useState, useEffect } from 'react'
import countryService from './services/countries'
import axios from 'axios'
import './App.css'

// Components
const Weather = ({capital}) => {
  const [weather, setWeather] = useState(null)
  const apiKey = import.meta.env.VITE_WEATHER_KEY

  console.log('API Key loaded:', apiKey)

  useEffect(() => {
    if (!capital) return

    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${apiKey}`)
    .then(response => {
      setWeather(response.data)
    })
    .catch(error => {
      console.log('Error fetching weather data', error)
    })
  }, [capital, apiKey])

  if (!weather) {
    return null
  }

  const iconCode = weather.weather[0].icon
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`

  return (
    <div className='weather'>
      <h2>Weather in {capital}</h2>
      <p>temperature {weather.main.temp} ºC</p>
      <img src={iconUrl} alt={weather.weather[0].description} />
      <p>wind {weather.wind.speed} m/s</p>
    </div>
  )
}

const CountryDetail = ({country}) => {
  const languages = Object.values(country.languages || {})
  const capital = country.capital ? country.capital[0] : null

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

      {capital && <Weather capital={capital}/>}
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