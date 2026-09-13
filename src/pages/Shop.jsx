import React, { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { b2cProducts } from '../data/mockData';
import { Heart, ShoppingBag, Check, SlidersHorizontal, Sparkles } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { useCart } from '../context/CartContext';
import gsap from 'gsap';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlCategory = searchParams.get('category') || 'All';
  
  const [categoryFilter, setCategoryFilter] = useState(urlCategory);
  const [typeFilter, setTypeFilter] = useState('All');
  const [priceSort, setPriceSort] = useState('default');
  const [addedItemNotice, setAddedItemNotice] = useState(null);

  const containerRef = useRef(null);
  const { formatPrice, currency } = useCurrency();
  const { addToCart } = useCart();
  
  const categories = ['All', 'Men', 'Women', 'Kids'];
  const types = ['All', 'T-Shirts', 'Shirts', 'Hoodies', 'Bottoms'];

  useEffect(() => {
    if (urlCategory) {
      setCategoryFilter(urlCategory);
    }
  }, [urlCategory]);
  
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
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: "power2.out" }
      );
    }
  }, [categoryFilter, typeFilter, priceSort]);

  const handleQuickAdd = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, product.sizes?.[0] || 'M', product.colors?.[0] || 'Default');
    setAddedItemNotice(`Added "${product.name}" to your Retail Cart`);
    setTimeout(() => setAddedItemNotice(null), 2500);
  };

  const handleCategoryChange = (cat) => {
    setCategoryFilter(cat);
    if (cat === 'All') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: cat });
    }
  };

  return (
    <div className="bg-white min-h-screen">
      
      {/* Toast Notice */}
      {addedItemNotice && (
        <div className="fixed bottom-6 right-6 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 z-50 border border-slate-700 animate-bounce">
          <Check size={18} className="text-emerald-400" />
          <span className="text-xs font-semibold">{addedItemNotice}</span>
          <Link to="/cart" className="ml-2 px-2.5 py-1 rounded bg-amber-500 text-slate-950 font-bold text-[11px]">
            View Cart →
          </Link>
        </div>
      )}

      {/* Clean Header Bar */}
      <div className="bg-slate-50 border-b border-slate-200 py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 bg-amber-100/80 px-2.5 py-1 rounded-full uppercase tracking-wider mb-2.5">
                <Sparkles size={13} className="text-amber-600" />
                <span>B2C RETAIL STORE • INDIVIDUAL SHOPPING (BSTAR)</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Ready-to-Wear Everyday Fashion</h1>
              <p className="text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
                Shop individual pieces for personal wear with <strong>instant card checkout</strong> (Visa, Mastercard, Apple Pay). No minimum order required. Prices include 5% UAE VAT with 48-hour delivery across Dubai and the UAE.
              </p>
            </div>

            {/* Badges */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="bg-white px-3.5 py-2 rounded-xl border border-slate-200 text-center shadow-sm">
                <div className="text-xs font-bold text-slate-900">No MOQ</div>
                <div className="text-[10px] text-slate-500">Buy 1+ Pieces</div>
              </div>
              <div className="bg-white px-3.5 py-2 rounded-xl border border-slate-200 text-center shadow-sm">
                <div className="text-xs font-bold text-slate-900">Instant Card</div>
                <div className="text-[10px] text-slate-500">Apple Pay / COD</div>
              </div>
              <div className="bg-white px-3.5 py-2 rounded-xl border border-slate-200 text-center shadow-sm">
                <div className="text-xs font-bold text-slate-900">48h Delivery</div>
                <div className="text-[10px] text-slate-500">All 7 Emirates</div>
              </div>
            </div>
          </div>

          {/* Clean Category Navigation Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                className={`px-4 py-2 rounded-full text-xs font-bold transition whitespace-nowrap ${
                  categoryFilter === cat 
                    ? 'bg-slate-900 text-white shadow-sm' 
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
                onClick={() => handleCategoryChange(cat)}
              >
                {cat === 'All' ? 'All Collections' : `${cat}'s Fashion`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Catalog Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar */}
          <aside className="w-full lg:w-60 shrink-0">
            <div className="sticky top-24 space-y-6">
              
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <SlidersHorizontal size={13} className="text-slate-500" />
                  Product Type
                </h3>
                <div className="flex flex-wrap lg:flex-col gap-1.5">
                  {types.map(type => (
                    <button
                      key={type}
                      type="button"
                      className={`px-3 py-1.5 rounded-lg text-xs text-left font-medium transition ${
                        typeFilter === type 
                          ? 'bg-amber-50 text-amber-900 font-bold border border-amber-200' 
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                      onClick={() => setTypeFilter(type)}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Sort By</h3>
                <select 
                  value={priceSort} 
                  onChange={(e) => setPriceSort(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-900"
                >
                  <option value="default">Featured & Popular</option>
                  <option value="low-high">Price: Low to High</option>
                  <option value="high-low">Price: High to Low</option>
                </select>
              </div>

              {(categoryFilter !== 'All' || typeFilter !== 'All' || priceSort !== 'default') && (
                <button 
                  className="w-full py-2 text-xs font-semibold text-slate-500 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50 transition"
                  onClick={() => { handleCategoryChange('All'); setTypeFilter('All'); setPriceSort('default'); }}
                >
                  Clear All Filters
                </button>
              )}

              <div className="bg-slate-50 border border-dashed border-slate-200 rounded-xl p-4 text-xs text-slate-600">
                <span className="font-bold text-amber-700 block mb-1">Dubai Express Shipping</span>
                Free delivery on UAE orders above 250 AED. International courier available across GCC.
              </div>

            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100 text-xs text-slate-500">
              <div>Showing <strong className="text-slate-900 font-bold">{filteredProducts.length}</strong> styles</div>
              <div>Prices displayed in <strong className="text-slate-900 font-bold">{currency.code}</strong> ({currency.symbol})</div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" ref={containerRef}>
              {filteredProducts.map(product => (
                <div key={product.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg hover:border-slate-300 transition flex flex-col justify-between group">
                  <div>
                    <Link to={`/shop/product/${product.id}`} className="block relative aspect-[4/5] bg-slate-100 overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        loading="lazy" 
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-slate-900/80 text-white text-[10px] font-bold">
                        {product.category}
                      </span>
                      <button 
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 text-slate-600 hover:text-rose-500 flex items-center justify-center shadow-sm transition"
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                        aria-label="Wishlist"
                      >
                        <Heart size={14} />
                      </button>
                    </Link>

                    <div className="p-4">
                      <div className="flex items-center justify-between text-[11px] text-slate-400 uppercase tracking-wider mb-1">
                        <span>{product.type}</span>
                        <div className="flex gap-1">
                          {product.colors.slice(0, 3).map(c => (
                            <span key={c} className="w-2 h-2 rounded-full bg-slate-300" title={c}></span>
                          ))}
                        </div>
                      </div>

                      <h3 className="font-bold text-slate-900 text-sm mb-2 group-hover:text-amber-600 transition">
                        <Link to={`/shop/product/${product.id}`}>{product.name}</Link>
                      </h3>
                    </div>
                  </div>

                  <div className="p-4 pt-0 flex items-center justify-between border-t border-slate-50 mt-2">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase block">Retail Price</span>
                      <span className="text-base font-black text-slate-900">{formatPrice(product.price)}</span>
                    </div>

                    <button 
                      type="button"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white text-xs font-bold transition shadow-sm"
                      onClick={(e) => handleQuickAdd(e, product)}
                      title="Quick Add to Retail Cart"
                    >
                      <ShoppingBag size={14} />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <h3 className="text-base font-bold text-slate-900 mb-1">No products found</h3>
                <p className="text-xs text-slate-500 mb-4">Try adjusting your filters.</p>
                <button 
                  className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold"
                  onClick={() => { handleCategoryChange('All'); setTypeFilter('All'); }}
                >
                  View All Products
                </button>
              </div>
            )}

          </div>

        </div>
      </div>

    </div>
  );
};

export default Shop;
