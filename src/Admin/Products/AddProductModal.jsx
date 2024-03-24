import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast
} from '@chakra-ui/react';
import { uploadToFirebase } from '../../firebase'; // Import the uploadToFirebase function
import axios from 'axios';
import baseUrl from '../../baseUrl';

const AddProductModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: [],
    price: 0,
    imageUrl: [],
    variations: [{ size: '', quantity: 0 }]
  });
  const [fileList, setFileList] = useState([]);
  const [uploadDisabled, setUploadDisabled] = useState(true);
  const toast = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (value.trim()) {
      setUploadDisabled(false);
    } else {
      setUploadDisabled(true);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFileList(files);
  };

  const handleSaveProduct = async () => {
    try {
      const uploadPromises = fileList.map(async (file) => {
        const downloadURL = await uploadToFirebase(file);
        return downloadURL;
      });

      const imageUrls = await Promise.all(uploadPromises);

      setFormData((prevFormData) => ({
        ...prevFormData,
        imageUrl: imageUrls
      }));

      // Display toast for successful upload
      toast({
        title: 'Images uploaded successfully',
        status: 'success',
        duration: 3000,
        isClosable: true
      });

      // Now formData contains the array of image URLs
      // Perform other actions such as saving to database
      await axios.post(`${baseUrl}/api/products`, formData);

      // Display toast for successful product addition
      toast({
        title: 'Product added successfully',
        status: 'success',
        duration: 3000,
        isClosable: true
      });

      onClose();
    } catch (error) {
      toast({
        title: 'An error occurred',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true
      });
    }
  };

  const addDescription = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      description: [...prevFormData.description, '']
    }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Product</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb="4">
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Price (Ksh)</FormLabel>
            <Input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Description</FormLabel>
            {formData.description.map((desc, index) => (
              <Input
                key={index}
                type="text"
                value={desc}
                onChange={(e) => {
                  const newDescription = e.target.value;
                  setFormData((prevFormData) => {
                    const updatedDescriptions = [...prevFormData.description];
                    updatedDescriptions[index] = newDescription;
                    return {
                      ...prevFormData,
                      description: updatedDescriptions
                    };
                  });
                }}
              />
            ))}
            <Button
              colorScheme="blue"
              ml="2"
              onClick={addDescription}
            >
              Add Description
            </Button>
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Upload Images</FormLabel>
            <Input
              type="file"
              name="images"
              multiple
              onChange={handleImageChange}
            />
          </FormControl>
          {/* Add fields for variations */}
          {formData.variations.map((variation, index) => (
            <div key={index}>
              <FormControl mb="4">
                <FormLabel>Size</FormLabel>
                <Input
                  type="text"
                  value={variation.size}
                  onChange={(e) => {
                    const newSize = e.target.value;
                    setFormData((prevFormData) => {
                      const updatedVariations = [...prevFormData.variations];
                      updatedVariations[index].size = newSize;
                      return {
                        ...prevFormData,
                        variations: updatedVariations
                      };
                    });
                  }}
                />
              </FormControl>
              <FormControl mb="4">
                <FormLabel>Quantity</FormLabel>
                <Input
                  type="number"
                  value={variation.quantity}
                  onChange={(e) => {
                    const newQuantity = parseInt(e.target.value);
                    setFormData((prevFormData) => {
                      const updatedVariations = [...prevFormData.variations];
                      updatedVariations[index].quantity = newQuantity;
                      return {
                        ...prevFormData,
                        variations: updatedVariations
                      };
                    });
                  }}
                />
              </FormControl>
            </div>
          ))}
          <Button
            colorScheme="blue"
            onClick={() =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                variations: [...prevFormData.variations, { size: '', quantity: 0 }]
              }))
            }
          >
            Add Variation
          </Button>
          <Button
            colorScheme="blue"
            onClick={handleSaveProduct}
            mr="2"
            disabled={uploadDisabled}
          >
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddProductModal;
