/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import { formatDate } from "../utils/dateUtils";
import weatherIcons from "../utils/weatherIconsUtils";

function Weather({ cityId, cityLocation, cityName, weatherData }) {
  const [error, setError] = useState(null);

  const [date, setDate] = useState(null);
  const [icon, setIcon] = useState(null);
  const [weather, setWeather] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [realTemperaute, setRealTemperature] = useState(null);

  const API_KEY = import.meta.env.VITE_API_KEY;
  const URL = `http://dataservice.accuweather.com/currentconditions/v1/${cityId}?apikey=${API_KEY}&language=en-us&details=true`;

  useEffect(() => {
    async function getWeather() {
      try {
        const response = await fetch(URL);
        if (!response.ok) {
          throw new Error("Failed in Current Weather API");
        }
        const data = await response.json();
        const condition = data[0].WeatherText;
        const localDate = data[0].LocalObservationDateTime;
        const isDayTime = data[0].IsDayTime;
        const temp = `${data[0].ApparentTemperature.Metric.Value}`;
        const realTemp = `${data[0].RealFeelTemperature.Metric.Value}`;

        setDate(formatDate(localDate));
        setIcon(
          isDayTime
            ? weatherIcons.day[condition]
            : weatherIcons.night[condition]
        );
        setWeather(condition);
        setTemperature(temp);
        setRealTemperature(realTemp);
        weatherData(data);
      } catch (err) {
        setError(err.message);
      }
    }
    getWeather();
  }, [cityId]);

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <>
      <h3>{cityLocation}</h3>
      <h1>{cityName}</h1>
      <h3>{date}</h3>
      <h1>Current Weather</h1>
      {icon && <img src={icon} alt={weather} />}
      <h2>{weather}</h2>
      <h3>C° {temperature}</h3>
      <h4>Feels like C°{realTemperaute}</h4>
    </>
  );
}

export default Weather;
