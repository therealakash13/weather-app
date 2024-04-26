import React, { useState } from "react";
import "./WeatherApp.css";

import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import humidity_icon from "../Assets/humidity.png";
import rain_icon from "../Assets/rain.png";
import search_icon from "../Assets/search.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";

export default function WeatherApp() {
  const [wicon, setWicon] = useState(clear_icon);

  const api_key = "08655e017ab0c6c9c0f30f544c67abb8";

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      return 0;
    }
    // console.log(element[0].value);
    const weatherGeocodeApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&appid=${api_key}`;
    const response = await fetch(weatherGeocodeApiUrl);
    // console.log(response);
    const data = await response.json();
    // console.log(data);
    const lat = data.coord.lat;
    const lon = data.coord.lon;
    // console.log(lat, lon);
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=Metric&appid=${api_key}`;
    const response1 = await fetch(weatherApiUrl);
    const data1 = await response1.json();
    // console.log(data1);

    const location = document.getElementsByClassName("weather-location");
    const humidity = document.getElementsByClassName("humidity-percentage");
    const temp = document.getElementsByClassName("weather-temp");
    const wind = document.getElementsByClassName("wind-speed");

    humidity[0].innerHTML = Math.floor(data1.main.humidity) + " %";
    temp[0].innerHTML = Math.floor(data1.main.temp) + " °C";
    wind[0].innerHTML = Math.floor(data1.wind.speed) + " km/h";
    location[0].innerHTML = data1.name;

    if (data1.weather[0].icon === "01d" || data1.weather[0].icon === "01n") {
      setWicon(clear_icon);
    } else if (
      data1.weather[0].icon === "02d" ||
      data1.weather[0].icon === "02n" ||
      data1.weather[0].icon === "03d" ||
      data1.weather[0].icon === "03n" ||
      data1.weather[0].icon === "04d" ||
      data1.weather[0].icon === "04n"
    ) {
      setWicon(cloud_icon);
    } else if (
      data1.weather[0].icon === "09d" ||
      data1.weather[0].icon === "09n" ||
      data1.weather[0].icon === "10d" ||
      data1.weather[0].icon === "10n" ||
      data1.weather[0].icon === "11d" ||
      data1.weather[0].icon === "11n"
    ) {
      setWicon(rain_icon);
    } else if (
      data1.weather[0].icon === "13d" ||
      data1.weather[0].icon === "13n"
    ) {
      setWicon(snow_icon);
    } else if (
      data1.weather[0].icon === "50d" ||
      data1.weather[0].icon === "50n"
    ) {
      setWicon(drizzle_icon);
    }
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder="Search" />
        <div
          className="search-icon"
          onClick={() => {
            search();
          }}
        >
          <img src={search_icon} alt="search" />
        </div>
      </div>
      <div className="weather-image">
        <img src={wicon} alt="clear" />
      </div>
      <div className="weather-temp"></div>
      <div className="weather-location"></div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="" />
          <div className="data">
            <div className="humidity-percentage"></div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="" />
          <div className="data">
            <div className="wind-speed"></div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
}
