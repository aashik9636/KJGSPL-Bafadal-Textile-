import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { CheckCircle, Lock, CreditCard, Smartphone, Banknote, ShieldCheck, ArrowLeft, ArrowRight } from 'lucide-react';

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
    cardNumber: '4242 •••• •••• 4242',
    cardHolder: 'Sarah Al Mansoori',
    cardExpiry: '12/28',
    cardCvv: '•••',
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
      setValidationError('Please enter a valid phone number');
      return;
    }
    if (!formData.address.trim()) {
      setValidationError('Please enter your delivery street address');
      return;
    }
    setValidationError('');
    setStep(2);
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setOrderPlaced(true);
    clearCart();
  };

  const freeShippingThreshold = 150;
  const shipping = cartTotal >= freeShippingThreshold ? 0 : 20;
  const tax = Math.round(cartTotal * 0.05); // 5% UAE VAT
  const grandTotal = cartTotal + shipping + tax;

  if (orderPlaced) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={36} />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">Order Confirmed!</h1>
        <p className="text-xs sm:text-sm text-slate-500 mb-6">
          Thank you for your purchase with Bstar Fashion. Your payment of <strong>{formatPrice(grandTotal)}</strong> has been received.
        </p>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-left text-xs mb-8">
          <div className="flex justify-between border-b border-slate-200 pb-3 mb-3">
            <span className="text-slate-400">Order Reference:</span>
            <span className="font-mono font-bold text-slate-900">#BSTAR-DXB-{Math.floor(Math.random() * 90000) + 10000}</span>
          </div>
          <div className="flex justify-between border-b border-slate-200 pb-3 mb-3">
            <span className="text-slate-400">Recipient:</span>
            <span className="font-bold text-slate-900">{formData.fullName}</span>
          </div>
          <div className="flex justify-between border-b border-slate-200 pb-3 mb-3">
            <span className="text-slate-400">Delivery Address:</span>
            <span className="font-bold text-slate-900">{formData.address}, {formData.emirate}</span>
          </div>
          <div className="flex justify-between border-b border-slate-200 pb-3 mb-3">
            <span className="text-slate-400">UAE Tax Standard:</span>
            <span className="font-bold text-emerald-600">5% UAE VAT Included (TRN: 100482910200003)</span>
          </div>
          <div className="flex justify-between font-bold text-sm text-slate-900 pt-1">
            <span>Total Paid:</span>
            <span>{formatPrice(grandTotal)}</span>
          </div>
        </div>

        <Link to="/shop" className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-6 mb-8">
        <div>
          <button 
            type="button" 
            onClick={() => navigate('/cart')} 
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 mb-2"
          >
            <ArrowLeft size={14} /> Back to Bag
          </button>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Express Checkout</h1>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Lock size={14} className="text-emerald-500" />
          <span>256-Bit SSL Encrypted</span>
        </div>
      </div>

      {validationError && (
        <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
          {validationError}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left 2 Cols: Form Steps */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Step 1: Shipping Details */}
          <div className={`border rounded-2xl p-6 transition ${step === 1 ? 'border-slate-900 bg-white shadow-sm' : 'border-slate-200 bg-slate-50 opacity-90'}`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-bold">1</span>
                <span>Shipping & Contact Information</span>
              </h2>
              {step > 1 && (
                <button type="button" onClick={() => setStep(1)} className="text-xs font-bold text-blue-600 hover:underline">
                  Edit
                </button>
              )}
            </div>

            {step === 1 ? (
              <form onSubmit={handleContinueToPayment} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                    <input 
                      type="text" 
                      name="fullName" 
                      placeholder="e.g. Sarah Al Mansoori"
                      value={formData.fullName} 
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                    <input 
                      type="email" 
                      name="email" 
                      placeholder="sarah@example.ae"
                      value={formData.email} 
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number (UAE) *</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      placeholder="+971 50 123 4567"
                      value={formData.phone} 
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Emirate *</label>
                    <select 
                      name="emirate" 
                      value={formData.emirate} 
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-medium bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                    >
                      <option value="Dubai">Dubai</option>
                      <option value="Abu Dhabi">Abu Dhabi</option>
                      <option value="Sharjah">Sharjah</option>
                      <option value="Ajman">Ajman</option>
                      <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                      <option value="Fujairah">Fujairah</option>
                      <option value="Umm Al Quwain">Umm Al Quwain</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Street Address & Villa/Flat No. *</label>
                  <input 
                    type="text" 
                    name="address" 
                    placeholder="Building 4, Apt 204, Downtown Boulevard"
                    value={formData.address} 
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                <button 
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-sm mt-2"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight size={14} />
                </button>
              </form>
            ) : (
              <div className="text-xs text-slate-600">
                <span className="font-bold text-slate-900">{formData.fullName}</span> • {formData.phone} • {formData.address}, {formData.emirate}
              </div>
            )}
          </div>

          {/* Step 2: Payment Method */}
          <div className={`border rounded-2xl p-6 transition ${step === 2 ? 'border-slate-900 bg-white shadow-sm' : 'border-slate-200 bg-slate-50 opacity-90'}`}>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-4">
              <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-bold">2</span>
              <span>Payment Method</span>
            </h2>

            {step === 2 && (
              <form onSubmit={handlePlaceOrder} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <label className={`p-4 rounded-xl border cursor-pointer flex flex-col items-center text-center transition ${formData.paymentMethod === 'card' ? 'border-slate-900 bg-slate-50' : 'border-slate-200'}`}>
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="card" 
                      checked={formData.paymentMethod === 'card'} 
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <CreditCard size={20} className="text-slate-900 mb-1" />
                    <span className="text-xs font-bold text-slate-900">Debit / Credit Card</span>
                    <span className="text-[10px] text-slate-400">Visa / Mastercard</span>
                  </label>

                  <label className={`p-4 rounded-xl border cursor-pointer flex flex-col items-center text-center transition ${formData.paymentMethod === 'apple' ? 'border-slate-900 bg-slate-50' : 'border-slate-200'}`}>
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="apple" 
                      checked={formData.paymentMethod === 'apple'} 
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <Smartphone size={20} className="text-slate-900 mb-1" />
                    <span className="text-xs font-bold text-slate-900">Apple Pay</span>
                    <span className="text-[10px] text-slate-400">Instant 1-touch</span>
                  </label>

                  <label className={`p-4 rounded-xl border cursor-pointer flex flex-col items-center text-center transition ${formData.paymentMethod === 'cod' ? 'border-slate-900 bg-slate-50' : 'border-slate-200'}`}>
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="cod" 
                      checked={formData.paymentMethod === 'cod'} 
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <Banknote size={20} className="text-slate-900 mb-1" />
                    <span className="text-xs font-bold text-slate-900">Cash on Delivery</span>
                    <span className="text-[10px] text-slate-400">UAE orders only</span>
                  </label>
                </div>

                {formData.paymentMethod === 'card' && (
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3 mt-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Card Number</label>
                      <input 
                        type="text" 
                        name="cardNumber" 
                        value={formData.cardNumber} 
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono font-bold bg-white focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Expiry Date</label>
                        <input 
                          type="text" 
                          name="cardExpiry" 
                          value={formData.cardExpiry} 
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono bg-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">CVV / CVC</label>
                        <input 
                          type="text" 
                          name="cardCvv" 
                          value={formData.cardCvv} 
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono bg-white focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <button 
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm transition shadow-sm mt-4 flex items-center justify-center gap-2"
                >
                  <Lock size={15} />
                  <span>Authorize & Pay {formatPrice(grandTotal)}</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Right 1 Col: Summary */}
        <div>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sticky top-24">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Summary</h3>
            
            <div className="space-y-3 text-xs border-b border-slate-200 pb-4 mb-4">
              <div className="flex justify-between text-slate-600">
                <span>Items Subtotal ({cart.length}):</span>
                <span className="font-bold text-slate-900">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Delivery:</span>
                <span className="font-bold text-slate-900">
                  {shipping === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : formatPrice(shipping)}
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>UAE VAT (5% FTA Standard):</span>
                <span className="font-bold text-slate-900">{formatPrice(tax)}</span>
              </div>
            </div>

            <div className="flex justify-between items-baseline mb-6">
              <span className="text-sm font-bold text-slate-900">Grand Total:</span>
              <div className="text-right">
                <span className="text-xl font-black text-slate-900 block">{formatPrice(grandTotal)}</span>
                <span className="text-[10px] text-slate-400">FTA TRN 100482910200003</span>
              </div>
            </div>

            <div className="p-3 bg-white rounded-xl border border-slate-200 text-slate-500 text-[11px] leading-relaxed">
              🔒 Bstar retail transactions are processed securely under UAE financial and tax compliance. 7-day hassle-free consumer return policy across Dubai & UAE.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;
