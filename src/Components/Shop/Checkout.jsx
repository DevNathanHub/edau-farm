  import React, { useContext } from 'react';
  import { CartContext } from '../../Context/CartContext';
  import { Box, Button, Card, CardBody, CardFooter, Heading, Image, Text } from '@chakra-ui/react';
  import DeliveryAddress from './DeliveryAddress';
  import ContentNotFound from '../../NotFound/ContentNotFound';
  import { Stack } from 'react-bootstrap';

  function Checkout() {
      const { cartItems } = useContext(CartContext);

    
          return (
              <Box m="40px" borderRadius='40px' >
                {cartItems && cartItems.length > 0 ? 
                  <div>
                  <div>
                      {cartItems.map((item) => (
                          <Stack key={item.id}>
                          

                          <Card
                            direction={{ base: 'column', sm: 'row' }}
                            overflow='hidden'
                            variant='outline'
                          >
                            <Image
                              objectFit='cover'
                              maxW={{ base: '100%', sm: '200px' }}
                              src={item.imageUrl[0]}
                              alt='Caffe Latte'
                            />

                            <Stack>
                              <CardBody>
                                <Heading size='md'>{item.name} </Heading>

                                <Text py='2'> {item.description} </Text>
                              </CardBody>

                              
                            </Stack>
                          </Card>

                          </Stack>
                      ))}
                  </div>
                  <Box mt='40px'>
                     <DeliveryAddress />
                  </Box>
                 
                  </div>
                : <>  
                  <ContentNotFound/>
                  </>
                }
              </Box>

          );
      }

  export default Checkout;
