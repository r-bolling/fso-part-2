import axios from 'axios';
import React, { useState, useEffect } from 'react';

const api_key = process.env.REACT_APP_API_KEY;

const Search = ({ search, handleSearch }) => {
  return (
    <>
      find countries{' '}
      <input type="text" value={search} onChange={handleSearch} />
    </>
  );
};

const Content = ({
  countries,
  search,
  showDetails,
  setShowDetails,
  countryCapital,
  handleCapital,
  weather,
  searchQuery,
}) => {
  const singleCountryView = (country) => {
    return (
      <div key={country.alpha3Code}>
        <h1>{country.name}</h1>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <h2>Languages</h2>
        <ul>
          {country.languages.map((language) => (
            <li key={language.iso639_2}>{language.name}</li>
          ))}
        </ul>
        <img src={country.flag} alt={country.name} height="200" width="200" />
      </div>
    );
  };

  const modifyDetails = (country) => {
    const details = [...showDetails];
    let newDetails = [];
    if (details.includes(country)) {
      newDetails = details.filter((data) => data !== country);
      setShowDetails(newDetails);
    } else {
      newDetails = details.concat(country);
      setShowDetails(newDetails);
    }
  };

  const listOfCountries = (country) => {
    return (
      <div key={country.alpha2Code}>
        <p>{country.name}</p>{' '}
        <button onClick={() => modifyDetails(country)}>Show</button>
        {showDetails.includes(country) ? singleCountryView(country) : ''}
      </div>
    );
  };

  const tooManyResults = (_) => <p>Too many results, specify another filter</p>;

  const weatherView = (capital) => {
    return (
      <div key={capital.request.query}>
        <h2>Weather in {capital.request.query}</h2>
        <br />
        temperature: {capital.current.temperature} Celcius
        <br />
        <img
          src={capital.current.weather_icons[0]}
          alt={capital.current.weather_descriptions[0]}
        />
        <br />
        wind: {capital.current.wind_speed} mph direction{' '}
        {capital.current.wind_dir}
      </div>
    );
  };

  const showCountries =
    search === ''
      ? ''
      : searchQuery().length === 1
      ? searchQuery().map((country) => {
          return (
            <div key={country.capital}>
              {singleCountryView(country)}
              {console.log(weather)}
              {weather.map((data) => weatherView(data))}
            </div>
          );
        })
      : searchQuery().length > 10
      ? tooManyResults()
      : searchQuery().map((country) => listOfCountries(country));

  return <>{showCountries}</>;
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [showDetails, setShowDetails] = useState([]);
  const [weather, setWeather] = useState([]);
  const [countryCapital, setCountryCapital] = useState('');

  const getCountries = () => {
    axios.get('https://restcountries.eu/rest/v2/all').then((res) => {
      setCountries(res.data);
      console.log(res.data);
    });
  };

  const getWeather = (capital) => {
    const searchQueryEffect = () => {
      return countries.filter((country) =>
        country.name.toLowerCase().includes(search.toLowerCase())
      );
    };

    if (searchQueryEffect().length === 1) {
      console.log('success!');
      capital = searchQueryEffect().map((country) => country.capital);
      console.log(capital);
      axios
        .get(
          `http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`
        )
        .then((res) => {
          if (res.status === 200) {
            setWeather(new Array(res.data));
            console.log(res.data);
            console.log('capital');
          }
        });
    }
    console.log('failure!');
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const searchQuery = () => {
    return countries.filter((country) =>
      country.name.toLowerCase().includes(search.toLowerCase())
    );
  };

  const handleCapital = (capital) => {
    setCountryCapital(capital);
  };

  useEffect(getCountries, []);
  useEffect(getWeather, [search, countryCapital, countries]);

  return (
    <>
      <Search handleSearch={handleSearch} search={search} />
      <Content
        countries={countries}
        search={search}
        showDetails={showDetails}
        setShowDetails={setShowDetails}
        countryCapital={countryCapital}
        handleCapital={handleCapital}
        weather={weather}
        searchQuery={searchQuery}
      />
    </>
  );
};

export default App;
