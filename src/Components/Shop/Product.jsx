import React, { useState, useContext } from 'react';
import { Box, Image, Text, Button, Flex } from '@chakra-ui/react';
import { CartContext } from '../../Context/CartContext';
import { useNavigate } from 'react-router-dom';

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
        // Implement your logic here to handle the "Buy Now" action
        // For example, you can add the product to the cart and navigate to the checkout page
        console.log("Buying now:", product);
        setSingleItem(product);
        navigate('/shop/checkout');
    };

    return (
        <Box maxW="md" borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Flex align="center" justify="center" position="relative">
                <Image src={singleItem.imageUrl[currentImageIndex]} alt={singleItem.name} />

                <Button
                    position="absolute"
                    left="0"
                    top="50%"
                    transform="translateY(-50%)"
                    onClick={prevImage}
                    variant="ghost"
                    colorScheme="teal"
                    size="sm"
                    ml="2"
                >
                    Previous
                </Button>
                <Button
                    position="absolute"
                    right="0"
                    top="50%"
                    transform="translateY(-50%)"
                    onClick={nextImage}
                    variant="ghost"
                    colorScheme="teal"
                    size="sm"
                    mr="2"
                >
                    Next
                </Button>
            </Flex>

            <Box p="6">
                {/* Product details */}
                <Text fontSize="lg" fontWeight="semibold">{singleItem.name}</Text>
                <Text mt="2" color="gray.600">{singleItem.description[0]}</Text>
                <Text mt="2" fontSize="xl" fontWeight="bold">${singleItem.price}</Text>
                <Text mt="1" fontSize="sm" color="gray.600">Delivery Fee: ${singleItem.deliveryFee}</Text>
                <Text mt="1" fontSize="sm">Size: {singleItem.variations[0].size}</Text>
                <Text fontSize="sm">In Stock: {singleItem.variations[0].quantity}</Text>

                <Button mt="3" colorScheme="teal" size="sm" onClick={() => handleBuyNow(singleItem)}>
                    Buy Now
                </Button>
            </Box>
        </Box>
    );
}

export default Product;
