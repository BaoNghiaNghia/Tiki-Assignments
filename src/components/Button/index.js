import React from 'react'
import './index.scss'

export const Button = ({
  label, onClick, icon, className
}) => {
  return(
    <button className='button button--blue button--swipe' onClick={onClick}>
      <span className='button__text'>{label}</span>
    </button>
  );
}

export const ButtonOutline = ({
  label, onClick, icon, className
}) => {
  return(
    <button className='button button--swipe' onClick={onClick}>
      <span className='button__text'>{label}</span>
    </button>
  );
}

