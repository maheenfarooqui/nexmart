import React, { useState, useEffect } from 'react';
import { db } from '../../services/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './Sell.module.css';

const Sell = () => {
  const { user } = useAuth(); // Auth context se user lein
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: '',
    description: '',
    image: ''
  });
  useEffect(() => {
    if (!user) {
      alert("Pehle login karein!");
      navigate('/login');
    }
  }, [user, navigate]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("Please login to post an ad!");

    try {
      // Database mein 'products' collection mein naya document add karna
      await addDoc(collection(db, "products"), {
        ...formData,
        price: Number(formData.price), // Price ko number mein convert karna zaroori hai
        sellerId: user.uid,
        sellerEmail: user.email,
        createdAt: new Date()
      });
      
      alert("Product Listed Successfully!");
      navigate('/'); // Wapas home page par bhej dein
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.sellForm} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Post Your <span className={styles.accent}>Ad</span></h2>
        
        <label>Product Title</label>
        <input type="text" placeholder="e.g. iPhone 15 Pro Max" 
          onChange={(e) => setFormData({...formData, title: e.target.value})} required />

        <label>Category</label>
        <select onChange={(e) => setFormData({...formData, category: e.target.value})} required>
          <option value="">Select a Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Fashion">Fashion</option>
          <option value="Furniture">Furniture</option>
          <option value="Accessories">Accessories</option>
        </select>

        <label>Price ($)</label>
        <input type="number" placeholder="Enter Price" 
          onChange={(e) => setFormData({...formData, price: e.target.value})} required />

        <label>Image URL</label>
        <input type="url" placeholder="Paste an image link (Unsplash or Pinterest)" 
          onChange={(e) => setFormData({...formData, image: e.target.value})} required />

        <label>Description</label>
        <textarea placeholder="Describe what you are selling..." 
          onChange={(e) => setFormData({...formData, description: e.target.value})} required></textarea>

        <button type="submit" className={styles.submitBtn}>Post Now</button>
      </form>
    </div>
  );
};

export default Sell;