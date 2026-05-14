import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Form.scss';

const Input = ({ type = "text", name, value, onChange, placeholder, required = false, autoComplete }) => {
  return (
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      autoComplete={autoComplete}
      className="form-component"
    />
  );
};

export default Input;