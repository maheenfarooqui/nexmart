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

function App() {
  return (
    <AuthProvider>
    <Router>
      <div className="app-wrapper">
        <Navbar />
        <main>
          <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/product/:id" element={<ProductDetail />} />
           <Route path="/signup" element={<Signup />} />
           <Route path="/login" element={<Login />} />
           <Route path="/sell" element={<Sell />} />
           
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
    </AuthProvider>
  )
}

export default App