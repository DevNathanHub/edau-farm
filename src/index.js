import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react' 
import { CartProvider } from './Context/CartContext';
import { DeliveryAddressProvider } from './Context/deliveryAddressContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <CartProvider>
        <DeliveryAddressProvider>
         <App />
        </DeliveryAddressProvider>
      </CartProvider>
    </ChakraProvider>
    <ToastContainer 
           position="top-center"
           autoClose={3000}
           closeOnClick
           rtl={false}
           pauseOnFocusLoss
           draggable
           pauseOnHover
           toastContainerStyle={{ top: '50%', transform: 'translateY(-50%)' }}
        />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
