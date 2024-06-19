import React, { useState, useEffect } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import baseUrl from '../../baseUrl';

function UsersTable() {
  const [users, setUsers] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    role: '',
    photoURL: '',
  });
  const [selectedUserId, setSelectedUserId] = useState(null);
  const toast = useToast();

  useEffect(() => {
    // Fetch users from the backend
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/users`);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        toast({
          title: 'Error fetching users.',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchUsers();
  }, [toast]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveUser = async () => {
    setIsEditModalOpen(false);
    try {
      if (selectedUserId) {
        // Update user
        await axios.put(`${baseUrl}/api/user/edit/${selectedUserId}`, formData);
        toast({
          title: 'User updated.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
      // Refresh users
      const response = await axios.get(`${baseUrl}/api/users`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Error updating user.',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleEditUser = (userId) => {
    const userToEdit = users.find((user) => user._id === userId);
    setSelectedUserId(userId);
    setFormData({
      displayName: userToEdit.displayName,
      email: userToEdit.email,
      role: userToEdit.role,
      photoURL: userToEdit.photoURL,
    });
    setIsEditModalOpen(true);
  };

  const handleDeleteUser = async () => {
    try {
      await axios.delete(`${baseUrl}/api/user/delete/${selectedUserId}`);
      setUsers(users.filter((user) => user._id !== selectedUserId));
      toast({
        title: 'User deleted.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Error deleting user.',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const openDeleteModal = (userId) => {
    setSelectedUserId(userId);
    setIsDeleteModalOpen(true);
  };

  return (
    <div>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Display Name</Th>
            <Th>Email</Th>
            <Th>Role</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user) => (
            <Tr key={user._id}>
              <Td>{user.displayName}</Td>
              <Td>{user.email}</Td>
              <Td>{user.role}</Td>
              <Td>
                <Button colorScheme="green" onClick={() => handleEditUser(user._id)} mr="2">
                  Edit
                </Button>
                <Button colorScheme="red" onClick={() => openDeleteModal(user._id)}>
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Edit User Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb="4">
              <FormLabel>Display Name</FormLabel>
              <Input
                type="text"
                name="displayName"
                value={formData.displayName}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Role</FormLabel>
              <Input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Photo URL</FormLabel>
              <Input
                type="text"
                name="photoURL"
                value={formData.photoURL}
                onChange={handleInputChange}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSaveUser} mr="2">
              Save
            </Button>
            <Button onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Delete User Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete this user?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" onClick={handleDeleteUser} mr="2">
              Delete
            </Button>
            <Button onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default UsersTable;
