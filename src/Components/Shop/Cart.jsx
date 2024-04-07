import React, { useState, useContext } from 'react';
import { BsCart4 } from "react-icons/bs";
import { CartContext } from '../../Context/CartContext';
import { Badge, Button, Image, Stack, Text, useMediaQuery, Tooltip, useDisclosure, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Modal, Card, Divider, HStack, Box, Link } from '@chakra-ui/react';
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
import { DeleteIcon, ViewIcon } from '@chakra-ui/icons';

function Cart() {
  const { cartItems, totalPrice, removeFromCart, handleIncrementQuantity, handleDecrementQuantity, setSingleItem } = useContext(CartContext);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const [isLargerThan30] = useMediaQuery("(min-width: 50em)");
  const [selectedProductDescription, setSelectedProductDescription] = useState('');
  const { isOpen: isFullDescriptionModalOpen, onOpen: onFullDescriptionModalOpen, onClose: onFullDescriptionModalClose } = useDisclosure();

  const handleRemove = (item) => {
    removeFromCart(item._id);
  };


  const handleCheckout = () => {
    closeDrawer();
    navigate('/shop/checkout');
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const handleViewFullDescription = (description) => {
    setSelectedProductDescription(description);
    onFullDescriptionModalOpen();
  };

  return (
    <>
      <div onClick={openDrawer} className="cart-icon">
        <BsCart4 size={25} color='#118c4f' className='cart-icon-bs'/>
        <Badge  className='cart-badge' variant='ghost'>{cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}</Badge>
      </div>
      <Modal isOpen={isFullDescriptionModalOpen} onClose={onFullDescriptionModalClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Full Description</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {selectedProductDescription}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={onFullDescriptionModalClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      <Drawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        placement="right"
        size='md'
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Shopping Cart</DrawerHeader>

          <DrawerBody>
            <Card className='cart-items' variant='outline' borderRadius='10px' p={4}>
              {cartItems.length !== 0 ? cartItems.map((item, index) => (
                <Box key={index} style={{marginBottom: '10px'}} >
                  <Stack direction="row" alignItems="center" spacing={4} >
                    {item.imageUrl && item.imageUrl.length > 0 && (
                      <Image
                        src={item.imageUrl[0]}
                        alt={item.name}
                        style={{ maxWidth: '50px', objectFit: 'contain', borderRadius: '10px' }}
                      />
                    )}
                    <Stack>
                      <Text mb={-2} onClick={() => {navigate(`/shop/product/${item._id}`); setSingleItem(item)}}><Link >{item.name}</Link></Text>
                      {isLargerThan30 ? (
                      <HStack gap={4}>
                          <div style={{ width: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {item.description}   
                          
                        </div>

                        <Tooltip label="View" aria-label="Delete">
                        <ViewIcon 
                          onClick={() => handleViewFullDescription(item.description)} 
                          mr={4}
                        />
                        </Tooltip>

                      </HStack>
                  ) : null}
                    </Stack>
                    
                  </Stack>

                  <HStack mt={3} gap={4}>
                    <div className='quantity'> 
                      {item.quantity > 1 ? (
                        <Badge onClick={() => handleDecrementQuantity(item.id)} style={{cursor: 'pointer'}}>-</Badge>
                      ) : (
                        <Badge style={{cursor: 'not-allowed'}}>-</Badge>
                      )}
                      {item.quantity >= 1 && <Badge bg='success' className='quantity-badge'>Quantity {item.quantity}</Badge>}
                      <Badge onClick={() => handleIncrementQuantity(item.id)} style={{cursor: 'pointer'}}>+</Badge>
                    </div>
                    <div className='cart-price'>Ksh {item.price}</div>
                    <div>Size: {item.variations && item.variations.length > 0 && item.variations[0].size}</div>

                  </HStack>  
                  <div className='delete-cart-item' onClick={() => handleRemove(item)}><DeleteIcon className='remove-icon' title='remove'/></div>

                  <Divider/>

                </Box>
                            
              )) : <div>
                Your Cart is Empty
              </div>
            }
            </Card>
          </DrawerBody>

          <DrawerFooter>
            <Button colorScheme='orange' margin={'10px'} onClick={handleCheckout}>Checkout All Ksh {totalPrice}</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Cart;
