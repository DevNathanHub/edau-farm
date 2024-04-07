import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { VStack, Avatar, Text, Box, Flex } from '@chakra-ui/react';

const teamMembers = [
  {
    name: "John Doe",
    role: "Co-Founder",
    avatar: "https://bit.ly/dan-abramov"
  },
  {
    name: "David Smith",
    role: "Head of Production",
    avatar: "https://bit.ly/sage-adebayo"
  },
  {
    name: "David Lee",
    role: "Marketing Director",
    avatar: "https://bit.ly/code-beast"
  },
  {
    name: "Emily Johnson",
    role: "Sales Manager",
    avatar: "https://bit.ly/dan-abramov"
  }
];

function Team() {
  const controls = useAnimation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const elementOffset = document.getElementById('team-section').offsetTop;
      if (scrollPosition > elementOffset) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [isVisible, controls]);

  return (
    <VStack spacing="4" align="start" id="team-section">
      <Text fontSize="2xl" fontWeight="bold" mb="4">
        Our Team
      </Text>
      <Flex flexWrap="wrap" gap="10px" justifyContent="center" width='100%'>
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            style={{ width: "350px" }} // Set a minimum width for each item
          >
            <Box maxW="md" borderWidth="1px" borderRadius="lg" overflow="hidden" width="100%" mb="4">
              <Flex p="6" align="center">
                <Avatar src={member.avatar} />
                <Box ml="4">
                  <Text fontWeight="bold">{member.name}</Text>
                  <Text fontSize="sm">{member.role}</Text>
                </Box>
              </Flex>
            </Box>
          </motion.div>
        ))}
      </Flex>
    </VStack>
  );
}

export default Team;
