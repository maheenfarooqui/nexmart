import React, { useState, useEffect } from 'react';
import ProductCard from '../../components/product/ProductCard/ProductCard';
import styles from './Wishlist.module.css';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);

 const loadWishlist = () => {
    const items = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setWishlistItems(items);
  };
  useEffect(() => {
    loadWishlist();

    // Jab ProductCard mein heart click ho, toh ye page khud ko update kare
    window.addEventListener("wishlistUpdated", loadWishlist);
    
    return () => {
      window.removeEventListener("wishlistUpdated", loadWishlist);
    };
  }, []);

  return (
    <div className={styles.wishlistContainer}>
      <h1>My <span className={styles.highlight}>Wishlist</span> ❤️</h1>
      
      {wishlistItems.length === 0 ? (
        <div className={styles.emptyMsg}>
          <p>Your wishlist is empty!</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {wishlistItems.map(item => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;