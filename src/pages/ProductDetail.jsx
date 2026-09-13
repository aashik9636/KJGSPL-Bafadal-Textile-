import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { b2cProducts } from '../data/mockData';
import { ArrowLeft, ShoppingBag, Heart, Star, Truck, RotateCcw, Shield, CreditCard, Building2, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { useRfq } from '../context/RfqContext';
import gsap from 'gsap';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToRfq } = useRfq();
  const { formatPrice, currency } = useCurrency();
  const product = b2cProducts.find(p => p.id === id);
  const pageRef = useRef(null);
  
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || 'Default');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [addedToRfqState, setAddedToRfqState] = useState(false);

  useEffect(() => {
    if (pageRef.current) {
      gsap.fromTo(pageRef.current.querySelectorAll('.gsap-fade'),
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" }
      );
    }
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Product not found</h2>
        <Link to="/shop" className="px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-bold">Back to Shop</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  const handlePushToQuoteCart = () => {
    addToRfq({
      id: `oem-${product.id}`,
      name: `${product.name} (Bulk OEM Garment)`,
      category: 'Wholesale Garment',
      image: product.image,
      moq: 100,
      unit: 'Pieces',
      colors: product.colors
    }, {
      quantity: 100,
      unit: 'Pieces',
      requestType: 'oem',
      targetColor: selectedColor,
      customNotes: `Bulk inquiry for Bstar brand apparel in ${selectedColor}, size ${selectedSize}. Private labeling required.`
    });
    setAddedToRfqState(true);
    setTimeout(() => setAddedToRfqState(false), 2500);
  };

  const relatedProducts = b2cProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="bg-white min-h-screen py-8" ref={pageRef}>
      
      {/* Toast Notifier */}
      {addedToCart && (
        <div className="fixed bottom-6 right-6 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 z-50 border border-slate-700 animate-bounce">
          <Check size={18} className="text-emerald-400" />
          <span className="text-xs font-semibold">Added to your Retail Cart!</span>
          <Link to="/cart" className="ml-2 px-2.5 py-1 rounded bg-amber-500 text-slate-950 font-bold text-[11px]">
            View Cart →
          </Link>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-6 gsap-fade">
          <Link to="/" className="hover:text-slate-900">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-slate-900">Bstar Retail</Link>
          <span>/</span>
          <Link to={`/shop?category=${product.category}`} className="hover:text-slate-900">{product.category}</Link>
          <span>/</span>
          <span className="text-slate-900 font-medium truncate">{product.name}</span>
        </div>

        {/* Product Details Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 gsap-fade">
          
          {/* Image Section */}
          <div className="relative aspect-[4/5] bg-slate-100 rounded-2xl overflow-hidden border border-slate-200">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            <button 
              className={`absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-md transition ${isWishlisted ? 'text-rose-500' : 'text-slate-600 hover:text-rose-500'}`}
              onClick={() => setIsWishlisted(!isWishlisted)}
              aria-label="Wishlist"
            >
              <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
            </button>
            <span className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-slate-900/80 text-white text-xs font-bold">
              {product.category} • Bstar
            </span>
          </div>

          {/* Buy Box & Specs */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 uppercase tracking-wider mb-2">
                <span>{product.type}</span>
                <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">In Stock • UAE</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-3">
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-slate-100">
                <span className="text-3xl font-black text-slate-900">{formatPrice(product.price)}</span>
                <span className="text-xs text-slate-400">Includes 5% UAE VAT • Free returns</span>
              </div>

              {/* Color Selection */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Select Color: <span className="text-slate-900">{selectedColor}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map(col => (
                    <button
                      key={col}
                      type="button"
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                        selectedColor === col 
                          ? 'border-slate-900 bg-slate-900 text-white font-bold' 
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                      onClick={() => setSelectedColor(col)}
                    >
                      {col}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Select Size: <span className="text-slate-900">{selectedSize}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(sz => (
                    <button
                      key={sz}
                      type="button"
                      className={`w-12 h-10 rounded-lg text-xs font-bold border transition ${
                        selectedSize === sz 
                          ? 'border-slate-900 bg-slate-900 text-white' 
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                      onClick={() => setSelectedSize(sz)}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6 flex items-center gap-4">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Quantity:</label>
                <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                  <button 
                    type="button" 
                    className="px-3 py-1.5 text-sm font-bold text-slate-600 hover:bg-slate-100"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-xs font-bold text-slate-900">{quantity}</span>
                  <button 
                    type="button" 
                    className="px-3 py-1.5 text-sm font-bold text-slate-600 hover:bg-slate-100"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <button 
                  type="button"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition shadow-sm"
                  onClick={handleAddToCart}
                >
                  <ShoppingBag size={18} />
                  <span>Add to Retail Cart</span>
                </button>
                <button 
                  type="button"
                  className="inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition shadow-sm"
                  onClick={() => {
                    handleAddToCart();
                    navigate('/cart');
                  }}
                >
                  <span>Buy Now</span>
                </button>
              </div>

              {/* Wholesale Switch Banner */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-2 text-blue-900">
                  <Building2 size={18} className="text-blue-600 shrink-0" />
                  <span>Looking to order wholesale volumes (100+ pcs) with private labeling?</span>
                </div>
                <button 
                  type="button" 
                  className="shrink-0 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold transition"
                  onClick={handlePushToQuoteCart}
                >
                  {addedToRfqState ? 'Queued in RFQ!' : 'Push to RFQ'}
                </button>
              </div>
            </div>

            {/* Service Perks */}
            <div className="grid grid-cols-3 gap-3 border-t border-slate-100 pt-6 mt-6 text-center text-xs text-slate-600">
              <div className="p-3 bg-slate-50 rounded-xl">
                <Truck size={18} className="text-slate-700 mx-auto mb-1" />
                <span className="font-bold block text-slate-900">48h UAE Delivery</span>
                <span className="text-[10px] text-slate-400">Express courier</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <RotateCcw size={18} className="text-slate-700 mx-auto mb-1" />
                <span className="font-bold block text-slate-900">7-Day Returns</span>
                <span className="text-[10px] text-slate-400">Hassle-free policy</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <Shield size={18} className="text-slate-700 mx-auto mb-1" />
                <span className="font-bold block text-slate-900">5% UAE VAT</span>
                <span className="text-[10px] text-slate-400">Tax receipt included</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default ProductDetail;
