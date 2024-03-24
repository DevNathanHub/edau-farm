  import React, { useEffect, useState } from 'react';
  import { Input, Button, InputGroup, InputRightElement, Divider, Box, AbsoluteCenter, Text } from '@chakra-ui/react';
  import { toast } from 'react-toastify';
  import { TransitionGroup, CSSTransition } from 'react-transition-group';
  import {  Link, useNavigate } from 'react-router-dom';
  import { auth } from '../../firebase';
  import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
  import { useUser } from '../../Context/userContext';
  import { Spinner } from 'react-bootstrap';
  import { FcGoogle } from 'react-icons/fc';
  import { FaEye, FaEyeSlash } from "react-icons/fa";
  import { CiLogin } from "react-icons/ci";
  import { EmailIcon } from '@chakra-ui/icons';
  import baseUrl from '../../baseUrl';
  import axios from 'axios';

  import './Login.css';

  const Login = () => {
    const { saveUser } = useUser();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      email: '',
      password: '',
    });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const [googleLoading, setGoogleLoading] = useState(false); // State to manage Google sign-in loading
    const [error, setError] = useState('');

    useEffect(() => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser && storedUser.uid) {
        toast.info("User exists. Continue shopping or logout to change accounts.");
        navigate('/shop');
      }
    }, [navigate]);

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        const { user } = await signInWithEmailAndPassword(auth, formData.email, formData.password);

        const submitData = {
          email: user.email,
          displayName: user.displayName,
          uid: user.uid,
          photoURL: user.photoURL,
        }
        const response = await axios.post(`${baseUrl}/api/login`, submitData);
        console.log(response.data);
        
        if(response.data.user){
          const currentUser = response.data.user;
          console.log("user from server", user);
          saveUser(currentUser);
          navigate('/shop');
        } 
      } catch (error) {
        console.error('Error Signing In:', error);
        setError('Invalid email or password. Please try again or Signup Instead');
      } finally {
        setLoading(false);
      }
    };

    const handleGoogleSignIn = async () => {
      console.log(baseUrl);

      setGoogleLoading(true);
      const provider = new GoogleAuthProvider();
      try {
        const { user } = await signInWithPopup(auth, provider);
        const submitData = {
          email: user.email,
          displayName: user.displayName,
          uid: user.uid,
          photoURL: user.photoURL,
        }
        const response = await axios.post(`${baseUrl}/api/login`, submitData);
        console.log(response.data);
        if(response.data.user){
          const currentUser = response.data.user;
          console.log("user from server", user);
          saveUser(currentUser);
          navigate('/shop');
        } 
      } catch (error) {
        console.error('Error Signing In:', error);
        setError('Error signing in. Please try again');
      } finally {
        setGoogleLoading(false);
      }
    };

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };
   
    return (
      <div className="login-container component">
        <TransitionGroup>
          <CSSTransition classNames="fade" timeout={300}>
            <div className='form-container'>
              <form onSubmit={handleSubmit} className="login-form">
                <h1 className='title'>LOGIN</h1>
                <div className="form-group">
                  <InputGroup>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      style={{ borderRadius: '30px', border: '1px solid #ddd' }}
                      variant='filled'
                    />
                    <InputRightElement>
                      <EmailIcon />
                    </InputRightElement>
                  </InputGroup>
                </div>
                <div className="form-group">
                  <InputGroup>
                    <Input
                      type={showPassword ? 'text' : 'password'} // Toggle password visibility
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      style={{ borderRadius: '30px', border: '1px solid #ddd' }}
                      variant='filled'
                    />
                    <InputRightElement onClick={togglePasswordVisibility}>
                      {/* Conditional rendering of eye icons based on password visibility */}
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </InputRightElement>
                  </InputGroup>
                </div>
                <div className="form-group">
                  <Button 
                    type="submit" 
                    isLoading={loading} 
                    rightIcon={loading ? <Spinner animation="border" size="sm" /> : <CiLogin />} 
                    colorScheme='blue' 
                    className="btn-submit"
                    borderRadius='30px'
                  >
                    Login
                  </Button>
                </div>

                <Box position='relative'>
                <Divider/>
                <AbsoluteCenter px='2'>
                  OR
                </AbsoluteCenter>
              </Box>
              
                <div className="form-group">
                  <Button
                    type="button"
                    rightIcon={googleLoading ? <Spinner animation="border" size="sm" /> : <FcGoogle />}
                    onClick={handleGoogleSignIn}
                    className="btn-google"
                    disabled={loading} // Disable Google sign-in button when login button is clicked
                    colorScheme='blue'
                    variant='outline'
                    borderRadius='30px'
                  >
                    Continue with Google
                  </Button>
                </div>
                {error && <div className="error-message">{error} or <Link to='/signup' >Signup Instead.</Link></div>}
                
                
                


                <div className="form-group" >
                <Text colorScheme='blue'>
                    <Link to='/auth/signup'  >Don't Have An Account? <u><em>Create Account Instead.</em></u></Link> 
                  </Text>
                </div>
              </form>
            </div>
          </CSSTransition>
        </TransitionGroup>
      </div>
    );
  };

  export default Login;
