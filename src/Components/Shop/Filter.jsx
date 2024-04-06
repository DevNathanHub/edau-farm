import React, { useState, useEffect } from 'react';
//import Button from 'react-bootstrap/Button';
import { FaFilter } from 'react-icons/fa6';
import { FcClearFilters } from "react-icons/fc";
import { toast } from 'react-toastify';
import './Filter.css';
import axios from 'axios';
import { Select, Input } from 'antd';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { Button, Card, Text, Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton } from '@chakra-ui/react';

const { Option } = Select;

function Filter({ onApplyFilter }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000); // Set a default max value
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/categories`);
        setCategories(response.data.map(category => category));
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
  
    fetchCategories();
  }, []);

  const handleApplyFilter = () => {
    toast(`Category: ${category}, Price Range: $${minPrice} - $${maxPrice}`);
    onApplyFilter({ category, minPrice, maxPrice });
    console.log(category, minPrice, maxPrice);
    closeDrawer();
  };

  const handleClearFilter = () => {
    setCategory('');
    setMinPrice(0);
    setMaxPrice(1000);
  };

  const PreviewComponent = () => (
    <Card className="filter-preview" p={4}> {/* Use Card component */}
        <Text fontSize="xl" fontWeight="bold">Filter Preview</Text> {/* Use Text component for headings */}
        <Text>Selected Category: {category}</Text> {/* Use Text component for paragraphs */}
        <Text>Min Price: ${minPrice}</Text>
        <Text>Max Price: ${maxPrice}</Text>
    </Card>
  );

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <>
      <div onClick={openDrawer} className="filter-component">
        Filter <FaFilter className="filter-icon" />
      </div>

      <Drawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        placement="right"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Filter Options</DrawerHeader>

          <DrawerBody>
            <div className="filter-category">
              <h5>Category</h5>
              <Select
                value={category}
                onChange={(value) => setCategory(value)}
                style={{ width: '100%' }}
                placeholder="Select Category"
              >
                {categories.map((cat) => (
                  <Option key={cat} value={cat}>
                    {cat}
                  </Option>
                ))}
              </Select>
            </div>

            <div className="filter-price">
              <h5>Price Range</h5>
              <Slider
                min={0}
                max={1000}
                allowCross={false}
                defaultValue={[minPrice, maxPrice]}
                onChange={(value) => {
                  setMinPrice(value[0]);
                  setMaxPrice(value[1]);
                }}
                range
              />

              <div className="price-inputs">
                <label>Min Price:</label>
                <Input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(parseInt(e.target.value) || 0)}
                />
              </div>
              <div className="price-inputs">
                <label>Max Price:</label>
                <Input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseInt(e.target.value) || 0)}
                />
              </div>
            </div>

            <PreviewComponent />
          </DrawerBody>

          <DrawerFooter>
            <Button leftIcon={<FaFilter />} colorScheme='teal' variant='solid' onClick={handleApplyFilter}>
              Apply Filter
            </Button>
            <Button leftIcon={<FcClearFilters />} colorScheme='green' variant='outline' onClick={handleClearFilter} style={{ marginLeft: '10px' }}>
              Clear Filter
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Filter;
