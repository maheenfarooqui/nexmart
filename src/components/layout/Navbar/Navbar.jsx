import React, { useState , useEffect } from 'react'; // 1. useState import karein
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiUser, FiPlusCircle, FiShoppingBag ,FiMenu, FiX} from 'react-icons/fi';
import styles from './Navbar.module.css';
import logoImg from '../../../assets/logo.png';
import { useAuth } from '../../../context/AuthContext'; // Context import karein
import { auth } from '../../../services/firebase';
import { signOut } from 'firebase/auth';

const Navbar = () => {
  const { user } = useAuth(); // User ka state lein
  const [wishlistCount, setWishlistCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const updateCount = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setWishlistCount(wishlist.length);
  };

  useEffect(() => {
    updateCount(); // Pehli baar load hone par
    
    // Jab bhi heart click ho, ye listen karega
    window.addEventListener("wishlistUpdated", updateCount);
    return () => window.removeEventListener("wishlistUpdated", updateCount);
  }, []);

  const handleLogout = () => {
    signOut(auth);
  };
  const [searchTerm, setSearchTerm] = useState(''); // State banayein
  const navigate = useNavigate(); // Hook initialize karein

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/?search=${searchTerm}`); // URL ko change karega: e.g. /?search=iphone
      setSearchTerm('');
    } else {
      navigate('/');
    }
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

      {/* 2. Search Bar (Mobile par ye aksar CSS se hide ho jati hai) */}
      <div className={styles.searchBar}>
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <input 
            type="text" 
            placeholder="Search for items..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit"><FiSearch /></button>
        </form>
      </div>

      {/* --- Hamburger Menu Icon (Sirf mobile/tablet par nazar aayega) --- */}
      <div className={styles.menuIcon} onClick={toggleMenu}>
        {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
      </div>

      {/* 3. Action Links (Yahan Class badli hai logic ke liye) */}
      <div className={`${styles.navLinks} ${isOpen ? styles.active : ''}`}>
        
        <Link to="/sell" className={styles.sellBtn} onClick={() => setIsOpen(false)}>
          <FiPlusCircle /> <span>Sell</span>
        </Link>
        
        <Link to="/wishlist" className={styles.navIcon} onClick={() => setIsOpen(false)}>
          <div className={styles.cartContainer}>
            <FiShoppingBag size={24} />
            {wishlistCount > 0 && (
              <span className={styles.badge}>{wishlistCount}</span>
            )}
          </div>
        </Link>

        {user ? (
          /* Case 1: Agar User Login hai */
          <div className={styles.userSection}>
            <span className={styles.userEmail} title={user.email}>{user.email.split('@')[0]}</span>
            <Link to="/my-ads" className={styles.myAdsLink} onClick={() => setIsOpen(false)}>
              My Ads
            </Link>
            <button onClick={() => { handleLogout(); setIsOpen(false); }} className={styles.logoutBtn}>
              LogOut
            </button>
          </div>
        ) : (
          /* Case 2: Agar User Login NAHI hai */
          <Link to="/login" className={styles.loginGroup} onClick={() => setIsOpen(false)}>
            <span className={styles.loginText}>Login / Signup</span>
          </Link>
        )}
      </div>

    </div>
  </nav>
);
};

export default Navbar;