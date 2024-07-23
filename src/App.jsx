import { useState } from "react"

import GetGeoposition from "./components/GetGeoposition"
import "./styles/App.css"

function App() {
  const [location, setLocation] = useState(null);

  function handleLocationReceived(location){
    setLocation(location);
  }

  return (
  <>
    <GetGeoposition onLoactionReceived={handleLocationReceived}/>
  </>
  )
}

export default App