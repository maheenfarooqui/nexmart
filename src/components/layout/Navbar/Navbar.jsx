import React from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiUser, FiPlusCircle, FiShoppingBag } from 'react-icons/fi';
import styles from './Navbar.module.css';
import logoImg from '../../../assets/logo.png';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        
        {/* 1. Logo Section */}
        <div className={styles.logoSection}>
          <Link to="/" className={styles.logo}>
            <img src={logoImg} alt="NexMart Logo" className={styles.logoImage} />
            </Link>
        </div>

        {/* 2. Search Bar (Marketplace ka main feature) */}
        <div className={styles.heading}>
         <h1>BUY<span> . </span>SELL<span> . </span>CONNECT</h1>
        </div>

        {/* 3. Action Links */}
        <div className={styles.navLinks}>
          <Link to="/sell" className={styles.sellBtn}>
            <FiPlusCircle /> <span>Sell</span>
          </Link>
          
          <Link to="/browse" className={styles.navIcon}>
             <FiShoppingBag size={22} />
          </Link>

          <Link to="/login" className={styles.profileIcon}>
            <FiUser size={22} />
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;