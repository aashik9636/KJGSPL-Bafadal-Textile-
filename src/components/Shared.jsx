import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, User, LayoutDashboard, Building2, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Shared.css';

export const Navbar = () => {
  const { cartCount } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isB2B = location.pathname.startsWith('/fabrics') || 
                location.pathname.startsWith('/rfq') || 
                location.pathname.startsWith('/account') || 
                location.pathname.startsWith('/dashboard');

  const isB2C = location.pathname.startsWith('/shop') || 
                location.pathname.startsWith('/cart') || 
                location.pathname.startsWith('/checkout');

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <header className="navbar-wrapper">
      {/* Top Dual Portal Switcher Bar */}
      <div className="top-portal-bar">
        <div className="container flex justify-between items-center top-portal-inner">
          <div className="top-portal-intro flex items-center gap-xs">
            <span className="live-indicator"></span>
            <span className="top-portal-text">Bafadal Group — Dual B2B & B2C Textile Network</span>
          </div>
          <div className="portal-switcher flex items-center">
            <Link 
              to="/shop" 
              className={`portal-tab ${isB2C || (!isB2B && !isB2C) ? 'active' : ''}`}
            >
              <ShoppingCart size={13} />
              <span>B2C Retail Fashion</span>
              <span className="portal-pill-badge">Cards & UPI</span>
            </Link>
            <div className="portal-divider"></div>
            <Link 
              to="/fabrics" 
              className={`portal-tab ${isB2B ? 'active' : ''}`}
            >
              <Building2 size={13} />
              <span>B2B Wholesale & OEM</span>
              <span className="portal-pill-badge b2b">RFQ / Quotation</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="navbar">
        <div className="container flex justify-between items-center navbar-inner">
          <div className="logo">
            <Link to="/">
              <img src="/texttile-removebg-preview.png" alt="Bafadal Textile Trading" style={{ height: '48px', objectFit: 'contain' }} />
            </Link>
          </div>
          
          <nav className={`nav-links ${mobileOpen ? 'nav-open' : ''}`}>
            <div className="mobile-section-title">B2C Retail Collection</div>
            <Link to="/shop" className={`nav-link ${isActive('/shop') ? 'nav-active' : ''}`} onClick={() => setMobileOpen(false)}>
              <span>Shop Garments</span>
              <span className="nav-tag-b2c">B2C</span>
            </Link>

            <div className="nav-vertical-sep desktop-only"></div>

            <div className="mobile-section-title">B2B Wholesale & Manufacturing</div>
            <Link to="/fabrics" className={`nav-link ${isActive('/fabrics') ? 'nav-active' : ''}`} onClick={() => setMobileOpen(false)}>
              <span>Fabric Trading</span>
              <span className="nav-tag-b2b">B2B</span>
            </Link>
            <Link to="/rfq" className={`nav-link ${isActive('/rfq') ? 'nav-active' : ''}`} onClick={() => setMobileOpen(false)}>
              <span>Request Quote</span>
              <span className="nav-tag-rfq">RFQ</span>
            </Link>

            <div className="mobile-only-links">
              <Link to="/cart" className="nav-link" onClick={() => setMobileOpen(false)}>
                B2C Retail Cart {cartCount > 0 && `(${cartCount})`}
              </Link>
              <Link to="/account" className="nav-link" onClick={() => setMobileOpen(false)}>
                B2B Verified Portal
              </Link>
              <Link to="/dashboard" className="nav-link" onClick={() => setMobileOpen(false)}>
                Operations Dashboard
              </Link>
            </div>
          </nav>

          <div className="nav-actions flex items-center gap-sm">
            <Link to="/account" className="b2b-portal-btn desktop-only" title="B2B Wholesale Portal">
              <Building2 size={15} />
              <span>B2B Portal</span>
            </Link>

            <Link to="/dashboard" className="icon-btn desktop-only" title="Operations & ERP Dashboard">
              <LayoutDashboard size={19} />
            </Link>

            {/* B2C Retail Cart with clear label and card payment indicator */}
            <Link to="/cart" className="b2c-cart-btn" title="B2C Retail Shopping Cart (Cards Accepted)">
              <div className="cart-icon-wrapper">
                <ShoppingBag size={18} />
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </div>
              <div className="cart-btn-labels desktop-only">
                <span className="cart-label-main">Retail Cart</span>
                <span className="cart-label-sub">B2C • Cards</span>
              </div>
            </Link>

            <button className="mobile-menu-btn icon-btn" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle Navigation">
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileOpen && <div className="nav-overlay" onClick={() => setMobileOpen(false)} />}
      </div>
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
          <p className="footer-desc mt-sm">A premier dual-channel textile platform with distinct B2B wholesale quotation workflows and B2C retail card checkout.</p>
        </div>
        <div>
          <h4 className="footer-subtitle flex items-center gap-xs">
            <Building2 size={15} color="var(--color-accent)" /> B2B Wholesale & OEM
          </h4>
          <ul className="footer-links">
            <li><Link to="/fabrics">Fabric Trading (Bulk Rolls / MOQ)</Link></li>
            <li><Link to="/rfq">OEM Garment Manufacturing</Link></li>
            <li><Link to="/rfq?type=sample">Request Fabric Swatches</Link></li>
            <li><Link to="/account">B2B Commercial Portal</Link></li>
            <li><Link to="/dashboard">Operations ERP Dashboard</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="footer-subtitle flex items-center gap-xs">
            <ShoppingCart size={15} color="var(--color-accent)" /> B2C Retail Fashion
          </h4>
          <ul className="footer-links">
            <li><Link to="/shop">BSTAAR Garment Collection</Link></li>
            <li><Link to="/shop">Men's Apparel</Link></li>
            <li><Link to="/shop">Women's Apparel</Link></li>
            <li><Link to="/cart">Retail Cart (Cards & UPI)</Link></li>
            <li><Link to="/checkout">Secure Retail Checkout</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="footer-subtitle">Business Policies</h4>
          <ul className="footer-links">
            <li><a href="#">B2B Credit & LC Terms</a></li>
            <li><a href="#">Fabric Lab Testing & GSM</a></li>
            <li><a href="#">B2C Card & UPI Security</a></li>
            <li><a href="#">Consumer 7-Day Returns</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom container">
        <p>© 2026 Bafadal Group. All rights reserved.</p>
        <div className="footer-badges flex items-center gap-sm">
          <span className="demo-notice">🏢 B2B: MOQ Quotation & Invoicing (No retail card checkout)</span>
          <span className="demo-notice">🛍️ B2C: Single Pieces & Card Checkout</span>
        </div>
      </div>
    </footer>
  );
};
