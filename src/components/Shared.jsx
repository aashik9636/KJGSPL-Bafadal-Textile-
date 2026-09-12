import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, User, LayoutDashboard } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Shared.css';

export const Navbar = () => {
  const { cartCount } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <header className="navbar">
      <div className="container flex justify-between items-center navbar-inner">
        <div className="logo">
          <Link to="/">
            <img src="/texttile-removebg-preview.png" alt="Bafadal Textile Trading" style={{ height: '50px', objectFit: 'contain' }} />
          </Link>
        </div>
        
        <nav className={`nav-links ${mobileOpen ? 'nav-open' : ''}`}>
          <Link to="/shop" className={`nav-link ${isActive('/shop') ? 'nav-active' : ''}`} onClick={() => setMobileOpen(false)}>Shop Garments</Link>
          <Link to="/fabrics" className={`nav-link ${isActive('/fabrics') ? 'nav-active' : ''}`} onClick={() => setMobileOpen(false)}>Fabric Trading</Link>
          <Link to="/rfq" className={`nav-link ${isActive('/rfq') ? 'nav-active' : ''}`} onClick={() => setMobileOpen(false)}>Request Quote</Link>
          <div className="mobile-only-links">
            <Link to="/account" className="nav-link" onClick={() => setMobileOpen(false)}>B2B Account</Link>
            <Link to="/dashboard" className="nav-link" onClick={() => setMobileOpen(false)}>Dashboard</Link>
          </div>
        </nav>

        <div className="nav-actions flex items-center gap-md">
          <Link to="/dashboard" className="icon-btn desktop-only" title="Operations Dashboard">
            <LayoutDashboard size={20} />
          </Link>
          <Link to="/account" className="icon-btn desktop-only" title="B2B Account">
            <User size={20} />
          </Link>
          <Link to="/cart" className="icon-btn cart-icon-btn" title="Cart">
            <ShoppingBag size={20} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
          <button className="mobile-menu-btn icon-btn" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && <div className="nav-overlay" onClick={() => setMobileOpen(false)} />}
    </header>
  );
};

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <img src="/texttile-removebg-preview.png" alt="Bafadal Textile Trading" style={{ maxWidth: '160px', height: 'auto', objectFit: 'contain', marginBottom: '1.5rem', filter: 'brightness(0) invert(1)' }} className="footer-title-img" />
          <p className="footer-desc">Textiles. Manufacturing. Garments.</p>
          <p className="footer-desc mt-sm">Leading textile commerce platform connecting wholesale fabric trading, OEM manufacturing, and premium consumer garments.</p>
        </div>
        <div>
          <h4 className="footer-subtitle">Businesses</h4>
          <ul className="footer-links">
            <li><Link to="/fabrics">Fabric Trading</Link></li>
            <li><Link to="/rfq">OEM Manufacturing</Link></li>
            <li><Link to="/shop">Ready-Made Garments</Link></li>
            <li><Link to="/account">B2B Portal</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="footer-subtitle">BSTAAR</h4>
          <ul className="footer-links">
            <li><Link to="/shop">Shop All</Link></li>
            <li><Link to="/shop">Men</Link></li>
            <li><Link to="/shop">Women</Link></li>
            <li><Link to="/shop">Kids</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="footer-subtitle">Support</h4>
          <ul className="footer-links">
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Shipping & Returns</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom container">
        <p>© 2026 Bafadal Group. All rights reserved.</p>
        <p className="demo-notice">Demo data — conceptual prototype. No real orders will be processed.</p>
      </div>
    </footer>
  );
};
