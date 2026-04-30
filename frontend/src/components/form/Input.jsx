import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Form.scss';

const Input = ({ type = "text", name, value, onChange, placeholder, required = false }) => {
  return (
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="form-component"
    />
  );
};

export default Input;