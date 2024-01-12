import React, { useEffect, useState } from 'react';
import Benefits from './Benefits/Benefits';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './LandingPage.css';
import HiringSection from './WereHiring/werehiring';
import BestLife from './Benefits/BestLife';
import { Link } from 'react-router-dom';
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
    <div className="container mt-4 home">
      {firstname ? (
        <div>
          <div className="welcome-text">👋  Welcome, {firstname}!</div>
          <div className="enroll">
            <HiringSection/>
         
          </div>
        </div>
      ) : (
        <div className='home'>
          <div className="welcome-text">👋   Welcome to Our Community</div>
          <div >
          <HiringSection/>

            
          </div>
          <div className='cleaningSet'>
            <Link to='/cleaningset'>Purchase Cleaning Set</Link>
            </div>
          <div>
            <BestLife/>
          </div>
        </div>
      )}
      <Benefits />
    </div>
  );
}

export default Home;
