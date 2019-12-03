import React from "react";

const Weather = ({ weather }) => {
  return (
    <div>
      <h3>Weather in {weather.location.name}</h3>
      <div>
        <b>temperature:</b> {`${weather["current"].temperature} Celsius`}
      </div>
      <img
        src={weather["current"].weather_icons[0]}
        alt={weather["current"].weather_descriptions[0]}
      />
      <div>
        <b>wind:</b> {weather["current"].wind_speed} kph direction{" "}
        {weather["current"].wind_dir}
      </div>
    </div>
  );
};

export default Weather;
