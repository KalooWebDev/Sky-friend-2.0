/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"

function GetGeoposition({ onLoactionReceived }){
    const [error, setError] = useState(null);

    useEffect(() => {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                onLoactionReceived({latitude, longitude});
            },
            (Error) => {
                setError(`Permission Danied Error: ${Error}`);
            }
        );
        } else {
            return(
                <h1>Seu navegador não suporta a Geolocalização</h1>
            )
        }
    }, []);

    if(error){
        return (
            <h1>{error}</h1>
        )
    }

    return null;
}

export default GetGeoposition