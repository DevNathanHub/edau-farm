    import React from 'react'
    import './banner.css'
    import bannerImg from '../../assets/honey-acacia.png';
    import { Button, Stack } from '@chakra-ui/react';
    import { ArrowForwardIcon } from '@chakra-ui/icons';
    import { Link } from 'react-router-dom';
    import AboutUs from '../AboutUs/AboutUs';
    import FAQ from '../FAQ/FAQ';
    import { FaLocationDot } from 'react-icons/fa6';

    const Hero = () => {
        return (
            <div className='banner'>

                <div className='container'>

                    {/* Left Side */}
                    <div className='left'>
                        <p>Explore our wide range of high-quality honey</p>
                        <h1>Discover Edau Honey Products</h1>
                        <p>Find everything you need for your everyday life enriched with the goodness of Acacia flowers</p>
                        <div>Updated single product view and checkout component</div>

                        <Button rightIcon={<ArrowForwardIcon/>} colorScheme='teal' variant='outline' marginTop='20px'>
                            <Link to='/shop'> Shop Now </Link>
                        </Button>
                    </div>


                    {/* Right Side */}
                    <div className='right'>
                        <div className='img-container'>
                            <img src={bannerImg} alt=''/>
                        </div>
                    </div>
                    <Stack direction={'row'}><FaLocationDot/> <div>Delivery Countrywide</div></Stack>

                </div>
                <div ><AboutUs/></div>
                <div><FAQ/></div>
            </div>
        )
    }

    export default Hero