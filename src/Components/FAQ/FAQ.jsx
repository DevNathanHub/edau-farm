import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const elementOffset = document.getElementById('faqs-section').offsetTop;
      if (scrollPosition > elementOffset) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='faq-component component'>
      <h1>Frequently Asked Questions</h1>
      <div className='faqs-section' id="faqs-section">
        <Accordion defaultIndex={[0]} allowMultiple>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
          >
            <AccordionItem>
              <AccordionButton>
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
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
          </motion.div>

          {/* Add more AccordionItems with motion.div for each */}
          
        </Accordion>
      </div>
    </div>
  );
}

export default FAQ;
