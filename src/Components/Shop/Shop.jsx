import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardFooter, ButtonGroup, Button, Stack, Heading, Text, Image, Input, InputGroup, InputRightAddon } from '@chakra-ui/react';
import { Pagination, Spin } from 'antd';
import axios from 'axios';
import { CartContext } from '../../Context/CartContext';
import Filter from './Filter'; // Assuming you have a Filter component
import { Search2Icon } from '@chakra-ui/icons';
import './shop.css';
import { toast } from 'react-toastify';

function Shop() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    minPrice: 0,
    maxPrice: 1000,
  });
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
        setIsLoading(!isLoading);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

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
  };

  const handleApplyFilter = (filterOptions) => {
    setFilters(filterOptions);
  };

  const handlePurchase = () => {
    toast.warning('Funtionality not Implemented');
  }
  return (
    <div className='shop-component'>
      <div className="filter-search-component">
        <Filter onApplyFilter={handleApplyFilter} />
        <div className="search-component">
          <InputGroup >
          <Input placeholder="Search..."  style={{borderTopLeftRadius: '30px', borderBottomLeftRadius: '30px'}} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          <InputRightAddon style={{borderTopRightRadius: '30px', borderBottomRightRadius: '30px'}} backgroundColor= 'white'>
            <Search2Icon />
          </InputRightAddon>
          </InputGroup>
        </div>
        
      </div>
      {isLoading? 
        <div >
          <Spin size='large'/>
        </div>
      : 
        <div className='shop-content'>
          {currentProducts.map((product, index) => (
            <Card key={index} width={{ sm: '250px' }} borderRadius={'20px'}>
              <CardBody>
                <Link to={`/product/${product.id}`}>
                  <Image
                    src={product.image}
                    alt={product.title}
                    borderRadius='sm'
                    maxH='150px'
                    objectFit='contain'
                    width={'100%'}
                  />
                </Link>
                <Stack mt='6' spacing='3'>
                  <Heading size='sm'>{product.title}</Heading>
                  <Text className='description'>{product.description}</Text>
                  <Text color='blue.600' fontSize='2xl'>${product.price}</Text>
                </Stack>
              </CardBody>
              <CardFooter>
                <ButtonGroup spacing='2'>
                  <Button variant='solid' colorScheme='blue' onClick={handlePurchase}>Buy now</Button>
                  <Button variant='ghost' colorScheme='blue' onClick={() => addToCart(product)}>Add to cart</Button>
                </ButtonGroup>
              </CardFooter>
            </Card>
          ))}
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
