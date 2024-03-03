import React from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';
import './aboutus.css';
import Testimonials from './Testimonials';
import Team from './Team';
import ContactReach from './ContactReach';
import MissionAndPassion from './MissionAndPassion';

function AboutUs() {
  return (
    <div className='about-component component' >
      <h1>About Us</h1>
      <div className='about-section'>
        
        <VStack spacing="6" align="center">
          <Box>
           <MissionAndPassion/>
          </Box>
          <Box>
            <Team/>
          </Box>
          <Box>
            <Text fontWeight="bold">Quality Assurance</Text>
            <Text>
              Quality is at the heart of everything we do. We work closely with local beekeepers to ensure that our honey is ethically sourced and sustainably produced.
            </Text>
          </Box>
          <Box>
            <Text fontWeight="bold">Our Product Range</Text>
            <Text>
              Our diverse range of honey products caters to every taste bud, from the rich and robust flavors of wildflower honey to the delicate sweetness of acacia honey.
            </Text>
          </Box>
          <Box>
            <Testimonials/>
          </Box>
          <Box>
            <Text fontWeight="bold">Community Engagement</Text>
            <Text>
              We are proud to be actively involved in bee conservation efforts and community outreach programs, supporting the very source of our livelihood.
            </Text>
          </Box>
          <Box>
            <ContactReach/>
          </Box>
        </VStack>
      </div>
    </div>
  );
}

export default AboutUs;
