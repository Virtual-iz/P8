import React from 'react';
import './Form.scss';

const Select = ({ name, value, onChange, required = false, children }) => {
  return (
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      autoComplete="off"
      className="form-component form-select"
    >
      {children}
    </select>
  );
};

export default Select;