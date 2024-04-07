import React, { useContext } from 'react';
import { CartContext } from '../../Context/CartContext';
import { Text } from '@chakra-ui/react';
import DeliveryAddress from './DeliveryAddress';
import ContentNotFound from '../../NotFound/ContentNotFound';
import { Stack } from 'react-bootstrap';

function Checkout() {
    const { cartItems } = useContext(CartContext);

   
        return (
            <div>
              {cartItems && cartItems.length > 0 ? 
                <div>
                <div>
                    {cartItems.map((item) => (
                        <Stack key={item.id}>
                          <Text>{item.name}</Text>
                        </Stack>
                    ))}
                </div>
                <DeliveryAddress />
                </div>
              : <>  
                 <ContentNotFound/>
                </>
              }
            </div>

        );
    }

export default Checkout;
