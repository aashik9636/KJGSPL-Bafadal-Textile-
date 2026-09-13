import React, { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { b2bFabrics, b2bGarments } from '../data/mockData';
import { Building2, FileText, CheckCircle2, AlertCircle, Layers, ShieldCheck, ArrowRight, PackageCheck, Plus, Check, ShoppingCart } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { useRfq } from '../context/RfqContext';
import gsap from 'gsap';
import './Fabrics.css';

const Fabrics = () => {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') === 'garments' ? 'garments' : 'fabrics';
  const [activeTab, setActiveTab] = useState(initialTab);
  const containerRef = useRef(null);
  
  const { formatUSDPrice, currency } = useCurrency();
  const { addToRfq, rfqCount } = useRfq();
  const [addedNotice, setAddedNotice] = useState(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }
      );
    }
  }, [activeTab]);

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

    setAddedNotice(`${fabric.name} added to your B2B Quote Cart!`);
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

    setAddedNotice(`${garment.name} added to your B2B Quote Cart!`);
    setTimeout(() => setAddedNotice(null), 3000);
  };

  return (
    <div className="fabrics-page container section">
      {/* Toast Notification when item is pushed to Quote Cart */}
      {addedNotice && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          background: '#0f172a',
          color: '#ffffff',
          padding: '14px 22px',
          borderRadius: '10px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          zIndex: 2000,
          border: '1px solid #334155',
          animation: 'fadeInUp 0.3s ease-out'
        }}>
          <CheckCircle2 size={20} color="#10b981" />
          <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{addedNotice}</span>
          <Link to="/rfq" style={{ background: '#2563eb', color: 'white', padding: '4px 10px', borderRadius: '4px', fontSize: '0.78rem', fontWeight: 700, marginLeft: '8px' }}>
            View Quote Cart ({rfqCount}) →
          </Link>
        </div>
      )}

      {/* B2B Wholesale Hero & Notice */}
      <div className="b2b-header-box text-center mb-xl">
        <div className="b2b-pill-header">
          <Building2 size={16} />
          <span>B2B Commercial Wholesale & Export Hub • Dubai UAE</span>
        </div>
        <h1 className="section-title" style={{ marginBottom: '1rem' }}>B2B Wholesale Procurement</h1>
        <p className="text-light" style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.05rem', lineHeight: '1.6' }}>
          Bulk fabric rolls, knitting yarns, and Bstar wholesale OEM garments for apparel brands, buying houses, and garment factories.
        </p>

        {/* Wholesale Separation Notice Banner - Dubai VAT & No Card Checkout */}
        <div className="wholesale-notice-banner">
          <AlertCircle size={22} className="notice-icon" />
          <div className="notice-text">
            <strong>B2B Quotation Channel (No Direct Card Checkout):</strong> Minimum Order Quantities (MOQ: 100+ KG for fabrics, 50-100 pcs for garments) apply. 
            All wholesale orders are supplied on <strong>Proforma Invoices with 5% UAE VAT</strong> and international trade incoterms (FOB Jebel Ali Port, Dubai / CIF Global). 
            You can <strong>push multiple items into your Quote Cart</strong> and submit a single consolidated RFQ.
          </div>
        </div>

        {/* Tab Switcher between Wholesale Fabrics & Wholesale Garments */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '2rem' }}>
          <button 
            type="button"
            className={`btn ${activeTab === 'fabrics' ? 'btn-primary' : 'btn-outline'}`}
            style={{ padding: '10px 24px', borderRadius: '9999px', fontSize: '0.9rem', fontWeight: 700 }}
            onClick={() => setActiveTab('fabrics')}
          >
            <Layers size={16} style={{ marginRight: '6px' }} />
            Wholesale Fabric Rolls (MOQ: 100+ KG)
          </button>
          <button 
            type="button"
            className={`btn ${activeTab === 'garments' ? 'btn-primary' : 'btn-outline'}`}
            style={{ padding: '10px 24px', borderRadius: '9999px', fontSize: '0.9rem', fontWeight: 700 }}
            onClick={() => setActiveTab('garments')}
          >
            <Building2 size={16} style={{ marginRight: '6px' }} />
            Wholesale Garments (Bstar OEM • MOQ: 50+ Pcs)
          </button>
        </div>
      </div>

      {/* Floating RFQ Basket Callout if items present */}
      {rfqCount > 0 && (
        <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '10px', padding: '12px 20px', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div className="flex items-center gap-sm">
            <FileText size={20} color="#1d4ed8" />
            <span style={{ fontSize: '0.9rem', color: '#1e3a8a', fontWeight: 600 }}>
              You have <strong>{rfqCount} wholesale item{rfqCount > 1 ? 's' : ''}</strong> queued in your Quote Cart.
            </span>
          </div>
          <Link to="/rfq" className="btn btn-primary" style={{ padding: '8px 18px', fontSize: '0.85rem' }}>
            Review & Submit Consolidated RFQ →
          </Link>
        </div>
      )}

      {/* 4-Step Wholesale Procurement Guide */}
      <div className="b2b-steps-grid mb-xxl">
        <div className="b2b-step-card">
          <div className="step-num-badge">1</div>
          <Layers size={22} className="step-icon" />
          <h4>Select Specifications</h4>
          <p>Choose roll composition, GSM, or finished garment cut & sew options</p>
        </div>
        <div className="b2b-step-card">
          <div className="step-num-badge">2</div>
          <PackageCheck size={22} className="step-icon" />
          <h4>Push Multiple to Cart</h4>
          <p>Add multiple fabrics and garment styles to your Quote Cart</p>
        </div>
        <div className="b2b-step-card">
          <div className="step-num-badge">3</div>
          <FileText size={22} className="step-icon" />
          <h4>Request Consolidated RFQ</h4>
          <p>Get formal mill pricing with FOB Dubai / CIF freight options</p>
        </div>
        <div className="b2b-step-card">
          <div className="step-num-badge">4</div>
          <ShieldCheck size={22} className="step-icon" />
          <h4>Proforma & 5% VAT</h4>
          <p>Commercial bank wire settlement and FTA TRN-compliant documentation</p>
        </div>
      </div>

      {/* Catalog Display */}
      {activeTab === 'fabrics' ? (
        <div>
          <div className="flex justify-between items-center mb-lg">
            <h2 style={{ fontSize: '1.4rem' }}>Wholesale Mill Fabrics Catalog</h2>
            <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Showing wholesale benchmark in {currency.code} (Default USD for B2B)</span>
          </div>

          <div className="grid grid-cols-3 gap-xl" ref={containerRef}>
            {b2bFabrics.map(fabric => (
              <div key={fabric.id} className="fabric-card card">
                <div className="fabric-img-wrapper">
                  <img src={fabric.image} alt={fabric.name} className="fabric-img" />
                  <div className="fabric-b2b-tag">B2B Wholesale Only</div>
                  <div className="fabric-badge">MOQ: {fabric.moq} {fabric.unit}</div>
                </div>
                <div className="fabric-info">
                  <div className="flex justify-between items-start mb-xs">
                    <h3 className="fabric-name">{fabric.name}</h3>
                  </div>
                  
                  <div className="flex justify-between items-center mt-xs">
                    <p className="fabric-quote-status">Tiered Mill Pricing</p>
                    <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a' }}>
                      From ~{formatUSDPrice(fabric.approxPriceUSD)} / KG
                    </span>
                  </div>

                  <div className="fabric-specs mt-md">
                    <div className="spec-row"><span className="spec-label">Composition</span> <span className="spec-value">{fabric.composition}</span></div>
                    <div className="spec-row"><span className="spec-label">GSM (Weight)</span> <span className="spec-value">{fabric.gsm} g/m²</span></div>
                    <div className="spec-row"><span className="spec-label">Roll Width</span> <span className="spec-value">{fabric.width}</span></div>
                    <div className="spec-row"><span className="spec-label">Supply Model</span> <span className="spec-value">Direct Mill Roll</span></div>
                  </div>

                  <div className="fabric-colors mt-md">
                    <p className="spec-label mb-xs">Available Mill Colors:</p>
                    <div className="flex gap-xs" style={{ flexWrap: 'wrap' }}>
                      {fabric.colors.map(color => (
                        <span key={color} className="color-tag">{color}</span>
                      ))}
                    </div>
                  </div>

                  <div className="fabric-actions-wrapper mt-xl">
                    <div className="fabric-actions-buttons flex gap-sm mb-xs">
                      <button 
                        type="button"
                        className="btn btn-outline fabric-btn-sample" 
                        onClick={() => handlePushFabricToQuote(fabric, 'sample')}
                        title="Add swatch sample kit to Quote Cart"
                      >
                        + Swatch Kit
                      </button>
                      <button 
                        type="button"
                        className="btn btn-primary fabric-btn-rfq" 
                        onClick={() => handlePushFabricToQuote(fabric, 'quote')}
                        title="Add bulk roll requirement to Quote Cart"
                      >
                        <Plus size={15} style={{ marginRight: '4px' }} />
                        Push to Quote Cart
                      </button>
                    </div>
                    <p className="fabric-no-cart-note">
                      🔒 Wholesale item • Billed via Proforma Invoice with 5% UAE VAT
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-lg">
            <h2 style={{ fontSize: '1.4rem' }}>Wholesale Bstar Finished Garments (OEM / Private Label)</h2>
            <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Showing wholesale benchmark in {currency.code} (Default USD for B2B)</span>
          </div>

          <div className="grid grid-cols-3 gap-xl" ref={containerRef}>
            {b2bGarments.map(garment => (
              <div key={garment.id} className="fabric-card card">
                <div className="fabric-img-wrapper">
                  <img src={garment.image} alt={garment.name} className="fabric-img" />
                  <div className="fabric-b2b-tag">Wholesale Garment</div>
                  <div className="fabric-badge">MOQ: {garment.moq} {garment.unit}</div>
                </div>
                <div className="fabric-info">
                  <div className="flex justify-between items-start mb-xs">
                    <h3 className="fabric-name">{garment.name}</h3>
                  </div>
                  
                  <div className="flex justify-between items-center mt-xs">
                    <p className="fabric-quote-status">Volume OEM Tier</p>
                    <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a' }}>
                      From ~{formatUSDPrice(garment.approxPriceUSD)} / piece
                    </span>
                  </div>

                  <div className="fabric-specs mt-md">
                    <div className="spec-row"><span className="spec-label">Fabric / GSM</span> <span className="spec-value">{garment.composition}</span></div>
                    <div className="spec-row"><span className="spec-label">Minimum Order</span> <span className="spec-value">{garment.moq} Pieces</span></div>
                    <div className="spec-row"><span className="spec-label">Lead Time</span> <span className="spec-value">{garment.leadTime}</span></div>
                    <div className="spec-row"><span className="spec-label">Customization</span> <span className="spec-value">Labels & Hangtags</span></div>
                  </div>

                  <div className="fabric-colors mt-md">
                    <p className="spec-label mb-xs">Color Options:</p>
                    <div className="flex gap-xs" style={{ flexWrap: 'wrap' }}>
                      {garment.colors.map(color => (
                        <span key={color} className="color-tag">{color}</span>
                      ))}
                    </div>
                  </div>

                  <div className="fabric-actions-wrapper mt-xl">
                    <button 
                      type="button"
                      className="btn btn-primary" 
                      style={{ width: '100%', padding: '12px', fontSize: '0.85rem' }}
                      onClick={() => handlePushGarmentToQuote(garment)}
                    >
                      <Plus size={15} style={{ marginRight: '6px' }} />
                      Push to Quote Cart ({garment.moq} pcs)
                    </button>
                    <p className="fabric-no-cart-note">
                      🔒 Wholesale apparel • Proforma Invoice with 5% UAE VAT & TRN
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* OEM Manufacturing Banner Callout */}
      <div className="b2b-oem-callout-card card mt-xxl">
        <div className="b2b-oem-content">
          <span className="b2b-oem-badge">Dubai Hub • Jebel Ali Free Zone Logistics</span>
          <h2>Need Custom Knitted Garments with These Fabrics?</h2>
          <p>
            Bafadal Group provides end-to-end OEM garment production from raw yarn to finished packaged apparel with custom labels, prints, and export packaging with 5% UAE VAT compliance.
          </p>
        </div>
        <Link to="/rfq?type=oem" className="btn btn-primary b2b-oem-btn">
          <span>Explore OEM Manufacturing</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};

export default Fabrics;
