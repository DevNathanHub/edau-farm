    import React, { useState, useEffect, useContext } from 'react';
    import { useNavigate, useLocation } from 'react-router-dom';
    import { Badge, Card, CardBody, CardFooter, Button, Stack, Heading, Text, Image, Input, InputGroup, InputRightElement, HStack,  } from '@chakra-ui/react';
    import { CiDeliveryTruck } from "react-icons/ci";
    import { Pagination, Spin } from 'antd';
    import { CartContext } from '../../Context/CartContext';
    import Filter from './Filter';
    import { Search2Icon } from '@chakra-ui/icons';
    import { BiPurchaseTag } from "react-icons/bi";
    import './shop.css';
    import ContentNotFound from '../../NotFound/ContentNotFound';
    import baseUrl from '../../baseUrl';

    function Shop() {
      const [products, setProducts] = useState([]);
      const navigate = useNavigate();
      const location = useLocation();
      const [isLoading, setIsLoading] = useState(true);
      const [currentPage, setCurrentPage] = useState(1);
      const [itemsPerPage] = useState(7);
      const [searchQuery, setSearchQuery] = useState('');
      const [filters, setFilters] = useState({
        category: '',
        minPrice: 0,
        maxPrice: 100000,
      });

      const { addToCart, cartItems, setSingleItem } = useContext(CartContext);
      const [currentTheme, setCurrentTheme] = useState(null);
      
      useEffect(() => {
        const themeColor = localStorage.getItem('chakra-ui-color-mode');
        setCurrentTheme(themeColor);
      }, []);
      
      useEffect(() => {
        const fetchProducts = async () => {
          try {
            const response = await fetch(`${baseUrl}/api/products`);
            const data = await response.json();
            setProducts(data);
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
            (product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              product.description[0].toLowerCase().includes(searchQuery.toLowerCase())) &&
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
        console.log("view product", product);
        setSingleItem(product);
        // Use navigate to redirect to the product page and pass the product data as state
        navigate(`/shop/product/${product._id}`, { state: { product } });
      };

      const handlePurchaseItem = (product) => {
        setSingleItem(product);
        navigate('/shop/single-item-checkout');
      };

      return (
        <div className='shop-component component'>
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
              {currentProducts.length === 0 ? <ContentNotFound/>
              : 
                currentProducts.map((product, index) => {
                // Find the corresponding item in the cart
                const cartItem = cartItems.find((item) => item._id === product._id);
                // Get the quantity from the cartItem or default to 0 if not found
                const quantity = cartItem ? cartItem.quantity : 0;
                return (
                  <Card key={index} width={{ sm: '350px' }} borderRadius={'30px'} className='shop-card' variant='outline'>
                    <CardBody cursor='pointer'>
                    <Image src={product.imageUrl[0]} alt={product.name} w="100%" h="100%" objectFit="cover" borderRadius='30px' onClick={() => handleViewProduct(product)}/>

                    
                      <Stack mt='3' spacing='3'  onClick={() => handleViewProduct(product)}>
                        < HStack gap={2}>
                          <Heading size='sm' w='65%' textTransform='uppercase'>{product.name}</Heading>

                          <Text   colorScheme='teal' className='price'>Ksh {product.price}</Text>                
                          
                        </HStack>
                        <Text className='description'>{product.description[0]}</Text>

                        <HStack  gap={2} mt='-15px'>
                          <Badge variant='outline' colorScheme='green'  >{product.inStock ? 'In Stock' : 'Out of Stock'}</Badge>
                          {product.deliveryFee ?<Badge  style={{display: 'flex', gap: '2px'}} className='delivery' >
                            <CiDeliveryTruck className='icon-truck'/> Delivery Fee Ksh{product.deliveryFee}
                          </Badge>: 
                          <Badge  style={{display: 'flex', gap: '2px'}} className='delivery' >
                            <CiDeliveryTruck className='icon-truck'/> Free Delivery
                          </Badge>
                          }
                          
                        </HStack>
                      </Stack>
                    </CardBody>
                    <CardFooter className='footer' mt='-15px'>
                      <Button variant='outline' colorScheme='teal' size='sm' className ='footer-btn' rightIcon={<BiPurchaseTag/>} onClick={() => handlePurchaseItem(product)}>Buy Now</Button>
                      <Button variant='outline' colorScheme='teal' size='sm' className = 'footer-btn' onClick={() => addToCart(product)}>Add to Cart {quantity > 0 && <Badge style= {{marginLeft: '5px'}} bg='success' pill >{quantity}</Badge>}               
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
              className={currentTheme === 'dark' ? 'dark-pagination' : 'light-pagination'}
            />
          </div>
        </div>
      );
    }

    export default Shop;