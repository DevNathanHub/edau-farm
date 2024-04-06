import React, { useState } from 'react';
import { Button, FormControl, FormLabel, Input, VStack, Box, Image, useToast } from "@chakra-ui/react";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase';
import axios from 'axios';
import baseUrl from '../../baseUrl';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState(['']);
  const [variations, setVariations] = useState([{ size: '', quantity: 0 }]);
  const [images, setImages] = useState([]);
  const [deliveryFee, setDeliveryFee] = useState(''); // Step 1: Add deliveryFee state
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleAddDescription = () => {
    setDescription([...description, '']);
  };

  const handleRemoveDescription = (index) => {
    const newDescription = [...description];
    newDescription.splice(index, 1);
    setDescription(newDescription);
  };

  const handleAddVariation = () => {
    setVariations([...variations, { size: '', quantity: 0 }]);
  };

  const handleRemoveVariation = (index) => {
    const newVariations = [...variations];
    newVariations.splice(index, 1);
    setVariations(newVariations);
  };

  const handleSubmit = async () => {
    setLoading(true); // Set loading to true when submitting
    try {
      const imageUrls = await Promise.all(images.map(async (image) => {
        const storageRef = ref(storage, image.name);
        await uploadBytes(storageRef, image);
        return await getDownloadURL(storageRef);
      }));
  
      const formData = {
        name,
        price,
        description,
        variations,
        imageUrl: imageUrls,
        deliveryFee, // Include deliveryFee in formData
      };
      console.log("form data", formData);
      await axios.post(`${baseUrl}/api/products`, formData);
  
      toast({
        title: "Product added.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
  
      // Clear form values after successful submission
      setName('');
      setPrice('');
      setDescription(['']);
      setVariations([{ size: '', quantity: 0 }]);
      setImages([]);
      setDeliveryFee(''); // Reset deliveryFee after submission
  
    } catch (error) {
      toast({
        title: "Error adding product.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false); // Set loading to false after submission
    }
  };

  return (
    <VStack spacing={4}>
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </FormControl>
      <FormControl>
        <FormLabel>Price</FormLabel>
        <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
      </FormControl>
      <FormControl> {/* Step 2: Add deliveryFee input field */}
        <FormLabel>Delivery Fee</FormLabel>
        <Input type="number" value={deliveryFee} onChange={(e) => setDeliveryFee(e.target.value)} />
      </FormControl>
      <Box>
        <FormLabel>Description</FormLabel>
        {description.map((desc, index) => (
          <div key={index}>
            <Input value={desc} onChange={(e) => {
              const newDescription = [...description];
              newDescription[index] = e.target.value;
              setDescription(newDescription);
            }} />
            <Button onClick={() => handleRemoveDescription(index)}>-</Button>
          </div>
        ))}
        <Button onClick={handleAddDescription}>+</Button>
      </Box>
      <Box>
        <FormLabel>Variations</FormLabel>
        {variations.map((variation, index) => (
          <div key={index}>
            <Input value={variation.size} onChange={(e) => {
              const newVariations = [...variations];
              newVariations[index].size = e.target.value;
              setVariations(newVariations);
            }} />
            <Input type="number" value={variation.quantity} onChange={(e) => {
              const newVariations = [...variations];
              newVariations[index].quantity = parseInt(e.target.value);
              setVariations(newVariations);
            }} />
            <Button onClick={() => handleRemoveVariation(index)}>-</Button>
          </div>
        ))}
        <Button onClick={handleAddVariation}>+</Button>
      </Box>
      <FormControl>
        <FormLabel>Upload Images</FormLabel>
        <Input type="file" multiple onChange={handleImageChange} />
      </FormControl>
      <Button onClick={handleSubmit} disabled={loading}>{loading ? "Loading..." : "Submit"}</Button>
      <Box>
        {images.map((image, index) => (
          <Image key={index} src={URL.createObjectURL(image)} alt={`Preview ${index}`} />
        ))}
      </Box>
    </VStack>
  );
};

export default AddProduct;
