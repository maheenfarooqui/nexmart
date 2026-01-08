import React, { useState , useEffect } from 'react';
import styles from './ProductCard.module.css';
import { Link } from 'react-router-dom';
import { FiHeart,FiExternalLink } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  const [isLiked, setIsLiked] = useState(false);

  // Check karein ke kya ye product pehle se liked hai
  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const alreadyLiked = wishlist.some(item => item.id === product.id);
    setIsLiked(alreadyLiked);
  }, [product.id]);

  const toggleLike = (e) => {
    e.stopPropagation(); // Card click event ko rokne ke liye
    
    let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    
    if (isLiked) {
      // Wishlist se nikalein
      wishlist = wishlist.filter(item => item.id !== product.id);
      setIsLiked(false);
    } else {
      // Wishlist mein dalein
      wishlist.push(product);
      setIsLiked(true);
    }

    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    
    // Navbar ko batane ke liye ke data change ho gaya hai
    window.dispatchEvent(new Event("wishlistUpdated"));
  };
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={product.image} alt={product.title} />
        <button onClick={toggleLike} className={styles.wishlistBtn}>{isLiked ? <FaHeart color="red" /> : <FiHeart />}</button>
      </div>
      
      <div className={styles.info}>
        <span className={styles.category}>{product.category}</span>
        <h3 className={styles.title}>{product.title}</h3>
        
        <div className={styles.footer}>
          <span className={styles.price}>${product.price}</span>
          <Link to={`/product/${product.id}`} className={styles.viewBtn}>
  View <FiExternalLink />
</Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;