import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import './App.css'
import Navbar from './components/layout/Navbar/Navbar'
import Home from './pages/Home/Home';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Footer from './components/layout/Footer/Footer';
import Signup from './pages/Auth/Signup';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Auth/Login';
import Sell from './pages/Sell/Sell';
import MyAds from './pages/MyAds/MyAds';
import EditProduct from './pages/EditProduct/EditProduct';
import Wishlist from './pages/Wishlist/Wishlist';
import HowItWorks from './pages/HowItWorks/HowItWorks';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

function App() {
  return (
    <AuthProvider>
    <Router>
      <div className="app-wrapper">
        <ScrollToTop />
        <Navbar />
        <main>
          <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/product/:id" element={<ProductDetail />} />
           <Route path="/edit-product/:id" element={<EditProduct />} />
           <Route path="/signup" element={<Signup />} />
           <Route path="/login" element={<Login />} />
           <Route path="/sell" element={<Sell />} />
           <Route path="/my-ads" element={<MyAds />} />
           <Route path="/wishlist" element={<Wishlist />} />
           <Route path="/how-it-works" element={<HowItWorks />} />
           
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
    </AuthProvider>
  )
}

export default App