import React, { useState, useEffect } from 'react';
import { db } from '../../services/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
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

  // 1. Validation Alerts
  if (!user) {
    return Swal.fire({
      icon: 'warning',
      title: 'Login Required',
      text: 'Please login to post your ad! 🚀',
      confirmButtonColor: '#8dc447'
    });
  }

  if (!imageFile) {
    return Swal.fire({
      icon: 'image',
      title: 'Missing Image',
      text: 'Please select a photo for your product!',
      confirmButtonColor: '#8dc447'
    });
  }

  // 2. Start Loading Alert (Image upload takes time)
  Swal.fire({
    title: 'Listing your Product...',
    text: 'Uploading image and saving details. Please wait.',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });

  setLoading(true);
  try {
    // 3. Image Upload (ImgBB)
    const uploadedImageUrl = await uploadToImgBB(imageFile);

    // 4. Firestore Data Entry
    await addDoc(collection(db, "products"), {
      ...formData,
      image: uploadedImageUrl,
      price: Number(formData.price),
      sellerId: user.uid,
      sellerEmail: user.email,
      createdAt: new Date()
    });

    // 5. Success Alert
    await Swal.fire({
      icon: 'success',
      title: 'Awesome!',
      text: 'Product Listed Successfully! 🌟',
      confirmButtonColor: '#8dc447',
      timer: 2500,
      timerProgressBar: true
    });

    navigate('/my-ads');
    
  } catch (err) {
    // 6. Error Alert
    Swal.fire({
      icon: 'error',
      title: 'Posting Failed',
      text: "Error: " + err.message,
      confirmButtonColor: '#d33'
    });
  } finally {
    setLoading(false);
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