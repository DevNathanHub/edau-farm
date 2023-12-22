import React, { useState, useEffect } from "react";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { FaUserCircle } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Your logic to check if the user exists on localhost
    const userExists = localStorage.getItem("user");
    
    console.log(userExists);

    if (userExists) {
      setUser(JSON.parse(userExists));
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand logo-section" to="/">
        Your Logo
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        onClick={toggleMenu}
      >
        {isOpen ? <HiOutlineX /> : <HiOutlineMenuAlt3 />}
      </button>

      <div
        className={classNames("collapse navbar-collapse collapse-section", {
          show: isOpen,
        })}
      >
        <ul className="navbar-nav ml-auto "> {/* Use ml-auto to align links to the right on large devices */}
          <li className="nav-item">
            <Link className="nav-link navbar-links" to="/about">
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link navbar-links" to="/annual">
              Annual Report
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link navbar-links" to="/team">
              Team
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link navbar-links" to="/blogs">
              Blogs
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link navbar-links" to="/contact">
              Contact
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
