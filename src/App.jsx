import { useState } from "react";

import GetGeoposition from "./components/GetGeoposition";
import GetCityId from "./components/GetCityId";
import Weather from "./components/Weather";

import "./styles/App.css";

function App() {
  const [location, setLocation] = useState(null);
  const [cityLocal, setCityLocal] = useState(null);
  const [cityId, setCityId] = useState(null);

  function handleLocationReceived(location) {
    setLocation(location);
  }

  function handleCitylocation(cityLocal){
    setCityLocal(cityLocal);
  }

  function handleCityReceived(cityId) {
    setCityId(cityId);
  }

  return (
    <>
      <GetGeoposition onLocationReceived={handleLocationReceived} />
      {location && (
        <GetCityId
          latitude={location.latitude}
          longitude={location.longitude}
          onCityReceived={handleCityReceived}
          onCityLocationReceived={handleCitylocation}
        />
      )}
      {cityId &&(
        <Weather cityId={cityId} local={cityLocal}></Weather>
      )}
    </>
  );
}

export default App;
