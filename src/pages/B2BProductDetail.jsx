import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { b2bFabrics, b2bGarments } from '../data/mockData';
import { 
  Building2, 
  Layers, 
  ShieldCheck, 
  Truck, 
  FileText, 
  Check, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight,
  Plus
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { useRfq } from '../context/RfqContext';
import gsap from 'gsap';

const B2BProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { formatUSDPrice, currency } = useCurrency();
  const { addToRfq, rfqCount } = useRfq();

  const product = b2bFabrics.find(f => f.id === id) || b2bGarments.find(g => g.id === id);
  const isFabric = product?.category === 'Fabric';

  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || 'Standard');
  const [quantity, setQuantity] = useState(product?.moq || 100);
  const [addedNotice, setAddedNotice] = useState(null);
  const [activeTab, setActiveTab] = useState('specs'); // 'specs' | 'pricing' | 'logistics'

  const pageRef = useRef(null);

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors?.[0] || 'Standard');
      setQuantity(product.moq || 100);
    }
    if (pageRef.current) {
      gsap.fromTo(pageRef.current.querySelectorAll('.b2b-fade'),
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" }
      );
    }
    window.scrollTo(0, 0);
  }, [id, product]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <AlertCircle size={40} className="text-rose-500 mb-3" />
        <h2 className="text-xl font-bold text-slate-900 mb-2">Wholesale Item Not Found</h2>
        <p className="text-xs text-slate-500 mb-4 max-w-sm">The requested fabric roll or garment specification could not be located.</p>
        <Link to="/fabrics" className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold">Browse Catalog</Link>
      </div>
    );
  }

  const handlePushToQuoteCart = (requestType = 'quote') => {
    const isSample = requestType === 'sample';
    addToRfq(product, {
      quantity: isSample ? 1 : Math.max(product.moq, Number(quantity) || product.moq),
      unit: isSample ? 'Swatch Kit' : product.unit,
      requestType,
      targetColor: selectedColor,
      customNotes: isSample 
        ? `Request physical swatch kit for ${product.name}. Delivery to commercial partner.`
        : `Wholesale order inquiry for ${quantity} ${product.unit} in color ${selectedColor}. Custom packaging requested.`
    });

    setAddedNotice(isSample ? 'Physical Swatch Kit added to Quote Cart!' : `${quantity} ${product.unit} pushed to B2B Quote Cart!`);
    setTimeout(() => setAddedNotice(null), 3000);
  };

  const relatedItems = (isFabric ? b2bFabrics : b2bGarments)
    .filter(item => item.id !== product.id)
    .slice(0, 3);

  return (
    <div className="bg-white min-h-screen py-8" ref={pageRef}>
      
      {/* Toast Notice */}
      {addedNotice && (
        <div className="fixed bottom-6 right-6 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 z-50 border border-slate-700 animate-bounce">
          <CheckCircle2 size={18} className="text-emerald-400" />
          <span className="text-xs font-semibold">{addedNotice}</span>
          <Link to="/rfq" className="ml-2 px-2.5 py-1 rounded bg-blue-600 text-white font-bold text-[11px]">
            View Quote Cart ({rfqCount}) →
          </Link>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-6 b2b-fade">
          <Link to="/" className="hover:text-slate-900">Home</Link>
          <span>/</span>
          <Link to="/fabrics" className="hover:text-slate-900">B2B Wholesale</Link>
          <span>/</span>
          <Link to={isFabric ? "/fabrics" : "/fabrics?tab=garments"} className="hover:text-slate-900">
            {isFabric ? "Fabric Rolls" : "Wholesale Garments"}
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-medium truncate">{product.name}</span>
        </div>

        {/* Product Details Header & Spec Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 b2b-fade mb-12">
          
          {/* Left Column: Image & Compliance */}
          <div>
            <div className="relative aspect-[16/11] bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 shadow-sm mb-4">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-900/90 text-white text-xs font-bold">
                {isFabric ? 'Commercial Fabric Roll' : 'OEM Finished Garment'}
              </span>
              <span className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold">
                MOQ: {product.moq} {product.unit}
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-between text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-emerald-500" />
                <span><strong>UAE FTA TRN 100482910200003</strong> • 5% VAT Proforma</span>
              </div>
              <span className="text-blue-600 font-semibold">FOB Jebel Ali (DXB)</span>
            </div>
          </div>

          {/* Right Column: Wholesale Buy Box */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 uppercase tracking-wider mb-2">
                <span>Article Code: BFD-{product.id.toUpperCase()}</span>
                <span className="text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-bold">Commercial Supply Only</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
                {product.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mb-6">{product.composition} • Standard Mill Production</p>

              {/* Volume Tier Rates Table */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                  Tiered Benchmark Pricing ({currency.code})
                </span>
                <div className="grid grid-cols-3 gap-2 text-center">
                  {product.tieredPricing?.map(tier => (
                    <div key={tier.tier} className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-sm">
                      <span className="text-[10px] text-slate-400 block font-medium">{tier.tier}</span>
                      <span className="text-sm font-black text-slate-900 block mt-0.5">
                        ~{formatUSDPrice(tier.priceUSD)}
                      </span>
                      <span className="text-[10px] text-emerald-600 font-bold">/{product.unit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Mill Color: <span className="text-slate-900">{selectedColor}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map(col => (
                    <button
                      key={col}
                      type="button"
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                        selectedColor === col 
                          ? 'border-blue-600 bg-blue-50 text-blue-800 font-bold' 
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                      onClick={() => setSelectedColor(col)}
                    >
                      {col}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Input */}
              <div className="mb-8 flex items-center gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Order Quantity ({product.unit}):
                  </label>
                  <div className="flex items-center gap-2">
                    <input 
                      type="number" 
                      min={product.moq}
                      step={isFabric ? 50 : 25}
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                      className="w-32 px-3 py-2 border border-slate-200 rounded-lg text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    <span className="text-xs text-slate-500">(MOQ: {product.moq} {product.unit})</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button 
                  type="button"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition shadow-sm"
                  onClick={() => handlePushToQuoteCart('quote')}
                >
                  <Plus size={16} />
                  <span>Push to Quote Cart ({quantity} {product.unit})</span>
                </button>
                {isFabric && (
                  <button 
                    type="button"
                    className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-800 font-bold text-sm transition"
                    onClick={() => handlePushToQuoteCart('sample')}
                  >
                    <span>+ Swatch Kit</span>
                  </button>
                )}
              </div>
            </div>

            <p className="text-[11px] text-slate-400 mt-4">
              🔒 B2B wholesale orders are quote-based. You will receive a formal proforma invoice with 5% UAE VAT and FOB Dubai terms upon RFQ review.
            </p>
          </div>

        </div>

        {/* Technical Specification Tabs */}
        <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm mb-14 b2b-fade">
          <div className="flex border-b border-slate-200 bg-slate-50">
            <button 
              type="button"
              className={`px-6 py-3.5 text-xs font-bold tracking-wider uppercase transition ${
                activeTab === 'specs' ? 'bg-white text-slate-900 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-900'
              }`}
              onClick={() => setActiveTab('specs')}
            >
              Technical Specifications
            </button>
            <button 
              type="button"
              className={`px-6 py-3.5 text-xs font-bold tracking-wider uppercase transition ${
                activeTab === 'pricing' ? 'bg-white text-slate-900 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-900'
              }`}
              onClick={() => setActiveTab('pricing')}
            >
              Volume Tier Breakdown
            </button>
            <button 
              type="button"
              className={`px-6 py-3.5 text-xs font-bold tracking-wider uppercase transition ${
                activeTab === 'logistics' ? 'bg-white text-slate-900 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-900'
              }`}
              onClick={() => setActiveTab('logistics')}
            >
              Dubai Logistics & VAT
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'specs' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-slate-50 rounded-lg flex justify-between">
                  <span className="text-slate-500">Composition:</span>
                  <span className="font-bold text-slate-900">{product.composition}</span>
                </div>
                {isFabric && (
                  <>
                    <div className="p-3 bg-slate-50 rounded-lg flex justify-between">
                      <span className="text-slate-500">Fabric Weight:</span>
                      <span className="font-bold text-slate-900">{product.gsm} g/m² (GSM)</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg flex justify-between">
                      <span className="text-slate-500">Roll Width:</span>
                      <span className="font-bold text-slate-900">{product.width}</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg flex justify-between">
                      <span className="text-slate-500">Yarn Gauge:</span>
                      <span className="font-bold text-slate-900">{product.yarnCount || '30s Combed Cotton'}</span>
                    </div>
                  </>
                )}
                {!isFabric && (
                  <>
                    <div className="p-3 bg-slate-50 rounded-lg flex justify-between">
                      <span className="text-slate-500">Manufacturing Lead Time:</span>
                      <span className="font-bold text-slate-900">{product.leadTime}</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg flex justify-between">
                      <span className="text-slate-500">Private Label Customization:</span>
                      <span className="font-bold text-slate-900">Woven neck labels & custom hangtags</span>
                    </div>
                  </>
                )}
                <div className="p-3 bg-slate-50 rounded-lg flex justify-between">
                  <span className="text-slate-500">Inspection Standard:</span>
                  <span className="font-bold text-slate-900">4-Point American System</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg flex justify-between">
                  <span className="text-slate-500">Certifications:</span>
                  <span className="font-bold text-slate-900">OEKO-TEX Standard 100 • ISO 9001</span>
                </div>
              </div>
            )}

            {activeTab === 'pricing' && (
              <div className="space-y-4">
                <p className="text-xs text-slate-500">Formal volume pricing is finalized upon Quote Cart submission based on shipping destination.</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="border-b border-slate-200 font-bold text-slate-900">
                        <th className="py-2">Volume Range</th>
                        <th className="py-2">Benchmark Rate ({currency.code})</th>
                        <th className="py-2">Incoterm</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {product.tieredPricing?.map(t => (
                        <tr key={t.tier}>
                          <td className="py-2.5 font-semibold text-slate-700">{t.tier}</td>
                          <td className="py-2.5 font-bold text-slate-900">~{formatUSDPrice(t.priceUSD)} /{product.unit}</td>
                          <td className="py-2.5 text-slate-500">FOB Jebel Ali, Dubai</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'logistics' && (
              <div className="space-y-3 text-xs text-slate-600">
                <div className="p-3 bg-slate-50 rounded-lg">
                  <span className="font-bold text-slate-900 block mb-1">Ocean Freight (FOB / CIF)</span>
                  Direct container dispatch from Jebel Ali Port, Dubai (the world’s 9th busiest port).
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <span className="font-bold text-slate-900 block mb-1">Air Cargo Priority</span>
                  48-hour global air cargo dispatch available via DXB / DWC for urgently required fabric rolls.
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <span className="font-bold text-slate-900 block mb-1">UAE Tax Regulations</span>
                  All commercial proformas include 5% UAE VAT in full accordance with Federal Tax Authority regulations (TRN 100482910200003).
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Items */}
        {relatedItems.length > 0 && (
          <div className="b2b-fade">
            <h2 className="text-lg font-bold text-slate-900 mb-6">Related Wholesale Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedItems.map(item => (
                <Link key={item.id} to={`/fabrics/${item.id}`} className="p-4 border border-slate-200 rounded-xl hover:shadow-md transition block bg-white">
                  <img src={item.image} alt={item.name} className="w-full h-36 object-cover rounded-lg mb-3" />
                  <h3 className="text-xs font-bold text-slate-900 truncate mb-1">{item.name}</h3>
                  <span className="text-xs font-black text-blue-600">From ~{formatUSDPrice(item.approxPriceUSD)} / {item.unit}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default B2BProductDetail;
