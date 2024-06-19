import React, { useState, useEffect } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Box,
  Image,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import axios from 'axios';
import baseUrl from '../../baseUrl';

const EditUserModal = ({ userId, isOpen, onClose, onUserUpdated }) => {
  const [user, setUser] = useState({
    displayName: '',
    email: '',
    role: '',
    photoURL: '',
  });
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (userId) {
      // Fetch user data when modal opens
      const fetchUser = async () => {
        try {
          const response = await axios.get(`${baseUrl}/api/user/${userId}`);
          setUser(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
          toast({
            title: "Error fetching user data.",
            description: error.message,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      };
      fetchUser();
    }
  }, [userId, toast]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.put(`${baseUrl}/api/user/edit/${userId}`, user);
      toast({
        title: "User updated.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onUserUpdated(response.data); // Callback to update parent component
      onClose();
    } catch (error) {
      toast({
        title: "Error updating user.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit User</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Display Name</FormLabel>
              <Input
                type="text"
                name="displayName"
                value={user.displayName}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Role</FormLabel>
              <Input
                type="text"
                name="role"
                value={user.role}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Photo URL</FormLabel>
              <Input
                type="text"
                name="photoURL"
                value={user.photoURL}
                onChange={handleInputChange}
              />
              {user.photoURL && (
                <Box mt={2}>
                  <Image src={user.photoURL} alt="Profile" boxSize="100px" borderRadius="full" />
                </Box>
              )}
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleSubmit} isLoading={loading}>
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditUserModal;
