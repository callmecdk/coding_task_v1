import React, { useState, useEffect } from 'react';
import axios from 'axios';
import clear from './assets/clear.png';
import cloudy from './assets/cloudy.png';
import haze from './assets/haze.png';
import partly from './assets/partly_cloudy.png';
import error from './assets/error.jpg';

function App() {
  const [data, setData] = useState([]);
  const [currentWeather, setCurrentWeather] = useState([]);
  const [isHighlighted, setHighlighted] = useState(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const url = "http://localhost:5000/api/weather";

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  useEffect(() => {
    axios.get(url).then((response) => {
      const icons = [clear, cloudy, haze, partly,];
      const jsonData = response.data;
      if (jsonData.length !== 0) {
        console.log(jsonData.length);
        jsonData.forEach((obj, index) => {
          obj.id = index + 1;
          console.log(getRandomInt(3));
          obj.icon = icons[getRandomInt(4)];
        });
        setData(jsonData);
        setCurrentWeather(jsonData[0]);
        setHighlighted(0);
        setIsDataLoaded(true);
      } else {
        console.log('No data found');
        setIsDataLoaded(false);
      }
    }).catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error Message: ', error.message);
      }
    });
  }, []);

  const handleWeather = (e) => {
    setCurrentWeather([]);
    setCurrentWeather(data[e.currentTarget.dataset.index]);
    setHighlighted(parseInt(e.currentTarget.dataset.index, 10));
  }

  return (
    <div className="app">
      {isDataLoaded ? (
      <div className="container">
          <div className="top">
            <div className='display'>
              <div className="location">
                <p>{currentWeather['Date']}</p>
              </div>
              <div className="temp">
                <h1>{currentWeather.Max}°C</h1>
              </div>
            </div>
            <div className="current-weather">
              <div>
                <div className="current-weather_value">{currentWeather.Max}°C</div>
                <div className="current-weather_label">High</div>
                <div className="current-weather_value">{currentWeather.Min}°C</div>
                <div className="current-weather_label">Low</div>
              </div>
              <div>
                <div className="current-weather_value">{currentWeather.Humdidity}</div>
                <div className="current-weather_label">Humidity</div>
                <div className="current-weather_value">{currentWeather['Chance of rainfall']}</div>
                <div className="current-weather_label">Rain</div>
              </div>
            </div>
          </div><div className="weather-date">
              <h2 className='weather-date_heading'>10-DAY FORECAST</h2>
              <div className="weather-date_container">
                {data.map(
                  function (weather, index) {
                    return (
                      <div className={`weather-date_row ${isHighlighted === index ? 'highlighted' : ''}`} key={weather.id} data-index={index} onClick={handleWeather}>
                        <div className="weather-date_date">
                          {weather['Date'].split(',')[0]}
                          <div className="weather-date_label">
                            {weather['Date'].split(',')[1]}
                          </div>
                        </div>
                        <div className="weather-date_low">
                          {weather.Min}°C
                          <div className="weather-date_label">Low</div>
                        </div>
                        <div className="weather-date_high">
                          {weather.Max}°C
                          <div className="weather-date_label">High</div>
                        </div>

                        <div className="weather-date_icon">
                          <img src={weather.icon} alt="" />
                        </div>

                        <div className="weather-date_rain">
                          {weather['Chance of rainfall']}
                          <div className="weather-date_label">Rain</div>
                        </div>

                        <div className="weather-date_humidity">
                          {weather.Humdidity}
                          <div className="weather-date_label">Humidity</div>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
      </div>
    ) : (
      <div className="error">
        <img src={error} alt="" />
      </div>
    )}
 </div>

  );
}

export default App;
