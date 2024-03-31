import React from 'react';
import { Box, Text, Badge, Button, Image, Stack } from '@chakra-ui/react';

const ProductList = ({ products }) => {
  return (
    <Stack spacing={4}>
      {products.map((product) => (
        <Box key={product._id} p={4} borderWidth="1px" borderRadius="lg">
          <Image src={product.imageUrl[0]} alt={product.name} />
          <Text mt={2} fontWeight="semibold" fontSize="xl">
            {product.name}
          </Text>
          <Text mt={2}>{product.description}</Text>
          <Text mt={2}>Price: ${product.price}</Text>
          <Badge mt={2} variant="subtle" colorScheme={product.inStock ? 'green' : 'red'}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </Badge>
          <Button mt={4} colorScheme="blue" variant="outline">
            Add to Cart
          </Button>
        </Box>
      ))}
    </Stack>
  );
};

export default ProductList;
