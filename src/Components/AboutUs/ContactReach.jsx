import React from 'react';
import { VStack, Text, Flex, IconButton } from '@chakra-ui/react';
import { FaFacebook, FaInstagram, FaWhatsapp, FaTwitter } from 'react-icons/fa';

function ContactReach() {
  return (
    <VStack spacing="4" align="start">
      <Text fontSize="2xl" fontWeight="bold" mb="4">
        Contact Reach
      </Text>
      <Flex>
        <IconButton
          icon={<FaFacebook />}
          colorScheme="blue"
          aria-label="Facebook"
          mr="2"
        />
        <IconButton
          icon={<FaInstagram />}
          colorScheme="purple"
          aria-label="Instagram"
          mr="2"
        />
        <IconButton
          icon={<FaWhatsapp />}
          colorScheme="green"
          aria-label="Whatsapp"
          mr="2"
        />
        <IconButton
          icon={<FaTwitter />}
          colorScheme="teal"
          aria-label="Twitter"
        />
      </Flex>
    </VStack>
  );
}

export default ContactReach;
