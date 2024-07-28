/* eslint-disable react/prop-types */
/* eslint-disable no-inner-declarations */
import { useState, useEffect } from "react";

function Search({ onCityReceived }) {
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const API_KEY = import.meta.env.VITE_API_KEY;
  const URL = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${searchText}`;

  useEffect(() => {
    if (searchText.length > 3) {
      async function searchCity() {
        try {
          const response = await fetch(URL);
          if (!response.ok) {
            throw new Error("Failed to communicate with API");
          }
          const data = await response.json();
          console.log(data)
          setSuggestions(data);
        } catch (err) {
          setError(err.message);
        }
      }
      searchCity();
    } else {
      setSuggestions([]);
    }
  }, [searchText, URL]);

  function handleTextChange(e) {
    setSearchText(e.target.value);
  }

  async function handleSearchButtonClick() {
    try {
      const response = await fetch(URL);
      if (!response.ok) {
        throw new Error("Failed to communicate with API");
      }
      const data = await response.json();
      if (data.length > 0) {
        const city = data[0]; // Assuming the first result is the most relevant
        handleClick(city);
      } else {
        setError("No cities found");
      }
    } catch (err) {
      setError(err.message);
    }
  }

  function handleClick(city){
    const cityId = city.Key;
    const cityLocation = `${city.Country.LocalizedName}. ${city.AdministrativeArea.LocalizedName}`;
    const cityName = city.LocalizedName;
    onCityReceived({cityId, cityLocation, cityName});
    setSuggestions([]);
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div>
      <input type="text" onChange={handleTextChange} />
      <button onClick={handleSearchButtonClick}>Pesquisar</button>
      <ul>
        {suggestions.map((suggestion) => (
          <li 
            key={suggestion.Key} 
            onClick={() => handleClick(suggestion)}
            >{suggestion.LocalizedName}</li>
        ))}
      </ul>
    </div>
  );
}

export default Search;
