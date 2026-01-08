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
    phone: '',
    description: '',
  });
  const [imageFile, setImageFile] = useState(null); // File state alag rakhein
  const [loading, setLoading] = useState(false);
  const uploadToImgBB = async (file) => {
    const data = new FormData();
    data.append("image", file);
    
    // Yahan apni API key lagayein
    const apiKey = "594ccadc84835afb853feeaaf7b247ce"; 
    
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: data,
    });
    const result = await response.json();
    return result.data.url; // Direct image URL milega
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("Please login to post an ad!");
    if (!imageFile) return alert("Please select an image!");

    setLoading(true); // Process shuru
    try {
      // 2. Pehle image upload hogi
      const uploadedImageUrl = await uploadToImgBB(imageFile);

      // 3. Phir Firestore mein data jayega
      await addDoc(collection(db, "products"), {
        ...formData,
        image: uploadedImageUrl, // ImgBB wala link yahan save hoga
        price: Number(formData.price),
        sellerId: user.uid,
        sellerEmail: user.email,
        createdAt: new Date()
      });
      
      alert("Product Listed Successfully!");
      navigate('/my-ads'); // Behter hai ke my-ads pe jaye takay user apna ad dekh sakay
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false); // Process khatam
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.sellForm} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Post Your <span className={styles.accent}>Ad</span></h2>
        
        <label>Product Title</label>
          <input 
  type="text" 
  placeholder="e.g. iPhone 15 Pro Max" 
  onChange={(e) => setFormData({...formData, title: e.target.value})} 
  required 
/>

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
        <input 
  type="file" 
  accept="image/*" 
  onChange={(e) => setImageFile(e.target.files[0])} 
  required 
/>
<label>WhatsApp Number (e.g. 923xxxxxxxx)</label>
<input 
  type="text" 
  placeholder="923001234567" 
  onChange={(e) => setFormData({...formData, phone: e.target.value})} 
  required 
/>

        <label>Description</label>
        <textarea placeholder="Describe what you are selling..." 
          onChange={(e) => setFormData({...formData, description: e.target.value})} required></textarea>

        <button type="submit" className={styles.submitBtn}>Post Now</button>
      </form>
    </div>
  );
};

export default Sell;