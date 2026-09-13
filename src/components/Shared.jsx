import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, LayoutDashboard, Building2, Globe, ChevronDown, FileText, ArrowRight, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useCurrency, CURRENCIES } from '../context/CurrencyContext';
import { useRfq } from '../context/RfqContext';

export const Navbar = () => {
  const { cartCount, cartTotal } = useCart();
  const { rfqCount } = useRfq();
  const { currency, currentCurrencyCode, setCurrency, formatPrice } = useCurrency();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const currencyRef = useRef(null);
  const location = useLocation();

  const isHome = location.pathname === '/';
  
  const isB2B = location.pathname.startsWith('/b2b') ||
                location.pathname.startsWith('/fabrics') || 
                location.pathname.startsWith('/rfq') || 
                location.pathname.startsWith('/account') || 
                location.pathname.startsWith('/dashboard');

  const isB2C = location.pathname.startsWith('/b2c') ||
                location.pathname.startsWith('/shop') || 
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

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      
      {/* 1. TOP UTILITY BAR */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Left Channel Indicator */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            {isHome && (
              <span className="font-medium truncate">
                Bafadal Group — Dubai UAE (FTA TRN 100482910200003) • Textile Conglomerate
              </span>
            )}
            {isB2C && (
              <span className="font-medium truncate">
                <strong className="text-white">Bstar Fashion</strong> • Premium Ready-to-Wear • Standard Retail in {currency.code}
              </span>
            )}
            {isB2B && (
              <span className="font-medium truncate">
                <strong className="text-white">Bafadal Industrial & Wholesale</strong> • Direct Mill Rolls & OEM Garments • FOB Jebel Ali
              </span>
            )}
          </div>

          {/* Center Cross-Portal Links (B2C/B2B only) */}
          <div className="hidden md:flex items-center">
            {isB2C && (
              <Link 
                to="/fabrics" 
                className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-900/40 border border-blue-700/50 text-blue-300 hover:text-white hover:bg-blue-800/60 transition text-xs font-medium"
              >
                <Building2 size={12} />
                <span>Commercial / Factory Buyer? Switch to B2B Wholesale</span>
                <ArrowRight size={11} />
              </Link>
            )}
            {isB2B && (
              <Link 
                to="/shop" 
                className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-900/40 border border-amber-700/50 text-amber-300 hover:text-white hover:bg-amber-800/60 transition text-xs font-medium"
              >
                <ShoppingBag size={12} />
                <span>Looking for single garments? Visit Bstar Retail Store</span>
                <ArrowRight size={11} />
              </Link>
            )}
          </div>

          {/* Right: Currency Selector */}
          <div className="relative" ref={currencyRef}>
            <button 
              type="button"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-200 text-xs font-medium transition"
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              aria-label="Select Currency"
            >
              <Globe size={13} className="text-slate-400" />
              <span>{currency.flag}</span>
              <span className="font-bold">{currency.code}</span>
              <span className="text-slate-400">({currency.symbol})</span>
              <ChevronDown size={11} className={`transition-transform duration-200 ${currencyDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {currencyDropdownOpen && (
              <div className="absolute right-0 mt-1.5 w-64 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50">
                <div className="px-3 py-1.5 border-b border-slate-100 mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Select Currency</span>
                  <p className="text-[10px] text-slate-400">Default: AED (B2C) / USD (B2B)</p>
                </div>
                <div className="space-y-0.5">
                  {Object.values(CURRENCIES).map((curr) => (
                    <button
                      key={curr.code}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition ${
                        currentCurrencyCode === curr.code ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                      onClick={() => {
                        setCurrency(curr.code);
                        setCurrencyDropdownOpen(false);
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base">{curr.flag}</span>
                        <span className="font-bold text-slate-900">{curr.code}</span>
                        <span className="text-slate-500 text-[11px]">{curr.name}</span>
                      </div>
                      <span className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded text-[11px] font-mono">{curr.symbol}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* 2. MAIN NAVBAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Channel Badge with ample spacing */}
        <div className="flex items-center gap-3 shrink-0 mr-8">
          <Link to="/" className="flex items-center">
            <img 
              src="/texttile-removebg-preview.png" 
              alt="Bafadal Textile Trading" 
              className="h-10 object-contain hover:opacity-90 transition"
            />
          </Link>
          {isB2C && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              BSTAR RETAIL
            </span>
          )}
          {isB2B && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              B2B WHOLESALE
            </span>
          )}
        </div>

        {/* Navigation Links: Keeping header clean and uncluttered like B2C */}

        {/* Right Actions: STRICTLY SEPARATED BY CHANNEL */}
        <div className="flex items-center gap-3">
          
          {/* HOME MODE: 2 Clean Gateway Buttons (No other clutter!) */}
          {isHome && (
            <div className="flex items-center gap-3">
              <Link 
                to="/shop" 
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold transition shadow-sm"
              >
                <ShoppingBag size={14} />
                <span>Shop Bstar Retail</span>
              </Link>
              <Link 
                to="/fabrics" 
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-sm"
              >
                <Building2 size={14} />
                <span>B2B Wholesale Hub</span>
              </Link>
            </div>
          )}

          {/* B2C MODE: RETAIL CART ONLY */}
          {isB2C && (
            <div className="flex items-center gap-2">
              <Link 
                to="/cart" 
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold transition shadow-sm"
                title="Bstar Retail Shopping Cart"
              >
                <div className="relative flex items-center">
                  <ShoppingBag size={16} />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-amber-500 text-slate-900 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline">Retail Cart</span>
                {cartCount > 0 && (
                  <span className="hidden sm:inline text-slate-300">({cartCount})</span>
                )}
              </Link>

              {cartCount > 0 && (
                <Link 
                  to="/checkout" 
                  className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-sm"
                >
                  <span>Pay {formatPrice(cartTotal)}</span>
                  <ArrowRight size={13} />
                </Link>
              )}
            </div>
          )}

          {/* B2B MODE: TRADE PORTAL & QUOTE CART */}
          {isB2B && (
            <div className="flex items-center gap-2.5">
              <Link 
                to="/account" 
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition border border-slate-200"
                title="Commercial Trade Account & Invoices"
              >
                <Building2 size={14} />
                <span>Trade Portal</span>
              </Link>

              {/* B2B Quote Cart */}
              <Link 
                to="/rfq" 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-sm"
                title="B2B Consolidated Quote Basket"
              >
                <div className="relative flex items-center">
                  <FileText size={15} />
                  {rfqCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-white text-blue-700 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                      {rfqCount}
                    </span>
                  )}
                </div>
                <span>Quote Cart</span>
                {rfqCount > 0 && (
                  <span className="text-blue-200 font-normal">({rfqCount})</span>
                )}
              </Link>
            </div>
          )}

          {/* Mobile Menu Button (Only for B2C/B2B channels) */}
          {(isB2C || isB2B) && (
            <button 
              type="button" 
              className="lg:hidden p-2 text-slate-700 hover:text-slate-900"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle Menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          )}
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          {isB2C && (
            <div className="flex flex-col space-y-2">
              <Link to="/shop" className="px-3 py-2 text-sm font-semibold text-slate-800 rounded-lg hover:bg-slate-50" onClick={() => setMobileOpen(false)}>Shop Bstar Fashion Catalog</Link>
              <Link to="/cart" className="px-3 py-2 text-sm font-bold text-slate-900 bg-slate-100 rounded-lg flex items-center justify-between" onClick={() => setMobileOpen(false)}>
                <span>Retail Cart</span>
                <span className="bg-amber-500 text-slate-950 text-xs px-2 py-0.5 rounded-full font-black">{cartCount} items</span>
              </Link>
              <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
                <Link to="/fabrics" className="px-3 py-2 text-sm font-medium text-blue-600" onClick={() => setMobileOpen(false)}>Switch to B2B Wholesale Hub →</Link>
              </div>
            </div>
          )}

          {isB2B && (
            <div className="flex flex-col space-y-2">
              <Link to="/fabrics" className="px-3 py-2 text-sm font-semibold text-slate-800 rounded-lg hover:bg-slate-50" onClick={() => setMobileOpen(false)}>Browse Wholesale Catalog</Link>
              <Link to="/account" className="px-3 py-2 text-sm font-semibold text-slate-800 rounded-lg hover:bg-slate-50" onClick={() => setMobileOpen(false)}>Trade Portal & Invoices</Link>
              <Link to="/rfq" className="px-3 py-2 text-sm font-bold text-blue-700 bg-blue-50 rounded-lg flex items-center justify-between" onClick={() => setMobileOpen(false)}>
                <span>Quote Cart</span>
                <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">{rfqCount} items</span>
              </Link>
              <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
                <Link to="/shop" className="px-3 py-2 text-sm font-medium text-amber-600" onClick={() => setMobileOpen(false)}>Switch to Bstar Retail →</Link>
              </div>
            </div>
          )}
        </div>
      )}

    </header>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Brand Info */}
          <div>
            <img 
              src="/texttile-removebg-preview.png" 
              alt="Bafadal Textile Trading" 
              className="h-10 object-contain brightness-0 invert mb-4" 
            />
            <p className="text-sm leading-relaxed text-slate-400 mb-3">
              Bafadal Textile Trading LLC — Dubai, United Arab Emirates.
            </p>
            <p className="text-xs leading-relaxed text-slate-500">
              Operating two dedicated commerce divisions: <strong>Bstar Consumer Fashion</strong> (Retail • AED • Card Checkout) and <strong>Bafadal Industrial & OEM</strong> (Commercial Rolls • RFQ • 5% UAE VAT • FTA TRN 100482910200003).
            </p>
          </div>

          {/* Col 2: B2B Wholesale */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Building2 size={15} className="text-blue-500" /> B2B Wholesale & OEM
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/fabrics" className="hover:text-white transition">Fabric Trading (Bulk Rolls / MOQ)</Link></li>
              <li><Link to="/fabrics?tab=garments" className="hover:text-white transition">Bstar Wholesale Garments</Link></li>
              <li><Link to="/rfq" className="hover:text-white transition">Request Commercial RFQ Quote</Link></li>
              <li><Link to="/rfq?type=sample" className="hover:text-white transition">Fabric Swatch Sample Kits</Link></li>
              <li><Link to="/account" className="hover:text-white transition">B2B Proforma & Trade Portal</Link></li>
              <li><Link to="/dashboard" className="hover:text-white transition">Operations ERP Dashboard</Link></li>
            </ul>
          </div>

          {/* Col 3: B2C Retail */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <ShoppingBag size={15} className="text-amber-500" /> B2C Retail Fashion
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/shop" className="hover:text-white transition">Bstar Garments Collection</Link></li>
              <li><Link to="/shop?category=Men" className="hover:text-white transition">Men's Retail Fashion</Link></li>
              <li><Link to="/shop?category=Women" className="hover:text-white transition">Women's Collection</Link></li>
              <li><Link to="/shop?category=Kids" className="hover:text-white transition">Kids & Teens Apparel</Link></li>
              <li><Link to="/cart" className="hover:text-white transition">Retail Shopping Cart</Link></li>
              <li><Link to="/checkout" className="hover:text-white transition">Fast Card Checkout (AED)</Link></li>
            </ul>
          </div>

          {/* Col 4: UAE Compliance */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              UAE Compliance & Trade
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-white transition">UAE VAT (5%) Commercial Terms</a></li>
              <li><a href="#" className="hover:text-white transition">FTA TRN 100482910200003 Compliance</a></li>
              <li><a href="#" className="hover:text-white transition">Jebel Ali Port (FOB / CIF Shipping)</a></li>
              <li><a href="#" className="hover:text-white transition">Consumer 7-Day UAE Returns</a></li>
              <li><a href="#" className="hover:text-white transition">OEKO-TEX & ISO 9001 Standards</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2026 Bafadal Textile Trading LLC. Dubai, UAE. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400">
              🏢 B2B: Quote-Based Proforma Invoicing & 5% UAE VAT
            </span>
            <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400">
              🛍️ B2C: Bstar Ready-Made Retail • Direct Card Checkout
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
