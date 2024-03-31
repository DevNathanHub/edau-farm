import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  
} from '@chakra-ui/react';
import AddProduct from './AddProduct';
 
const AddProductModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Product</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <AddProduct/>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddProductModal;
