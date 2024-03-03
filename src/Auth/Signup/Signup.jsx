  import React, { useState, useEffect } from 'react';
  import { useFormik } from 'formik';
  import * as Yup from 'yup';
  import { toast } from 'react-toastify';
  import { TransitionGroup, CSSTransition } from 'react-transition-group';
  import { useNavigate } from 'react-router-dom';
  import { auth } from '../../firebase'; // Corrected import statement
  import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'; // Import Google auth methods
  import { useUser } from '../../Context/userContext';
  import { Input, Button, InputGroup, InputRightElement } from '@chakra-ui/react'; // Import Chakra UI components
  import { EmailIcon } from '@chakra-ui/icons';
  import { Badge, Spinner } from 'react-bootstrap';
  import { IoCreateOutline } from "react-icons/io5";
  import './Signup.css';
  import { FcGoogle } from 'react-icons/fc';
  import { FaEye, FaEyeSlash } from "react-icons/fa";
  //import axios from 'axios';


  const Signup = () => {
    const { saveUser } = useUser();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

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
        password: Yup.string().required('Password is required'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Confirm password is required'),
      }),
      onSubmit: async (values, { setSubmitting }) => {
        try {
            // Create user with email and password
            const { user } = await createUserWithEmailAndPassword(auth, values.email, values.password);
            setLoading(true);
            
            saveUser(user);
            // Upload user data to your server
            //const response = await axios.post('http://localhost:8000/api/signup', userData);
    
            // Log server response
            //console.log('Server response:', response.data.user);
            
            //saveUser(response.data.user);
            // Display success message
            toast.success('Signup successful!');
    
            // Navigate to a different page if needed
            navigate('/shop');
        } catch (error) {
            // Handle errors
            console.error('Error submitting form:', error);
    
            // Display error message
            toast.error('Error submitting form. Please try again.');
        } finally {
            setSubmitting(false); // Set submitting to false after submission (success or error)
            setLoading(false);
        }
      },
    });

    const toggleShowPassword = () => {
      setShowPassword((prev) => !prev);
    };

    const toggleShowConfirmPassword = () => {
      setShowConfirmPassword((prev) => !prev);
    };

    // Function to handle Google sign-in
    const handleGoogleSignIn = async () => {
      const provider = new GoogleAuthProvider();
      try {
        setLoading(true);
        const { user } = await signInWithPopup(auth, provider);
        saveUser(user);
        navigate('/shop'); // Redirect to dashboard after successful sign-in
      } catch (error) {
        console.error('Google Sign-in Error:', error);
        toast.error('Error signing in with Google. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="signup-container">
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
                {formik.touched.email && formik.errors.email && <Badge className="error" bg='danger' pill>{formik.errors.email}</Badge>}

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
                {formik.touched.password && formik.errors.password && <Badge className="error" bg='danger' pill>{formik.errors.password}</Badge>}

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
                {formik.touched.confirmPassword && formik.errors.confirmPassword && <Badge className="error" bg='danger' pill>{formik.errors.confirmPassword}</Badge>}

              </div>

              <div className="form-group">
                <Button 
                  type="submit" 
                  isLoading={formik.isSubmitting} 
                  rightIcon={loading ? <Spinner animation="border" size="sm" /> : <IoCreateOutline />} 
                  colorScheme='blue' className="btn-submit"
                  borderRadius='30px'

                  >
                  Signup
                </Button>
              </div>
              <div className="form-group">
                  <Button 
                    type="button" 
                    rightIcon={loading ? <Spinner animation="border" size="sm" /> : <FcGoogle />} 
                    onClick={handleGoogleSignIn} 
                    colorScheme='blue' 
                    variant='outline' 
                    className="btn-google"
                    borderRadius='30px'

                    >
                    Continue with Google
                  </Button>
                  
              </div>
            </form>
            </div>
          </CSSTransition>
        </TransitionGroup>
      </div>
    );
  };

  export default Signup;