import React, { useState, useEffect } from 'react';
import { VStack, Box, Text, Badge, Divider, useToast, CircularProgress } from "@chakra-ui/react";
import axios from 'axios';
import baseUrl from '../../baseUrl';
import { useUser } from "../../Context/userContext";

function Orders() {
  const { user } = useUser();
  const userId = user._id;
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const toast = useToast();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/user/${userId}`);
        setOrders(response.data.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast({
          title: 'Error fetching orders.',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId, toast]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="200px">
        <CircularProgress isIndeterminate color="green.300" />
      </Box>
    );
  }

  if (orders.length === 0) {
    return (
      <Text>No orders found.</Text>
    );
  }

  return (
    <VStack spacing={4} align="stretch">
      {orders.map((order) => (
        <Box key={order._id} p={4} borderWidth="1px" borderRadius="md">
          <Text fontWeight="bold">Order ID: {order._id}</Text>
          <Text>Email: {order.email}</Text>
          {order.products.map((product) => (
            <Box key={product._id} mt={2}>
              <Text>Product: {product.name}</Text>
              <Text>Quantity: {product.quantity}</Text>
            </Box>
          ))}
          <Divider my={2} />
          <Text>Status: <Badge colorScheme={order.status === 'Pending' ? 'orange' : 'green'}>{order.status}</Badge></Text>
        </Box>
      ))}
    </VStack>
  );
}

export default Orders;
