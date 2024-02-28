import React, { useState, useEffect } from "react";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { FaUserCircle } from "react-icons/fa";
import "./Navbar.css";

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
        Edau Honey
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        onClick={toggleMenu}
      >
        {isOpen ? <HiOutlineX onClick={closeMenu} /> : <HiOutlineMenuAlt3 />}
      </button>

      <div
        className={classNames("collapse navbar-collapse collapse-section", {
          show: isOpen,
        })}
      >
        <ul className="navbar-nav ml-auto "> {/* Use ml-auto to align links to the right on large devices */}
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
        </ul>

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
              <Link to="/sign-up" className="nav-link">
                Sign Up
              </Link>
              <Link to="/log-in" className="nav-link">
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
