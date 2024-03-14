import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Center,
} from '@chakra-ui/react';

function OrderManagement() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/api/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleFulfillOrder = async (orderId) => {
    try {
      await axios.put(`/api/orders/${orderId}/fulfill`);
      fetchOrders();
    } catch (error) {
      console.error('Error fulfilling order:', error);
    }
  };

  return (
    <Center>
      <div>
        <h2>Order Management</h2>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Order ID</Th>
              <Th>User</Th>
              <Th>Total Price</Th>
              <Th>Is Paid</Th>
              <Th>Is Processing</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orders.map((order) => (
              <Tr key={order._id}>
                <Td>{order._id}</Td>
                <Td>{order.user}</Td>
                <Td>{order.totalPrice}</Td>
                <Td>{order.isPaid ? 'Yes' : 'No'}</Td>
                <Td>{order.isProcessing ? 'Yes' : 'No'}</Td>
                <Td>
                  {!order.isProcessing && (
                    <Button
                      colorScheme="blue"
                      onClick={() => handleFulfillOrder(order._id)}
                    >
                      Fulfill
                    </Button>
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>
    </Center>
  );
}

export default OrderManagement;
