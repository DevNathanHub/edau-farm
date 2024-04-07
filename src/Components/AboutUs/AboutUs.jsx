import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Box, Text, VStack } from '@chakra-ui/react';
import './aboutus.css';
import Testimonials from './Testimonials';
import Team from './Team';
import ContactReach from './ContactReach';
import MissionAndPassion from './MissionAndPassion';

function AboutUs() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const elementOffset = document.getElementById('about-section').offsetTop;
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
    <div className='about-component component'>
      <h1>About Us</h1>
      <div className='about-section' id="about-section">
        <VStack spacing="6" align="center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
          >
            <MissionAndPassion />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Team />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Box>
              <Text fontWeight="bold">Quality Assurance</Text>
              <Text>
                Quality is at the heart of everything we do. We work closely with local beekeepers to ensure that our honey is ethically sourced and sustainably produced.
              </Text>
            </Box>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Box>
              <Text fontWeight="bold">Our Product Range</Text>
              <Text>
                Our diverse range of honey products caters to every taste bud, from the rich and robust flavors of wildflower honey to the delicate sweetness of acacia honey.
              </Text>
            </Box>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Testimonials />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <Box>
              <Text fontWeight="bold">Community Engagement</Text>
              <Text>
                We are proud to be actively involved in bee conservation efforts and community outreach programs, supporting the very source of our livelihood.
              </Text>
            </Box>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <ContactReach />
          </motion.div>
        </VStack>
      </div>
    </div>
  );
}

export default AboutUs;
