import React, { useState } from "react";
import { CiLogin } from "react-icons/ci";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { LuBaggageClaim } from "react-icons/lu";
import { IoCreateOutline } from "react-icons/io5";
import { TbJewishStar } from "react-icons/tb";
import { HiOutlineLogout } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink } from '@chakra-ui/react'
import { Avatar, Box, Button, List, ListItem, Stack } from "@chakra-ui/react";
import { useUser } from "../../Context/userContext";
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import { ChevronDownIcon, CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import classNames from "classnames";
import "./Navbar.css";
import Cart from "../../Components/Shop/Cart";
import ThemeContext from "../../Context/ThemeContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState(null);
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleAdminDash = () => {
    closeMenu();
    navigate('/edau-farm-admin');
  };

  const handleLinkClick = (link) => {
    setSelectedLink(link);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light ">
      <ChakraLink as={ReactRouterLink} className="navbar-brand logo-section" to="/">
        <h4>Edau<span className='primary'>Honey</span></h4>
      </ChakraLink>
      <ThemeContext />
      <Button
        className="navbar-toggler"
        type="button"
        variant='outline'
        onClick={toggleMenu}
      >
        {isOpen ? <CloseIcon /> : <HamburgerIcon />}
      </Button>

      <div
        className={classNames("collapse navbar-collapse collapse-section", {
          show: isOpen,
        })}
      >
        <Box>
          <List className="navbar-nav ml-auto" onClick={closeMenu}>
            <ListItem className="nav-item">
              <ChakraLink
                as={ReactRouterLink}
                to="/shop"
                className={classNames("nav-link navbar-links", { "selected": selectedLink === "shop" })}
                onClick={() => handleLinkClick("shop")}
              >
                Shop
              </ChakraLink>
            </ListItem>
            <ListItem className="nav-item">
              <ChakraLink
                as={ReactRouterLink}
                to="/about"
                className={classNames("nav-link navbar-links", { "selected": selectedLink === "about" })}
                onClick={() => handleLinkClick("about")}
              >
                About Us
              </ChakraLink>
            </ListItem>
            <ListItem className="nav-item">
              <ChakraLink
                as={ReactRouterLink}
                to="/contact"
                className={classNames("nav-link navbar-links", { "selected": selectedLink === "contact" })}
                onClick={() => handleLinkClick("contact")}
              >
                Contact Us
              </ChakraLink>
            </ListItem>
            <ListItem className="nav-item">
              <ChakraLink
                as={ReactRouterLink}
                to="/faq"
                className={classNames("nav-link navbar-links", { "selected": selectedLink === "faq" })}
                onClick={() => handleLinkClick("faq")}
              >
                FAQ
              </ChakraLink>
            </ListItem>
            <ListItem className="nav-cart">
              <div className="cart-section">
                <Cart />
              </div>
            </ListItem>
          </List>
        </Box>

        <div className="user-info">
          {user ? (
            <div>
              <Button onClick={handleAdminDash} leftIcon={<IoCreateOutline />} colorScheme='blue' variant='solid' size='sm' borderRadius='30px' marginRight='10px'>
                Admin Section
              </Button>
              <Menu >
                <MenuButton as={Button} size='sm' rightIcon={<ChevronDownIcon />} className='menu-btn' style={{ borderRadius: '30px', backgroundColor: 'transparent' }} >
                  <div className="profile-menu"><Avatar size='xs' src={user.photoURL} name={user.displayName || user.email} />  {` ${user.displayName || user.email}`}</div>
                </MenuButton>
                <MenuList >
                  <MenuItem ><ChakraLink as={ReactRouterLink} to='/account' style={{ display: 'flex', gap: '5px', alignItems: 'center' }} className="menu-item"><RiAccountPinCircleLine /> Account</ChakraLink></MenuItem>
                  <MenuItem ><ChakraLink as={ReactRouterLink} to='/orders' style={{ display: 'flex', gap: '5px', alignItems: 'center' }} className="menu-item"><LuBaggageClaim /> Orders</ChakraLink></MenuItem>
                  <MenuItem ><ChakraLink as={ReactRouterLink} to='/favorites' style={{ display: 'flex', gap: '5px', alignItems: 'center' }} className="menu-item"><TbJewishStar /> Favorites</ChakraLink></MenuItem>
                  <MenuItem style={{ color: 'red' }} onClick={logout}><Button rightIcon={<HiOutlineLogout/>} size='sm' colorScheme='red' width='100%'>Logout</Button></MenuItem>
                </MenuList>
              </Menu>
            </div>

          ) : (
            <div className="auth">
              <Stack direction='row' spacing={4}>
                <ChakraLink as={ReactRouterLink} to="/auth/signup" className="nav-link" onClick={closeMenu}>
                  <Button leftIcon={<IoCreateOutline />} colorScheme='blue' variant='solid' size='sm' borderRadius='30px'>
                    Signup
                  </Button>
                </ChakraLink>

                <ChakraLink as={ReactRouterLink} to="/auth/login" className="nav-link" onClick={closeMenu}>
                  <Button rightIcon={<CiLogin />} colorScheme='blue' variant='outline' size='sm' borderRadius='30px'>
                    Login
                  </Button>
                </ChakraLink>
              </Stack>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
