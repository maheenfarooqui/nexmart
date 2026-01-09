import { useState } from 'react';
import {useNavigate, Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiMail } from 'react-icons/fi';
import styles from './Footer.module.css';
import logoFImg from '../../../assets/flogo.png';
import { db } from '../../../services/firebase';
import { collection, addDoc, query, where, getDocs, serverTimestamp } from 'firebase/firestore';

const Footer = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Category Click Function
  const handleCategoryClick = (category) => {
    navigate('/', { state: { selectedCategory: category } });
  };

  // 2. Browse Listings Function (Correctly Closed Now)
  const handleBrowseListings = () => {
    navigate('/');
    setTimeout(() => {
      const element = document.getElementById('gallery-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }; // <--- Ye bracket miss tha, jisne sab garbar kiya!

  // 3. Subscribe Function (Ab ye azad hai aur kaam karega)
  const handleSubscribe = async () => {
    if (!email || !email.includes('@')) {
      alert("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    try {
      const subscribersRef = collection(db, "subscribers");
      const q = query(subscribersRef, where("email", "==", email));
      const snap = await getDocs(q);

      if (!snap.empty) {
        alert("You're already on the list! ✨");
      } else {
        await addDoc(subscribersRef, {
          email: email,
          timestamp: serverTimestamp()
        });
        alert("Subscribed successfully! Check your inbox soon. 🚀");
      }
      setEmail('');
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Try again!");
    }
    setIsSubmitting(false);
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
            <li><a onClick={() => handleCategoryClick('Electronics')}>Electronics</a></li>
            <li><a onClick={() => handleCategoryClick('Fashion')}>Fashion</a></li>
            <li><a onClick={() => handleCategoryClick('Furniture')}>Furniture</a></li>
            <li><a onClick={() => handleCategoryClick('Accessories')}>Accessories</a></li>
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div className={styles.column}>
          <h3>Stay Updated</h3>
          <p className={styles.newsletterText}>Get the latest deals in your inbox.</p>
          <div className={styles.inputGroup}>
            <input 
          type="email" 
          placeholder="Email address" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSubmitting}
        />
           <button 
          onClick={handleSubscribe} 
          disabled={isSubmitting}
          style={{ opacity: isSubmitting ? 0.7 : 1 }}
        >
          {isSubmitting ? "..." : <FiMail />}
        </button>
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