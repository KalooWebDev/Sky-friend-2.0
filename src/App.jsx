import { useState } from "react";

import GetGeoposition from "./components/GetGeoposition";
import GetCityId from "./components/GetCityId";
import Weather from "./components/Weather";

import "./styles/App.css";

function App() {
  const [location, setLocation] = useState(null);
  const [city, setCity] = useState(null);

  function handleLocationReceived(location) {
    setLocation(location);
  }

  function handleCityReceived(city) {
    setCity(city);
  }

  return (
    <>
      <GetGeoposition onLocationReceived={handleLocationReceived} />
      {location && (
        <GetCityId
          latitude={location.latitude}
          longitude={location.longitude}
          onCityReceived={handleCityReceived}
        />
      )}
      {city &&(
        <Weather cityId={city.cityId} cityLocation={city.cityLocation} cityName={city.cityName}></Weather>
      )}
    </>
  );
}

export default App;
