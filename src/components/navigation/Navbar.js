import './Navbar.css'
import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
   return (
      <nav id="navbar">
         <Link to="/">
            <i className="fa-solid fa-house home-icon"></i>
         </Link>

         <div className="curved corner-t-right cc-navbar"></div>
      </nav>
   )
}

 