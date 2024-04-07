import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth } from '../firebase';
import { useToast } from '@chakra-ui/react';

// Create a UserContext
const UserContext = createContext();

// Create a UserProvider component to provide user data to its children
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const toast = useToast(); // Initialize Chakra UI toast

  // Load user data from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Function to save the user data to localStorage
  const saveUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Function to get the user data from localStorage
  const getUser = () => {
    return JSON.parse(localStorage.getItem('user'));
  };

  // Function to logout the user
  const logout = () => {
    auth.signOut(); 
    setUser(null); 
    localStorage.removeItem('user');
    // Show Chakra UI success toast on logout
    toast({
      title: 'Logged out successfully!',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <UserContext.Provider value={{ user, saveUser, getUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => {
  return useContext(UserContext);
};
