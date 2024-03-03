import React from 'react';
import { Button } from '@chakra-ui/react';
import { auth, googleProvider } from '../../firebase';

function GoogleLogin() {
  const handleGoogleLogin = async () => {
    try {
      // Sign in with Google using Firebase Authentication
      await auth.signInWithPopup(googleProvider);
      // You can navigate to another page or handle successful login
    } catch (error) {
      console.error('Error signing in with Google:', error);
      // Handle error appropriately, such as displaying an error message to the user
    }
  };

  return (
    <Button onClick={handleGoogleLogin} colorScheme="red">
      Login with Google
    </Button>
  );
}

export default GoogleLogin;
