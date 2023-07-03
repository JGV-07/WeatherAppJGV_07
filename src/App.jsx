import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

function App() {

  const [ weatherData, setWeatherData ] = useState({})
  const [ isFahrenheit, setIsFahrenheit ] = useState(true)
  const [ isDarkMode, setIsDarkMode ] = useState(false)

  const icons = {

    "01d": "/icons/01d.svg",
    "02d": "/icons/02d.svg",
    "03d": "/icons/03d.svg",
    "04d": "/icons/04d.svg",
    "05d": "/icons/05d.svg",
    "06d": "/icons/06d.svg",
    "07d": "/icons/07d.svg",
    "08d": "/icons/08d.svg",
    "09d": "/icons/09d.svg"

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
        <h2 className='title'>Weather app</h2>
        <button onClick={changeToDarkMode}  className='buttonDarkMode'><i className='bx bx-toggle-left bx-lg' ></i></button>
      </div>
      <div className='container'>
        <h1>{isFahrenheit ? toFahrenheit : toCelcius} {isFahrenheit ? "°F" : "°C"}</h1>
        <img className="image" src={icons[weatherData.weather?.[0].icon]} alt="image of weather" />
        <p>{weatherData.weather?.[0].main}</p>
        <p>Pressure: {weatherData.main?.pressure}</p>
        <div className='container-country'>
          <h2>{weatherData.name},{weatherData.sys?.country}</h2>
          <p>{weatherData.weather?.[0].description}</p>
        </div>
      </div>
      <button onClick={changeFc}  className='buttonCh'>{isFahrenheit ? "Change to °C" : "Change to °F"}</button>
    </div>
  )
}

export default App


/*  ICONOS PARA EL BOTON DE DARK MODE
<i class='bx bx-toggle-left' ></i>
<i class='bx bx-toggle-right' ></i>
*/