// Import necessary dependencies
import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useNavigate } from 'react-router-dom'; // Assuming you are using React Router
import './Login.css'; // External CSS file for styling

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Sanitize data (you may want to add more sophisticated sanitation)
    const formBodyData = {
      email: formData.email,
      password: formData.password,
    };

    try {
      // Make the Axios request here
      console.log('form body data', formBodyData);

      const response = await axios.post('https://community-api-p8vv.onrender.com/login', formBodyData);

      // Handle the response as needed
      console.log(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      // Display success message
      toast.success('Login successful!');
      
      // Navigate to a different page if needed
      navigate('/success'); // Change '/dashboard' to the actual route you want to navigate to after successful login
    } catch (error) {
      // Handle errors
      console.error('Error submitting form:', error);

      // Display error message
      toast.error('Invalid email or password. Please try again.');
    } finally {
      setLoading(false); // Set loading to false after submission (success or error)
    }
  };

  return (
    <div className="login-container">
      <TransitionGroup>
        <CSSTransition classNames="fade" timeout={300}>
          <form onSubmit={handleSubmit} className="login-form">
            <div className='title'>LOGIN</div>
            <div className="form-group">
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <button type="submit" disabled={loading} className="login-btn">
                {loading ? 'Loading...' : 'LOGIN'}
              </button>
            </div>
          </form>
        </CSSTransition>
      </TransitionGroup>
      <ToastContainer />
    </div>
  );
};

export default Login;
