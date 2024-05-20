    import React, { useState, useContext } from 'react';
    import { Box, Image, Text, Button, Flex, Stack, Badge, IconButton, HStack, VStack } from '@chakra-ui/react';
    import { CartContext } from '../../Context/CartContext';
    import { useNavigate } from 'react-router-dom';
    import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

    function Product() {
        const { singleItem, setSingleItem } = useContext(CartContext);
        const navigate = useNavigate();
        const [currentImageIndex, setCurrentImageIndex] = useState(0);

        const nextImage = () => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % singleItem.imageUrl.length);
        };

        const prevImage = () => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === 0 ? singleItem.imageUrl.length - 1 : prevIndex - 1
            );
        };

        const handleBuyNow = (product) => {
            console.log("Buying now:", product);
            setSingleItem(product);
            navigate('/shop/checkout');
        };

        return (
            <Box   overflow="hidden" boxShadow="lg" p="20px" margin="40px" >
                <HStack spacing="4" gap='30px'>
                    <Flex position="relative" w="full" justifyContent="center" alignItems="center">
                        <IconButton
                            icon={<ChevronLeftIcon />}
                            position="absolute"
                            left="2"
                            top="50%"
                            transform="translateY(-50%)"
                            onClick={prevImage}
                            variant="solid"
                            colorScheme="blue"
                            size="lg"
                            isRound={true}
                        />
                        <Image src={singleItem.imageUrl[currentImageIndex]} alt={singleItem.name} borderRadius="20px" />
                        <IconButton
                            icon={<ChevronRightIcon />}
                            position="absolute"
                            right="2"
                            top="50%"
                            transform="translateY(-50%)"
                            onClick={nextImage}
                            variant="solid"
                            colorScheme="blue"
                            size="lg"
                            isRound={true}
                        />
                    </Flex>
                    <div>

                    <VStack spacing="3" align="start" w="full" ml={4}> 
                        <Text fontSize="2xl" fontWeight="bold" color="#118c4f">{singleItem.name}</Text>
                        <Text >{singleItem.description[0]}</Text>
                        <HStack spacing="2">
                            <Badge colorScheme="green">In Stock</Badge>
                            <Badge colorScheme="blue">Size: {singleItem.variations[0].size}</Badge>
                        </HStack>
                        <Text fontSize="xl" fontWeight="bold">Ksh {singleItem.price}</Text>
                        <Text fontSize="md" color="gray.600">Delivery Fee: Ksh {singleItem.deliveryFee}</Text>
                        <Text fontSize="sm">Quantity Available: {singleItem.variations[0].quantity}</Text>

                        <Button
                            colorScheme="teal"
                            size="md"
                            onClick={() => handleBuyNow(singleItem)}
                            alignSelf="start"
                        >
                            Buy Now
                        </Button>
                    </VStack>
                    </div>
                </HStack>
            </Box>
        );
    }

    export default Product;
