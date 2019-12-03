import React from "react";
import ShowButton from "./ShowButton";

const CountriesList = ({ filterCountries, countries, handleSearchChange }) => {
  const numberWithCommas = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  if (filterCountries.length === countries.length) {
    return <div></div>;
  } else if (filterCountries.length > 10) {
    return <div>Too many matches, specify another filter.</div>;
  } else if (filterCountries.length > 1 && filterCountries.length < 10) {
    return filterCountries.map((country, i) => {
      return (
        <div key={country.name + i}>
          <span>{country.name}</span>
          <span>
            <ShowButton
              value={country.name}
              handleSearchChange={handleSearchChange}
            />
          </span>
        </div>
      );
    });
  }
  return filterCountries.map((country, i) => {
    return (
      <div key={country.name + i}>
        <h2>{country.name}</h2>
        <p>Capital: {country.capital}</p>
        <p>Population: {numberWithCommas(country.population)}</p>
        <h3>Languages</h3>
        <ul>
          {country.languages.map(language => (
            <li key={language.name}>{language.name}</li>
          ))}
        </ul>
        <img
          src={country.flag}
          alt={`${country.name} flag`}
          style={{ width: "10%" }}
        />
      </div>
    );
  });
};

export default CountriesList;
