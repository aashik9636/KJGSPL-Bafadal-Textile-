import React, { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { b2bFabrics, b2bGarments } from '../data/mockData';
import { Building2, FileText, CheckCircle2, Layers, ShieldCheck, ArrowRight, PackageCheck, Plus } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { useRfq } from '../context/RfqContext';
import gsap from 'gsap';

const Fabrics = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') === 'garments' ? 'garments' : 'fabrics';
  const [activeTab, setActiveTab] = useState(initialTab);
  const containerRef = useRef(null);
  
  const { formatUSDPrice, currency } = useCurrency();
  const { addToRfq, rfqCount } = useRfq();
  const [addedNotice, setAddedNotice] = useState(null);

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam === 'garments' && activeTab !== 'garments') {
      setActiveTab('garments');
    } else if (!tabParam && activeTab !== 'fabrics') {
      setActiveTab('fabrics');
    }
  }, [searchParams]);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: "power2.out" }
      );
    }
  }, [activeTab]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'garments') {
      setSearchParams({ tab: 'garments' });
    } else {
      searchParams.delete('tab');
      setSearchParams(searchParams);
    }
  };

  const handlePushFabricToQuote = (fabric, requestType = 'quote') => {
    addToRfq(fabric, {
      quantity: requestType === 'sample' ? 1 : fabric.moq,
      unit: requestType === 'sample' ? 'Swatch Kit' : fabric.unit,
      requestType,
      targetColor: fabric.colors[0],
      customNotes: requestType === 'sample' 
        ? `Request physical swatch kit for ${fabric.name} (${fabric.gsm} GSM).` 
        : `Wholesale bulk inquiry for ${fabric.name}, MOQ ${fabric.moq} ${fabric.unit}.`
    });

    setAddedNotice(`Added "${fabric.name}" to your B2B Quote Cart`);
    setTimeout(() => setAddedNotice(null), 3000);
  };

  const handlePushGarmentToQuote = (garment) => {
    addToRfq(garment, {
      quantity: garment.moq,
      unit: garment.unit,
      requestType: 'oem',
      targetColor: garment.colors[0],
      customNotes: `OEM bulk inquiry for ${garment.name}, MOQ ${garment.moq} ${garment.unit}. Custom brand labels and polybag packaging required.`
    });

    setAddedNotice(`Added "${garment.name}" to your B2B Quote Cart`);
    setTimeout(() => setAddedNotice(null), 3000);
  };

  return (
    <div className="bg-white min-h-screen py-10">
      
      {/* Toast Notification */}
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
        
        {/* Executive B2B Header */}
        <div className="border-b border-slate-200 pb-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-800 bg-blue-100/80 px-2.5 py-1 rounded-full uppercase tracking-wider mb-2.5">
                <Building2 size={13} className="text-blue-600" />
                <span>B2B WHOLESALE & MILL PORTAL • COMMERCIAL SOURCING</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Wholesale Fabric Rolls & OEM Garments</h1>
              <p className="text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
                Direct mill supply for clothing brands, apparel factories, and wholesale distributors. Minimum Order Quantities (MOQ) apply. <strong>Push multiple items to your Quote Cart</strong> to receive an official proforma invoice with 5% UAE VAT and FOB Dubai terms.
              </p>
            </div>

            <div className="hidden md:flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl p-3 shrink-0">
              <ShieldCheck size={20} className="text-emerald-500" />
              <div className="text-xs">
                <span className="font-bold text-slate-900 block">FTA TRN 100482910200003</span>
                <span className="text-slate-500">Official 5% UAE VAT Invoicing</span>
              </div>
            </div>
          </div>

          {/* Clean Tab Switcher (Like B2C Category Pills) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <button 
              type="button"
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition whitespace-nowrap ${
                activeTab === 'fabrics' 
                  ? 'bg-slate-900 text-white shadow-sm' 
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
              onClick={() => handleTabChange('fabrics')}
            >
              <Layers size={14} />
              <span>Fabric Rolls ({b2bFabrics.length})</span>
            </button>
            <button 
              type="button"
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition whitespace-nowrap ${
                activeTab === 'garments' 
                  ? 'bg-slate-900 text-white shadow-sm' 
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
              onClick={() => handleTabChange('garments')}
            >
              <Building2 size={14} />
              <span>OEM Wholesale Garments ({b2bGarments.length})</span>
            </button>
          </div>
        </div>

        {/* Active RFQ Notice Strip (Compact) */}
        {rfqCount > 0 && (
          <div className="mb-6 p-3.5 bg-blue-50/80 border border-blue-200 rounded-xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-blue-900">
              <FileText size={16} className="text-blue-600" />
              <span>You have <strong className="font-bold">{rfqCount} commercial item{rfqCount > 1 ? 's' : ''}</strong> in your Quote Cart.</span>
            </div>
            <Link to="/rfq" className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition shrink-0">
              Review Quote Cart ({rfqCount}) →
            </Link>
          </div>
        )}

        {/* Catalog Items */}
        {activeTab === 'fabrics' ? (
          <div>
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-100 text-xs text-slate-500">
              <h2 className="text-base font-bold text-slate-900">Fabric Rolls Collection ({b2bFabrics.length} Items)</h2>
              <span>Benchmark in <strong className="text-slate-900 font-bold">{currency.code}</strong> (Default: USD FOB Jebel Ali)</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" ref={containerRef}>
              {b2bFabrics.map(fabric => (
                <div key={fabric.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg hover:border-slate-300 transition flex flex-col justify-between">
                  <div>
                    <Link to={`/fabrics/${fabric.id}`} className="block relative aspect-[16/10] bg-slate-100 overflow-hidden">
                      <img src={fabric.image} alt={fabric.name} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition duration-500" />
                      <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-slate-900/80 text-white text-[10px] font-bold">
                        Commercial Mill Roll
                      </span>
                      <span className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold">
                        MOQ: {fabric.moq} {fabric.unit}
                      </span>
                    </Link>

                    <div className="p-5">
                      <div className="flex items-center justify-between mb-1">
                        <Link to={`/fabrics/${fabric.id}`} className="font-bold text-slate-900 text-base hover:text-blue-600 transition">
                          {fabric.name}
                        </Link>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          Tiered Mill Rates
                        </span>
                        <span className="text-sm font-black text-slate-900">
                          From ~{formatUSDPrice(fabric.approxPriceUSD)} / KG
                        </span>
                      </div>

                      {/* Technical Specs List */}
                      <div className="space-y-1.5 py-3 border-y border-slate-100 text-xs">
                        <div className="flex justify-between"><span className="text-slate-400">Composition:</span><span className="font-semibold text-slate-700">{fabric.composition}</span></div>
                        <div className="flex justify-between"><span className="text-slate-400">Weight (GSM):</span><span className="font-semibold text-slate-700">{fabric.gsm} g/m²</span></div>
                        <div className="flex justify-between"><span className="text-slate-400">Roll Width:</span><span className="font-semibold text-slate-700">{fabric.width}</span></div>
                      </div>

                      <div className="mt-3">
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">Mill Colors:</span>
                        <div className="flex flex-wrap gap-1">
                          {fabric.colors.map(col => (
                            <span key={col} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-medium">{col}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0 space-y-2">
                    <Link 
                      to={`/fabrics/${fabric.id}`} 
                      className="w-full block text-center py-2 bg-slate-50 hover:bg-blue-50 text-blue-700 font-bold text-xs rounded-lg border border-slate-200 transition"
                    >
                      View Specifications & Volume Rates →
                    </Link>

                    <div className="flex gap-2">
                      <button 
                        type="button"
                        className="flex-1 py-2 px-3 border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-lg transition"
                        onClick={() => handlePushFabricToQuote(fabric, 'sample')}
                      >
                        + Swatch Kit
                      </button>
                      <button 
                        type="button"
                        className="flex-[1.5] py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg transition flex items-center justify-center gap-1"
                        onClick={() => handlePushFabricToQuote(fabric, 'quote')}
                      >
                        <Plus size={14} />
                        <span>Push to Quote</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-100 text-xs text-slate-500">
              <h2 className="text-base font-bold text-slate-900">Wholesale Garments Collection ({b2bGarments.length} Styles)</h2>
              <span>Benchmark in <strong className="text-slate-900 font-bold">{currency.code}</strong> (Default: USD FOB Jebel Ali)</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" ref={containerRef}>
              {b2bGarments.map(garment => (
                <div key={garment.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg hover:border-slate-300 transition flex flex-col justify-between">
                  <div>
                    <Link to={`/fabrics/${garment.id}`} className="block relative aspect-[16/10] bg-slate-100 overflow-hidden">
                      <img src={garment.image} alt={garment.name} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition duration-500" />
                      <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-slate-900/80 text-white text-[10px] font-bold">
                        OEM Garment
                      </span>
                      <span className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold">
                        MOQ: {garment.moq} {garment.unit}
                      </span>
                    </Link>

                    <div className="p-5">
                      <div className="flex items-center justify-between mb-1">
                        <Link to={`/fabrics/${garment.id}`} className="font-bold text-slate-900 text-base hover:text-blue-600 transition">
                          {garment.name}
                        </Link>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          OEM Volume Tier
                        </span>
                        <span className="text-sm font-black text-slate-900">
                          From ~{formatUSDPrice(garment.approxPriceUSD)} / piece
                        </span>
                      </div>

                      <div className="space-y-1.5 py-3 border-y border-slate-100 text-xs">
                        <div className="flex justify-between"><span className="text-slate-400">Fabric/GSM:</span><span className="font-semibold text-slate-700">{garment.composition}</span></div>
                        <div className="flex justify-between"><span className="text-slate-400">Min Order:</span><span className="font-semibold text-slate-700">{garment.moq} Pieces</span></div>
                        <div className="flex justify-between"><span className="text-slate-400">Lead Time:</span><span className="font-semibold text-slate-700">{garment.leadTime}</span></div>
                      </div>

                      <div className="mt-3">
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">Available Colors:</span>
                        <div className="flex flex-wrap gap-1">
                          {garment.colors.map(col => (
                            <span key={col} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-medium">{col}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0 space-y-2">
                    <Link 
                      to={`/fabrics/${garment.id}`} 
                      className="w-full block text-center py-2 bg-slate-50 hover:bg-blue-50 text-blue-700 font-bold text-xs rounded-lg border border-slate-200 transition"
                    >
                      View OEM Specifications & Tiers →
                    </Link>

                    <button 
                      type="button"
                      className="w-full py-2.5 px-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg transition flex items-center justify-center gap-1.5"
                      onClick={() => handlePushGarmentToQuote(garment)}
                    >
                      <Plus size={14} />
                      <span>Push to Quote Cart ({garment.moq} pcs)</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4-Step Commercial Procurement Workflow */}
        <div className="mt-14 border-t border-slate-200 pt-10">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider block mb-1">Corporate Procurement Process</span>
            <h3 className="text-xl font-black text-slate-900">How B2B Wholesale Ordering Works</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
              <span className="text-xs font-bold text-blue-600">01</span>
              <h4 className="text-xs font-bold text-slate-900 mt-1 mb-1">Select Specifications</h4>
              <p className="text-[11px] text-slate-500">Pick GSM, roll width, and custom mill colors.</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
              <span className="text-xs font-bold text-blue-600">02</span>
              <h4 className="text-xs font-bold text-slate-900 mt-1 mb-1">Push to Quote Cart</h4>
              <p className="text-[11px] text-slate-500">Queue multiple fabric rolls or garments in one RFQ.</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
              <span className="text-xs font-bold text-blue-600">03</span>
              <h4 className="text-xs font-bold text-slate-900 mt-1 mb-1">Commercial Review</h4>
              <p className="text-[11px] text-slate-500">Receive formal FOB Dubai or CIF shipping rates.</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
              <span className="text-xs font-bold text-blue-600">04</span>
              <h4 className="text-xs font-bold text-slate-900 mt-1 mb-1">Proforma & 5% VAT</h4>
              <p className="text-[11px] text-slate-500">Official FTA TRN-compliant bank settlement.</p>
            </div>
          </div>
        </div>

        {/* OEM Manufacturing Banner */}
        <div className="mt-10 bg-slate-900 text-white rounded-2xl p-8 sm:p-10 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block mb-1">Dubai Hub • Jebel Ali Free Zone Logistics</span>
            <h3 className="text-xl sm:text-2xl font-black mb-2">Need Custom Private-Label Apparel with These Fabrics?</h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Bafadal Group delivers full package OEM production from spinning and custom knitting to finished garments with private brand labels, custom embroidery, and export-ready packaging under UAE FTA 5% VAT rules.
            </p>
          </div>
          <Link 
            to="/rfq?type=oem" 
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold transition shadow"
          >
            <span>Request OEM Quotation</span>
            <ArrowRight size={16} />
          </Link>
        </div>

      </div>

    </div>
  );
};

export default Fabrics;
