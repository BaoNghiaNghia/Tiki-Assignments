import React from 'react'
import './index.scss'

const Button = ({
  label, onClick, icon, classes
}) => {
  return (
      <button className='design-button' onClick={onClick}>
        {icon}
        <span className='button-text'>
          {label}
        </span>
      </button>
  )
}

export default Button
