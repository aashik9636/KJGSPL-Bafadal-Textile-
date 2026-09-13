import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { b2bFabrics, b2bGarments } from '../data/mockData';
import { Building2, FileText, CheckCircle2, ShieldCheck, ArrowRight, AlertCircle, Trash2, Plus, Globe } from 'lucide-react';
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

  // If query params specify an item and RFQ basket is empty, pre-populate it
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
    trnNumber: '', // UAE Tax Registration Number (FTA Compliant)
    deliveryLocation: 'Jebel Ali Port, Dubai (FOB)',
    tradeTerms: 'FOB Dubai',
    notes: '',
  });

  // Local quick-add selector
  const [quickAddType, setQuickAddType] = useState('fabric');
  const [selectedCatalogId, setSelectedCatalogId] = useState('');
  const [quickQty, setQuickQty] = useState('200');

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedRfqId, setSubmittedRfqId] = useState('');

  useEffect(() => {
    if (formRef.current && !isSubmitted) {
      gsap.fromTo(formRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
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
    const rfqId = `RFQ-DXB-${Math.floor(Math.random() * 90000) + 10000}`;
    setSubmittedRfqId(rfqId);
    setIsSubmitted(true);
    // clear basket after submission
    clearRfq();
  };

  if (isSubmitted) {
    return (
      <div className="container section text-center" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: '80px', height: '80px', background: '#ecfdf5', color: '#059669', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '2.5rem', boxShadow: '0 10px 20px rgba(0,0,0,0.05)', border: '2px solid #a7f3d0' }}>
          ✓
        </div>
        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1d4ed8', textTransform: 'uppercase', letterSpacing: '1px', background: '#eff6ff', padding: '4px 14px', borderRadius: '9999px', marginBottom: '0.5rem', border: '1px solid #bfdbfe' }}>
          B2B Quotation Submitted • Reference: {submittedRfqId}
        </span>
        <h2>Commercial Proforma Quote Request Received</h2>
        <p className="text-light mt-md" style={{ maxWidth: '560px', fontSize: '1.05rem', lineHeight: '1.6' }}>
          Thank you, <strong>{formData.companyName || 'Valued Commercial Partner'}</strong>. Your multi-item quotation inquiry has been routed to our Dubai B2B export desk. A formal Proforma Quote with 5% UAE VAT and freight breakdown will be sent to <strong>{formData.email}</strong>.
        </p>
        
        <div className="card mt-xl" style={{ padding: '1.25rem 2rem', background: '#f8fafc', maxWidth: '520px', textAlign: 'left', border: '1px solid #bfdbfe' }}>
          <div className="flex items-center gap-xs mb-xs">
            <ShieldCheck size={18} color="#2563eb" />
            <strong style={{ color: '#1e3a8a', fontSize: '0.9rem' }}>Dubai / UAE Commercial Trade Terms</strong>
          </div>
          <p style={{ fontSize: '0.82rem', color: '#475569', margin: 0, lineHeight: '1.5' }}>
            Orders are billed via FTA TRN-compliant Proforma Invoices with 5% UAE VAT (or Zero-Rated for documented Free Zone export shipments). Settlement via SWIFT Wire Transfer or Documentary Letter of Credit (LC).
          </p>
        </div>

        <div className="flex gap-md mt-xl">
          <button className="btn btn-primary" style={{ padding: '12px 24px' }} onClick={() => navigate('/account')}>View in B2B Portal</button>
          <button className="btn btn-outline" style={{ padding: '12px 24px' }} onClick={() => navigate('/fabrics')}>Browse More Wholesale Items</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container section" style={{ maxWidth: '900px' }}>
      {/* Header Banner */}
      <div className="text-center mb-xl">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#eff6ff', color: '#1d4ed8', padding: '4px 14px', borderRadius: '9999px', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.75rem', border: '1px solid #bfdbfe' }}>
          <Building2 size={15} />
          <span>B2B Commercial Procurement • Dubai UAE</span>
        </div>
        <h1 className="section-title" style={{ marginBottom: '0.5rem' }}>Request for Quotation (RFQ)</h1>
        <p className="text-light" style={{ fontSize: '1.05rem', maxWidth: '640px', margin: '0 auto' }}>
          Consolidated quote request for bulk fabric rolls, swatch sample kits, and Bstar wholesale OEM garments.
        </p>
        
        {/* UAE VAT Notice */}
        <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderLeft: '4px solid #d97706', padding: '10px 16px', borderRadius: '6px', marginTop: '1.25rem', textAlign: 'left', fontSize: '0.84rem', color: '#92400e', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <AlertCircle size={20} color="#d97706" style={{ flexShrink: 0 }} />
          <span>
            <strong>No Direct Card Checkout:</strong> Wholesale transactions are billed via commercial Proforma Invoices with <strong>5% UAE VAT</strong> and international trade terms (FOB Dubai / Jebel Ali Port or CIF destination).
          </span>
        </div>
      </div>
      
      <div className="card" style={{ padding: '2.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }} ref={formRef}>
        <form onSubmit={handleSubmit}>
          
          {/* Section 1: Multi-Item RFQ Basket Display */}
          <div className="mb-xl">
            <div className="flex justify-between items-center mb-sm" style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '0.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', color: '#0f172a', margin: 0 }}>
                1. Quotation Items Basket ({rfqItems.length} item{rfqItems.length !== 1 ? 's' : ''})
              </h3>
              <span style={{ fontSize: '0.8rem', color: '#2563eb', fontWeight: 600 }}>
                Consolidated RFQ Pricing ({currency.code})
              </span>
            </div>

            {rfqItems.length === 0 ? (
              <div style={{ background: '#f8fafc', border: '1px dashed #cbd5e1', borderRadius: '8px', padding: '1.5rem', textAlign: 'center', margin: '1rem 0' }}>
                <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
                  No items currently pushed to your Quote Cart. You can pick items below or from the catalog.
                </p>
                <Link to="/fabrics" className="btn btn-outline" style={{ fontSize: '0.82rem', padding: '6px 14px' }}>
                  Browse Wholesale Catalog to Push Items →
                </Link>
              </div>
            ) : (
              <div style={{ overflowX: 'auto', margin: '1rem 0' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', textAlign: 'left', color: '#475569' }}>
                      <th style={{ padding: '10px 12px' }}>Item</th>
                      <th style={{ padding: '10px 12px' }}>Type</th>
                      <th style={{ padding: '10px 12px', width: '130px' }}>Quantity</th>
                      <th style={{ padding: '10px 12px' }}>Unit</th>
                      <th style={{ padding: '10px 12px' }}>Specifications / Notes</th>
                      <th style={{ padding: '10px 12px', textAlign: 'center' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rfqItems.map((item, idx) => (
                      <tr key={`${item.id}-${idx}`} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '12px', fontWeight: 600, color: '#0f172a' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {item.image && (
                              <img src={item.image} alt="" style={{ width: '36px', height: '36px', objectFit: 'cover', borderRadius: '4px' }} />
                            )}
                            <div>
                              <div>{item.name}</div>
                              {item.gsm && <span style={{ fontSize: '0.72rem', color: '#64748b' }}>{item.gsm} GSM • {item.composition}</span>}
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '12px' }}>
                          <span style={{ 
                            fontSize: '0.74rem', 
                            padding: '2px 8px', 
                            borderRadius: '4px',
                            fontWeight: 700,
                            background: item.requestType === 'sample' ? '#fef3c7' : item.requestType === 'oem' ? '#f3e8ff' : '#eff6ff',
                            color: item.requestType === 'sample' ? '#92400e' : item.requestType === 'oem' ? '#6b21a8' : '#1e40af'
                          }}>
                            {item.requestType === 'sample' ? 'Swatch Kit' : item.requestType === 'oem' ? 'OEM Garment' : 'Fabric Roll'}
                          </span>
                        </td>
                        <td style={{ padding: '12px' }}>
                          <input 
                            type="number" 
                            min="1"
                            value={item.quantity} 
                            onChange={(e) => updateRfqItem(idx, 'quantity', e.target.value)}
                            style={{ width: '100%', padding: '6px 8px', fontSize: '0.85rem', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                          />
                        </td>
                        <td style={{ padding: '12px', color: '#475569', fontWeight: 500 }}>
                          {item.unit}
                        </td>
                        <td style={{ padding: '12px' }}>
                          <input 
                            type="text" 
                            placeholder="Target color, GSM tolerance, packaging..."
                            value={item.customNotes || ''} 
                            onChange={(e) => updateRfqItem(idx, 'customNotes', e.target.value)}
                            style={{ width: '100%', padding: '6px 8px', fontSize: '0.82rem', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                          />
                        </td>
                        <td style={{ padding: '12px', textAlign: 'center' }}>
                          <button 
                            type="button" 
                            onClick={() => removeFromRfq(idx)}
                            style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '4px' }}
                            title="Remove from Quote Basket"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Quick Add Another Item to Basket */}
            <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155' }}>
                + Add Another Item:
              </span>
              <select 
                value={quickAddType} 
                onChange={(e) => { setQuickAddType(e.target.value); setSelectedCatalogId(''); }}
                style={{ padding: '6px 10px', fontSize: '0.82rem', borderRadius: '4px', border: '1px solid #cbd5e1' }}
              >
                <option value="fabric">Fabric Roll</option>
                <option value="garment">Wholesale Garment</option>
              </select>

              <select 
                value={selectedCatalogId} 
                onChange={(e) => setSelectedCatalogId(e.target.value)}
                style={{ flex: 1, minWidth: '220px', padding: '6px 10px', fontSize: '0.82rem', borderRadius: '4px', border: '1px solid #cbd5e1' }}
              >
                <option value="">Select item to push...</option>
                {quickAddType === 'fabric' 
                  ? b2bFabrics.map(f => (
                      <option key={f.id} value={f.id}>{f.name} ({f.gsm} GSM) - MOQ {f.moq} KG</option>
                    ))
                  : b2bGarments.map(g => (
                      <option key={g.id} value={g.id}>{g.name} - MOQ {g.moq} Pcs</option>
                    ))
                }
              </select>

              <input 
                type="number" 
                placeholder="Qty" 
                value={quickQty} 
                onChange={(e) => setQuickQty(e.target.value)}
                style={{ width: '80px', padding: '6px 8px', fontSize: '0.82rem', borderRadius: '4px', border: '1px solid #cbd5e1' }}
              />

              <button 
                type="button" 
                className="btn btn-outline" 
                onClick={handleQuickAdd}
                disabled={!selectedCatalogId}
                style={{ padding: '6px 14px', fontSize: '0.82rem', background: 'white' }}
              >
                <Plus size={14} style={{ marginRight: '4px' }} />
                Push to Basket
              </button>
            </div>
          </div>

          {/* Section 2: Business & Corporate Information */}
          <h3 className="mb-md" style={{ fontSize: '1.2rem', borderBottom: '2px solid #f1f5f9', paddingBottom: '0.5rem', color: '#0f172a' }}>
            2. Business & Corporate Information
          </h3>
          <div className="grid grid-cols-2 gap-md mb-xl">
            <div>
              <label>Company / Brand Name *</label>
              <input required type="text" placeholder="e.g. Gulf Apparel Trading LLC" value={formData.companyName} onChange={e => setFormData({...formData, companyName: e.target.value})} />
            </div>
            <div>
              <label>Contact Person *</label>
              <input required type="text" placeholder="Full Name" value={formData.contactName} onChange={e => setFormData({...formData, contactName: e.target.value})} />
            </div>
            <div>
              <label>Corporate Business Email *</label>
              <input required type="email" placeholder="procurement@company.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>
            <div>
              <label>Business Phone / WhatsApp (with country code) *</label>
              <input required type="tel" placeholder="+971 50 123 4567" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
            </div>
            
            {/* FTA TRN */}
            <div style={{ gridColumn: 'span 2' }}>
              <label>TRN / Tax Registration Number (FTA UAE / GCC / International) (Optional)</label>
              <input 
                type="text" 
                placeholder="e.g. 100234567800003 (15-digit FTA Tax Registration Number)" 
                value={formData.trnNumber} 
                onChange={e => setFormData({...formData, trnNumber: e.target.value})} 
              />
              <span style={{ fontSize: '0.74rem', color: '#64748b', display: 'block', marginTop: '4px' }}>
                Used for issuing FTA-compliant 5% UAE VAT commercial invoices. If exporting outside UAE, specify your national tax ID.
              </span>
            </div>
          </div>

          {/* Section 3: Delivery & Trade Logistics */}
          <h3 className="mb-md pt-md" style={{ fontSize: '1.2rem', borderBottom: '2px solid #f1f5f9', paddingBottom: '0.5rem', color: '#0f172a' }}>
            3. Delivery Destination & Trade Terms
          </h3>
          <div className="grid grid-cols-2 gap-md mb-xl">
            <div>
              <label>Trade Incoterms *</label>
              <select value={formData.tradeTerms} onChange={e => setFormData({...formData, tradeTerms: e.target.value})}>
                <option value="FOB Dubai">FOB Jebel Ali Port, Dubai</option>
                <option value="CIF Destination">CIF (Delivered to Destination Sea/Air Port)</option>
                <option value="Ex-Mill Dubai">Ex-Mill Warehouse (Dubai Logistics City)</option>
                <option value="DDP UAE">DDP Doorstep Delivery within UAE</option>
              </select>
            </div>
            <div>
              <label>Destination City / Port of Delivery *</label>
              <input required type="text" placeholder="e.g. Jebel Ali Port (Dubai), Dammam, Jeddah, or London Gateway" value={formData.deliveryLocation} onChange={e => setFormData({...formData, deliveryLocation: e.target.value})} />
            </div>

            <div style={{ gridColumn: 'span 2' }}>
              <label>Special Instructions, Lab Dip Requirements, or Packaging Specifications</label>
              <textarea rows={3} placeholder="Specify GSM tolerance, Pantone shades, customized roll wrapping, barcode labels, target delivery schedule..." value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})}></textarea>
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', padding: '16px', fontSize: '1.05rem', borderRadius: '8px', letterSpacing: '0.5px' }}
          >
            Submit Consolidated RFQ Request ({rfqItems.length} items)
          </button>
        </form>
      </div>
    </div>
  );
};

export default RFQ;
