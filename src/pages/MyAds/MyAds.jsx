import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db, auth } from "../../services/firebase";
import { collection, query, where, getDocs, deleteDoc, doc ,onSnapshot} from 'firebase/firestore';
import ProductCard from "../../components/product/ProductCard/ProductCard";
import styles from './MyAds.module.css';

const MyAds = () => {
  const [myProducts, setMyProducts] = useState([]);
  const [orders, setOrders] = useState([]);
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
  useEffect(() => {
  const q = query(collection(db, "orders"), where("sellerId", "==", auth.currentUser.uid));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    setOrders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  });
  return () => unsubscribe();
}, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this ad?")) {
      await deleteDoc(doc(db, "products", id));
      setMyProducts(myProducts.filter(ad => ad.id !== id)); // UI se foran remove karne ke liye
      alert("Ad deleted successfully!");
    }
  };
  if (!auth.currentUser) return <div>Please Login...</div>;

  if (loading) return <div className={styles.loader}>Loading your ads...</div>;
  



  return (
  <div className={styles.dashboardContainer}>
    <h1 className={styles.mainTitle}>Seller Dashboard</h1>

    {/* Section 1: My Products */}
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>My Listed Ads ({myProducts.length})</h2>
      <div className={styles.grid}>
        {myProducts.map((ad) => (
          <div key={ad.id} className={styles.adCard}>
            <img src={ad.image} alt={ad.title} className={styles.adImage} />
            <div className={styles.adInfo}>
              <h3>{ad.title}</h3>
              <p>Rs. {ad.price}</p>
              <div className={styles.actionBtns}>
              <Link to={`/edit-product/${ad.id}`} className={styles.editBtn}>Edit</Link>
              <button onClick={() => handleDelete(ad.id)} className={styles.deleteBtn}>Delete Ad</button>
            </div>
            </div>
          </div>
        ))}
      </div>
    </section>

    <hr className={styles.divider} />

    {/* Section 2: Orders Received (Yahan Orders nazar aayenge) */}
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Orders Received ({orders.length})</h2>
      <div className={styles.orderList}>
        {orders.length === 0 ? (
          <p className={styles.emptyMsg}>Abhi tak koi order nahi aaya.</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} className={styles.orderCard}>
              <div className={styles.orderDetail}>
                <span className={styles.orderLabel}>Product:</span>
                <span className={styles.orderValue}>{order.productTitle}</span>
              </div>
              <div className={styles.orderDetail}>
                <span className={styles.orderLabel}>Buyer:</span>
                <span className={styles.orderValue}>{order.buyerEmail}</span>
              </div>
              <div className={styles.orderDetail}>
                <span className={styles.orderLabel}>Price:</span>
                <span className={styles.orderValue}>Rs. {order.price}</span>
              </div>
              <div className={styles.statusBadge}>{order.status}</div>
            </div>
          ))
        )}
      </div>
    </section>
  </div>
);
};

export default MyAds;