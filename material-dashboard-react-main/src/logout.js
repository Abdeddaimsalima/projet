import React from 'react';
import { navigate } from "react-router-dom";

const LogOut = () => {
  const handleLogOut = () => {
    // Remove the token from local storage
    localStorage.removeItem('token');

    // Navigate to the sign-in page
    navigate('/authentication/sign-in');
  }

  return (
    <div onClick={handleLogOut}>Log Out</div>
  );
}

export default LogOut;