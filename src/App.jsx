import { useState } from "react";

import GetGeoposition from "./components/GetGeoposition";
import GetCityId from "./components/GetCityId";

import "./styles/App.css";

function App() {
  const [location, setLocation] = useState(null);
  const [cityId, setCityId] = useState(null);

  function handleLocationReceived(location) {
    setLocation(location);
    console.log(location);
  }

  function handleCityReceived(cityId) {
    setCityId(cityId);
    console.log(cityId);
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
    </>
  );
}

export default App;
