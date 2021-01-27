import React from 'react';

const Notification = ({ message, errorMessage }) => {
  if (message === null && errorMessage === null) {
    return null;
  }

  const notificationStyle = {
    color: 'green',
    background: 'lightgray',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  };

  const errorStyle = { ...notificationStyle, color: 'red' };

  if (message !== null) {
    return <div style={notificationStyle}>{message}</div>;
  }

  if (errorMessage !== null) {
    return <div style={errorStyle}>{errorMessage}</div>;
  }
};

export default Notification;
