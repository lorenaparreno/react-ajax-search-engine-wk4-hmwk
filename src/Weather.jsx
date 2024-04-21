import React, { useState } from "react";
import axios from "axios";
import ReactAnimatedWeather from "react-animated-weather";

export default function SearchEngine() {
  const [city, setCity] = useState("");
  const [temperature, setTemperature] = useState(null);
  const [description, setDescription] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [wind, setWind] = useState(null);
  const [icon, setIcon] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();
    setTemperature(null);
    setDescription(null);
    setHumidity(null);
    setWind(null);
    setIcon(null);

    if (city.trim() === "") {
      alert("Enter a city");
    } else {
      let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
      let units = "metric";
      let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

      axios
        .get(apiUrl)
        .then((response) => {
          setTemperature(response.data.main.temp);
          setDescription(response.data.weather[0].description);
          setHumidity(response.data.main.humidity);
          setWind(response.data.wind.speed);
          setIcon(response.data.weather[0].icon);
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
          alert("Failed to fetch weather data. Please try again.");
        });
    }
  }

  function mapIcon(iconCode) {
    switch (iconCode) {
      case "01d":
        return "CLEAR_DAY";
      case "01n":
        return "CLEAR_NIGHT";
      case "02d":
        return "PARTLY_CLOUDY_DAY";
      case "02n":
        return "PARTLY_CLOUDY_NIGHT";
      case "03d":
      case "03n":
        return "CLOUDY";
      case "04d":
      case "04n":
        return "CLOUDY";
      case "09d":
      case "09n":
        return "RAIN";
      case "10d":
        return "RAIN";
      case "10n":
        return "RAIN";
      case "11d":
        return "RAIN";
      case "11n":
        return "RAIN";
      case "13d":
        return "SNOW";
      case "13n":
        return "SNOW";
      case "50d":
        return "FOG";
      case "50n":
        return "FOG";
      default:
        return "CLEAR_DAY";
    }
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a city"
          value={city}
          onChange={updateCity}
        />
        <input type="submit" value="Search" />
      </form>
      <ul>
        <li>Temperature: {Math.round(temperature)}℃</li>
        <li>Description: {description}</li>
        <li>Humidity: {humidity}%</li>
        <li>Wind: {Math.round(wind)}km/h</li>
        {icon && (
          <ReactAnimatedWeather
            icon={mapIcon(icon)}
            color="black"
            size={64}
            animate={true}
          />
        )}
      </ul>
    </div>
  );
}
