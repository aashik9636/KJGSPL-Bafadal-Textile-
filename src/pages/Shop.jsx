import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { b2cProducts } from '../data/mockData';
import { Heart, Building2, ShoppingBag } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import gsap from 'gsap';
import './Shop.css';

const Shop = () => {
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [priceSort, setPriceSort] = useState('default');
  const containerRef = useRef(null);
  const { formatPrice, currency } = useCurrency();
  
  const categories = ['All', 'Men', 'Women', 'Kids'];
  const types = ['All', 'T-Shirts', 'Shirts', 'Hoodies', 'Bottoms'];
  
  let filteredProducts = [...b2cProducts];
  
  if (categoryFilter !== 'All') {
    filteredProducts = filteredProducts.filter(p => p.category === categoryFilter);
  }
  
  if (typeFilter !== 'All') {
    filteredProducts = filteredProducts.filter(p => p.type === typeFilter);
  }

  if (priceSort === 'low-high') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (priceSort === 'high-low') {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" }
      );
    }
  }, [categoryFilter, typeFilter, priceSort]);

  return (
    <div className="shop-page">
      {/* Shop Header */}
      <div className="shop-hero">
        <div className="container">
          <div className="shop-b2c-pill">
            <ShoppingBag size={14} />
            <span>B2C Retail Store • Amazon / Flipkart Style Direct Shopping</span>
          </div>
          <h1>Bstar Garments Collection</h1>
          <p>Premium ready-made fashion apparel crafted by Bafadal • Standard retail pricing in {currency.code} • Instant Card & COD Checkout</p>
          
          <div className="shop-b2b-helper-banner">
            <Building2 size={16} color="#1d4ed8" />
            <span>Are you a boutique, distributor, or brand needing wholesale volumes (100+ pcs or fabric rolls)?</span>
            <Link to="/fabrics" className="shop-b2b-link">Switch to B2B Wholesale Portal →</Link>
          </div>
        </div>
      </div>

      <div className="container shop-layout">
        {/* Sidebar Filters */}
        <aside className="shop-sidebar">
          <div className="sidebar-sticky">
            <div className="filter-group">
              <h3>Category</h3>
              <div className="filter-options">
                {categories.map(cat => (
                  <label key={cat} className={`filter-chip ${categoryFilter === cat ? 'active' : ''}`}>
                    <input 
                      type="radio" 
                      name="category" 
                      checked={categoryFilter === cat} 
                      onChange={() => setCategoryFilter(cat)} 
                      hidden
                    />
                    {cat}
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <h3>Product Type</h3>
              <div className="filter-options">
                {types.map(type => (
                  <label key={type} className={`filter-chip ${typeFilter === type ? 'active' : ''}`}>
                    <input 
                      type="radio" 
                      name="type" 
                      checked={typeFilter === type} 
                      onChange={() => setTypeFilter(type)} 
                      hidden
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <h3>Sort By</h3>
              <select 
                value={priceSort} 
                onChange={(e) => setPriceSort(e.target.value)}
                className="sort-select"
              >
                <option value="default">Featured</option>
                <option value="low-high">Price: Low → High</option>
                <option value="high-low">Price: High → Low</option>
              </select>
            </div>

            <button className="clear-filters-btn" onClick={() => { setCategoryFilter('All'); setTypeFilter('All'); setPriceSort('default'); }}>
              Clear All Filters
            </button>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="shop-content">
          <div className="shop-toolbar">
            <p className="results-count">{filteredProducts.length} Bstar products</p>
            <span className="currency-active-indicator">Showing prices in {currency.code} ({currency.symbol})</span>
          </div>

          <div className="product-grid" ref={containerRef}>
            {filteredProducts.map(product => (
              <Link to={`/shop/product/${product.id}`} key={product.id} className="product-card">
                <div className="product-card-image">
                  <img src={product.image} alt={product.name} />
                  <button className="product-card-wishlist" onClick={(e) => { e.preventDefault(); }}>
                    <Heart size={18} />
                  </button>
                  <span className="product-card-tag">{product.category}</span>
                  <span className="brand-tag-overlay">Bstar</span>
                </div>
                <div className="product-card-body">
                  <p className="product-card-type">{product.type}</p>
                  <h3 className="product-card-name">{product.name}</h3>
                  <div className="product-card-footer">
                    <p className="product-card-price">{formatPrice(product.price)}</p>
                    <div className="product-card-colors">
                      {product.colors.slice(0, 3).map(c => (
                        <span key={c} className="color-dot" title={c}></span>
                      ))}
                      {product.colors.length > 3 && <span className="color-more">+{product.colors.length - 3}</span>}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="empty-state">
              <h3>No products found</h3>
              <p>Try adjusting your filters to see more results.</p>
              <button className="btn btn-primary mt-lg" onClick={() => { setCategoryFilter('All'); setTypeFilter('All'); }}>
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
