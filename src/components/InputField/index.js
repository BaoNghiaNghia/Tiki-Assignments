import React from 'react'
import './index.scss'

const InputField = ({
  value, onChange, error, placeholder, name, optional
}) => (
  <div>
    <div className='input-field-container'>
      <input
        className='input-field'
        value={value}
        onChange={onChange}
        name={name}
        required
        pattern='\S+.*' />
      <label className='input-label'>{placeholder} <span style={{ color: 'red' }}>{!optional && '*'}</span></label>
    </div>
    {
      error && <span className='error'>{error}</span>
    }
  </div>
)

export const TextArea = ({
  value, onChange, error, placeholder, name, optional
}) => (
  <div>
    <div className='input-field-container'>
      <textarea
        rows={4}
        className='input-field'
        style={{ padding: '22px 8px' }}
        value={value}
        onChange={onChange}
        name={name}
        required
        pattern='\S+.*' />
      <label className='input-label'>{placeholder} <span style={{ color: 'red' }}>{!optional && '*'}</span></label>
    </div>
    {
      error && <span className='error'>{error}</span>
    }
  </div>
)

export default InputField
