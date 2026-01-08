import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from "../../services/firebase";;
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import styles from "../Sell/Sell.module.css"; // Same styling use kar sakte hain

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    phone: ''
  });

  // 1. Purana data fetch karein
  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, "products", id);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        setFormData(snap.data());
      }
    };
    fetchProduct();
  }, [id]);

  // 2. Data Update karne ka function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, "products", id);
      await updateDoc(docRef, {
        ...formData,
        price: Number(formData.price) // Price update
      });
      alert("Product Updated Successfully!");
      navigate('/my-ads');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleUpdate} className={styles.sellForm}>
        <h2>Edit <span className={styles.accent}>Product</span></h2>
        
        <label>Title</label>
        <input type="text" value={formData.title} 
          onChange={(e) => setFormData({...formData, title: e.target.value})} required />

        <label>Price ($)</label>
        <input type="number" value={formData.price} 
          onChange={(e) => setFormData({...formData, price: e.target.value})} required />

        <label>Description</label>
        <textarea value={formData.description} 
          onChange={(e) => setFormData({...formData, description: e.target.value})} required />

        <button type="submit" className={styles.submitBtn}>Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;