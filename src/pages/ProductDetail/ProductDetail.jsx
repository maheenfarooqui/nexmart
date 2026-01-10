import React, { useState, useEffect } from "react"; // useState aur useEffect add kiya
import { useParams, useNavigate } from "react-router-dom";
import { db ,auth } from "../../services/firebase"; // Database connection
import { doc, getDoc,addDoc,collection } from "firebase/firestore";
import Swal from 'sweetalert2';
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
  if (!auth.currentUser) {
    return Swal.fire({
      icon: 'warning',
      title: 'Login Required',
      text: 'Please login to place an order and start trading! 🚀',
      confirmButtonColor: '#8dc447'
    });
  }

  // Loading state taaki user ko lage transaction ho rahi hai
  Swal.fire({
    title: 'Processing Order...',
    didOpen: () => { Swal.showLoading(); }
  });

  try {
    await addDoc(collection(db, "orders"), {
      productId: id,
      productTitle: product.title,
      price: product.price,
      sellerId: product.sellerId,
      buyerId: auth.currentUser.uid,
      buyerEmail: auth.currentUser.email,
      status: "Pending",
      createdAt: new Date()
    });

    Swal.fire({
      icon: 'success',
      title: 'Order Requested!',
      text: 'Your request has been recorded. The seller will contact you soon! ✨',
      confirmButtonColor: '#8dc447',
    });
  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'Order Failed',
      text: 'Error: ' + err.message,
      confirmButtonColor: '#d33'
    });
  }
};
const handleContactSeller = () => {
  if (product && product.phone) {
    const phoneNumber = product.phone; 
    const message = encodeURIComponent(`Hi, I am interested in your product: ${product.title}`);
    
    // Toast alert: User ko batane ke liye ke WhatsApp khul raha hai
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
    });
    
    Toast.fire({
      icon: 'success',
      title: 'Opening WhatsApp...'
    });

    setTimeout(() => {
      window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    }, 1000);

  } else {
    Swal.fire({
      icon: 'error',
      title: 'No Contact Info',
      text: "Sorry, this seller hasn't provided a WhatsApp number!",
      confirmButtonColor: '#d33'
    });
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
