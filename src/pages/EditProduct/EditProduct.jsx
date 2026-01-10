import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from "../../services/firebase";;
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import styles from "../Sell/Sell.module.css"; // Same styling use kar sakte hain
import Swal from 'sweetalert2';

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

  // Loading alert dikhayein jab tak update ho raha ho
  Swal.fire({
    title: 'Updating...',
    text: 'Please wait while we save your changes.',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });

  try {
    const docRef = doc(db, "products", id);
    await updateDoc(docRef, {
      ...formData,
      price: Number(formData.price) 
    });

    // Success Alert
    await Swal.fire({
      icon: 'success',
      title: 'Product Updated!',
      text: 'Your product has been updated successfully.',
      confirmButtonColor: '#8dc447',
      timer: 2000, // 2 seconds baad khud band ho jaye
      showConfirmButton: true
    });

    navigate('/my-ads');
  } catch (err) {
    // Error Alert
    Swal.fire({
      icon: 'error',
      title: 'Update Failed',
      text: err.message,
      confirmButtonColor: '#d33'
    });
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