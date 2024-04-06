import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useToast } from '@chakra-ui/react'; // Import Chakra UI's useToast

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [singleItem, setSingleItem] = useState(null);
  const toast = useToast(); // Initialize Chakra UI's toast hook

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
    const existingProductIndex = cartItems.findIndex((item) => item._id === product._id);

    if (existingProductIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingProductIndex].quantity += 1;
      setCartItems(updatedCartItems);
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    } else {
      const updatedCartItems = [...cartItems, { ...product, quantity: 1 }];
      setCartItems(updatedCartItems);
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    }
    // Use Chakra UI's toast for success message
    toast({
      title: 'Added to cart',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  const removeFromCart = (cartItemId) => {
    const updatedCartItems = cartItems.filter(item => item._id !== cartItemId);
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    // Use Chakra UI's toast for removal message
    toast({
      title: 'Removed from cart',
      status: 'error',
      duration: 2000,
      isClosable: true,
    });
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

  const handleIncrementQuantity = (cartItemId) => {
    // Increment the quantity of the item with the specified ID
    const updatedCartItems = cartItems.map(item => {
      if (item.id === cartItemId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const handleDecrementQuantity = (cartItemId) => {
    // Decrement the quantity of the item with the specified ID
    const updatedCartItems = cartItems.map(item => {
      if (item.id === cartItemId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const calculateTotalPrice = useCallback(() => {
    try {
      const totalPrice = cartItems.reduce((total, item) => {
        // Ensure item.price and item.quantity are valid numbers before multiplying
        const price = typeof item.price === 'number' ? item.price : 0;
        const quantity = typeof item.quantity === 'number' ? item.quantity : 0;
        return total + (price * quantity);
      }, 0);

      // Format totalPrice to two decimal places
      const formattedTotalPrice = parseFloat(totalPrice).toFixed(2);

      // Update state with formatted totalPrice
      setTotalPrice(formattedTotalPrice);
    } catch (error) {
      // Handle any errors gracefully
      console.error('Error calculating total price:', error);
      setTotalPrice(0); // Set totalPrice to 0 if calculation fails
    }
  }, [cartItems]);

  return (
    <CartContext.Provider value={{
      singleItem,
      setSingleItem,
      cartItems,
      addToCart,
      removeFromCart,
      updateCartItemQuantity,
      handleIncrementQuantity,
      handleDecrementQuantity,
      setCartItems,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};
