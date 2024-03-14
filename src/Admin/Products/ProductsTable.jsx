import React, { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react';

function ProductsTable() {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
  });
  const [selectedProductId, setSelectedProductId] = useState(null);

  const toast = useToast();

  useEffect(() => {
    // Simulated fetch of products data from an API
    // Replace this with your actual data fetching logic
    const fetchedProducts = [
      { id: 1, name: 'Product 1', price: 10, description: 'Description for Product 1' },
      { id: 2, name: 'Product 2', price: 20, description: 'Description for Product 2' },
      { id: 3, name: 'Product 3', price: 30, description: 'Description for Product 3' },
    ];
    setProducts(fetchedProducts);
  }, []);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setFormData({ name: '', price: '', description: '' });
    setSelectedProductId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditProduct = (id) => {
    const selectedProduct = products.find((product) => product.id === id);
    setFormData({
      name: selectedProduct.name,
      price: selectedProduct.price,
      description: selectedProduct.description,
    });
    setSelectedProductId(id);
    setIsModalOpen(true);
  };

  const handleSaveProduct = () => {
    // Simulated updating product logic
    if (selectedProductId) {
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === selectedProductId
            ? { ...product, name: formData.name, price: formData.price, description: formData.description }
            : product
        )
      );
      toast({
        title: 'Product updated.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } else {
      // Simulated adding new product logic
      const newProduct = {
        id: Date.now(), // Simulated unique id
        name: formData.name,
        price: formData.price,
        description: formData.description,
      };
      setProducts((prevProducts) => [...prevProducts, newProduct]);
      toast({
        title: 'Product added.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
    handleModalClose();
  };

  const handleDeleteProduct = (id) => {
    // Simulated deleting product logic
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
    toast({
      title: 'Product deleted.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <div>
      <Button colorScheme="blue" onClick={handleModalOpen} mb="4">
        Add Product
      </Button>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Price</Th>
            <Th>Description</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products.map((product) => (
            <Tr key={product.id}>
              <Td>{product.name}</Td>
              <Td>{product.price}</Td>
              <Td>{product.description}</Td>
              <Td>
                <Button colorScheme="green" onClick={() => handleEditProduct(product.id)} mr="2">
                  Edit
                </Button>
                <Button colorScheme="red" onClick={() => handleDeleteProduct(product.id)}>
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
          <ModalHeader>{selectedProductId ? 'Edit Product' : 'Add Product'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb="4">
              <FormLabel>Name</FormLabel>
              <Input type="text" name="name" value={formData.name} onChange={handleInputChange} />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Price</FormLabel>
              <Input type="number" name="price" value={formData.price} onChange={handleInputChange} />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Description</FormLabel>
              <Input type="text" name="description" value={formData.description} onChange={handleInputChange} />
            </FormControl>
            <Button colorScheme="blue" onClick={handleSaveProduct} mr="2">
              Save
            </Button>
            <Button onClick={handleModalClose}>Cancel</Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default ProductsTable;
