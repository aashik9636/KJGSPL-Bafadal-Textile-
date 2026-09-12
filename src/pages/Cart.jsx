import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, ShoppingBag, Minus, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cart, cartTotal, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <div className="cart-empty-icon">
          <ShoppingBag size={48} strokeWidth={1.5} />
        </div>
        <h2>Your cart is empty</h2>
        <p className="text-light">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/shop" className="btn btn-primary mt-lg">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="cart-page container section">
      <div className="cart-header">
        <h1>Shopping Cart</h1>
        <p className="text-light">{cart.length} item{cart.length !== 1 ? 's' : ''} in your cart</p>
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
                    <Link to={`/shop/product/${item.id}`}>
                      <h3 className="cart-item-name">{item.name}</h3>
                    </Link>
                    <p className="cart-item-variant">
                      {item.selectedColor} / {item.selectedSize}
                    </p>
                  </div>
                  <p className="cart-item-price">₹{(item.price * item.quantity).toLocaleString()}</p>
                </div>
                <div className="cart-item-bottom">
                  <div className="cart-qty-control">
                    <button onClick={() => updateQuantity(index, item.quantity - 1)}><Minus size={14} /></button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(index, item.quantity + 1)}><Plus size={14} /></button>
                  </div>
                  <button className="cart-remove-btn" onClick={() => removeFromCart(index)}>
                    <Trash2 size={16} /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="cart-summary">
          <div className="cart-summary-card">
            <h3>Order Summary</h3>
            
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{cartTotal.toLocaleString()}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>{cartTotal >= 2000 ? 'Free' : '₹149'}</span>
            </div>
            <div className="summary-row">
              <span>Taxes</span>
              <span>₹{Math.round(cartTotal * 0.18).toLocaleString()}</span>
            </div>
            
            <div className="summary-total">
              <span>Total</span>
              <span>₹{(cartTotal + (cartTotal < 2000 ? 149 : 0) + Math.round(cartTotal * 0.18)).toLocaleString()}</span>
            </div>

            {cartTotal < 2000 && (
              <p className="free-shipping-note">Add ₹{(2000 - cartTotal).toLocaleString()} more for free shipping!</p>
            )}

            <button className="btn-checkout" onClick={() => navigate('/checkout')}>
              Proceed to Checkout
            </button>

            <Link to="/shop" className="continue-shopping-link">
              <ArrowLeft size={16} /> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
