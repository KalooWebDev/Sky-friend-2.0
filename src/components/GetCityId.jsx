/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

function GetCityId({ latitude, longitude, onCityReceived, onCityLocationReceived }) {
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_API_KEY;
  const URL = `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${latitude},${longitude}&language=pt-br`;

  useEffect(() => {
    async function getId() {
      try {
        const response = await fetch(URL);
        if (!response.ok) {
          throw new Error("Failed to comunicate to API");
        }
        const data = await response.json();
        console.log(data);
        const cityId = data.Key;
        onCityReceived(cityId);
        const cityLocation = `${data.Country.LocalizedName}. ${data.AdministrativeArea.LocalizedName}`;
        onCityLocationReceived(cityLocation);
      } catch (err) {
        setError(err.message);
      }
    }
    getId();
  }, []);

  if(error){
    return(
        <h1>Error: {error}</h1>
    )
  }
}

export default GetCityId;
