import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineCheckCircle, AiOutlineWarning } from 'react-icons/ai';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import './Enroll.css';

function Enroll() {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobilePhone: '',
    ssn: '',
    dob: '',
    address: '',
    state: '',
    country: '',
    city: '',
    postalCode: '',
    acknowledge: false,
    licenseFront: null,
    licenseBack: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        [id]: checked,
      }));
    } else {
      const { value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
  };

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSendDataToServer = async () => {
    // Validation checks
    const isValid = validateForm();
  
    if (!isValid) {
      console.log('Form validation failed');
      return;
    }
  
    setLoading(true);
    console.log('Data to be sent to the server:', formData);
  
    try {
      const formDataToSend = new FormData();
  
      // Append text data
      Object.keys(formData).forEach((key) => {
        if (key !== 'licenseFront' && key !== 'licenseBack') {
          formDataToSend.append(key, formData[key]);
        }
      });
  
      // Append files
      formDataToSend.append('licenseFront', formData.licenseFront);
      formDataToSend.append('licenseBack', formData.licenseBack);
  
      // Send data to the server using Axios
      const response = await axios.post('http://localhost:5000/enroll', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      // Check if the server responded successfully
      if (response.status === 200) {
        toast.success('Data submitted successfully!', { icon: <AiOutlineCheckCircle /> });
        navigate('/success');
      } else {
        toast.error('Failed to submit data to the server.', { icon: <AiOutlineWarning /> });
      }
    } catch (error) {
      toast.error('Error submitting data to the server.', { icon: <AiOutlineWarning /> });
    } finally {
      setLoading(false);
    }
  };
  

  const validateForm = () => {
    // Perform validation checks here
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.mobilePhone ||
      !formData.address ||
      !formData.state ||
      !formData.country ||
      !formData.city ||
      !formData.postalCode ||
      !formData.ssn ||
      !formData.dob
    ) {
      toast.error('All fields are required', { icon: <AiOutlineWarning /> });
      return false;
    }

    // Validate email using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Invalid email format', { icon: <AiOutlineWarning /> });
      return false;
    }

    // Validate DOB not less than 13 years
    const dob = new Date(formData.dob);
    const thirteenYearsAgo = new Date();
    thirteenYearsAgo.setFullYear(thirteenYearsAgo.getFullYear() - 13);
    if (dob > thirteenYearsAgo) {
      toast.error('DOB should be at least 13 years ago', { icon: <AiOutlineWarning /> });
      return false;
    }

    // All validation checks passed
    return true;
  };

  return (
    <div className="apply-component">
      <div className='title'>Enroll as A Member</div>
      <div className="large-text">There are 80,000+ reasons to join Delta.</div>
      <div className="enroll-container mt-5">
        {currentStep === 1 && (
          <StepOne
            formData={formData}
            handleChange={handleChange}
            nextStep={nextStep}
          />
        )}
        {currentStep === 2 && (
          <StepTwo
            formData={formData}
            handleChange={handleChange}
            prevStep={prevStep}
            handleSendDataToServer={handleSendDataToServer}
            loading={loading}
          />
        )}
        <ToastContainer />
      </div>
    </div>
  );
}

export default Enroll;
