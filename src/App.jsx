import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

function App() {

  const [ weatherData, setWeatherData ] = useState({})
  const [ isFahrenheit, setIsFahrenheit ] = useState(true)
  const [ isDarkMode, setIsDarkMode ] = useState(false)

  const icons = {

    "clear sky": "/icons/clear-sky.svg",
    "few clouds": "/icons/few-clouds.svg",
    "scattered clouds": "/icons/scattered-clouds.svg",
    "broken clouds": "/icons/broken-clouds.svg",
    "shower rain": "/icons/shower-rain.svg",
    "rain": "/icons/rain.svg",
    "thunderstorm": "/icons/thunderstorm.svg",
    "snow": "/icons/snow.svg",
    "mist": "/icons/mist.svg"

  }

  const changeFc = () => {
     setIsFahrenheit(!isFahrenheit)
  }

  const changeToDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.body.classList.toggle('dark-mode')
  }

useEffect (() =>{
  navigator.geolocation.getCurrentPosition((position) => {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
          
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=4929ea72ba6ebbcdc42ee03f8228b265`)
    .then((resp) => {
      setWeatherData(resp.data)
    })
    .catch((error) => console.error(error))
  });
  
}, []) 

const toKelvin = weatherData.main?.temp;
const toCelcius = Math.round(toKelvin - 273.15)
const toFahrenheit = Math.round((toCelcius * 9/5) + 32)

  return (
    <div className={isDarkMode ? 'dark-mode' : 'light-mode'}>
      <div className="header">
        <h1 className='title'>Weather app</h1>
        {isDarkMode ? (
          <i onClick={changeToDarkMode} className='bx bx-toggle-right bx-lg buttonDarkMode'></i>
        ) : (
          <i onClick={changeToDarkMode} className='bx bx-toggle-left bx-lg buttonDarkMode'></i>
        )}
      </div>
      
      <div className='container'>
        <h2 className='temperature'>{isFahrenheit ? toFahrenheit : toCelcius} {isFahrenheit ? "°F" : "°C"}</h2>
        <img className="image" src={icons[weatherData.weather?.[0].description]} alt="image of weather" />
        <p className='text'>{weatherData.weather?.[0].main}</p>
        <p className='text'>Pressure: {weatherData.main?.pressure}{/* hPa */}</p>

          <div className='container-country'>
            <h2 className='city-country'>{weatherData.name},{weatherData.sys?.country}</h2>
            <p className='text-footer-container'>{weatherData.weather?.[0].description}</p>
          </div>

      </div>
      <button onClick={changeFc}  className='buttonCh'>{isFahrenheit ? "Change to °C" : "Change to °F"}</button>
    </div>
  )
}

export default App
