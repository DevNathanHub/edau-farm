// Footer.js
import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './footer.css';
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-icons">
        <Link to="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebook className="icon" />
        </Link>
        <Link to="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter className="icon" />
        </Link>
        <Link to="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="icon" />
        </Link>
        <Link to="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="icon" />
        </Link>
      </div>
      <div className="footer-links">
        <Link to="/annual">Annual Report</Link>
        <Link to="/team">Teams</Link>
        <Link to="/about">About Us</Link>
        <Link to="/blogs">Blogs</Link>
      </div>
      <div className="footer-copyright">
        <p>&copy; 2023 Your Community. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
