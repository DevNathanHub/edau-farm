import React, { useState } from 'react';
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
  const [orders, setOrders] = useState([
    {
      _id: '1',
      user: 'John Doe',
      totalPrice: 50,
      isPaid: true,
      isProcessing: false,
    },
    {
      _id: '2',
      user: 'Jane Smith',
      totalPrice: 75,
      isPaid: false,
      isProcessing: true,
    },
    // Add more orders as needed
  ]);

  const handleFulfillOrder = (orderId) => {
    // Logic to fulfill order
    console.log('Order fulfilled:', orderId);
    // Update orders after fulfilling order (if needed)
    const updatedOrders = orders.map((order) =>
      order._id === orderId ? { ...order, isProcessing: true } : order
    );
    setOrders(updatedOrders);
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
