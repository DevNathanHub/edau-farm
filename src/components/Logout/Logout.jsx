// Logout.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImSpinner6 } from 'react-icons/im';
import './logout.css'; // Import the external CSS file
import '../../Spinner.css';
function Logout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true);

    // Simulating an asynchronous logout process
    setTimeout(() => {
      // Remove user from localStorage or perform any other logout logic
      localStorage.removeItem('user');

      navigate('/');

      window.location.reload();
      // Navigate to /home
      
    }, 2000); // You can adjust the timeout or replace it with your actual logout process
  };

  return (
    <div className=" logout ">
      {loading ? (
        <div className="spin-container">
          <div className="spinner-grow spin" role="status">
            <span className="visually-hidden">
              <ImSpinner6 size={24} className="spinner-icon" />
            </span>
          </div>
        </div>
      ) : (
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      )}
    </div>
  );
}

export default Logout;
