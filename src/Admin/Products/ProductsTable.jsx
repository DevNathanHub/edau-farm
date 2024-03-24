import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  IconButton,
  Tooltip,
  useToast,
  useDisclosure
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import AddProductModal from './AddProductModal';
import baseUrl from '../../baseUrl';
import EditProductModal from './EditProductModal';

const ProductsTable = () => {
  const [products, setProducts] = useState([]);
  const toast = useToast();
  const { isOpen: isAddModalOpen, onOpen: onAddModalOpen, onClose: onAddModalClose } = useDisclosure();
  const { isOpen: isEditModalOpen, onOpen: onEditModalOpen, onClose: onEditModalClose } = useDisclosure();
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/products`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`${baseUrl}/api/products/${productId}`);
      setProducts(products.filter((product) => product._id !== productId));
      toast({
        title: 'Product deleted successfully',
        status: 'success',
        duration: 3000,
        isClosable: true
      });
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: 'An error occurred',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true
      });
    }
  };

  const handleEditProduct = (productId) => {
    setSelectedProductId(productId);
    onEditModalOpen();
  };

  return (
    <div>
      <Button colorScheme="blue" mb="4" onClick={onAddModalOpen}>Add Product</Button>
      <AddProductModal isOpen={isAddModalOpen} onClose={onAddModalClose} />
      <EditProductModal isOpen={isEditModalOpen} onClose={onEditModalClose} productId={selectedProductId} />
      <Table variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Description</Th>
            <Th>Price (Ksh)</Th>
            <Th>Variations</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products.map((product) => (
            <Tr key={product._id}>
              <Td>{product.name}</Td>
              <Td>
                {product.description.map((desc, index) => (
                  <div key={index}>{desc}</div>
                ))}
              </Td>
              <Td>{product.price}</Td>
              <Td>
                <ul>
                  {product.variations.map((variation, index) => (
                    <li key={index}>
                      Size: {variation.size}, In Stock: {variation.quantity}
                    </li>
                  ))}
                </ul>
              </Td>
              <Td>
                <chakra.span mr="2">
                  <Tooltip label="Edit" aria-label="Edit">
                    <IconButton
                      icon={<EditIcon />}
                      onClick={() => handleEditProduct(product._id)}
                    />
                  </Tooltip>
                </chakra.span>
                <chakra.span>
                  <Tooltip label="Delete" aria-label="Delete">
                    <IconButton
                      icon={<DeleteIcon />}
                      onClick={() => handleDeleteProduct(product._id)}
                    />
                  </Tooltip>
                </chakra.span>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};

export default ProductsTable;
