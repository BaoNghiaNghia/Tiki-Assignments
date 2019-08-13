import React from 'react'
import './index.scss'

const Button = ({
  label, onClick, icon
}) => {
  return(
    <button className='button button--blue button--swipe' onClick={onClick}>
      <span className='button__text'>{label}</span>
    </button>
  );
}

export default Button


