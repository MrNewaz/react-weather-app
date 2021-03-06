import { useState, useEffect } from "react";
import "./App.scss";
import axios from "axios";

function App() {
  const [weather, setWeather] = useState(null);
  const [input, setInput] = useState("");
  useEffect(() => {
    axios
      .get(
        `https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API}&q=Dhaka`
      )
      .then((data) => {
        setWeather(data.data);
        console.log(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //Event
  const weatherInput = (e) => {
    setInput(e.target.value);
    console.log(e.target.value);
  };

  const searchWeather = () => {
    axios
      .get(
        `https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API}&q=${input}`
      )
      .then((data) => {
        setWeather(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {weather && (
        <>
          <h1 className="newaz">Weather by Newaz</h1>
          <div className="box">
            <div className="search">
              <input onChange={weatherInput} type="text" />
              <button onClick={searchWeather}>Search</button>
            </div>
            <div className="weather">
              <h2>
                Location: {weather.location.name},{weather.location.country}
              </h2>

              <h2>Time & Date: {weather.location.localtime}</h2>
              <div className="condition">
                <h2 className="logo">
                  Feels: {weather.current.condition.text}
                  <img src={weather.current.condition.icon} alt="icon" />
                </h2>

                <h2>Temparature: {weather.current.temp_c} deg</h2>
                <h2>Wind Speed: {weather.current.wind_kph} kmph</h2>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
