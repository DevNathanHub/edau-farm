import React, { useEffect, useState } from 'react';
import { Input, Button, InputGroup, InputRightElement, Divider, Box, AbsoluteCenter, Text, useToast } from '@chakra-ui/react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Link, useNavigate } from 'react-router-dom';
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
import Confetti from 'react-confetti'; // Import react-confetti
import './Login.css';

const Login = () => {
    const { saveUser } = useUser();
    const navigate = useNavigate();
    const toast = useToast();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false); // State to control confetti display

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser && storedUser.uid) {
            navigate('/success');
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
            if(response.data.user){
                const currentUser = response.data.user;
                saveUser(currentUser);
                navigate('/success');
                setShowConfetti(true); // Display confetti on successful login
            } 
        } catch (error) {
            console.error('Error Signing In:', error);
            toast({
                title: "Error",
                description: "Invalid email or password. Please try again or Signup Instead",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
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
            if(response.data.user){
                const currentUser = response.data.user;
                saveUser(currentUser);
                navigate('/success');
                setShowConfetti(true); // Display confetti on successful login
            } 
        } catch (error) {
            console.error('Error Signing In:', error);
            toast({
                title: "Error",
                description: "Error signing in. Please try again",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
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
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        style={{ borderRadius: '30px', border: '1px solid #ddd' }}
                                        variant='filled'
                                    />
                                    <InputRightElement onClick={togglePasswordVisibility}>
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
                                    disabled={loading}
                                    colorScheme='blue'
                                    variant='outline'
                                    borderRadius='30px'
                                >
                                    Continue with Google
                                </Button>
                            </div>
                            <div className="form-group" >
                                <Text colorScheme='blue'>
                                    <Link to='/auth/signup'  >Don't Have An Account? <u><em>Create Account Instead.</em></u></Link> 
                                </Text>
                            </div>
                        </form>
                    </div>
                </CSSTransition>
            </TransitionGroup>
            {showConfetti && <Confetti />} {/* Render confetti if showConfetti is true */}
        </div>
    );
};

export default Login;
