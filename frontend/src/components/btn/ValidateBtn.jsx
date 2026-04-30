import React from 'react';
import './Btn.scss';

const ValidateBtn = ({ children, type = "submit", disabled = false }) => {
  return (
    <button type={type} className="validate-btn" disabled={disabled}>
      {children}
    </button>
  );
};

export default ValidateBtn;