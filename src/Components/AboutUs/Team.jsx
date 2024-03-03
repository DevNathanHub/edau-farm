    import React from 'react';
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
    return (
        <VStack spacing="4" align="start">
        <Text fontSize="2xl" fontWeight="bold" mb="4">
            Our Team
        </Text>
        <Flex flexWrap="wrap" gap='20px'>
            {teamMembers.map((member, index) => (
            <Box key={index} maxW="md" borderWidth="1px" borderRadius="lg" overflow="hidden" width={{ base: "100%", sm: "50%" }} mb="4">
                <Flex p="6" align="center">
                <Avatar src={member.avatar} />
                <Box ml="4">
                    <Text fontWeight="bold">{member.name}</Text>
                    <Text fontSize="sm">{member.role}</Text>
                </Box>
                </Flex>
            </Box>
            ))}
        </Flex>
        </VStack>
    );
    }

    export default Team;
