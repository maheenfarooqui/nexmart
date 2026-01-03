import React from 'react';
import styles from './Home.module.css';
import { FiArrowRight, FiShoppingBag } from 'react-icons/fi';
import ProductCard from '../../components/product/ProductCard/ProductCard';
import { products } from '../../data';

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.mainTitle}>
            Next Generation <span className={styles.highlight}>Marketplace</span>
          </h1>
          <p className={styles.subtitle}>
            Buy, sell, and discover exclusive items at NexMart. 
            The most secure way to trade in the digital era.
          </p>
          
          <div className={styles.ctaButtons}>
            <button className={styles.primaryBtn}>
              Browse Gallery <FiShoppingBag />
            </button>
            <button className={styles.secondaryBtn}>
              Start Selling <FiArrowRight />
            </button>
          </div>
        </div>

        {/* Hero Decorative Element (Optional) */}
        <div className={styles.heroGraphic}>
           <div className={styles.gradientCircle}></div>
        </div>
      </section>

      {/* Agla section yahan aayega: Featured Products */}
      <section className={styles.listings}>
  <div className={styles.sectionHeader}>
    <h2>Recent <span className={styles.highlight}>Listings</span></h2>
    <button className={styles.seeAll}>See All</button>
  </div>
  
  <div className={styles.grid}>
    {products.map(product => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
</section>
    </div>
  );
};

export default Home;