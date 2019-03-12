import React from 'react';
import './Navbar.scss';
import { Link } from 'react-router-dom';

export default function Navbar() {

   let styles = {
      textDecoration: 'none',
      color: 'white'
   }

   return (
      <div className='navbar-main'>
         <div className="nav-logo-container">
            <Link to='/home' style={ styles }>
               <h1>TechSource</h1>
            </Link>
         </div>
         <div className="nav-button-container">
            <Link to='/home' style={ styles }>
               <p>Trending Stories</p>
            </Link>
            <Link to='/sources' style={ styles }>
               <p>News Sources</p>
            </Link>
            <Link to='/search' style={ styles }>
               <p>Search</p>
            </Link>
         </div>
      </div>
   )
}
