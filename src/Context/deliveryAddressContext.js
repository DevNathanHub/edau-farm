import React, { createContext, useContext, useState } from 'react';

// Create the context
const DeliveryAddressContext = createContext();

// Provider component
export const DeliveryAddressProvider = ({ children }) => {
  const [deliveryAddress, setDeliveryAddress] = useState(null);

  const updateDeliveryAddress = (address) => {
    setDeliveryAddress(address);
  };

  return (
    <DeliveryAddressContext.Provider value={{ deliveryAddress, updateDeliveryAddress }}>
      {children}
    </DeliveryAddressContext.Provider>
  );
};

// Custom hook
export const useDeliveryAddress = () => {
  return useContext(DeliveryAddressContext);
};
