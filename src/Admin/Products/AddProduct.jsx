import React, { useState } from 'react';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
import baseUrl from '../../baseUrl';
import { FormControl, FormLabel, Input, Textarea, Button, Image } from '@chakra-ui/react';

function AddProduct() {
  const toast = useToast();

  const [formData, setFormData] = useState({
    id: '',
    title: '',
    price: '',
    description: '',
    category: '',
    image: '',
    rating: {
      rate: '',
      count: '',
    },
  });

  const [imagePreview, setImagePreview] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'image' && e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);

      setFormData((prevData) => ({
        ...prevData,
        [name]: e.target.files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${baseUrl}/api/products`, formData);
      console.log('Product uploaded successfully:', response.data);
      toast({
        title: 'Success',
        description: 'Product uploaded successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setFormData({
        id: '',
        title: '',
        price: '',
        description: '',
        category: '',
        image: '',
        rating: {
          rate: '',
          count: '',
        },
      });
      setImagePreview('');
    } catch (error) {
      console.error('Error uploading product:', error);
      toast({
        title: 'Error',
        description: 'Error uploading product',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <div>
      <h2>Create Product</h2>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>ID:</FormLabel>
          <Input type="number" name="id" value={formData.id} onChange={handleInputChange} />
        </FormControl>
        <br />

        <FormControl>
          <FormLabel>Title:</FormLabel>
          <Input type="text" name="title" value={formData.title} onChange={handleInputChange} />
        </FormControl>
        <br />

        <FormControl>
          <FormLabel>Price:</FormLabel>
          <Input type="number" name="price" value={formData.price} onChange={handleInputChange} />
        </FormControl>
        <br />

        <FormControl>
          <FormLabel>Description:</FormLabel>
          <Textarea name="description" value={formData.description} onChange={handleInputChange} />
        </FormControl>
        <br />

        <FormControl>
          <FormLabel>Category:</FormLabel>
          <Input type="text" name="category" value={formData.category} onChange={handleInputChange} />
        </FormControl>
        <br />

        <FormControl>
          <FormLabel>Image:</FormLabel>
          <Input type="file" name="image" onChange={handleInputChange} />
          {imagePreview && <Image src={imagePreview} alt="Preview" maxW="200px" mt="10px" />}
        </FormControl>
        <br />

        <FormControl>
          <FormLabel>Rating:</FormLabel>
          <Input type="number" name="rate" placeholder="Rate" value={formData.rating.rate} onChange={(e) => handleInputChange({ target: { name: 'rating', value: { ...formData.rating, rate: e.target.value } } })} />
          <Input type="number" name="count" placeholder="Count" value={formData.rating.count} onChange={(e) => handleInputChange({ target: { name: 'rating', value: { ...formData.rating, count: e.target.value } } })} />
        </FormControl>
        <br />

        <Button type="submit">Upload Product</Button>
      </form>
    </div>
  );
}

export default AddProduct;
