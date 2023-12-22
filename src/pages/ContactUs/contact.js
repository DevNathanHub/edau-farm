import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './contact.css';
function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(formData);
    // Simulate a delay (you can replace this with your actual form submission logic)
    await new Promise(resolve => setTimeout(resolve, 1000));

    // After the delay, set loading to false and navigate to "/success"
    setLoading(false);
    navigate('/success');
  };

  return (
    <div className='ContactUs'>
      <h1 className='contact-header'>Contact Us</h1>
      <form onSubmit={handleSubmit} className='contact-form'>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
        ></textarea>

        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}

export default Contact;
