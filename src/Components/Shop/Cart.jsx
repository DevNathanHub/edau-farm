import React, { useState, useContext } from 'react';
import { PiShoppingCartLight } from "react-icons/pi";
import { CartContext } from '../../Context/CartContext';
import { Badge, Button, Stack, Text } from '@chakra-ui/react';
import { MdDeleteSweep } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import './cart.css';
// Chakra UI Drawer components
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';

function Cart() {
  const { cartItems, totalPrice, removeFromCart, handlePurchaseItem, handleIncrementQuantity, handleDecrementQuantity } = useContext(CartContext);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleRemove = (item) => {
    removeFromCart(item.id);
  };

  const handleAddSingleItem = (item) => {
    handlePurchaseItem(item);
    closeDrawer();
    navigate('/shop/checkout');
  };

  const handleCheckout = () => {
    closeDrawer();
    navigate('/shop/checkout');
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <>
      <div onClick={openDrawer} className="cart-icon">
        <PiShoppingCartLight size={30} color='blue'/>
        <Badge bg='primary' className='cart-badge' pill>{cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}</Badge>
      </div>

      <Drawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        placement="right"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Shopping Cart</DrawerHeader>

          <DrawerBody>
            <div className='cart-items'>
              {cartItems.map((item, index) => (
                <div key={index} style={{marginBottom: '10px'}}>
                  <Stack direction="row" alignItems="center" spacing={4}>
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{ maxWidth: '50px', objectFit: 'contain' }}
                    />
                    <Text>{item.title}</Text>
                  </Stack>

                  <div className='cart-price-qty'>
                    <div className='quantity'> 
                      {item.quantity > 1 ? (
                        <Badge onClick={() => handleDecrementQuantity(item.id)} style={{cursor: 'pointer'}}>-</Badge>
                      ) : (
                        <Badge style={{cursor: 'not-allowed'}}>-</Badge>
                      )}
                      {item.quantity >= 1 && <Badge bg='success' className='quantity-badge'>Quantity {item.quantity}</Badge>}
                      <Badge onClick={() => handleIncrementQuantity(item.id)} style={{cursor: 'pointer'}}>+</Badge>
                    </div>
                    <div className='cart-price'>${item.price}</div>
                    <div>{cartItems.length === 1?  null : <Button colorScheme='teal' size='xs' onClick={() => handleAddSingleItem(item)}>Checkout</Button>} </div>
                    <div className='delete-cart-item' onClick={() => handleRemove(item)}><MdDeleteSweep className='remove-icon' title='remove'/></div>
                  </div>
                </div>
              ))}
            </div>
          </DrawerBody>

          <DrawerFooter>
            <Button colorScheme='orange' margin={'10px'} onClick={handleCheckout}>Checkout All ${totalPrice}</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Cart;
