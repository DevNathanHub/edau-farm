import React from 'react';
import { Box, Image, Text, Button } from '@chakra-ui/react';

function CardContainer({ data }) {
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Box h="80%">
        <Image src={data.imageUrl[0]} alt={data.name} w="100%" h="100%" objectFit="cover" />
      </Box>

      <Box p="6" flexGrow="1" overflow="hidden">
        <Box d="flex" flexDirection='row' alignItems="center" justifyContent="space-between">
          <Text fontWeight="semibold" fontSize="xl">
            {data.name}
          </Text>
          <Text color="gray.500" fontSize="sm">
            {data.price} USD
          </Text>
        </Box>

        <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
          {data.description[0].length > 30 ? `${data.description[0].substring(0, 30)}...` : data.description[0]}
        </Box>

        <Box mt="2" d="flex" alignItems="center">
          {data.inStock ? (
            <Text color="green.500" mr="2">
              In stock
            </Text>
          ) : (
            <Text color="red.500" mr="2">
              Out of stock
            </Text>
          )}
          <Text>{data.deliveryFee === 0 ? 'Free delivery' : `Delivery fee: ${data.deliveryFee} USD`}</Text>
        </Box>

        <Box mt="2" d="flex" alignItems="center">
          <Text fontSize="sm">Size: {data.variations[0].size}</Text>
          <Text fontSize="sm" ml="2">
            Stock: {data.variations[0].quantity}
          </Text>
        </Box>
      </Box>

      <Box borderTop="1px solid #E2E8F0" p="4" textAlign="center">
        <Button variant="outline" size="sm" mr="1" colorScheme="blue">
          Buy Now
        </Button>
        <Box display="inline-block" w="1px" h="20px" bg="#E2E8F0" mx="1" />
        <Button variant="solid" size="sm" ml="1" colorScheme="green">
          Add to Cart
        </Button>
      </Box>
    </Box>
  );
}

export default CardContainer;
