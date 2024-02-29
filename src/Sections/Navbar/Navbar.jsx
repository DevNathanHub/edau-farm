import React, { useState, useEffect } from "react";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import { CiLogin } from "react-icons/ci";
import { IoCreateOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { FaUserCircle } from "react-icons/fa";
import "./Navbar.css";
import Cart from "../../Components/Shop/Cart";
import { Button, Stack } from "@chakra-ui/react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

 

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

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
            <Link className="nav-link navbar-links" to="/products">
              Our Products
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link navbar-links" to="/blog">
              Blog
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
            <div className="user">
              <div className="user-content"><FaUserCircle className="icon profile-icon" /> {` ${user.user.firstname}`}</div>
              <Link to="/logout" className="nav-logout">
                Logout
              </Link>
            </div>
          ) : (
            <div className="auth">
              <Stack direction='row' spacing={4}>
                <Link to="/signup" className="nav-link">
                  <Button leftIcon={<IoCreateOutline />} colorScheme='blue' variant='solid'>
                    Signup
                  </Button>
                </Link>

                <Link to="/login" className="nav-link">
                  <Button rightIcon={<CiLogin />} colorScheme='blue' variant='outline'>
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
