import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import Loader from './components/Loader'
import DarkMode from './components/DarkMode'

function App() {

  const [ weatherData, setWeatherData ] = useState({})
  const [ isFahrenheit, setIsFahrenheit ] = useState(true)
  const [ isDarkMode, setIsDarkMode ] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const icons = {

    "01d": "/icons/01d.svg",
    "02d": "/icons/02d.svg",
    "03d": "/icons/03d.svg",
    "04d": "/icons/04d.svg",
    "09d": "/icons/09d.svg",
    "10d": "/icons/10d.svg",
    "11d": "/icons/11d.svg",
    "13d": "/icons/13d.svg",
    "50d": "/icons/50d.svg",
    "01n": "/icons/01n.png",
    "02n": "/icons/02n.png",
    "03n": "/icons/03n.svg",
    "04n": "/icons/04n.svg",
    "09n": "/icons/09n.svg",
    "10n": "/icons/10n.svg",
    "11n": "/icons/11n.svg",
    "13n": "/icons/13n.svg",
    "50n": "/icons/50n.svg"

  }

  const changeFc = () => {
     setIsFahrenheit(!isFahrenheit)
  }

  const changeToDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

useEffect (() =>{
  navigator.geolocation.getCurrentPosition((position) => {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
   /*  (`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=4929ea72ba6ebbcdc42ee03f8228b265`) */
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=4929ea72ba6ebbcdc42ee03f8228b265`)
    .then((resp) => {
      setWeatherData(resp.data)
      setIsLoading(false)
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
        <DarkMode isDarkMode={isDarkMode} onClick={changeToDarkMode} />
      </div>
      
      <div className='container'>
        <h2 className='temperature'>{isFahrenheit ? toFahrenheit : toCelcius} {isFahrenheit ? "°F" : "°C"}</h2>
        <img className="image" src={icons[weatherData.weather?.[0].icon]} alt="image of weather" />
        <p className='text'>WIND: {weatherData.wind?.speed} m/s</p>
        <p className='text'>CLOUDS: {weatherData.clouds?.all} %</p>
        <p className='text'>PRESSURE: {weatherData.main?.pressure} hPa</p>

          <div className='container-country'>
            <h2 className='city-country'>{weatherData.name},  {weatherData.sys?.country}</h2>
            <p className='text-footer-container'>{weatherData.weather?.[0].description}</p>
          </div>

      </div>
      <button onClick={changeFc}  className='buttonCh'>{isFahrenheit ? "Change to °C" : "Change to °F"}</button>
      {isLoading && <Loader />}
    </div>
  )
}

export default App

