  import React, { useState } from "react";
  import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
  import { CiLogin, CiUser } from "react-icons/ci";
  import { LuBaggageClaim } from "react-icons/lu";
  import { IoCreateOutline } from "react-icons/io5";
  import { FcLike } from "react-icons/fc";
  import { Link, useNavigate } from "react-router-dom";
  import classNames from "classnames";
  import "./Navbar.css";
  import Cart from "../../Components/Shop/Cart";
  import { Avatar, Button, Stack } from "@chakra-ui/react";
  import { useUser } from "../../Context/userContext";
  import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
  
  } from '@chakra-ui/react'
  import {ChevronDownIcon} from '@chakra-ui/icons';

  const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const {user, logout} = useUser();
    const navigate = useNavigate();

  

    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };

    const closeMenu = () => {
      setIsOpen(false);
    };
    const handleAdminDash = () =>{
      closeMenu();
      navigate('/edau-farm-admin')
    }

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand logo-section" to="/">
          <h4>Edau<span className='primary'>Honey</span></h4>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
        >
          {isOpen ? <HiOutlineX  /> : <HiOutlineMenuAlt3 />}
        </button>

        <div
          className={classNames("collapse navbar-collapse collapse-section", {
            show: isOpen,
          })}
        >
          <div>
          <ul className="navbar-nav ml-auto " onClick={closeMenu}> 
            <li className="nav-item">
              <Link className="nav-link navbar-links" to="/shop">
                Shop
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link navbar-links" to="/about">
                About Us
              </Link>
            </li>
           
            <li className="nav-item">
              <Link className="nav-link navbar-links" to="/contact">
                Contact Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link navbar-links" to="/faq">
                FAQ
              </Link>
            </li>
           
            <li className="nav-cart">
              <div className="cart-section">
                <Cart/>
              </div>
            </li>
          </ul>

          
          
          </div>
         

         
          <div className="user-info">
            {user ? (
              <div >
                    <Button onClick={handleAdminDash} leftIcon={<IoCreateOutline />} colorScheme='blue' variant='solid' size='sm' borderRadius='30px'  marginRight='10px'>
                      Admin Section 
                    </Button>
                <Menu>
                  <MenuButton as={Button} size='sm' rightIcon={<ChevronDownIcon />} className='menu-btn' style={{borderRadius: '30px', backgroundColor: 'transparent'}} >
                    <div className="profile-menu"><Avatar size='xs' src={user.photoURL} name={user.displayName || user.email}/>  {` ${user.displayName || user.email}`}</div>
                  </MenuButton>
                  <MenuList color='blue'>
                    <MenuItem ><Link to='/account' style={{display: 'flex', gap: '5px', alignItems: 'center'}} className="menu-item"><CiUser/> Account</Link></MenuItem>
                    <MenuItem ><Link to='/orders' style={{display: 'flex', gap: '5px', alignItems: 'center'}} className="menu-item"><LuBaggageClaim/> Orders</Link></MenuItem>
                    <MenuItem ><Link to='/favorites' style={{display: 'flex', gap: '5px', alignItems: 'center'}} className="menu-item"><FcLike/> Favorites</Link></MenuItem>
                    <MenuItem style={{color: 'red'}} onClick={logout}>Logout</MenuItem>
                  </MenuList>
                </Menu>
                </div>

            ) : (
              <div className="auth">
                <Stack direction='row' spacing={4}>
                  <Link to="/auth/signup" className="nav-link" onClick={closeMenu}>
                    <Button leftIcon={<IoCreateOutline />} colorScheme='blue' variant='solid' size='sm' borderRadius='30px'>
                      Signup
                    </Button>
                  </Link>

                  <Link to="/auth/login" className="nav-link" onClick={closeMenu}>
                    <Button rightIcon={<CiLogin />} colorScheme='blue' variant='outline' size='sm' borderRadius='30px'>
                      Login
                    </Button>
                  </Link>
                </Stack>
              </div>
            )}
          </div>
        </div>
      </nav>
    );
  };

  export default Navbar;
