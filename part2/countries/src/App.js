import React, { useState, useEffect } from "react";
import axios from "axios";

import Filter from "./components/Filter";
import CountriesList from "./components/CountriesList";

require("dotenv").config();

const App = () => {
  const [countries, setCountries] = useState([]);
  const [newSearch, setNewSearch] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [weather, setWeather] = useState([]);
  const [capital, setCapital] = useState("New York");

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      setCountries(response.data);
    });
  }, []);

  useEffect(() => {
    const params = {
      access_key: process.env.REACT_APP_ACCESS_KEY,
      query: capital
    };

    axios
      .get("http://api.weatherstack.com/current", { params })
      .then(response => {
        const apiResponse = response.data;
        setWeather(apiResponse);
        // console.log(
        //   `Current temperature in ${apiResponse.location.name} is ${apiResponse.current.temperature}℃`
        // );
      })
      .catch(error => {
        console.log(error);
      });
  }, [capital]);

  const filterCountries = showAll
    ? countries
    : countries.filter(country => {
        let name = country.name.toLowerCase();
        let searchResult = newSearch.toLocaleLowerCase();
        return name.includes(searchResult);
      });

  const handleSearchChange = event => {
    setNewSearch(event.target.value);
    setShowAll(false);
  };

  const handleCapitalChange = capital => setCapital(capital);

  return (
    <div>
      <Filter newSearch={newSearch} handleSearchChange={handleSearchChange} />
      <CountriesList
        filterCountries={filterCountries}
        countries={countries}
        handleSearchChange={handleSearchChange}
        handleCapitalChange={handleCapitalChange}
        weather={weather}
      />
    </div>
  );
};

export default App;
