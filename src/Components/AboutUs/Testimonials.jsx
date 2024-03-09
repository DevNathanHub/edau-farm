import React from 'react';
import { VStack, Avatar, Text, Box, Stack, Badge, Flex } from '@chakra-ui/react';

const testimonials = [
  {
    name: "John Doe",
    role: "CEO, Company Name",
    avatar: "https://bit.ly/dan-abramov",
    content: "The honey from HoneyHarvest is simply exquisite. I love knowing that I'm getting the purest honey straight from the hive!",
    rating: 5
  },
  {
    name: "David Smith",
    role: "Customer",
    avatar: "https://bit.ly/sage-adebayo",
    content: "I've been a loyal customer of HoneyHarvest for years. Their honey never disappoints and always exceeds my expectations!",
    rating: 4
  },
  {
    name: "David Lee",
    role: "Marketing Director",
    avatar: "https://bit.ly/code-beast",
    content: "HoneyHarvest honey is the perfect addition to my morning routine. It's pure, natural, and absolutely delicious!",
    rating: 5
  },
  {
    name: "Emily Johnson",
    role: "Food Blogger",
    avatar: "https://bit.ly/dan-abramov",
    content: "As a food blogger, I'm always on the lookout for high-quality ingredients. HoneyHarvest never disappoints!",
    rating: 3
  }
];

function Testimonials() {
  return (
    <VStack spacing="4" align="start">
      <Text fontSize="2xl" fontWeight="bold" mb="4">
        Testimonials
      </Text>
      <Flex flexWrap="wrap" gap="20px">
        {testimonials.map((testimonial, index) => (
          <Box key={index} maxW="lg" borderWidth="1px" borderRadius="lg" overflow="hidden" width={{ base: "100%", sm: "50%" }} mb="4" >
            <Flex p="6" align="center">
              <Avatar src={testimonial.avatar} />
              <Box ml="4">
                <Text fontWeight="bold">{testimonial.name}</Text>
                <Text fontSize="sm">{testimonial.role}</Text>
              </Box>
            </Flex>

            <Box p="6">
              <Text fontSize="md" fontStyle="italic" mb="4">
                {testimonial.content}
              </Text>
              <Stack direction="row" spacing={1} mb="4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Badge key={i} variant='ghost' cursor='default'>
                    ⭐
                  </Badge>
                ))}
              </Stack>
            </Box>
          </Box>
        ))}
      </Flex>
    </VStack>
  );
}

export default Testimonials;
