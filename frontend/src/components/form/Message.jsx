import React from 'react';
import './Form.scss';

const Message = ({ type = "error", children }) => {
  return (
    <div className={`form-component__message form-component__message--${type}`}>
      {children}
    </div>
  );
};

export default Message;