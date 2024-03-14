import React, { useState } from 'react';
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
  FormControl,
  FormLabel,
  Input,
  useToast,
} from '@chakra-ui/react';

function UsersTable() {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Alice Smith', email: 'alice@example.com', role: 'User' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
  });
  const [selectedUserId, setSelectedUserId] = useState(null);

  const toast = useToast();

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setFormData({ name: '', email: '', role: '' });
    setSelectedUserId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveUser = () => {
    if (selectedUserId) {
      console.log('Update user with ID:', selectedUserId);
      toast({
        title: 'User updated.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } else {
      console.log('Add new user:', formData);
      const newUser = { id: Date.now(), ...formData };
      setUsers([...users, newUser]);
      toast({
        title: 'User added.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
    handleModalClose();
  };

  const handleEditUser = (userId) => {
    console.log('Edit user with ID:', userId);
    const userToEdit = users.find((user) => user.id === userId);
    setSelectedUserId(userId);
    setFormData({
      name: userToEdit.name,
      email: userToEdit.email,
      role: userToEdit.role,
    });
    setIsModalOpen(true);
  };

  const handleDeleteUser = (userId) => {
    console.log('Delete user with ID:', userId);
    setUsers(users.filter((user) => user.id !== userId));
    toast({
      title: 'User deleted.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <div>
      <Button colorScheme="blue" onClick={handleModalOpen} mb="4">
        Add User
      </Button>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Role</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user) => (
            <Tr key={user.id}>
              <Td>{user.name}</Td>
              <Td>{user.email}</Td>
              <Td>{user.role}</Td>
              <Td>
                <Button colorScheme="green" onClick={() => handleEditUser(user.id)} mr="2">
                  Edit
                </Button>
                <Button colorScheme="red" onClick={() => handleDeleteUser(user.id)}>
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedUserId ? 'Edit User' : 'Add User'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb="4">
              <FormLabel>Name</FormLabel>
              <Input type="text" name="name" value={formData.name} onChange={handleInputChange} />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Email</FormLabel>
              <Input type="email" name="email" value={formData.email} onChange={handleInputChange} />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Role</FormLabel>
              <Input type="text" name="role" value={formData.role} onChange={handleInputChange} />
            </FormControl>
            <Button colorScheme="blue" onClick={handleSaveUser} mr="2">
              Save
            </Button>
            <Button onClick={handleModalClose}>Cancel</Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default UsersTable;
