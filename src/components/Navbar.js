// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Navbar.css'; // Custom styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <h1>ElderEase</h1>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/tutorials">Tutorials</Link>
        <Link to="/events">Events</Link>
        <Link to="/support">Support</Link>
        <Link to="/health">Health Resources</Link>
        <Link to="/contact">Contact Us</Link>
        <Link to="/login">
          <button className="login-btn">Login</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
