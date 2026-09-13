import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, Minus, Plus, Building2, ShieldCheck, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';

const Cart = () => {
  const { cart, cartTotal, removeFromCart, updateQuantity } = useCart();
  const { formatPrice, currency } = useCurrency();
  const navigate = useNavigate();

  const freeShippingThreshold = 150;
  const shippingFee = cartTotal >= freeShippingThreshold ? 0 : 20;
  const vatTax = Math.round(cartTotal * 0.05); // 5% UAE VAT
  const grandTotal = cartTotal + shippingFee + vatTax;

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
          <ShoppingBag size={28} />
        </div>
        <h2 className="text-2xl font-black text-slate-900 mb-2">Your Retail Cart is Empty</h2>
        <p className="text-xs sm:text-sm text-slate-500 mb-8 max-w-md mx-auto">
          You haven't added any ready-to-wear Bstar apparel to your shopping cart yet.
        </p>
        <div className="flex justify-center gap-3">
          <Link to="/shop" className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition">
            Shop Bstar Apparel
          </Link>
          <Link to="/fabrics" className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition">
            B2B Wholesale Portal
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="border-b border-slate-200 pb-6 mb-8">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full mb-2">
          <span>B2C RETAIL STORE • CARD CHECKOUT</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Shopping Bag ({cart.length})</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Review your garments and proceed to fast, encrypted card checkout.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item, index) => (
            <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 flex gap-4 sm:gap-6 items-center shadow-sm">
              <Link to={`/shop/product/${item.id}`} className="w-20 h-24 sm:w-24 sm:h-28 bg-slate-100 rounded-xl overflow-hidden shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </Link>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{item.category}</span>
                    <h3 className="font-bold text-slate-900 text-sm truncate">{item.name}</h3>
                  </div>
                  <span className="font-black text-slate-900 text-sm">{formatPrice(item.price * item.quantity)}</span>
                </div>

                <div className="text-xs text-slate-500 mb-4">
                  Color: <strong className="text-slate-700">{item.selectedColor}</strong> • Size: <strong className="text-slate-700">{item.selectedSize}</strong>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                    <button 
                      type="button" 
                      className="px-2.5 py-1 text-slate-600 hover:bg-slate-100"
                      onClick={() => updateQuantity(index, item.quantity - 1)}
                    >
                      <Minus size={12} />
                    </button>
                    <span className="px-3 py-1 text-xs font-bold text-slate-900">{item.quantity}</span>
                    <button 
                      type="button" 
                      className="px-2.5 py-1 text-slate-600 hover:bg-slate-100"
                      onClick={() => updateQuantity(index, item.quantity + 1)}
                    >
                      <Plus size={12} />
                    </button>
                  </div>

                  <button 
                    type="button"
                    className="text-slate-400 hover:text-rose-500 p-1 transition"
                    onClick={() => removeFromCart(index)}
                    title="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Wholesale Notice Pill */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-between text-xs text-slate-600 gap-4">
            <div className="flex items-center gap-2">
              <Building2 size={16} className="text-blue-600 shrink-0" />
              <span>Are you a brand ordering wholesale fabric rolls or 100+ garments?</span>
            </div>
            <Link to="/rfq" className="font-bold text-blue-600 hover:underline shrink-0">
              Open B2B Quote Cart →
            </Link>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sticky top-24">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Order Summary</h3>

            <div className="space-y-3 text-xs border-b border-slate-200 pb-4 mb-4">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal ({cart.length} items):</span>
                <span className="font-bold text-slate-900">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Estimated UAE Shipping:</span>
                <span className="font-bold text-slate-900">
                  {shippingFee === 0 ? <span className="text-emerald-600">FREE</span> : formatPrice(shippingFee)}
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>UAE VAT (5% FTA Standard):</span>
                <span className="font-bold text-slate-900">{formatPrice(vatTax)}</span>
              </div>
            </div>

            <div className="flex justify-between items-baseline mb-6">
              <span className="text-sm font-bold text-slate-900">Total:</span>
              <div className="text-right">
                <span className="text-xl font-black text-slate-900 block">{formatPrice(grandTotal)}</span>
                <span className="text-[10px] text-slate-400">All taxes included</span>
              </div>
            </div>

            <button 
              type="button"
              className="w-full py-3.5 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-sm mb-3"
              onClick={() => navigate('/checkout')}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={15} />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
              <ShieldCheck size={14} className="text-emerald-500" />
              <span>Encrypted Card & Apple Pay Checkout</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cart;
