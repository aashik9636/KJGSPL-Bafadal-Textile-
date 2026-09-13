import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, ShoppingBag, Minus, Plus, CreditCard, Building2, ShieldCheck, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import './Cart.css';

const Cart = () => {
  const { cart, cartTotal, removeFromCart, updateQuantity } = useCart();
  const { formatPrice, currency } = useCurrency();
  const navigate = useNavigate();

  const freeShippingThreshold = 150; // AED base
  const shippingFee = cartTotal >= freeShippingThreshold ? 0 : 20; // AED 20
  const vatTax = Math.round(cartTotal * 0.05); // 5% UAE VAT
  const grandTotal = cartTotal + shippingFee + vatTax;

  if (cart.length === 0) {
    return (
      <div className="cart-empty container section">
        <div className="cart-empty-icon">
          <ShoppingBag size={48} strokeWidth={1.5} />
        </div>
        <h2>Your Retail Cart is Empty</h2>
        <p className="text-light" style={{ maxWidth: '480px', margin: '0 auto' }}>
          Looks like you haven't added any ready-made Bstar garments to your retail shopping cart yet.
        </p>
        <div className="flex gap-md mt-lg" style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link to="/shop" className="btn btn-primary">Shop Bstar Garments</Link>
          <Link to="/fabrics" className="btn btn-outline">Explore B2B Wholesale Fabrics</Link>
        </div>

        <div className="cart-empty-b2b-note mt-xxl card" style={{ padding: '1.5rem', maxWidth: '540px', textAlign: 'left', background: '#f8fafc', border: '1px solid #bfdbfe' }}>
          <div className="flex items-center gap-xs mb-xs">
            <Building2 size={18} color="#1d4ed8" />
            <strong style={{ color: '#1e3a8a', fontSize: '0.9rem' }}>Are you a B2B / Wholesale Buyer?</strong>
          </div>
          <p style={{ fontSize: '0.82rem', color: '#475569', lineHeight: '1.45' }}>
            Wholesale fabric orders and OEM custom manufacturing require commercial quotations and proforma invoicing with UAE VAT (5%). Wholesale items cannot be added to this retail card cart.
          </p>
          <Link to="/rfq" style={{ display: 'inline-block', marginTop: '0.75rem', fontSize: '0.82rem', color: '#1d4ed8', fontWeight: 700 }}>
            Go to B2B Quote Request Portal →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page container section">
      {/* Channel Separation Banner */}
      <div className="cart-header">
        <div className="flex items-center gap-xs mb-xs">
          <span className="cart-channel-pill">B2C Retail Fashion Cart</span>
          <span className="cart-channel-sub">Cards & Apple Pay Accepted • Currency: {currency.code}</span>
        </div>
        <h1>Bstar Retail Shopping Cart</h1>
        <p className="text-light">
          {cart.length} item{cart.length !== 1 ? 's' : ''} ready for direct consumer delivery.
        </p>
      </div>

      {/* Notice for B2B Wholesale buyers */}
      <div className="cart-b2b-notice-bar">
        <Building2 size={18} className="b2b-notice-icon" />
        <div className="b2b-notice-content">
          <span>
            <strong>B2B Wholesale Notice:</strong> This cart is exclusively for individual Bstar consumer garment purchases with direct card checkout. 
            For wholesale fabric rolls (MOQ: 100+ KG) or bulk OEM production, use the B2B Quote Cart.
          </span>
          <Link to="/rfq" className="b2b-notice-link">
            Open Quote Cart <ArrowRight size={13} />
          </Link>
        </div>
      </div>
      
      <div className="cart-layout">
        {/* Cart Items */}
        <div className="cart-items">
          {cart.map((item, index) => (
            <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="cart-item">
              <Link to={`/shop/product/${item.id}`} className="cart-item-image">
                <img src={item.image} alt={item.name} />
              </Link>
              <div className="cart-item-details">
                <div className="cart-item-top">
                  <div>
                    <span className="cart-item-type-badge">Bstar • {item.category}</span>
                    <Link to={`/shop/product/${item.id}`}>
                      <h3 className="cart-item-name">{item.name}</h3>
                    </Link>
                    <p className="cart-item-variant">
                      Selected: <strong>{item.selectedColor}</strong> / Size <strong>{item.selectedSize}</strong>
                    </p>
                  </div>
                  <p className="cart-item-price">{formatPrice(item.price * item.quantity)}</p>
                </div>
                <div className="cart-item-bottom">
                  <div className="cart-qty-control">
                    <button onClick={() => updateQuantity(index, item.quantity - 1)} aria-label="Decrease quantity"><Minus size={14} /></button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(index, item.quantity + 1)} aria-label="Increase quantity"><Plus size={14} /></button>
                  </div>
                  <button className="cart-remove-btn" onClick={() => removeFromCart(index)}>
                    <Trash2 size={16} /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary with UAE VAT and Card Payment Focus */}
        <div className="cart-summary">
          <div className="cart-summary-card">
            <h3>Retail Order Summary</h3>
            
            <div className="summary-row">
              <span>Retail Subtotal</span>
              <span>{formatPrice(cartTotal)}</span>
            </div>
            <div className="summary-row">
              <span>UAE Delivery</span>
              <span>{shippingFee === 0 ? 'Free' : formatPrice(shippingFee)}</span>
            </div>
            <div className="summary-row">
              <span>UAE VAT (5%)</span>
              <span>{formatPrice(vatTax)}</span>
            </div>
            
            <div className="summary-total">
              <span>Total Payable</span>
              <span>{formatPrice(grandTotal)}</span>
            </div>

            {cartTotal < freeShippingThreshold && (
              <p className="free-shipping-note">Add {formatPrice(freeShippingThreshold - cartTotal)} more for free delivery in UAE!</p>
            )}

            <button className="btn-checkout" onClick={() => navigate('/checkout')}>
              <CreditCard size={18} style={{ marginRight: '8px' }} />
              Proceed to Card Checkout
            </button>

            {/* Accepted Cards Display */}
            <div className="accepted-cards-box">
              <span className="accepted-cards-title">Accepted Payment Methods:</span>
              <div className="accepted-cards-badges">
                <span className="card-chip">Visa / Mastercard</span>
                <span className="card-chip">Apple Pay</span>
                <span className="card-chip">American Express</span>
                <span className="card-chip">UAE COD</span>
              </div>
              <p className="payment-security-note">
                <ShieldCheck size={14} color="#10b981" /> 256-Bit Bank-Grade Secure Checkout
              </p>
            </div>

            <Link to="/shop" className="continue-shopping-link">
              <ArrowLeft size={16} /> Continue Shopping Bstar Garments
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
