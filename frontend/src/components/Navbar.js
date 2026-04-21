import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">TEAM NOVA</Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/add">Add Member</Link>
        <Link to="/view">View Members</Link>
      </div>
    </nav>
  );
}

export default Navbar;
