import React from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiUser, FiPlusCircle, FiShoppingBag } from 'react-icons/fi';
import styles from './Navbar.module.css';
import logoImg from '../../../assets/logo.png';
import { useAuth } from '../../../context/AuthContext'; // Context import karein
import { auth } from '../../../services/firebase';
import { signOut } from 'firebase/auth';

const Navbar = () => {
  const { user } = useAuth(); // User ka state lein

  const handleLogout = () => {
    signOut(auth);
  };
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


 {user ? (
  /* Case 1: Agar User Login hai (Logout dikhao) */
  <div className={styles.userSection}>
    <span className={styles.userEmail}>{user.email.split('@')[0]}</span>
    <button onClick={handleLogout} className={styles.logoutBtn}>
      LogOut
    </button>
  </div>
) : (
  /* Case 2: Agar User Login NAHI hai (Login par bhejo) */
  <Link to="/login" className={styles.loginGroup}>
    {/* <FiUser size={22} /> */}
    <span className={styles.loginText}>Login / Signup</span>
  </Link>
)}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;