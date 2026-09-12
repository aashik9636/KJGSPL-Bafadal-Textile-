import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CheckCircle, Lock, CreditCard, Smartphone, Banknote, ShieldCheck, Building2, ArrowLeft } from 'lucide-react';
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
    paymentMethod: 'card',
    cardNumber: '',
    cardHolder: '',
    cardExpiry: '',
    cardCvv: '',
    upiId: ''
  });

  const [validationError, setValidationError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (validationError) setValidationError('');
  };

  const handleContinueToPayment = (e) => {
    e?.preventDefault();
    if (!formData.fullName.trim()) {
      setValidationError('Please enter your full name');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setValidationError('Please enter a valid email address');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      setValidationError('Please enter a valid mobile number');
      return;
    }
    if (!formData.address.trim()) {
      setValidationError('Please enter your delivery street address');
      return;
    }
    if (!formData.city.trim()) {
      setValidationError('Please enter your city');
      return;
    }
    if (!formData.pincode.trim()) {
      setValidationError('Please enter your postal pincode');
      return;
    }
    setValidationError('');
    setStep(2);
  };

  const handleContinueToReview = (e) => {
    e?.preventDefault();
    if (formData.paymentMethod === 'card') {
      if (formData.cardNumber.trim() && formData.cardNumber.replace(/\s/g, '').length < 12) {
        setValidationError('Please enter a valid 16-digit card number');
        return;
      }
    } else if (formData.paymentMethod === 'upi') {
      if (!formData.upiId.trim() || !formData.upiId.includes('@')) {
        setValidationError('Please enter a valid UPI ID (e.g. mobile@upi or name@okaxis)');
        return;
      }
    }
    setValidationError('');
    setStep(3);
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
      <div className="checkout-success container section">
        <div className="success-icon">
          <CheckCircle size={64} color="#10b981" />
        </div>
        <h2>B2C Retail Order Placed Successfully!</h2>
        <p className="text-light">
          Thank you for shopping with BSTAAR Garments. Your retail order payment has been confirmed.
        </p>
        <div className="order-details-box card" style={{ maxWidth: '480px', margin: '1.5rem auto', padding: '1.5rem', textAlign: 'left', background: '#f8fafc' }}>
          <p className="order-id"><strong>Order ID:</strong> #BSTAAR-{Math.floor(Math.random() * 90000) + 10000}</p>
          <p style={{ fontSize: '0.9rem', color: '#475569', marginTop: '4px' }}>
            <strong>Payment Method:</strong> {formData.paymentMethod === 'card' ? 'Credit/Debit Card (Paid)' : formData.paymentMethod === 'upi' ? 'UPI (Paid)' : 'Cash on Delivery (Pending)'}
          </p>
          <p style={{ fontSize: '0.9rem', color: '#475569', marginTop: '4px' }}>
            <strong>Delivery To:</strong> {formData.fullName || 'Customer'}, {formData.city || 'Mumbai'}
          </p>
        </div>
        <button className="btn btn-primary mt-md" onClick={() => navigate('/shop')}>Continue Shopping Garments</button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="checkout-success container section">
        <h2>Your Retail Cart is Empty</h2>
        <p className="text-light mt-sm">Add items from the B2C fashion collection to proceed to checkout.</p>
        <button className="btn btn-primary mt-lg" onClick={() => navigate('/shop')}>Shop Garments</button>
      </div>
    );
  }

  return (
    <div className="checkout-page container section">
      <div className="checkout-header-wrapper">
        <div className="flex items-center gap-xs mb-xs">
          <span className="checkout-channel-pill">B2C Retail Fashion Checkout</span>
          <span className="checkout-channel-sub">Secure Card & UPI Gateway</span>
        </div>
        <h1 className="checkout-title">Secure Checkout</h1>
      </div>
      
      {/* Steps Indicator */}
      <div className="checkout-steps">
        <div className={`step ${step >= 1 ? 'active' : ''}`}>
          <span className="step-num">1</span> Delivery Details
        </div>
        <div className="step-line"></div>
        <div className={`step ${step >= 2 ? 'active' : ''}`}>
          <span className="step-num">2</span> Card & Payment
        </div>
        <div className="step-line"></div>
        <div className={`step ${step >= 3 ? 'active' : ''}`}>
          <span className="step-num">3</span> Confirm & Pay
        </div>
      </div>

      <div className="checkout-layout">
        <div className="checkout-form-section">
          {step === 1 && (
            <div className="checkout-card">
              <h3>1. Consumer Shipping Address</h3>
              <p className="form-subtitle">Where should we deliver your garments?</p>
              <div className="form-grid">
                <div className="form-group full">
                  <label>Full Name *</label>
                  <input type="text" name="fullName" placeholder="e.g. Rahul Sharma" value={formData.fullName} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Email *</label>
                  <input type="email" name="email" placeholder="rahul@example.com" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Mobile Number *</label>
                  <input type="tel" name="phone" placeholder="+91 98765 43210" value={formData.phone} onChange={handleChange} required />
                </div>
                <div className="form-group full">
                  <label>Street Address *</label>
                  <input type="text" name="address" placeholder="Flat / House No., Street, Landmark" value={formData.address} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>City *</label>
                  <input type="text" name="city" placeholder="Mumbai" value={formData.city} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>State *</label>
                  <input type="text" name="state" placeholder="Maharashtra" value={formData.state} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Pincode *</label>
                  <input type="text" name="pincode" placeholder="400001" value={formData.pincode} onChange={handleChange} required />
                </div>
              </div>

              {validationError && (
                <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '10px 14px', borderRadius: '8px', fontSize: '0.85rem', marginTop: '1rem', border: '1px solid #fca5a5' }}>
                  ⚠️ {validationError}
                </div>
              )}

              <button className="btn btn-primary mt-lg" style={{ width: '100%', padding: '14px' }} onClick={handleContinueToPayment}>
                Proceed to Payment Method
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="checkout-card">
              <h3>2. Select Payment Method</h3>
              <p className="form-subtitle">Choose your preferred B2C payment channel</p>
              
              <div className="payment-options">
                {/* Credit / Debit Card Option */}
                <label className={`payment-option ${formData.paymentMethod === 'card' ? 'selected' : ''}`}>
                  <input type="radio" name="paymentMethod" value="card" checked={formData.paymentMethod === 'card'} onChange={handleChange} />
                  <div className="payment-option-body">
                    <div className="flex items-center gap-xs">
                      <CreditCard size={18} color="#2563eb" />
                      <strong>Credit / Debit Card</strong>
                    </div>
                    <p>Visa, Mastercard, RuPay, American Express</p>
                  </div>
                </label>

                {formData.paymentMethod === 'card' && (
                  <div className="card-input-box">
                    <div className="form-group mb-sm">
                      <label>Card Number</label>
                      <input 
                        type="text" 
                        name="cardNumber" 
                        placeholder="4532 •••• •••• 8901" 
                        maxLength={19}
                        value={formData.cardNumber} 
                        onChange={handleChange} 
                      />
                    </div>
                    <div className="form-group mb-sm">
                      <label>Name on Card</label>
                      <input 
                        type="text" 
                        name="cardHolder" 
                        placeholder="e.g. RAHUL SHARMA" 
                        value={formData.cardHolder} 
                        onChange={handleChange} 
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-md">
                      <div className="form-group">
                        <label>Expiry Date</label>
                        <input 
                          type="text" 
                          name="cardExpiry" 
                          placeholder="MM/YY" 
                          maxLength={5}
                          value={formData.cardExpiry} 
                          onChange={handleChange} 
                        />
                      </div>
                      <div className="form-group">
                        <label>CVV / CVC</label>
                        <input 
                          type="password" 
                          name="cardCvv" 
                          placeholder="•••" 
                          maxLength={4}
                          value={formData.cardCvv} 
                          onChange={handleChange} 
                        />
                      </div>
                    </div>
                    <p className="card-security-badge">
                      <ShieldCheck size={14} color="#059669" />
                      <span>Encrypted with bank-grade 256-bit SSL protection</span>
                    </p>
                  </div>
                )}

                {/* UPI Option */}
                <label className={`payment-option ${formData.paymentMethod === 'upi' ? 'selected' : ''}`}>
                  <input type="radio" name="paymentMethod" value="upi" checked={formData.paymentMethod === 'upi'} onChange={handleChange} />
                  <div className="payment-option-body">
                    <div className="flex items-center gap-xs">
                      <Smartphone size={18} color="#7c3aed" />
                      <strong>Instant UPI</strong>
                    </div>
                    <p>Google Pay, PhonePe, Paytm, BHIM</p>
                  </div>
                </label>

                {formData.paymentMethod === 'upi' && (
                  <div className="card-input-box">
                    <label>Enter UPI ID / VPA</label>
                    <input 
                      type="text" 
                      name="upiId" 
                      placeholder="username@okhdfcbank" 
                      value={formData.upiId} 
                      onChange={handleChange} 
                    />
                  </div>
                )}

                {/* Cash on Delivery Option */}
                <label className={`payment-option ${formData.paymentMethod === 'cod' ? 'selected' : ''}`}>
                  <input type="radio" name="paymentMethod" value="cod" checked={formData.paymentMethod === 'cod'} onChange={handleChange} />
                  <div className="payment-option-body">
                    <div className="flex items-center gap-xs">
                      <Banknote size={18} color="#059669" />
                      <strong>Cash on Delivery (COD)</strong>
                    </div>
                    <p>Pay cash upon delivery at your doorstep</p>
                  </div>
                </label>
              </div>

              {/* B2B Commercial Invoicing Notice */}
              <div className="checkout-b2b-terms-notice">
                <Building2 size={16} color="#1d4ed8" />
                <span>
                  <strong>Need Corporate GST Invoicing or Net-30 Terms?</strong> B2B commercial fabric roll buyers are billed via Proforma Invoice. Please submit an RFQ in the <Link to="/account">B2B Portal</Link>.
                </span>
              </div>

              {validationError && (
                <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '10px 14px', borderRadius: '8px', fontSize: '0.85rem', marginTop: '1rem', border: '1px solid #fca5a5' }}>
                  ⚠️ {validationError}
                </div>
              )}

              <div className="flex gap-md mt-lg">
                <button className="btn btn-outline" style={{ flex: 1, padding: '14px' }} onClick={() => { setValidationError(''); setStep(1); }}>Back</button>
                <button className="btn btn-primary" style={{ flex: 2, padding: '14px' }} onClick={handleContinueToReview}>Review & Confirm</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="checkout-card">
              <h3>3. Review & Authorize Payment</h3>
              
              <div className="review-section">
                <h4>Shipping Address</h4>
                <p><strong>{formData.fullName || 'Rahul Sharma'}</strong></p>
                <p className="text-light">{formData.address || '123 Marine Drive'}, {formData.city || 'Mumbai'}, {formData.state || 'Maharashtra'} - {formData.pincode || '400001'}</p>
                <p className="text-light">Phone: {formData.phone || '+91 98765 43210'}</p>
              </div>

              <div className="review-section">
                <h4>Payment Authorization</h4>
                <p>
                  <strong>Method:</strong> {formData.paymentMethod === 'card' ? 'Credit / Debit Card' : formData.paymentMethod === 'upi' ? 'UPI' : 'Cash on Delivery'}
                </p>
                {formData.paymentMethod === 'card' && (
                  <p className="text-light">Card ending with: {formData.cardNumber ? formData.cardNumber.slice(-4) : '8901'}</p>
                )}
              </div>

              <div className="review-section">
                <h4>Garment Items ({cart.length})</h4>
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
                  <Lock size={16} /> Pay ₹{grandTotal.toLocaleString()} Now
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="checkout-summary">
          <div className="checkout-summary-card">
            <h3>Retail Order Summary</h3>
            {cart.map((item, i) => (
              <div key={i} className="checkout-summary-item">
                <span>{item.name} ({item.selectedSize}) × {item.quantity}</span>
                <span>₹{(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
            <div className="summary-row"><span>Retail Subtotal</span><span>₹{cartTotal.toLocaleString()}</span></div>
            <div className="summary-row"><span>Shipping</span><span>{shipping === 0 ? 'Free' : '₹149'}</span></div>
            <div className="summary-row"><span>GST (18%)</span><span>₹{tax.toLocaleString()}</span></div>
            <div className="summary-total"><span>Total Amount</span><span>₹{grandTotal.toLocaleString()}</span></div>

            <div className="checkout-secure-badge">
              <ShieldCheck size={18} color="#10b981" />
              <div>
                <strong>Guaranteed Safe Checkout</strong>
                <p>256-bit encrypted consumer transaction</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
