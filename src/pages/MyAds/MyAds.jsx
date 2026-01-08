import React, { useEffect, useState } from 'react';
import { db, auth } from "../../services/firebase";
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import ProductCard from "../../components/product/ProductCard/ProductCard";
import styles from './MyAds.module.css';

const MyAds = () => {
  const [myProducts, setMyProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyAds = async () => {
    if (auth.currentUser) {
      const q = query(
        collection(db, "products"),
        where("sellerId", "==", auth.currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      const ads = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMyProducts(ads);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyAds();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this ad?")) {
      await deleteDoc(doc(db, "products", id));
      setMyProducts(myProducts.filter(ad => ad.id !== id)); // UI se foran remove karne ke liye
      alert("Ad deleted successfully!");
    }
  };

  if (loading) return <div className={styles.loader}>Loading your ads...</div>;

  return (
    <div className={styles.myAdsContainer}>
      <h1>My Ads</h1>
      <div className={styles.adsGrid}>
        {myProducts.length > 0 ? (
          myProducts.map(ad => (
            <div key={ad.id} className={styles.adWrapper}>
              <ProductCard product={ad} />
              <button 
                onClick={() => handleDelete(ad.id)} 
                className={styles.deleteBtn}
              >
                Delete Ad
              </button>
            </div>
          ))
        ) : (
          <p>You haven't posted any ads yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyAds;