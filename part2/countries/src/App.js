import React, { useState, useEffect } from "react";
import axios from "axios";

import Filter from "./components/Filter";
import CountriesList from "./components/CountriesList";

function App() {
  const [countries, setCountries] = useState([]);
  const [newSearch, setNewSearch] = useState("");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      setCountries(response.data);
    });
  }, []);

  console.log(countries);

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

  return (
    <div>
      <Filter newSearch={newSearch} handleSearchChange={handleSearchChange} />
      <CountriesList filterCountries={filterCountries} />
    </div>
  );
}

export default App;
