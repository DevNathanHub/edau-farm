import React from 'react';
import { VStack, Box, Text } from '@chakra-ui/react';

function MissionAndPassion() {
  return (
    <VStack spacing="4" align="start">
      <Box>
        <Text fontWeight="bold">Our Passion</Text>
        <Text>
          At HoneyHarvest, we have a passion for bringing you the finest quality honey products sourced directly from nature's bounty.
        </Text>
      </Box>
      <Box>
        <Text fontWeight="bold">Our Mission</Text>
        <Text>
          Our mission is simple: to provide you with pure, natural honey that not only tastes delicious but also offers a myriad of health benefits.
        </Text>
      </Box>
    </VStack>
  );
}

export default MissionAndPassion;
