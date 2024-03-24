import React, { createContext, useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [singleItem, setSingleItem] = useState(null);

  useEffect(() => {
    // Fetch cart items when component mounts
    fetchCart();
  }, []); // Empty dependency array ensures it runs only once on mount
  
  useEffect(() => {
    calculateTotalPrice();
  }, [cartItems]); 

  const handlePurchaseItem = (product) => {
    setSingleItem(product);
  };

  const fetchCart = () => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (storedCartItems) {
      setCartItems(storedCartItems);
    }
  };

  const addToCart = (product) => {
    // Check if the product already exists in the cart
    const existingProductIndex = cartItems.findIndex((item) => item.id === product.id);
    
    if (existingProductIndex !== -1) {
      // If product exists, increment its quantity
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingProductIndex].quantity += 1;
      setCartItems(updatedCartItems);
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    } else {
      // If product does not exist, add it with a quantity of 1
      const updatedCartItems = [...cartItems, { ...product, quantity: 1 }];
      setCartItems(updatedCartItems);
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    }
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
      handlePurchaseItem,
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
