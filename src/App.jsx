import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import Loader from './components/Loader'

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
    "05d": "/icons/05d.svg",
    "06d": "/icons/06d.svg",
    "07d": "/icons/07d.svg",
    "08d": "/icons/08d.svg",
    "09d": "/icons/09d.svg",
    "01n": "/icons/01n.svg",
    "02n": "/icons/02n.svg",
    "03n": "/icons/03n.svg",
    "04n": "/icons/04n.svg",
    "05n": "/icons/05n.svg",
    "06n": "/icons/06n.svg",
    "07n": "/icons/07n.svg",
    "08n": "/icons/08n.svg",
    "09n": "/icons/09n.svg"

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
        {isDarkMode ? (
          <i onClick={changeToDarkMode} className='bx bx-toggle-right bx-lg buttonDarkMode'></i>
        ) : (
          <i onClick={changeToDarkMode} className='bx bx-toggle-left bx-lg buttonDarkMode'></i>
        )}
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

