import { useState } from 'react'
import axios from 'axios'

const Location = () => {

    const [ data, setData ] = useState(null)
    const [ weatherData, setWeatherData ] = useState(null)

    useEffect(() =>{
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude
                const longitude = position.coords.longitude 
                setData({ latitude, longitude })
            })
            
            axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=4929ea72ba6ebbcdc42ee03f8228b265`)
            .then( resp => {
              setWeatherData(resp.data)
            })
            .catch( error => console.error(error) )
        }else 
        console.error("Geolocalizacion no es soportada por tu navegador")
        
    }, [])

    return(
        <div>
        <h1>Latitude: {location?.latitude}</h1>
        <h1>Longitude: {location?.longitude}</h1>
        {weatherData && (
          <div>
            <h2>Weather: {weatherData.weather[0].description}</h2>
            <p>Temperature: {weatherData.main.temp}</p>
            <p>Humidity: {weatherData.main.humidity}</p>
          </div>
        )}
      </div>
    )
}

export default Location