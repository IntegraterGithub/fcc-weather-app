import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
function App() {
  var access = navigator.geolocation;
  var [locationData, setLocation] = useState(null);
  var [tempType, setType] = useState("Celcius");
  if (!locationData) {
    access.getCurrentPosition((data) => {
      var coords = data.coords;
      fetch(
        `https://weather-proxy.freecodecamp.rocks/api/current?lat=${coords.latitude}&lon=${coords.longitude}`
      )
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          setLocation(json);
          console.log(json);
        });
    });
  }
  var changeTempType = () => {
      setType(tempType === 'Celcius' ? 'Farenheight' : 'Celcius')
  }
  var calculateTemperature = () => {
      if(tempType === 'Celcius') return locationData.main.temp;
      return (locationData.main.temp * 1.8) + 32;
  }
  return (
    <div className="App">
      <h1>{locationData ? `Weather in ${locationData.name}, ${locationData.sys.country}` : "Loading..."}</h1>
      {locationData ? (
        <div>
          <h3>{locationData.weather[0].main}</h3>
          <img src={locationData.weather[0].icon} />
          <p>{`${calculateTemperature()}° ${tempType.slice(0, 1)}` }</p>
          <button onClick={changeTempType}>Change to {tempType === 'Celcius' ? 'Farenheight' : 'Celcius'}</button>
        </div>
      ) : null}
    </div>
  );
}

export default App;
