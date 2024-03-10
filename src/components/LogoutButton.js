import React from 'react';
import { useAuth, clearAuthData } from './Authenticate';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const { dispatch } = useAuth();
  const navigate = useNavigate();


  const handleLogout = () => {
    // Clear local storage
    clearAuthData();

    // Dispatch logout action to update authentication state
    dispatch({ type: 'LOGOUT' });

    // Redirect or perform other necessary actions after logout
    navigate('/');
  };

  return (
    <button className='logout-button' onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;