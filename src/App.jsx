import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import './App.css'
import Navbar from './components/layout/Navbar/Navbar'
import Home from './pages/Home/Home';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Footer from './components/layout/Footer/Footer';

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Navbar />
        <main>
          <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/product/:id" element={<ProductDetail />} />
           
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App