import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  
} from '@chakra-ui/react';
import AddUser from './AddUser';
 
const AddUserModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add User</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <AddUser/>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddUserModal;
