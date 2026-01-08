import React, { useState, useEffect } from 'react';
import styles from './Home.module.css';
import { FiArrowRight, FiShoppingBag } from 'react-icons/fi';
import ProductCard from '../../components/product/ProductCard/ProductCard';
import { db } from '../../services/firebase';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import { useLocation, useNavigate } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]); // Products ko store karne ke liye
  const [loading, setLoading] = useState(true); // Loading screen ke liye
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Electronics', 'Fashion', 'Furniture', 'Accessories'];
  const navigate = useNavigate();
  const location = useLocation();
const searchParams = new URLSearchParams(location.search);
const searchQuery = searchParams.get('search');

useEffect(() => {
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const productsRef = collection(db, "products");
      let q;

      // Agar user ne Search Bar use ki hai
      if (searchQuery) {
        q = query(
          productsRef, 
          where("title", ">=", searchQuery), 
          where("title", "<=", searchQuery + '\uf8ff')
        );
      } 
      // Agar user ne Category filter click kiya hai
      else if (activeCategory !== 'All') {
        q = query(productsRef, where("category", "==", activeCategory), orderBy("createdAt", "desc"));
      } 
      // Agar simple Home page khula hai (No filter, No search)
      else {
        q = query(productsRef, orderBy("createdAt", "desc"));
      }

      const querySnapshot = await getDocs(q);
      const productsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setProducts(productsData);
      setLoading(false);
    } catch (error) {
      console.error("Fetching error:", error);
      setLoading(false);
    }
  };

  fetchProducts();
}, [activeCategory, searchQuery]);
const handleScroll = () => {
    const element = document.getElementById('gallery-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
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
            <button onClick={handleScroll} className={styles.primaryBtn}>
              Browse Gallery <FiShoppingBag />
            </button>
            <button onClick={() => navigate('/sell')} className={styles.secondaryBtn}>
              Start Selling <FiArrowRight />
            </button>
          </div>
        </div>

        {/* Hero Decorative Element (Optional) */}
        <div className={styles.heroGraphic}>
           <div className={styles.gradientCircle}></div>
        </div>
      </section>
<div className={styles.categoryBar}>
      {categories.map(cat => (
        <button 
          key={cat}
          className={activeCategory === cat ? styles.activeBtn : styles.catBtn}
          onClick={() => {
      setActiveCategory(cat); // Category set karega
      navigate('/');          // Search query ko khatam kar dega
    }}
        >
          {cat}
        </button>
      ))}
    </div>
      {/* Agla section yahan aayega: Featured Products */}
      {searchQuery && (
        <div className={styles.searchHeader}>
          <h3 className={styles.searchTitle}>
            Showing results for "<span>{searchQuery}</span>"
          </h3>
          <button 
            className={styles.clearBtn} 
            onClick={() =>{ navigate('/');
              setActiveCategory('All');

            }}
          >
            Clear Search ✕
          </button>
        </div>
      )}
      <section className={styles.listings} id="gallery-section">
  <div className={styles.sectionHeader}>
    <h2>
      <span className={styles.highlight}>
        {activeCategory === 'All' ? 'All Products' : `${activeCategory}`}
      </span>
    </h2>
  
  </div>
  
  <div className={styles.grid}>
    {products.length > 0 ? (
      products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))
    ) : (
      <p className={styles.noProducts}>No products found in this category.</p>
    )}
  </div>
</section>
    </div>
  );
};

export default Home;