/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"

function GetGeoposition({ onLocationReceived }){
    const [error, setError] = useState(null);

    useEffect(() => {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                onLocationReceived({latitude, longitude});
            },
            (err) => {
                setError(`Permission Danied Error: ${err.message}`);
            }
        );
        } else {
            return(
                setError("Seu navegador não suporta a Geolocalização")
            );
        }
    }, []);

    if(error){
        return (
            <h1>{error}</h1>
        );
    }

    return null;
}

export default GetGeoposition;