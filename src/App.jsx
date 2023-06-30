import { useState } from 'react'
import './App.css'

function App() {

  return (
    <>
      <h1 className='title'>Titulo del weather</h1>
      <button className='buttonDarkMode'>Dark Mode</button>
      <div className='container'>
        Temperatura en grados centigrados,
        Pais, 
        Ciudad,
        Icono que describa el clima,
        Icono que corresponda al clima.
      </div>
      <button className='buttonch'>Boton para cambiar de F a C</button>
    </>
  )
}

export default App
