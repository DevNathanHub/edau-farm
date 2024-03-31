import React, { useEffect } from 'react';
import { useProductContext } from './ProductContext';
import { Card, Image, Text } from '@chakra-ui/react';

const TempShop = () => {
  const { products, loading, error, fetchProducts } = useProductContext();

  useEffect(() => {
    // Fetch products only once when the component mounts
    fetchProducts();
    console.log(products);
  }, []); // Empty dependency array to ensure the effect runs only once

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map(product => (
          <Card key={product._id}>
            <Text>{product.name} - Ksh{product.price}</Text>
            <Image src={product.imageUrl[0]} alt={product.name}/>
          </Card>
        ))}
      </ul>
    </div>
  );
};

export default TempShop;
