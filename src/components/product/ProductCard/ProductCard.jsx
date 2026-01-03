import React from 'react';
import styles from './ProductCard.module.css';
import { Link } from 'react-router-dom';
import { FiHeart, FiExternalLink } from 'react-icons/fi';

const ProductCard = ({ product }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={product.image} alt={product.title} />
        <button className={styles.wishlistBtn}><FiHeart /></button>
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