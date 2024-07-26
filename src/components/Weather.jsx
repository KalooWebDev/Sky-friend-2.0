/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"

function Weather({ cityId, cityLocation, cityName }){
    const [error, setError] = useState(null);

    const [weather, setWeather] = useState(null);

    const API_KEY = import.meta.env.VITE_API_KEY;
    const URL = `http://dataservice.accuweather.com/currentconditions/v1/${cityId}?apikey=${API_KEY}&language=pt-br&details=true`;

    useEffect(() => {
        async function getWeather(){
            try{
                const response = await fetch(URL);
                if(!response.ok){
                    throw new Error("Failed in Current Weather API");
                }
                const data = await response.json();
                console.log(data);
                setWeather(data[0].WeatherText);
            } catch (err){
                setError(err.message)
            }
        }
        getWeather();
    }, []);

    if(error){
        return <h1>{error}</h1>
    }

    return(
        <>
            <h3>{cityLocation}</h3>
            <h1>{cityName}</h1>
            <h1>Clima Atual</h1>
            <h2>{weather}</h2>
        </>
    )
}

export default Weather