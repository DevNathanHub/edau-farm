import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useNavigate } from 'react-router-dom'; // Assuming you are using React Router
import './Signup.css'; // External CSS file for styling

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '', // Add confirmPassword field
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if password and confirmPassword match
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    // Sanitize data (you may want to add more sophisticated sanitation)
    const formBodyData = {
      firstName: formData.firstname,
      lastName: formData.lastname,
      email: formData.email,
      password: formData.password,
    };


    try {
      // Make the Axios request here
      console.log(' form body data', formBodyData);

      const response = await axios.post('http://localhost:5000/signup', formBodyData);

      // Handle the response as needed
      console.log(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      // Display success message
      toast.success('Signup successful!');

      // Navigate to a different page if needed
      navigate('/success'); // Change '/success' to the actual route you want to navigate to
    } catch (error) {
      // Handle errors
      console.error('Error submitting form:', error);

      // Display error message
      toast.error('Error submitting form. Please try again.');
    } finally {
      setLoading(false); // Set loading to false after submission (success or error)
    }
  };

  return (
    <div className="signup-container">
      <TransitionGroup>
        <CSSTransition classNames="fade" timeout={300}>
          <form onSubmit={handleSubmit} className="signup-form">
            <div className='title'>SIGN UP</div>
            <div className="form-group">
              <input type="text" name="firstname" placeholder="First Name" value={formData.firstname} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <input type="text" name="lastname" placeholder="Last Name" value={formData.lastname} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
            </div>
             

            <div className="form-group">
              <button type="submit" disabled={loading}>
                {loading ? 'Loading...' : 'SUBMIT'}
              </button>
            </div>
          </form>
        </CSSTransition>
      </TransitionGroup>
      <ToastContainer />
    </div>
  );
};

export default Signup;
