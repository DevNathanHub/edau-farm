import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase'; // Corrected import statement
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'; // Import Google auth methods
import { useUser } from '../../Context/userContext';
import { Input, Button, InputGroup, InputRightElement, Box, Divider, AbsoluteCenter, Text } from '@chakra-ui/react'; // Import Chakra UI components
import { EmailIcon } from '@chakra-ui/icons';
import { Badge, Spinner } from 'react-bootstrap';
import { IoCreateOutline } from "react-icons/io5";
import './Signup.css';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from 'axios';
import baseUrl from '../../baseUrl';

const Signup = () => {
  const { saveUser } = useUser();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.uid) {
      toast.info("User exists. Continue shopping or logout to change accounts.");
      navigate('/shop');
    }
  }, [navigate]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Minimum of 6 characters').required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSignupLoading(true);
        const { user } = await createUserWithEmailAndPassword(auth, values.email, values.password);
       
        const submitData = {
          email: user.email,
          displayName: user.displayName,
          uid: user.uid,
          photoURL: user.photoURL,
        }
        const response = await axios.post(`${baseUrl}/api/signup`, submitData);
        
        if(response.data.newUser){
          const newUser = response.data.newUser;
          console.log("user from server", newUser);
          saveUser(newUser);
          navigate('/shop');
        } else if(response.data.existingUser){
          toast.info("User exist please login");
          navigate('/auth/login');
          return;
  
        }
      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          await toast.info('User Exist, try to Login Instead');
          navigate('/auth/login');
          return;
        }
        console.error('Error submitting form:', error);
        toast.error('Error submitting form. Please try again.');
      } finally {
        setSubmitting(false);
        setSignupLoading(false);
      }
    },
  });

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      setGoogleLoading(true);
      const { user } = await signInWithPopup(auth, provider);

      const submitData = {
        email: user.email,
        displayName: user.displayName,
        uid: user.uid,
        photoURL: user.photoURL,
      }
      const response = await axios.post(`${baseUrl}/api/signup`, submitData);
      
      if(response.data.newUser){
        const newUser = response.data.newUser;
        console.log("user from server", newUser);
        saveUser(newUser);
        navigate('/shop');
      } else if(response.data.existingUser){
        await toast.info('User Exist, Login Instead');
        navigate('/auth/login');
        return;

      }
      
    } catch (error) {
      if (error.code === 'auth/account-exists-with-different-credential') {
        // If the email is already in use with a different credential, navigate to the login page
        navigate('/auth/login');
        return;
      }
      console.error('Google Sign-in Error:', error);
      toast.error('Error signing in with Google. Please try again.');
    } finally {
      setGoogleLoading(false);
    }
  };
  
  return (
    <div className="signup-container component" >
      <TransitionGroup>
        <CSSTransition classNames="fade" timeout={300}>
          <div className='form-container'>
            <form onSubmit={formik.handleSubmit} className="signup-form">
              <h1 className='title'>SIGN UP</h1>
              <div className="form-group">
                <InputGroup>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    variant='filled'
                    style={{ borderRadius: '30px', border: '1px solid #ddd'}}
                  />
                  <InputRightElement marginRight='15px'>
                    <EmailIcon/>
                  </InputRightElement>
                </InputGroup>
                {formik.touched.email && formik.errors.email && <Badge className="error" bg='transparent' pill >{formik.errors.email}!</Badge>}
              </div>

              <div className='form-group'>
                <InputGroup size='md'>
                  <Input
                    pr='4.5rem'
                    type={showPassword ? 'text' : 'password'}
                    name='password'
                    placeholder='Enter password'
                    variant='filled'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    style={{ borderRadius: '30px', border: '1px solid #ddd'}}
                  />
                  <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={toggleShowPassword} variant='ghost'>
                      {showPassword ? <FaEyeSlash/> : <FaEye/>}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {formik.touched.password && formik.errors.password && <Badge className="error" bg='transparent' pill>{formik.errors.password}!</Badge>}
              </div>

              <div className='form-group'>
                <InputGroup size='md'>
                  <Input
                    pr='4.5rem'
                    type={showConfirmPassword ? 'text' : 'password'}
                    name='confirmPassword'
                    placeholder='Confirm password'
                    variant='filled'
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    style={{ borderRadius: '30px', border: '1px solid #ddd'}}
                  />
                  <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={toggleShowConfirmPassword} variant='ghost'>
                      {showConfirmPassword ? <FaEyeSlash/> : <FaEye/>}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {formik.touched.confirmPassword && formik.errors.confirmPassword && <Badge className="error" bg='transparent' pill>{formik.errors.confirmPassword}!</Badge>}
              </div>

              <div className="form-group">
                <Button 
                  type="submit" 
                  isLoading={formik.isSubmitting} 
                  rightIcon={signupLoading ? <Spinner animation="border" size="sm" /> : <IoCreateOutline />} 
                  colorScheme='blue' 
                  className="btn-submit"
                  borderRadius='30px'
                >
                  Signup
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
                  colorScheme='blue' 
                  variant='outline' 
                  className="btn-google"
                  borderRadius='30px'
                >
                  Continue with Google
                </Button>
              </div>
             
            <div className='form-group'>
            <Text colorScheme='blue'>
                  <Link to='/auth/login' color='blue' >Have an Account? <u><em>Login Instead.</em></u></Link> 
                </Text>
            </div>
            </form>
          </div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default Signup;
