import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { b2bFabrics, b2bGarments } from '../data/mockData';
import { Building2, FileText, CheckCircle2, ShieldCheck, ArrowRight, Trash2, Plus, Globe } from 'lucide-react';
import { useRfq } from '../context/RfqContext';
import { useCurrency } from '../context/CurrencyContext';
import gsap from 'gsap';

const RFQ = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const fabricId = searchParams.get('fabric');
  const typeParam = searchParams.get('type');
  const articleParam = searchParams.get('article');

  const { rfqItems, addToRfq, removeFromRfq, updateRfqItem, clearRfq } = useRfq();
  const { formatUSDPrice, currency } = useCurrency();

  const formRef = useRef(null);

  useEffect(() => {
    if (fabricId && rfqItems.length === 0) {
      const selectedFabric = b2bFabrics.find(f => f.id === fabricId);
      if (selectedFabric) {
        addToRfq(selectedFabric, {
          quantity: typeParam === 'sample' ? 1 : selectedFabric.moq,
          unit: typeParam === 'sample' ? 'Swatch Kit' : selectedFabric.unit,
          requestType: typeParam === 'sample' ? 'sample' : 'quote',
          targetColor: selectedFabric.colors[0],
          customNotes: `Direct inquiry from fabric catalog for ${selectedFabric.name}.`
        });
      }
    } else if (articleParam && rfqItems.length === 0) {
      addToRfq({
        id: `oem-${Date.now()}`,
        name: articleParam,
        category: 'Wholesale Garment',
        moq: 100,
        unit: 'Pieces'
      }, {
        quantity: 100,
        unit: 'Pieces',
        requestType: 'oem',
        customNotes: `OEM apparel quotation for ${articleParam}. Custom patterns, private labeling and polybag export packing.`
      });
    }
  }, [fabricId, articleParam, typeParam]);

  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    trnNumber: '',
    deliveryLocation: 'Jebel Ali Port, Dubai (FOB)',
    tradeTerms: 'FOB Dubai',
    notes: '',
  });

  const [quickAddType, setQuickAddType] = useState('fabric');
  const [selectedCatalogId, setSelectedCatalogId] = useState('');
  const [quickQty, setQuickQty] = useState('200');

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedRfqId, setSubmittedRfqId] = useState('');

  useEffect(() => {
    if (formRef.current && !isSubmitted) {
      gsap.fromTo(formRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [isSubmitted]);

  const handleQuickAdd = () => {
    if (!selectedCatalogId) return;
    if (quickAddType === 'fabric') {
      const f = b2bFabrics.find(item => item.id === selectedCatalogId);
      if (f) {
        addToRfq(f, {
          quantity: parseInt(quickQty) || f.moq,
          unit: f.unit,
          requestType: 'quote',
          targetColor: f.colors[0],
          customNotes: `Bulk fabric roll inquiry for ${f.name}`
        });
      }
    } else {
      const g = b2bGarments.find(item => item.id === selectedCatalogId);
      if (g) {
        addToRfq(g, {
          quantity: parseInt(quickQty) || g.moq,
          unit: g.unit,
          requestType: 'oem',
          targetColor: g.colors[0],
          customNotes: `Wholesale finished garment order for ${g.name}`
        });
      }
    }
    setSelectedCatalogId('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const rfqId = `RFQ-DXB-${Math.floor(Math.random() * 900000) + 100000}`;
    setSubmittedRfqId(rfqId);
    setIsSubmitted(true);
    clearRfq();
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={36} />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">Commercial RFQ Received!</h1>
        <p className="text-xs sm:text-sm text-slate-500 mb-6">
          Your consolidated quotation inquiry has been routed to our Bafadal Dubai trade desk. A formal proforma invoice with 5% UAE VAT and freight incoterms will be emailed within 24 business hours.
        </p>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-left text-xs mb-8">
          <div className="flex justify-between border-b border-slate-200 pb-3 mb-3">
            <span className="text-slate-400">RFQ Invoicing Reference:</span>
            <span className="font-mono font-bold text-blue-600">{submittedRfqId}</span>
          </div>
          <div className="flex justify-between border-b border-slate-200 pb-3 mb-3">
            <span className="text-slate-400">Company Name:</span>
            <span className="font-bold text-slate-900">{formData.companyName || 'Not specified'}</span>
          </div>
          <div className="flex justify-between border-b border-slate-200 pb-3 mb-3">
            <span className="text-slate-400">Recipient Email:</span>
            <span className="font-bold text-slate-900">{formData.email}</span>
          </div>
          <div className="flex justify-between border-b border-slate-200 pb-3 mb-3">
            <span className="text-slate-400">Trade Port Incoterms:</span>
            <span className="font-bold text-slate-900">{formData.tradeTerms} ({formData.deliveryLocation})</span>
          </div>
          <div className="flex justify-between font-bold text-slate-900 pt-1">
            <span>Tax Protocol:</span>
            <span className="text-emerald-600">5% UAE VAT Proforma (FTA TRN: 100482910200003)</span>
          </div>
        </div>

        <Link to="/fabrics" className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition">
          Return to Wholesale Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" ref={formRef}>
      
      {/* Header */}
      <div className="border-b border-slate-200 pb-6 mb-8">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full mb-2">
          <span>B2B COMMERCIAL PROCUREMENT • PROFORMA QUOTE BASKET</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Request Commercial Quotation (RFQ)</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Push multiple fabric rolls or garments into this consolidated quote basket to receive official mill rates with 5% UAE VAT.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left 2 Cols: Items & Form */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Basket Items List */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Queued Items in Quote Cart ({rfqItems.length})
              </h2>
              {rfqItems.length > 0 && (
                <button 
                  type="button" 
                  onClick={clearRfq}
                  className="text-xs text-slate-400 hover:text-rose-500"
                >
                  Clear All
                </button>
              )}
            </div>

            {rfqItems.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-400">
                <FileText size={28} className="mx-auto mb-2 text-slate-300" />
                <p>No wholesale items in your quote cart yet.</p>
                <p className="text-[11px] text-slate-400 mt-1">Select items below or from the fabric catalog to add them.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {rfqItems.map((item) => (
                  <div key={item.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">{item.category}</span>
                      <h4 className="text-xs font-bold text-slate-900 truncate">{item.name}</h4>
                      <span className="text-[11px] text-slate-500">
                        Qty: <strong>{item.quantity} {item.unit}</strong> • Color: <strong>{item.targetColor}</strong> • Model: {item.requestType}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <button 
                        type="button" 
                        onClick={() => removeFromRfq(item.id)}
                        className="text-slate-400 hover:text-rose-500 p-1"
                        title="Remove item"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quick Add from Catalog */}
            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap gap-2 items-center">
              <span className="text-xs font-bold text-slate-600">Quick Add:</span>
              <select 
                value={quickAddType} 
                onChange={(e) => { setQuickAddType(e.target.value); setSelectedCatalogId(''); }}
                className="px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs bg-white font-medium"
              >
                <option value="fabric">Fabric Roll</option>
                <option value="garment">Wholesale Garment</option>
              </select>

              <select 
                value={selectedCatalogId} 
                onChange={(e) => setSelectedCatalogId(e.target.value)}
                className="px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs bg-white font-medium flex-1 min-w-[180px]"
              >
                <option value="">-- Choose Article --</option>
                {(quickAddType === 'fabric' ? b2bFabrics : b2bGarments).map(item => (
                  <option key={item.id} value={item.id}>
                    {item.name} (MOQ: {item.moq} {item.unit})
                  </option>
                ))}
              </select>

              <input 
                type="number" 
                placeholder="Qty" 
                value={quickQty} 
                onChange={(e) => setQuickQty(e.target.value)}
                className="w-20 px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs font-bold"
              />

              <button 
                type="button" 
                onClick={handleQuickAdd}
                className="px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition"
              >
                + Add
              </button>
            </div>
          </div>

          {/* Company & Shipping Form */}
          <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
              Buyer Commercial Profile
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Company / Brand Name *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Gulf Apparel Manufacturing Ltd"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Contact Officer Name *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Tarek Mansour (Procurement Manager)"
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Corporate Email Address *</label>
                <input 
                  type="email" 
                  required
                  placeholder="procurement@brand.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Direct Phone / WhatsApp *</label>
                <input 
                  type="tel" 
                  required
                  placeholder="+971 50 123 4567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">UAE Tax Registration No. (TRN) - If UAE entity</label>
                <input 
                  type="text" 
                  placeholder="100XXXXXXXXX (Optional for export)"
                  value={formData.trnNumber}
                  onChange={(e) => setFormData({ ...formData, trnNumber: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Requested Trade Term (Incoterm)</label>
                <select 
                  value={formData.tradeTerms}
                  onChange={(e) => setFormData({ ...formData, tradeTerms: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-medium bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="FOB Dubai">FOB Jebel Ali Port, Dubai (Standard)</option>
                  <option value="CIF Europe">CIF European Ports</option>
                  <option value="CIF GCC">CIF GCC Ports (Jeddah, Dammam, Doha)</option>
                  <option value="EXW Dubai">EXW Dubai Warehouse / Free Zone</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Technical Notes / Custom Pantone Colors / Packaging Specs</label>
              <textarea 
                rows={3}
                placeholder="Include custom Pantone reference codes, private labeling requirements, or target delivery windows..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <button 
              type="submit"
              disabled={rfqItems.length === 0}
              className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Submit Consolidated Commercial RFQ ({rfqItems.length} Articles)</span>
              <ArrowRight size={15} />
            </button>
          </form>

        </div>

        {/* Right 1 Col: Compliance & Terms */}
        <div>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sticky top-24 space-y-4 text-xs">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Dubai Trade Terms
            </h3>

            <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 block">5% UAE VAT (FTA Tax Compliance)</span>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                All proforma documentation is issued under UAE Federal Tax Authority rules (TRN 100482910200003). Export outside GCC is zero-rated upon customs declaration.
              </p>
            </div>

            <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 block">Payment Instrument</span>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Commercial wholesale orders are settled via Telegraphic Bank Wire Transfer (T/T) or Irrevocable Letter of Credit (L/C) at sight.
              </p>
            </div>

            <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 block">Lead Time & Dispatch</span>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Ready fabric rolls dispatch within 7-10 business days. Custom lab dip dyeing and private label OEM assembly take 25-35 business days.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RFQ;
