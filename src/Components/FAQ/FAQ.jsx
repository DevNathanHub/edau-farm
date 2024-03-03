import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Text,
} from '@chakra-ui/react';
import './faq.css';
function FAQ() {
  return (
    <div className='faq-component component' >

      <h1>Frequently Asked Questions</h1>
    <div className='faqs-section'>
      
      <Accordion defaultIndex={[0]} allowMultiple bgColor='white'>
        <AccordionItem >
          <AccordionButton >
            <Box flex="1" textAlign="left">
              How can I place an order?
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Text>
              You can place an order by browsing our products, selecting the items you wish to purchase, and then proceeding to checkout. Follow the steps to enter your shipping details and complete your order.
            </Text>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              What payment methods do you accept?
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Text>
              We accept various online payment methods, including credit/debit cards, PayPal, and other secure payment gateways. You can choose your preferred payment option during checkout.
            </Text>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              How long does delivery take?
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Text>
              We strive to deliver orders within 3 days from the date of purchase. However, delivery times may vary depending on your location and product availability.
            </Text>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Do you offer free delivery?
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Text>
              Yes, we offer free delivery within Nairobi for all orders. No minimum purchase is required to qualify for free delivery.
            </Text>
          </AccordionPanel>
        </AccordionItem>

        {/* Add more QA here */}
        
      </Accordion>
    </div>
    </div>
  );
}

export default FAQ;
