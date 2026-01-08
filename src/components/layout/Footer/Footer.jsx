import React from 'react';
import {useNavigate, Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiMail } from 'react-icons/fi';
import styles from './Footer.module.css';
import logoFImg from '../../../assets/flogo.png';

const Footer = () => {
  const navigate = useNavigate();

  const handleBrowseListings = () => {
    // Agar hum Home page par nahi hain, to pehle home par jao
    navigate('/');
    
    // Thora ruk kar scroll karo taaki page load ho jaye
    setTimeout(() => {
      const element = document.getElementById('gallery-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Column 1: Branding */}
        <div className={styles.column}>
          <Link to="/" className={styles.logo}>
                      <img src={logoFImg} alt="NexMart Logo" className={styles.logoImage} />
                      </Link>
          <p className={styles.tagline}>The next generation marketplace for smart traders.</p>
          <div className={styles.socials}>
            <a href="#"><FiFacebook /></a>
            <a href="#"><FiTwitter /></a>
            <a href="#"><FiInstagram /></a>
            <a href="#"><FiLinkedin /></a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className={styles.column}>
          <h3>Platform</h3>
          <ul>
            <li><button onClick={handleBrowseListings} className={styles.footerBtn}>
          Browse Listings
        </button></li>
            <li><Link to="/sell">Start Selling</Link></li>
            <li><Link to="/how-it-works">How it Works</Link></li>
          </ul>
        </div>

        {/* Column 3: Categories */}
        <div className={styles.column}>
          <h3>Categories</h3>
          <ul>
            <li><a href="#">Electronics</a></li>
            <li><a href="#">Fashion</a></li>
            <li><a href="#">Furniture</a></li>
            <li><a href="#">Accessories</a></li>
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div className={styles.column}>
          <h3>Stay Updated</h3>
          <p className={styles.newsletterText}>Get the latest deals in your inbox.</p>
          <div className={styles.inputGroup}>
            <input type="email" placeholder="Email address" />
            <button><FiMail /></button>
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <p>&copy; {new Date().getFullYear()} NexMart. Built with React & Firebase.</p>
      </div>
    </footer>
  );
};

export default Footer;