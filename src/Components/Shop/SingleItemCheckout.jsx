import React, { useContext } from 'react';
import { CartContext } from '../../Context/CartContext';
import { Button, HStack, Stack, Text } from '@chakra-ui/react';
import ContentNotFound from '../../NotFound/ContentNotFound';

function SingleItemCheckout() {
    const { singleItem } = useContext(CartContext);

    return (
        <div>
            {singleItem ? (
                <Stack alignItems='center' justifyContent='center' h='70vh' >
                    <HStack>
                     <Text fontSize='3xl'>{singleItem.name}</Text>
                     <Text fontSize='3xl'>Size: {singleItem.variations && singleItem.variations.length > 0 && singleItem.variations[0].size}</Text>

                    </HStack>
                    <HStack>
                        <Text>Ksh {singleItem.price}</Text> | 
                        {singleItem.deliveryFee ? (
                            <Text> Delivery Fee - Ksh {singleItem.deliveryFee}</Text>
                        ) : (
                            <Text>Free Delivery</Text>
                        )}
                    </HStack>
                    <HStack>
                        <Button colorScheme='teal' >Place Order Total: Ksh {singleItem.price + (singleItem.deliveryFee ? singleItem.deliveryFee : 0)}</Button>
                    </HStack>
                    
                </Stack>           
            ) : (
                <ContentNotFound />
            )}
        </div>
    );
}

export default SingleItemCheckout;
