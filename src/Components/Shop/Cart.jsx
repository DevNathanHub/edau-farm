  import React, { useState, useContext } from 'react';
  import Offcanvas from 'react-bootstrap/Offcanvas';
  import { PiShoppingCartLight } from "react-icons/pi";
  import { CartContext } from '../../Context/CartContext';
  import './cart.css';
  import { Badge, CardFooter } from 'react-bootstrap';
  import { Button, Card, CardBody,  Image, Stack, Text } from '@chakra-ui/react';
  import { MdDeleteSweep } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
  function Cart() {
    const { cartItems, totalPrice, removeFromCart, handlePurchaseItem, handleIncrementQuantity, handleDecrementQuantity } = useContext(CartContext);
    
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const handleRemove = (item) => {
      removeFromCart(item.id);
    };

    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true); 

    const handleAddSingleItem = (item) =>{
      handlePurchaseItem(item);
      handleClose();
      navigate('/shop/checkout');
    };

    const handleCheckout = () => {
      handleClose();
      navigate('/shop/checkout');
      console.log(totalPrice);
      
    }

    return (
      <>
        <div onClick={handleShow} className="cart-icon">
          <PiShoppingCartLight size={30} color='blue'/>
          <Badge bg='primary' className='cart-badge' pill>{cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}</Badge>
        </div>

        <Offcanvas show={show} onHide={handleClose} placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className='cart-items'>
              {cartItems.map((item, index) => (
                <Card key={index} style={{marginBottom: '10px'} } className='cart-item' >
                 

                  <Stack>
                      
                      <CardBody style={{display: 'flex', gap: '10px', marginBottom: '-10px'}}>
                      <Image
                          objectFit='contain'
                          maxW={"50px"}
                          src={item.image}
                          alt={item.title}
                      />
                      <Text size='md'>{item.title}</Text>
                      
                     
                      </CardBody>
                     
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
                        <div className = 'cart-price'> ${item.price} </div>
                        <div><Button color='green' size='xs' className='checkout-cart-btn' onClick={() => handleAddSingleItem(item)}>Checkout</Button></div>
                        
                        <div  className='delete-cart-item' onClick={() => handleRemove(item)}><MdDeleteSweep className='remove-icon' title='remove'/></div>
                      </div>
                  
                </Card>
              ))}
            </div>
          </Offcanvas.Body>
          <Button colorScheme='orange' margin={'10px'} onClick={handleCheckout}>Checkout All ${totalPrice}</Button>
        </Offcanvas>
      </>
    );
  }

  export default Cart;
