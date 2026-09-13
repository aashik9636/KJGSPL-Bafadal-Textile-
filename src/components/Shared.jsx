import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, LayoutDashboard, Building2, ShoppingCart, Globe, ChevronDown, FileText } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useCurrency, CURRENCIES } from '../context/CurrencyContext';
import { useRfq } from '../context/RfqContext';
import './Shared.css';

export const Navbar = () => {
  const { cartCount } = useCart();
  const { rfqCount } = useRfq();
  const { currency, currentCurrencyCode, setCurrency } = useCurrency();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const currencyRef = useRef(null);
  const location = useLocation();

  const isB2B = location.pathname.startsWith('/fabrics') || 
                location.pathname.startsWith('/rfq') || 
                location.pathname.startsWith('/account') || 
                location.pathname.startsWith('/dashboard');

  const isB2C = location.pathname.startsWith('/shop') || 
                location.pathname.startsWith('/cart') || 
                location.pathname.startsWith('/checkout');

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

  // Close currency dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (currencyRef.current && !currencyRef.current.contains(e.target)) {
        setCurrencyDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="navbar-wrapper">
      {/* Top Dual Portal Switcher & Multi-Currency Bar */}
      <div className="top-portal-bar">
        <div className="container flex justify-between items-center top-portal-inner">
          <div className="top-portal-intro flex items-center gap-xs">
            <span className="live-indicator"></span>
            <span className="top-portal-text">Bafadal Group — Dubai UAE (FTA TRN Compliant)</span>
          </div>

          <div className="portal-switcher flex items-center">
            <Link 
              to="/shop" 
              className={`portal-tab ${isB2C || (!isB2B && !isB2C) ? 'active' : ''}`}
            >
              <ShoppingCart size={13} />
              <span>B2C Retail Fashion</span>
              <span className="portal-pill-badge">Bstar Garments • Cards</span>
            </Link>
            <div className="portal-divider"></div>
            <Link 
              to="/fabrics" 
              className={`portal-tab ${isB2B ? 'active' : ''}`}
            >
              <Building2 size={13} />
              <span>B2B Wholesale & OEM</span>
              <span className="portal-pill-badge b2b">Wholesale Quote</span>
            </Link>
          </div>

          {/* Currency Dropdown Selector */}
          <div className="currency-selector-wrapper" ref={currencyRef}>
            <button 
              type="button"
              className="currency-trigger-btn"
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              aria-label="Select Currency"
            >
              <Globe size={13} />
              <span className="currency-flag">{currency.flag}</span>
              <span className="currency-code">{currency.code}</span>
              <span className="currency-symbol">({currency.symbol})</span>
              <ChevronDown size={12} className={`currency-chevron ${currencyDropdownOpen ? 'open' : ''}`} />
            </button>

            {currencyDropdownOpen && (
              <div className="currency-dropdown-menu">
                <div className="currency-dropdown-header">
                  <span>Select Currency</span>
                  <span className="currency-default-hint">Default: AED (B2C) / USD (B2B)</span>
                </div>
                <div className="currency-dropdown-list">
                  {Object.values(CURRENCIES).map((curr) => (
                    <button
                      key={curr.code}
                      className={`currency-option-item ${currentCurrencyCode === curr.code ? 'active' : ''}`}
                      onClick={() => {
                        setCurrency(curr.code);
                        setCurrencyDropdownOpen(false);
                      }}
                    >
                      <span className="curr-flag">{curr.flag}</span>
                      <span className="curr-code">{curr.code}</span>
                      <span className="curr-name">{curr.name}</span>
                      <span className="curr-symbol-badge">{curr.symbol}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
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
              <span>Shop Bstar Garments</span>
              <span className="nav-tag-b2c">B2C</span>
            </Link>

            <div className="nav-vertical-sep desktop-only"></div>

            <div className="mobile-section-title">B2B Wholesale & Manufacturing</div>
            <Link to="/fabrics" className={`nav-link ${isActive('/fabrics') ? 'nav-active' : ''}`} onClick={() => setMobileOpen(false)}>
              <span>Wholesale Fabrics & Garments</span>
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
              <Link to="/rfq" className="nav-link" onClick={() => setMobileOpen(false)}>
                B2B Quote Cart {rfqCount > 0 && `(${rfqCount})`}
              </Link>
              <Link to="/account" className="nav-link" onClick={() => setMobileOpen(false)}>
                B2B Wholesale Portal
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

            {/* B2B Quote Cart / RFQ Basket */}
            <Link 
              to="/rfq" 
              className="b2b-quote-cart-btn" 
              title="B2B Quote Basket - Request consolidated quote for multiple items"
            >
              <div className="cart-icon-wrapper">
                <FileText size={17} />
                {rfqCount > 0 && <span className="rfq-badge">{rfqCount}</span>}
              </div>
              <div className="cart-btn-labels desktop-only">
                <span className="cart-label-main">Quote Cart</span>
                <span className="cart-label-sub b2b-sub">B2B • RFQ</span>
              </div>
            </Link>

            {/* B2C Retail Cart with clear label and card payment indicator */}
            <Link to="/cart" className="b2c-cart-btn" title="B2C Retail Shopping Cart (Cards & Immediate Checkout)">
              <div className="cart-icon-wrapper">
                <ShoppingBag size={18} />
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </div>
              <div className="cart-btn-labels desktop-only">
                <span className="cart-label-main">Retail Cart</span>
                <span className="cart-label-sub">Bstar • Cards</span>
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
          <p className="footer-desc">Bafadal Textile Trading LLC — Dubai, United Arab Emirates.</p>
          <p className="footer-desc mt-sm">Commercial textiles, wholesale fabric rolls, OEM garments, and Bstar consumer apparel. All commercial invoicing complies with UAE Federal Tax Authority (FTA) 5% VAT regulations.</p>
        </div>
        <div>
          <h4 className="footer-subtitle flex items-center gap-xs">
            <Building2 size={15} color="var(--color-accent)" /> B2B Wholesale & OEM
          </h4>
          <ul className="footer-links">
            <li><Link to="/fabrics">Fabric Trading (Bulk Rolls / MOQ)</Link></li>
            <li><Link to="/fabrics?tab=garments">Bstar Wholesale Garments</Link></li>
            <li><Link to="/rfq">Request Commercial RFQ Quote</Link></li>
            <li><Link to="/rfq?type=sample">Fabric Swatch Sample Kits</Link></li>
            <li><Link to="/account">B2B Proforma & Trade Portal</Link></li>
            <li><Link to="/dashboard">Operations ERP Dashboard</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="footer-subtitle flex items-center gap-xs">
            <ShoppingCart size={15} color="var(--color-accent)" /> B2C Retail Fashion
          </h4>
          <ul className="footer-links">
            <li><Link to="/shop">Bstar Garments Collection</Link></li>
            <li><Link to="/shop?category=Men">Men's Retail Fashion</Link></li>
            <li><Link to="/shop?category=Women">Women's Collection</Link></li>
            <li><Link to="/cart">Retail Shopping Cart</Link></li>
            <li><Link to="/checkout">Fast Card Checkout (AED / Multi-Currency)</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="footer-subtitle">Trade & Tax Policies</h4>
          <ul className="footer-links">
            <li><a href="#">UAE VAT (5%) Commercial Terms</a></li>
            <li><a href="#">FTA Tax Registration (TRN) Compliance</a></li>
            <li><a href="#">Jebel Ali Port (FOB / CIF Shipping)</a></li>
            <li><a href="#">Consumer 7-Day UAE Returns</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom container">
        <p>© 2026 Bafadal Textile Trading LLC. Dubai, UAE. All rights reserved.</p>
        <div className="footer-badges flex items-center gap-sm">
          <span className="demo-notice">🏢 B2B: Quote-Based Proforma Invoicing & 5% UAE VAT (No card charge)</span>
          <span className="demo-notice">🛍️ B2C: Bstar Ready-Made Retail • Instant Card Checkout</span>
        </div>
      </div>
    </footer>
  );
};
