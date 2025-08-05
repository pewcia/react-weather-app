import React, { useState } from "react";
import axios from "axios";

export default function Form() {
  let [city, setCity] = useState("");
  let [forecast, setForecast] = useState(null);

  function cityChange(event) {
    setCity(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setForecast(null);

    let apiKey = "bb203f4a92e7t89f33c44201bd2fbfoa";
    let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
    axios.get(url).then(showForecast);
    console.log(url);
  }

  function showForecast(response) {
    console.log(response);
    setForecast({
      temperature: response.data.temperature,
      condition: response.data.condition,
      wind: response.data.wind,
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="Type a city.."
          value={city}
          onChange={cityChange}
          className="form-search"
        />
        <input className="form-button" type="submit" value="Search" />
      </form>

      {forecast && (
        <div className="forecast">
            <div className="forecast-text">
          <h3>Weather forecast:</h3>
          <p> Temperature: {Math.round(forecast.temperature.current)}°C </p>
          <p> Description: {forecast.condition.description} </p>
          <p> Humidity: {forecast.temperature.humidity} % </p>
          <p> Wind: {Math.round(forecast.wind.speed)} km/h </p>
          </div>
          <div className="forecast-icon">
          <img src={forecast.condition.icon_url} />
          </div>
        </div>
      )}
    </div>
  );
}
