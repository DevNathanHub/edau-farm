import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Fetch cart items when component mounts
    fetchCart();
  }, []); // Empty dependency array ensures it runs only once on mount
  
  useEffect(() => {
    calculateTotalPrice();
  }, [cartItems]);

  const fetchCart = () => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (storedCartItems) {
      setCartItems(storedCartItems);
    }
  };

  const addToCart = (product) => {
    const updatedCartItems = [...cartItems, product];
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    toast.success('Added to cart');
  };

  const removeFromCart = (cartItemId) => {
    const updatedCartItems = cartItems.filter(item => item.id !== cartItemId);
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    toast.error('Removed from cart');
    fetchCart();
  };

  const updateCartItemQuantity = (cartItemId, newQuantity) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.id === cartItemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };
  
  const calculateTotalPrice = () => {
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    setTotalPrice(totalPrice);
  };

  return (  
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateCartItemQuantity, setCartItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};
