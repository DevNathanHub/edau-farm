import React, { useState } from 'react';
import axios from 'axios';

function TestForm() {
  const [formData, setFormData] = useState({
    field1: '',
    field2: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      // Send data to the server using Axios
      const response = await axios.post('http://localhost:5000/enroll', formData);

      // Check if the server responded successfully
      if (response.status === 200) {
        console.log('Data submitted successfully!', response.data);
        // Handle success, e.g., redirect or display a success message
      } else {
        console.error('Failed to submit data to the server.', response.data);
        // Handle failure, e.g., display an error message
      }
    } catch (error) {
      console.error('Error submitting data to the server.', error.message);
      // Handle error, e.g., display an error message
    }
  };

  return (
    <div>
      <label htmlFor="field1">Field 1:</label>
      <input
        type="text"
        id="field1"
        value={formData.field1}
        onChange={handleChange}
      />

      <label htmlFor="field2">Field 2:</label>
      <input
        type="text"
        id="field2"
        value={formData.field2}
        onChange={handleChange}
      />

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default TestForm;
