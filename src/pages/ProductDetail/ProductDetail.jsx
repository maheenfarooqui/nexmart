import React, { useState, useEffect } from "react"; // useState aur useEffect add kiya
import { useParams, useNavigate } from "react-router-dom";
import { db ,auth } from "../../services/firebase"; // Database connection
import { doc, getDoc,addDoc,collection } from "firebase/firestore";
import {
  FiArrowLeft,
  FiMessageCircle,
  FiShield,
  FiTruck,
} from "react-icons/fi";
import styles from "./ProductDetail.module.css";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // 1. Nayi States banayein
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // 2. Firebase se data mangwane ka tareeka
  useEffect(() => {
    const getProductData = async () => {
      try {
        const docRef = doc(db, "products", id); // specific product ki ID
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct(docSnap.data());
        } else {
          console.log("Product not found!");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };

    getProductData();
  }, [id]);

  // 3. Loading state dikhayein
  if (loading)
    return <div className={styles.loading}>Loading Product Details...</div>;
  if (!product) return <div className={styles.error}>Product not found!</div>;
const handleBuyNow = async () => {
  if (!auth.currentUser) return alert("Login to place an order!");

  try {
    await addDoc(collection(db, "orders"), {
      productId: id,
      productTitle: product.title,
      price: product.price,
      sellerId: product.sellerId, // Kisne becha
      buyerId: auth.currentUser.uid, // Kisne khareeda
      buyerEmail: auth.currentUser.email,
      status: "Pending", // Shuru mein pending
      createdAt: new Date()
    });
    alert("Order request recorded! Seller will contact you.");
  } catch (err) {
    alert("Error: " + err.message);
  }
};

  const handleContactSeller = () => {
  if (product && product.phone) {
    // Number se pehle '+' ya '00' nahi hona chahiye, direct 92 se shuru ho
    const phoneNumber = product.phone; 
    const message = encodeURIComponent(`Hi, I am interested in your product: ${product.title}`);
    
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  } else {
    alert("Seller hasn't provided a WhatsApp number!");
  }
};

  return (
    <div className={styles.container}>
      <button onClick={() => navigate(-1)} className={styles.backBtn}>
        <FiArrowLeft /> Back to Listings
      </button>

      <div className={styles.wrapper}>
        {/* Left: Product Image */}
        <div className={styles.imageSection}>
          <img
            src={product.image}
            alt={product.title}
            className={styles.mainImg}
          />
        </div>

        {/* Right: Product Info */}
        <div className={styles.infoSection}>
          <span className={styles.categoryTag}>{product.category}</span>
          <h1 className={styles.productTitle}>{product.title}</h1>
          <p className={styles.priceTag}>${product.price}</p>

          <div className={styles.sellerInfo}>
            <p>
              <strong>Listed by:</strong> {product.sellerEmail || "Anonymous"}
            </p>
          </div>

          <p className={styles.description}>
            <strong>Description:</strong> {product.description}
          </p>

          <div className={styles.actions}>
            <button className={styles.chatBtn} onClick={handleContactSeller}>
              <FiMessageCircle /> Contact Seller
            </button>
            <button className={styles.buyBtn} onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>

          {/* Trust Badges */}
          <div className={styles.trustBadges}>
            <div className={styles.badge}>
              <FiShield /> Secure Payment
            </div>
            <div className={styles.badge}>
              <FiTruck /> Fast Shipping
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
