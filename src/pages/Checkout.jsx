import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CheckCircle, Lock } from 'lucide-react';
import './Checkout.css';

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'cod'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setOrderPlaced(true);
    clearCart();
  };

  const shipping = cartTotal >= 2000 ? 0 : 149;
  const tax = Math.round(cartTotal * 0.18);
  const grandTotal = cartTotal + shipping + tax;

  if (orderPlaced) {
    return (
      <div className="checkout-success">
        <div className="success-icon">
          <CheckCircle size={64} color="#2e7d32" />
        </div>
        <h2>Order Placed Successfully!</h2>
        <p className="text-light">Thank you for your purchase. This is a demo — no actual order has been processed.</p>
        <p className="order-id">Order ID: #BSTAAR-{Math.floor(Math.random() * 90000) + 10000}</p>
        <button className="btn btn-primary mt-lg" onClick={() => navigate('/shop')}>Continue Shopping</button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="checkout-success">
        <h2>Your cart is empty</h2>
        <button className="btn btn-primary mt-lg" onClick={() => navigate('/shop')}>Shop Now</button>
      </div>
    );
  }

  return (
    <div className="checkout-page container section">
      <h1 className="checkout-title">Checkout</h1>
      
      {/* Steps Indicator */}
      <div className="checkout-steps">
        <div className={`step ${step >= 1 ? 'active' : ''}`}>
          <span className="step-num">1</span> Shipping
        </div>
        <div className="step-line"></div>
        <div className={`step ${step >= 2 ? 'active' : ''}`}>
          <span className="step-num">2</span> Payment
        </div>
        <div className="step-line"></div>
        <div className={`step ${step >= 3 ? 'active' : ''}`}>
          <span className="step-num">3</span> Confirm
        </div>
      </div>

      <div className="checkout-layout">
        <div className="checkout-form-section">
          {step === 1 && (
            <div className="checkout-card">
              <h3>Shipping Address</h3>
              <div className="form-grid">
                <div className="form-group full">
                  <label>Full Name *</label>
                  <input type="text" name="fullName" placeholder="John Doe" value={formData.fullName} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Email *</label>
                  <input type="email" name="email" placeholder="john@example.com" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Phone *</label>
                  <input type="tel" name="phone" placeholder="+91 98765 43210" value={formData.phone} onChange={handleChange} required />
                </div>
                <div className="form-group full">
                  <label>Address *</label>
                  <input type="text" name="address" placeholder="123 Street, Landmark" value={formData.address} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>City *</label>
                  <input type="text" name="city" placeholder="Mumbai" value={formData.city} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>State</label>
                  <input type="text" name="state" placeholder="Maharashtra" value={formData.state} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Pincode *</label>
                  <input type="text" name="pincode" placeholder="400001" value={formData.pincode} onChange={handleChange} required />
                </div>
              </div>
              <button className="btn btn-primary mt-lg" style={{ width: '100%', padding: '14px' }} onClick={() => setStep(2)}>Continue to Payment</button>
            </div>
          )}

          {step === 2 && (
            <div className="checkout-card">
              <h3>Payment Method</h3>
              <div className="payment-options">
                <label className={`payment-option ${formData.paymentMethod === 'cod' ? 'selected' : ''}`}>
                  <input type="radio" name="paymentMethod" value="cod" checked={formData.paymentMethod === 'cod'} onChange={handleChange} />
                  <div>
                    <strong>Cash on Delivery</strong>
                    <p>Pay when your order arrives</p>
                  </div>
                </label>
                <label className={`payment-option ${formData.paymentMethod === 'upi' ? 'selected' : ''}`}>
                  <input type="radio" name="paymentMethod" value="upi" checked={formData.paymentMethod === 'upi'} onChange={handleChange} />
                  <div>
                    <strong>UPI</strong>
                    <p>Google Pay, PhonePe, Paytm</p>
                  </div>
                </label>
                <label className={`payment-option ${formData.paymentMethod === 'card' ? 'selected' : ''}`}>
                  <input type="radio" name="paymentMethod" value="card" checked={formData.paymentMethod === 'card'} onChange={handleChange} />
                  <div>
                    <strong>Credit / Debit Card</strong>
                    <p>Visa, Mastercard, RuPay</p>
                  </div>
                </label>
              </div>
              <div className="flex gap-md mt-lg">
                <button className="btn btn-outline" style={{ flex: 1, padding: '14px' }} onClick={() => setStep(1)}>Back</button>
                <button className="btn btn-primary" style={{ flex: 2, padding: '14px' }} onClick={() => setStep(3)}>Review Order</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="checkout-card">
              <h3>Review & Confirm</h3>
              
              <div className="review-section">
                <h4>Shipping to</h4>
                <p>{formData.fullName || 'John Doe'}</p>
                <p className="text-light">{formData.address || '123 Street'}, {formData.city || 'Mumbai'}, {formData.state || 'MH'} {formData.pincode || '400001'}</p>
              </div>

              <div className="review-section">
                <h4>Payment</h4>
                <p>{formData.paymentMethod === 'cod' ? 'Cash on Delivery' : formData.paymentMethod === 'upi' ? 'UPI' : 'Credit / Debit Card'}</p>
              </div>

              <div className="review-section">
                <h4>Items ({cart.length})</h4>
                {cart.map((item, index) => (
                  <div key={index} className="review-item">
                    <img src={item.image} alt={item.name} />
                    <div>
                      <p className="review-item-name">{item.name}</p>
                      <p className="text-light">{item.selectedColor} / {item.selectedSize} × {item.quantity}</p>
                    </div>
                    <p className="review-item-price">₹{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-md mt-lg">
                <button className="btn btn-outline" style={{ flex: 1, padding: '14px' }} onClick={() => setStep(2)}>Back</button>
                <button className="btn-place-order" onClick={handlePlaceOrder}>
                  <Lock size={16} /> Place Order — ₹{grandTotal.toLocaleString()}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="checkout-summary">
          <div className="checkout-summary-card">
            <h3>Order Summary</h3>
            {cart.map((item, i) => (
              <div key={i} className="checkout-summary-item">
                <span>{item.name} × {item.quantity}</span>
                <span>₹{(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
            <div className="summary-row"><span>Subtotal</span><span>₹{cartTotal.toLocaleString()}</span></div>
            <div className="summary-row"><span>Shipping</span><span>{shipping === 0 ? 'Free' : '₹149'}</span></div>
            <div className="summary-row"><span>Tax (18%)</span><span>₹{tax.toLocaleString()}</span></div>
            <div className="summary-total"><span>Total</span><span>₹{grandTotal.toLocaleString()}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
