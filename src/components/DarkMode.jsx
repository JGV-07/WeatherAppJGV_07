import React from 'react';

const DarkMode = ({ isDarkMode, onClick }) => {
  return (
    <div>
      {isDarkMode ? (
        <i onClick={onClick} className='bx bx-toggle-right bx-lg'></i>
      ) : (
        <i onClick={onClick} className='bx bx-toggle-left bx-lg'></i>
      )}
    </div>
  )
}

export default DarkMode
