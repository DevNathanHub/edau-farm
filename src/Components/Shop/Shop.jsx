import React from 'react';
import { Card, CardBody, CardFooter, ButtonGroup, Button, Stack, Heading, Text, Divider, Image } from '@chakra-ui/react';
import './shop.css';

function Shop() {
  // Array of Edau honey products
  const imgurl = 'https://images.unsplash.com/photo-1613548058193-1cd24c1bebcf?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  const edauHoneyProducts = [
    {
      name: "Edau Pure Honey",
      description: "100% pure honey sourced from Acacia flowers",
      price: "$10",
      imageUrl: imgurl
    },
    {
      name: "Edau Honeycomb",
      description: "Fresh honeycomb with delicious honey",
      price: "$15",
      imageUrl: imgurl
    },
    {
      name: "Edau Honey Infused Tea",
      description: "Delicious tea infused with Edau honey",
      price: "$8",
      imageUrl: imgurl
    },
    {
      name: "Edau Honey Soap",
      description: "Handmade soap enriched with Edau honey",
      price: "$5",
      imageUrl: imgurl
    }
  ];

  return (
    <div className='shop-component'>
        <div className='shop-content'>
            {edauHoneyProducts.map((product, index) => (
                <Card key={index} maxW='sm'>
                <CardBody>
                    <Image
                    src={product.imageUrl}
                    alt={product.name}
                    borderRadius='lg'
                    />
                    <Stack mt='6' spacing='3'>
                    <Heading size='md'>{product.name}</Heading>
                    <Text>{product.description}</Text>
                    <Text color='blue.600' fontSize='2xl'>
                        {product.price}
                    </Text>
                    </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                    <ButtonGroup spacing='2'>
                    <Button variant='solid' colorScheme='blue'>
                        Buy now
                    </Button>
                    <Button variant='ghost' colorScheme='blue'>
                        Add to cart
                    </Button>
                    </ButtonGroup>
                </CardFooter>
                </Card>
            ))}
      </div>
    </div>
  );
}

export default Shop;
