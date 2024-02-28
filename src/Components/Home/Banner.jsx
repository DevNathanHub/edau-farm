import React from 'react'
import './banner.css'
import bannerImg from '../../assets/honey-acacia.png';
import { Button } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';

const Hero = () => {
    return (
        <div className='banner'>
            <div className='container'>

                {/* Left Side */}
                <div className='left'>
                    <p>Explore our wide range of high-quality honey</p>
                    <h1>Discover Edau Honey Products</h1>
                    <p>Find everything you need for your everyday life enriched with the goodness of Acacia flowers</p>

                    <Button rightIcon={<ArrowForwardIcon/>} colorScheme='teal' variant='outline'>
                        Shop Now
                    </Button>
                </div>


                {/* Right Side */}
                <div className='right'>
                    <div className='img-container'>
                        <img src={bannerImg} alt=''/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero