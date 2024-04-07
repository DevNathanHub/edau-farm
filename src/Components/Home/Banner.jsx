import React from 'react';
import { Button, Stack, Text } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Link, useNavigate } from 'react-router-dom';
import { FaLocationDot } from 'react-icons/fa6';
import { motion } from 'framer-motion'; // Added for animations
import bannerImg from '../../assets/honey-acacia.png';
import AboutUs from '../AboutUs/AboutUs';
import FAQ from '../FAQ/FAQ';
import './banner.css';

const Hero = () => {
    const navigate = useNavigate();
    // Animations
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 1 } }
    };
    return (
        <motion.div className='banner' variants={containerVariants} initial='hidden' animate='visible'>

            <div className='container'>

                {/* Left Side */}
                <motion.div className='left' initial={{ x: '-100vw' }} animate={{ x: 0 }} transition={{ type: 'spring', stiffness: 120 }}>
                    <Text fontSize='4xl'>Explore our wide range of high-quality honey</Text>
                    <Text fontSize='6xl'>Discover Edau Honey Products</Text>
                    <p>Find everything you need for your everyday life enriched with the goodness of Acacia flowers</p>

                    <Button rightIcon={<ArrowForwardIcon />} colorScheme='teal' variant='outline' marginTop='20px' onClick={() => { navigate("/shop") }}>
                        <Link to='/shop'> Shop Now </Link>
                    </Button>
                </motion.div>


                {/* Right Side */}
                <motion.div className='right' initial={{ x: '100vw' }} animate={{ x: 0 }} transition={{ type: 'spring', stiffness: 120 }}>
                    <div className='img-container'>
                        <img src={bannerImg} alt='' />
                    </div>
                </motion.div>
                <Stack direction={'row'}><FaLocationDot /> <div>Delivery Countrywide</div></Stack>

            </div>
            <div><AboutUs /></div>
            <div><FAQ /></div>
        </motion.div>
    )
}

export default Hero;
