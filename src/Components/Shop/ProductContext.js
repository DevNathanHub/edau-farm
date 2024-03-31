// ProductContext.js

import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import baseUrl from '../../baseUrl';

// Create context
const ProductContext = createContext();

// Custom hook to use the product context
export const useProductContext = () => {
  return useContext(ProductContext);
};

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch all products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}/api/products`);
      console.log(response.data);

      setProducts(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch a single product by ID
  const fetchProductById = async (productId) => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}/api/products/${productId}`);
      return response.data;
    } catch (error) {
      setError(error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Function to add a new product
  const addProduct = async (newProductData) => {
    try {
      setLoading(true);
      const response = await axios.post(`${baseUrl}/api/products`, newProductData);
      setProducts([...products, response.data]);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // Function to update a product
  const updateProduct = async (productId, updatedProductData) => {
    try {
      setLoading(true);
      const response = await axios.put(`${baseUrl}/api/products/${productId}`, updatedProductData);
      setProducts(products.map(product => (product._id === productId ? response.data : product)));
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // Function to delete a product
  const deleteProduct = async (productId) => {
    try {
      setLoading(true);
      await axios.delete(`${baseUrl}/api/products/${productId}`);
      setProducts(products.filter(product => product._id !== productId));
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // Expose necessary context values and functions
  const value = {
    products,
    loading,
    error,
    fetchProducts,
    fetchProductById,
    addProduct,
    updateProduct,
    deleteProduct,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
