import React, { useState } from 'react';
import axios from 'axios';
import { ImSpinner6 } from 'react-icons/im';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import '../../../Spinner.css'; // Assuming you have the CSS for the spinner
import './CleaningSet.css';
import image1 from './image1.jpeg';
import image2 from './image2.jpeg';
import image3 from './image3.jpeg';
import { FaCheck } from 'react-icons/fa';

const CleaningSet = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleOrderSubmit = async () => {
    try {
      setLoading(true);

      // Perform any necessary calculations and validations here

      // Example data structure for the order
      const orderData = {
        items: [
          {
            name: 'Cleaning Set',
            price: 135.99,
            quantity: 1,
          },
          // Add other cleaning sets here
        ],
        // Additional information such as customer details can be added here
      };

      // Simulating submission to the server
      const response = await axios.post('/orders', orderData);

      // Handle the response accordingly, e.g., show a success message
      console.log('Order placed successfully!', response.data);
      
      // Show a success toast
      toast.success('Order placed successfully!', {
        position: 'top-right',
        autoClose: 3000, // Close the toast after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Redirect to /success
      navigate('/success');
      
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error('Error placing order', error);
      
      // Show an error toast
      toast.error('Error placing order. Please try again later.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cleaning-set-container">
      {/* Render sliding divs with images, price, offer, quantity inputs, and order button */}
      {/* Add your image imports here */}
    <div className='listing'>
      <div className='imageDiv'>
      
      <div className="image-container">
        <img src={image2} class="img-fluid listing-image" alt="Image 2" />
      </div>
      <div className="image-container">
        <img src={image3} class="img-fluid listing-image" alt="Image 3" />
      </div>
      <div className="image-container">
        <img src={image1} class="img-fluid listing-image" alt="Image 1" />
      </div>
    </div>
        

        <div className='specsDiv'>
        <div className="cleaning-set-details">
            <h2>Cleaning Set</h2>
            <p className='Price'>Price: $135.99</p>
            <p className='offer-perc'>20% Off</p>
            <div>Offer Available For Only One Set</div>
            <ul>
            <li><FaCheck/> Includes specialized cleaning products</li>
            <li><FaCheck/> Perfect for deep cleaning your living space</li>
            <li><FaCheck/> Safe and effective on various surfaces</li>
            </ul>
            <p>Order now and enjoy a clean home!</p>
        </div>
      



    </div>
        {/* Add other details for window, restroom, and kitchen cleaning sets here */}

        <button className="btn btn-primary" onClick={handleOrderSubmit}>
          Order Now
        </button>
      </div>

      {/* Loading spinner */}
      {loading ? (
        <div className="spin-container">
          <div className="spinner-grow spin" role="status">
            <span className="visually-hidden">
              <ImSpinner6 size={24} className="spinner-icon" />
            </span>
          </div>
        </div>
      ) : null}

      {/* Toast container for displaying notifications */}
      <ToastContainer />
    </div>
  );
};

export default CleaningSet;
