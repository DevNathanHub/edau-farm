import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Benefits from './Benefits/Benefits';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './LandingPage.css';

function Home() {
  const [firstname, setFirstName] = useState('');

  useEffect(() => {
    // Retrieve user data from localStorage
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.user && user.user.firstname) {
      setFirstName(user.user.firstname);
    }
  }, []); // Empty dependency array ensures that the effect runs once when the component mounts

  return (
    <div className="container mt-4">
      {firstname ? (
        <div>
          <h2>Welcome, {firstname}!</h2>
          <div className="enroll">
            <Link to="/enroll" className="btn btn-primary" disabled={!firstname}>
              Enroll As a Member
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <h2>Welcome to Our Community</h2>
          <div className="enroll">
            <Link to="/sign-up" className="btn btn-success">
              Get Started
            </Link>
          </div>
        </div>
      )}
      <Benefits />
    </div>
  );
}

export default Home;
