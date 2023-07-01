import { useState } from 'react'
import './App.css'

function App() {

  return (
    <>
      <div className="header">
        <h1 className='title'>Weather app</h1>
        <button className='buttonDarkMode'>Dark Mode</button>
      </div>
      <div className='container'>
        Temperatura en grados centigrados,
        Pais, 
        Ciudad,
        Icono que describa el clima,
        Icono que corresponda al clima.
      </div>
      <button className='buttonCh'>Boton para cambiar de F a C</button>
    </>
  )
}

export default App
