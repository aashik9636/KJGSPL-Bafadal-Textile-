import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { b2cProducts } from '../data/mockData';
import { ArrowLeft, ShoppingBag, Heart, Share2, Star, Truck, RotateCcw, Shield, CreditCard, Building2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import gsap from 'gsap';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = b2cProducts.find(p => p.id === id);
  const pageRef = useRef(null);
  
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    if (pageRef.current) {
      gsap.fromTo(pageRef.current.querySelectorAll('.gsap-fade'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }
      );
    }
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="container section text-center" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h2>Product not found</h2>
        <Link to="/shop" className="btn btn-primary mt-lg">Back to Shop</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  // Get related products
  const relatedProducts = b2cProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="product-detail-page" ref={pageRef}>
      {/* Breadcrumb */}
      <div className="container gsap-fade" style={{ padding: '1.5rem 2rem' }}>
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/shop">B2C Retail</Link>
          <span>/</span>
          <Link to={`/shop?category=${product.category}`}>{product.category}</Link>
          <span>/</span>
          <span className="current">{product.name}</span>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="container pdp-grid gsap-fade">
        {/* Product Image */}
        <div className="pdp-image-section">
          <div className="pdp-image-container">
            <img src={product.image} alt={product.name} className="pdp-main-image" />
            <button 
              className={`pdp-wishlist-btn ${isWishlisted ? 'wishlisted' : ''}`}
              onClick={() => setIsWishlisted(!isWishlisted)}
            >
              <Heart size={20} fill={isWishlisted ? '#e53935' : 'none'} color={isWishlisted ? '#e53935' : '#666'} />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="pdp-info-section">
          <div className="pdp-header">
            <div className="flex items-center gap-xs mb-xs">
              <span className="pdp-channel-badge b2c">B2C Retail Exclusive</span>
            </div>
            <p className="pdp-category">{product.category} / {product.type}</p>
            <h1 className="pdp-title">{product.name}</h1>
            <div className="pdp-rating">
              {[1,2,3,4,5].map(i => (
                <Star key={i} size={16} fill={i <= 4 ? '#f59e0b' : 'none'} color="#f59e0b" />
              ))}
              <span className="pdp-rating-text">4.0 (128 reviews)</span>
            </div>
            <p className="pdp-price">₹{product.price.toLocaleString()}</p>
            <p className="pdp-tax-info">Inclusive of all taxes • Ready for immediate retail dispatch</p>
          </div>

          {/* Color Selector */}
          <div className="pdp-option-group">
            <h4 className="pdp-option-label">Color: <span>{selectedColor}</span></h4>
            <div className="pdp-options">
              {product.colors.map(color => (
                <button 
                  key={color}
                  className={`pdp-option-btn ${selectedColor === color ? 'selected' : ''}`}
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div className="pdp-option-group">
            <h4 className="pdp-option-label">Size: <span>{selectedSize}</span></h4>
            <div className="pdp-options">
              {product.sizes.map(size => (
                <button 
                  key={size}
                  className={`pdp-option-btn size-btn ${selectedSize === size ? 'selected' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="pdp-option-group">
            <h4 className="pdp-option-label">Retail Quantity</h4>
            <div className="pdp-quantity">
              <button className="qty-btn" onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
              <span className="qty-value">{quantity}</span>
              <button className="qty-btn" onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
          </div>

          {/* Add to Cart & Buy */}
          <div className="pdp-actions">
            <button 
              className={`btn-add-to-cart ${addedToCart ? 'added' : ''}`}
              onClick={handleAddToCart}
            >
              {addedToCart ? '✓ Added to Retail Cart!' : <><ShoppingBag size={20} /> Add to Cart</>}
            </button>
            <button className="btn-buy-now" onClick={() => { handleAddToCart(); navigate('/cart'); }}>
              Buy Now
            </button>
          </div>

          <p className="pdp-retail-payment-note">
            <CreditCard size={14} color="#059669" />
            <span><strong>Instant B2C Checkout:</strong> Credit/Debit Cards, UPI, NetBanking, and COD accepted.</span>
          </p>

          {/* B2B Wholesale Callout */}
          <div className="pdp-b2b-callout">
            <div className="pdp-b2b-header">
              <Building2 size={22} className="pdp-b2b-icon" />
              <div>
                <h4 className="pdp-b2b-title">Wholesale & OEM Custom Manufacturing</h4>
                <p className="pdp-b2b-desc">
                  Buying 100+ units for your brand or retail chain? Wholesale orders are not added to retail card checkout. We handle custom colors, labels, and commercial B2B invoicing.
                </p>
              </div>
            </div>
            <Link 
              to={`/rfq?type=oem&article=${encodeURIComponent(product.name)}`} 
              className="btn-b2b-quote"
            >
              Request Wholesale / OEM Quote (RFQ) →
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="pdp-trust-badges">
            <div className="trust-badge">
              <Truck size={18} />
              <span>Free retail shipping over ₹2,000</span>
            </div>
            <div className="trust-badge">
              <RotateCcw size={18} />
              <span>7-day easy consumer returns</span>
            </div>
            <div className="trust-badge">
              <Shield size={18} />
              <span>100% genuine Bafadal quality</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="container section gsap-fade">
          <h2 className="section-title" style={{ fontSize: '1.8rem' }}>You May Also Like</h2>
        <div className="product-grid">
            {relatedProducts.map(p => (
              <Link to={`/shop/product/${p.id}`} key={p.id} className="product-card">
                <div className="product-card-image">
                  <img src={p.image} alt={p.name} />
                  <span className="product-card-tag">{p.category}</span>
                </div>
                <div className="product-card-body">
                  <h3 className="product-card-name">{p.name}</h3>
                  <div className="product-card-footer">
                    <p className="product-card-price">₹{p.price.toLocaleString()}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
