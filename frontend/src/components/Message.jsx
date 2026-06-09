import { Alert } from 'react-bootstrap';
import React from 'react';

const Message = ({ variant = 'info', children }) => { 
  return <Alert variant={variant}>{children}</Alert>;
};

export default Message;
