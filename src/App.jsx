import { useState } from "react";

import GetGeoposition from "./components/GetGeoposition";
import GetCityId from "./components/GetCityId";
import Search from "./components/Search";
import Weather from "./components/Weather";
import WeatherDetails from "./components/WeatherDetails";

import "./styles/App.css";

function App() {
  const [location, setLocation] = useState(null);
  const [city, setCity] = useState(null);
  const [response, setResponse] = useState(null);

  function handleLocationReceived(location) {
    setLocation(location);
  }

  function handleCityReceived(city) {
    setCity(city);
  }

  function handleResponseReceived(data) {
    setResponse(data);
  }

  return (
    <main className="container">
      <section>
        <GetGeoposition onLocationReceived={handleLocationReceived} />
        <header>
          <Search onCityReceived={handleCityReceived}></Search>
        </header>
        {location && (
          <GetCityId
            latitude={location.latitude}
            longitude={location.longitude}
            onCityReceived={handleCityReceived}
          />
        )}
        <main>
          {city && (
            <Weather
              cityId={city.cityId}
              cityLocation={city.cityLocation}
              cityName={city.cityName}
              weatherData={handleResponseReceived}
            ></Weather>
          )}
        </main>
      </section>
      <section>
        {response && <WeatherDetails data={response}></WeatherDetails>}
      </section>
    </main>
  );
}

export default App;
