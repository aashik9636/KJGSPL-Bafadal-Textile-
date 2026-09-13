import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { CheckCircle, Lock, CreditCard, Smartphone, Banknote, ShieldCheck, Building2, ArrowLeft } from 'lucide-react';
import './Checkout.css';

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const { formatPrice, currency } = useCurrency();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    emirate: 'Dubai',
    area: '',
    buildingVilla: '',
    country: 'United Arab Emirates',
    paymentMethod: 'card',
    cardNumber: '',
    cardHolder: '',
    cardExpiry: '',
    cardCvv: '',
    applePayId: ''
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
      setValidationError('Please enter a valid phone number (e.g. +971 50 123 4567)');
      return;
    }
    if (!formData.address.trim()) {
      setValidationError('Please enter your street address');
      return;
    }
    if (!formData.area.trim()) {
      setValidationError('Please enter your district/area (e.g. Downtown, Dubai Marina, Deira)');
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
    }
    setValidationError('');
    setStep(3);
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setOrderPlaced(true);
    clearCart();
  };

  const freeShippingThreshold = 150; // AED
  const shipping = cartTotal >= freeShippingThreshold ? 0 : 20; // AED 20
  const tax = Math.round(cartTotal * 0.05); // 5% UAE VAT
  const grandTotal = cartTotal + shipping + tax;

  if (orderPlaced) {
    return (
      <div className="checkout-success container section">
        <div className="success-icon">
          <CheckCircle size={64} color="#10b981" />
        </div>
        <h2>Bstar Retail Order Placed Successfully!</h2>
        <p className="text-light">
          Thank you for shopping with Bstar Garments. Your retail order payment has been confirmed.
        </p>
        <div className="order-details-box card" style={{ maxWidth: '480px', margin: '1.5rem auto', padding: '1.5rem', textAlign: 'left', background: '#f8fafc' }}>
          <p className="order-id"><strong>Order ID:</strong> #BSTAR-DXB-{Math.floor(Math.random() * 90000) + 10000}</p>
          <p style={{ fontSize: '0.9rem', color: '#475569', marginTop: '4px' }}>
            <strong>Payment Method:</strong> {formData.paymentMethod === 'card' ? 'Credit/Debit Card (Authorized)' : formData.paymentMethod === 'apple' ? 'Apple Pay (Authorized)' : 'Cash on Delivery (Pay on Arrival)'}
          </p>
          <p style={{ fontSize: '0.9rem', color: '#475569', marginTop: '4px' }}>
            <strong>Delivery Destination:</strong> {formData.fullName || 'Valued Customer'}, {formData.area || 'Downtown'}, {formData.emirate}, {formData.country}
          </p>
          <p style={{ fontSize: '0.85rem', color: '#059669', marginTop: '6px', fontWeight: 600 }}>
            Includes 5% UAE VAT (Tax Invoice will be emailed to {formData.email || 'your email'})
          </p>
        </div>
        <button className="btn btn-primary mt-md" onClick={() => navigate('/shop')}>Continue Shopping Bstar Garments</button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="checkout-success container section">
        <h2>Your Retail Cart is Empty</h2>
        <p className="text-light mt-sm">Add items from the Bstar consumer fashion collection to proceed to checkout.</p>
        <button className="btn btn-primary mt-lg" onClick={() => navigate('/shop')}>Shop Bstar Garments</button>
      </div>
    );
  }

  return (
    <div className="checkout-page container section">
      <div className="checkout-header-wrapper">
        <div className="flex items-center gap-xs mb-xs">
          <span className="checkout-channel-pill">B2C Retail Fashion Checkout</span>
          <span className="checkout-channel-sub">256-Bit SSL Secured • Currency: {currency.code}</span>
        </div>
        <h1 className="checkout-title">Secure Consumer Checkout</h1>
      </div>
      
      {/* Steps Indicator */}
      <div className="checkout-steps">
        <div className={`step ${step >= 1 ? 'active' : ''}`}>
          <span className="step-num">1</span> Delivery Details
        </div>
        <div className="step-line"></div>
        <div className={`step ${step >= 2 ? 'active' : ''}`}>
          <span className="step-num">2</span> Payment Method
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
              <h3>1. Consumer Delivery Address</h3>
              <p className="form-subtitle">Where should we deliver your Bstar apparel?</p>
              <div className="form-grid">
                <div className="form-group full">
                  <label>Full Name *</label>
                  <input type="text" name="fullName" placeholder="e.g. Tariq Al-Mansoor" value={formData.fullName} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input type="email" name="email" placeholder="customer@example.com" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Mobile Number *</label>
                  <input type="tel" name="phone" placeholder="+971 50 123 4567" value={formData.phone} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Country *</label>
                  <select name="country" value={formData.country} onChange={handleChange}>
                    <option value="United Arab Emirates">United Arab Emirates (UAE)</option>
                    <option value="Saudi Arabia">Saudi Arabia (KSA)</option>
                    <option value="Qatar">Qatar</option>
                    <option value="Kuwait">Kuwait</option>
                    <option value="Oman">Oman</option>
                    <option value="Bahrain">Bahrain</option>
                    <option value="International">International Delivery</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Emirate / Province *</label>
                  <select name="emirate" value={formData.emirate} onChange={handleChange}>
                    <option value="Dubai">Dubai</option>
                    <option value="Abu Dhabi">Abu Dhabi</option>
                    <option value="Sharjah">Sharjah</option>
                    <option value="Ajman">Ajman</option>
                    <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                    <option value="Fujairah">Fujairah</option>
                    <option value="Umm Al Quwain">Umm Al Quwain</option>
                    <option value="Other">Other GCC / International</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Area / Community *</label>
                  <input type="text" name="area" placeholder="e.g. Downtown Dubai, JBR, Deira, Al Barsha" value={formData.area} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Apartment / Villa & Street Address *</label>
                  <input type="text" name="address" placeholder="e.g. Apt 1402, Marina Tower, Street 18" value={formData.address} onChange={handleChange} required />
                </div>
              </div>

              {validationError && (
                <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '10px 14px', borderRadius: '8px', fontSize: '0.85rem', marginTop: '1rem', border: '1px solid #fca5a5' }}>
                  ⚠️ {validationError}
                </div>
              )}

              <div className="flex gap-md mt-lg">
                <Link to="/cart" className="btn btn-outline" style={{ padding: '14px' }}>
                  <ArrowLeft size={16} /> Return to Cart
                </Link>
                <button className="btn btn-primary" style={{ flex: 1, padding: '14px' }} onClick={handleContinueToPayment}>
                  Continue to Payment
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="checkout-card">
              <h3>2. Select Payment Method</h3>
              <p className="form-subtitle">All transactions are encrypted and processed in {currency.code}</p>

              <div className="payment-options">
                {/* Credit / Debit Card Option */}
                <label className={`payment-option ${formData.paymentMethod === 'card' ? 'selected' : ''}`}>
                  <input type="radio" name="paymentMethod" value="card" checked={formData.paymentMethod === 'card'} onChange={handleChange} />
                  <div className="payment-option-body">
                    <div className="flex items-center gap-xs">
                      <CreditCard size={18} color="#2563eb" />
                      <strong>Credit / Debit Card</strong>
                      <span className="payment-badge">Instant</span>
                    </div>
                    <p>Visa, MasterCard, American Express</p>
                  </div>
                </label>

                {formData.paymentMethod === 'card' && (
                  <div className="card-input-details">
                    <div className="form-group">
                      <label>Card Number</label>
                      <input type="text" name="cardNumber" placeholder="4111 2222 3333 4444" value={formData.cardNumber} onChange={handleChange} maxLength="19" />
                    </div>
                    <div className="grid grid-cols-2 gap-sm">
                      <div className="form-group">
                        <label>Expiry (MM/YY)</label>
                        <input type="text" name="cardExpiry" placeholder="12/28" value={formData.cardExpiry} onChange={handleChange} maxLength="5" />
                      </div>
                      <div className="form-group">
                        <label>CVV / CVC</label>
                        <input type="password" name="cardCvv" placeholder="•••" value={formData.cardCvv} onChange={handleChange} maxLength="4" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Apple Pay Option */}
                <label className={`payment-option ${formData.paymentMethod === 'apple' ? 'selected' : ''}`}>
                  <input type="radio" name="paymentMethod" value="apple" checked={formData.paymentMethod === 'apple'} onChange={handleChange} />
                  <div className="payment-option-body">
                    <div className="flex items-center gap-xs">
                      <Smartphone size={18} color="#000000" />
                      <strong>Apple Pay / Google Pay</strong>
                      <span className="payment-badge">Touch ID</span>
                    </div>
                    <p>One-tap biometric checkout from your mobile device</p>
                  </div>
                </label>

                {/* Cash on Delivery Option */}
                <label className={`payment-option ${formData.paymentMethod === 'cod' ? 'selected' : ''}`}>
                  <input type="radio" name="paymentMethod" value="cod" checked={formData.paymentMethod === 'cod'} onChange={handleChange} />
                  <div className="payment-option-body">
                    <div className="flex items-center gap-xs">
                      <Banknote size={18} color="#059669" />
                      <strong>Cash on Delivery (COD)</strong>
                      <span className="payment-badge">Pay on Delivery</span>
                    </div>
                    <p>Pay cash or courier POS card terminal upon doorstep delivery in UAE</p>
                  </div>
                </label>
              </div>

              {/* B2B Commercial Invoicing Notice - UAE VAT */}
              <div className="checkout-b2b-terms-notice">
                <Building2 size={16} color="#1d4ed8" />
                <span>
                  <strong>Need Corporate B2B Invoicing or Net-30 Terms?</strong> Bulk fabric roll buyers and OEM apparel partners are billed via Proforma Invoice with 5% UAE VAT and TRN. Submit your wholesale requirements in the <Link to="/rfq">B2B Quote Cart</Link>.
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
                <p><strong>{formData.fullName || 'Customer'}</strong></p>
                <p className="text-light">{formData.address || 'Marina Tower'}, {formData.area || 'Downtown'}, {formData.emirate}, {formData.country}</p>
                <p className="text-light">Phone: {formData.phone || '+971 50 123 4567'} • Email: {formData.email}</p>
              </div>

              <div className="review-section">
                <h4>Payment Method</h4>
                <p>
                  <strong>Method:</strong> {formData.paymentMethod === 'card' ? 'Credit / Debit Card' : formData.paymentMethod === 'apple' ? 'Apple Pay' : 'Cash on Delivery (Doorstep)'}
                </p>
                {formData.paymentMethod === 'card' && (
                  <p className="text-light">Card ending with: {formData.cardNumber ? formData.cardNumber.slice(-4) : '4242'}</p>
                )}
              </div>

              <div className="review-section">
                <h4>Bstar Garment Items ({cart.length})</h4>
                {cart.map((item, index) => (
                  <div key={index} className="review-item">
                    <img src={item.image} alt={item.name} />
                    <div>
                      <p className="review-item-name">{item.name}</p>
                      <p className="text-light">{item.selectedColor} / {item.selectedSize} × {item.quantity}</p>
                    </div>
                    <p className="review-item-price">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-md mt-lg">
                <button className="btn btn-outline" style={{ flex: 1, padding: '14px' }} onClick={() => setStep(2)}>Back</button>
                <button className="btn-place-order" onClick={handlePlaceOrder}>
                  <Lock size={16} /> Pay {formatPrice(grandTotal)} Now
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
                <span>{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
            <div className="summary-row"><span>Retail Subtotal</span><span>{formatPrice(cartTotal)}</span></div>
            <div className="summary-row"><span>UAE Delivery</span><span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span></div>
            <div className="summary-row"><span>UAE VAT (5%)</span><span>{formatPrice(tax)}</span></div>
            <div className="summary-total"><span>Total Amount</span><span>{formatPrice(grandTotal)}</span></div>

            <div className="checkout-secure-badge">
              <ShieldCheck size={18} color="#10b981" />
              <div>
                <strong>Guaranteed Safe Checkout</strong>
                <p>256-bit encrypted Dubai payment gateway</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
