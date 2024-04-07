import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import {  Text, useToast } from '@chakra-ui/react';
import { useWindowSize } from 'react-use';

function Success() {
  const navigate = useNavigate();
  const { width, height } = useWindowSize();
  const toast = useToast(); // Initialize Chakra UI toast

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      navigate('/shop');
      window.location.reload();
    }, 7000);

    // Cleanup the timer when the component unmounts
    return () => clearTimeout(redirectTimer);
  }, [navigate]);

  // Show Chakra UI success toast
  useEffect(() => {
    toast({
      title: 'Success!',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  }, [toast]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', margin: "40px"  }}>
      {/* Your success message content */}
      <Text fontSize='6xl'>Success</Text>

      {/* Additional content */}
      <Text fontSize='4xl' ><p>Welcome! Explore our collection of organic honey varieties, crafted with care by local beekeepers. Taste the sweetness of nature's finest creation. 🍯🌿</p></Text>

      {/* Confetti effect */}
      <Confetti width={width} height={height} />

      {/* ToastContainer for displaying notifications */}
    </div>
  );
}

export default Success;
