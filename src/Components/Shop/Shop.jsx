import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardBody, CardFooter, Button, Stack, Heading, Text, Image, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { CiDeliveryTruck } from "react-icons/ci";
import { Pagination, Spin } from 'antd';
import axios from 'axios';
import { CartContext } from '../../Context/CartContext';
import Filter from './Filter';
import { Search2Icon } from '@chakra-ui/icons';
import { BiPurchaseTag } from "react-icons/bi";
import './shop.css';
import { Badge } from 'react-bootstrap';

function Shop() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    minPrice: 0,
    maxPrice: 1000,
  });
  const { addToCart, handlePurchaseItem, cartItems } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const state = location.state;
    if (state && state.currentPage) {
      setCurrentPage(state.currentPage);
    }
  }, [location.state]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredProducts =
    products &&
    products.filter((product) => {
      return (
        (product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (product.price >= filters.minPrice && product.price <= filters.maxPrice) &&
        (filters.category === '' || product.category === filters.category)
      );
    });
  const currentProducts = filteredProducts && filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    navigate('.', { state: { currentPage: pageNumber } }); // Update browser history state
  };

  const handleApplyFilter = (filterOptions) => {
    setFilters(filterOptions);
  };

  const handleViewProduct = (product) => {
    handlePurchaseItem(product);
    navigate(`/shop/product/${product.id}`);
  };

  const handleAddSingleItem = (product) =>{
    handlePurchaseItem(product);
    navigate('/shop/checkout');
  };

  return (
    <div className='shop-component'>
      <div className="filter-search-component">
        <Filter onApplyFilter={handleApplyFilter} />
        <div className="search-component">
          
          <InputGroup>
            <Input 
              style={{ borderRadius: '30px', border: '1px solid #ddd'}}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} placeholder='Search' 
            />
            <InputRightElement pointerEvents='none'>
              <Search2Icon color='black.300' />
            </InputRightElement>
          </InputGroup>
        </div>
        
      </div>
      {isLoading? 
        <div >
          <Spin size='large'/>
        </div>
      : 
        <div className='shop-content'>
          {currentProducts.map((product, index) => {
            // Find the corresponding item in the cart
            const cartItem = cartItems.find((item) => item.id === product.id);
            // Get the quantity from the cartItem or default to 0 if not found
            const quantity = cartItem ? cartItem.quantity : 0;
            return (
              <Card key={index} width={{ sm: '280px' }} borderRadius={'20px'} className='shop-card'>
                <CardBody cursor='pointer'>
                    <Image
                      src={product.image}
                      alt={product.title}
                      borderRadius='sm'
                      maxH='150px'
                      objectFit='contain'
                      width={'100%'}
                      onClick={() => handleViewProduct(product)}
                    />
                  <Stack mt='6' spacing='3'  onClick={() => handleViewProduct(product)}>
                    <Heading size='sm'>{product.title}</Heading>
                    <Text className='description'>{product.description}</Text>
                      <Text fontSize='2xl' color= 'blue.800'>${product.price}   </Text>                
                      <Stack direction='horizontal' gap={2}><Badge bg='light' text='dark'pill >In Stock</Badge><Badge pill style={{display: 'flex', gap: '2px'}}><CiDeliveryTruck/> Free Delivery</Badge></Stack>
                  </Stack>
                </CardBody>
                <CardFooter className='footer'>
                    <Button variant='solid' colorScheme='green' size='sm' className ='footer-btn' rightIcon={<BiPurchaseTag/>} onClick={() => handleAddSingleItem(product)}>Buy Now</Button>
                    <Button variant='outline' colorScheme='green' size='sm' className = 'footer-btn' onClick={() => addToCart(product)}>Add to Cart {quantity > 0 && <Badge style= {{marginLeft: '5px'}} bg='success' pill >{quantity}</Badge>}               
                    </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      }
      <div className='pagination'>
        <Pagination
          current={currentPage}
          total={filteredProducts.length}
          pageSize={itemsPerPage}
          onChange={paginate}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
}

export default Shop;
