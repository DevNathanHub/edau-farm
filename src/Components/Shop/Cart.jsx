  import React, { useState, useContext } from 'react';
  import Offcanvas from 'react-bootstrap/Offcanvas';
  import { PiShoppingCartLight } from "react-icons/pi";
  import { CartContext } from '../../Context/CartContext';
  import './cart.css';
  import { Badge } from 'react-bootstrap';
  import { Button, Card, CardBody,  Image, Stack, Text } from '@chakra-ui/react';
  import { MdDeleteSweep } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
  function Cart() {
    const { cartItems, removeFromCart } = useContext(CartContext);
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const handleRemove = (item) => {
      removeFromCart(item.id);
    };

    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCheckout = () => {
      navigate('/checkout');
      handleClose();
    }

    return (
      <>
        <div onClick={handleShow} className="cart-icon">
          <PiShoppingCartLight size={30} color='blue'/>
          <Badge bg='secondary' >{cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}</Badge>
        </div>

        <Offcanvas show={show} onHide={handleClose} placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className='cart-items'>
              {cartItems.map((item, index) => (
                <div key={index} style={{marginBottom: '10px'} } className='cart-item' >
                  



                  <Card
                    direction={{ base: 'column', sm: 'row' }}
                    overflow='hidden'
                    variant='outline'
                  >
                

                  <Stack>
                      
                      <CardBody style={{display: 'flex', gap: '10px'}}>
                      <Image
                          objectFit='contain'
                          maxW={"50px"}
                          src={item.image}
                          alt={item.title}
                      />
                      <Text size='md'>{item.title}</Text>
                      <div  className='remove-cart-item' onClick={() => handleRemove(item)}><MdDeleteSweep className='remove-icon' title='remove'/></div>
                      </CardBody>
                  </Stack>
                  </Card>




                </div>
              ))}
            </div>
          </Offcanvas.Body>
          <Button colorScheme='orange' margin={'10px'} onClick={handleCheckout}>Checkout</Button>
        </Offcanvas>
      </>
    );
  }

  export default Cart;
