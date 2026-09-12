import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { b2bFabrics } from '../data/mockData';
import { Building2, FileText, CheckCircle2, ShieldCheck, ArrowRight, AlertCircle } from 'lucide-react';
import gsap from 'gsap';

const RFQ = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const fabricId = searchParams.get('fabric');
  const typeParam = searchParams.get('type');
  const articleParam = searchParams.get('article');

  const initialType = typeParam === 'sample' 
    ? 'sample' 
    : (typeParam === 'oem' || articleParam) 
      ? 'oem' 
      : 'quote';

  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    gstNumber: '',
    requestType: initialType,
    fabricId: fabricId || '',
    quantity: initialType === 'sample' ? '1' : '500',
    unit: initialType === 'oem' ? 'Pieces' : 'KG',
    deliveryLocation: '',
    notes: articleParam ? `Bulk quotation inquiry for OEM production of: ${articleParam}. Custom sizing, labels, and packaging required.` : ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (formRef.current && !isSubmitted) {
      gsap.fromTo(formRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }
  }, [isSubmitted]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="container section text-center" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: '80px', height: '80px', background: '#ecfdf5', color: '#059669', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '2.5rem', boxShadow: '0 10px 20px rgba(0,0,0,0.05)', border: '2px solid #a7f3d0' }}>
          ✓
        </div>
        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1d4ed8', textTransform: 'uppercase', letterSpacing: '1px', background: '#eff6ff', padding: '4px 12px', borderRadius: '9999px', marginBottom: '0.5rem' }}>
          B2B RFQ Submitted
        </span>
        <h2>Commercial Request Received Successfully</h2>
        <p className="text-light mt-md" style={{ maxWidth: '540px', fontSize: '1.05rem', lineHeight: '1.6' }}>
          Thank you, <strong>{formData.companyName || 'valued partner'}</strong>. Your commercial {formData.requestType === 'sample' ? 'swatch sample' : 'volume quotation'} inquiry has been routed to our textile procurement division. A formal Proforma Quote will be sent to <strong>{formData.email}</strong>.
        </p>
        
        <div className="card mt-xl" style={{ padding: '1.25rem 2rem', background: '#f8fafc', maxWidth: '500px', textAlign: 'left', border: '1px solid #bfdbfe' }}>
          <div className="flex items-center gap-xs mb-xs">
            <ShieldCheck size={18} color="#2563eb" />
            <strong style={{ color: '#1e3a8a', fontSize: '0.9rem' }}>B2B Payment & Trade Terms</strong>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#475569', margin: 0 }}>
            Bulk orders are settled via Commercial Invoice / Letter of Credit / Bank Wire after sample approvals. No retail card charges apply.
          </p>
        </div>

        <div className="flex gap-md mt-xl">
          <button className="btn btn-primary" style={{ padding: '12px 24px' }} onClick={() => navigate('/account')}>View in B2B Portal</button>
          <button className="btn btn-outline" style={{ padding: '12px 24px' }} onClick={() => navigate('/fabrics')}>Browse More Fabrics</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container section" style={{ maxWidth: '840px' }}>
      {/* Header Banner */}
      <div className="text-center mb-xl">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#eff6ff', color: '#1d4ed8', padding: '4px 14px', borderRadius: '9999px', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.75rem', border: '1px solid #bfdbfe' }}>
          <Building2 size={15} />
          <span>B2B Commercial Procurement</span>
        </div>
        <h1 className="section-title" style={{ marginBottom: '0.5rem' }}>Request for Quotation (RFQ)</h1>
        <p className="text-light" style={{ fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
          Submit your bulk fabric or OEM manufacturing requirements for commercial mill pricing and physical swatches.
        </p>
        
        <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderLeft: '4px solid #d97706', padding: '10px 16px', borderRadius: '6px', marginTop: '1.25rem', textAlign: 'left', fontSize: '0.82rem', color: '#92400e', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <AlertCircle size={18} color="#d97706" style={{ flexShrink: 0 }} />
          <span>
            <strong>No Direct Card Checkout:</strong> B2B transactions are billed on Proforma Invoices with commercial GST and freight terms rather than standard consumer card checkout.
          </span>
        </div>
      </div>
      
      <div className="card" style={{ padding: '3rem 2.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }} ref={formRef}>
        <form onSubmit={handleSubmit}>
          {/* Company Details */}
          <h3 className="mb-md" style={{ fontSize: '1.2rem', borderBottom: '2px solid #f1f5f9', paddingBottom: '0.5rem', color: '#0f172a' }}>
            1. Business / Corporate Information
          </h3>
          <div className="grid grid-cols-2 gap-md mb-xl">
            <div>
              <label>Company / Brand Name *</label>
              <input required type="text" placeholder="e.g. Acme Clothing Ltd." value={formData.companyName} onChange={e => setFormData({...formData, companyName: e.target.value})} />
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
              <label>Business Phone / WhatsApp *</label>
              <input required type="tel" placeholder="+91 98765 43210" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label>GST / Tax Identification Number (Optional)</label>
              <input type="text" placeholder="e.g. 27AAAAA0000A1Z5" value={formData.gstNumber} onChange={e => setFormData({...formData, gstNumber: e.target.value})} />
            </div>
          </div>

          {/* Request Details */}
          <h3 className="mb-md pt-md" style={{ fontSize: '1.2rem', borderBottom: '2px solid #f1f5f9', paddingBottom: '0.5rem', color: '#0f172a' }}>
            2. Procurement Specifications
          </h3>
          <div className="grid gap-md mb-xl">
            <div>
              <label>Enquiry Category *</label>
              <div className="radio-group" style={{ marginTop: '10px', display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                  <input type="radio" name="requestType" value="quote" checked={formData.requestType === 'quote'} onChange={e => setFormData({...formData, requestType: e.target.value, unit: 'KG'})} />
                  <span>Wholesale Fabric Quote (Rolls)</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                  <input type="radio" name="requestType" value="sample" checked={formData.requestType === 'sample'} onChange={e => setFormData({...formData, requestType: e.target.value, unit: 'Swatch Kit', quantity: '1'})} />
                  <span>Fabric Swatch Sample Kit</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                  <input type="radio" name="requestType" value="oem" checked={formData.requestType === 'oem'} onChange={e => setFormData({...formData, requestType: e.target.value, unit: 'Pieces', quantity: '500'})} />
                  <span>OEM Garment Manufacturing</span>
                </label>
              </div>
            </div>

            {formData.requestType !== 'oem' && (
              <div>
                <label>Select Mill Fabric</label>
                <select value={formData.fabricId} onChange={e => setFormData({...formData, fabricId: e.target.value})}>
                  <option value="">Select a fabric from catalog...</option>
                  {b2bFabrics.map(f => (
                    <option key={f.id} value={f.id}>{f.name} — {f.composition} ({f.gsm} GSM)</option>
                  ))}
                </select>
              </div>
            )}

            <div className="grid grid-cols-2 gap-md">
              <div>
                <label>Estimated Quantity *</label>
                <input required type="number" placeholder="e.g. 500" value={formData.quantity} onChange={e => setFormData({...formData, quantity: e.target.value})} />
              </div>
              <div>
                <label>Unit of Measure</label>
                <select value={formData.unit} onChange={e => setFormData({...formData, unit: e.target.value})}>
                  <option value="KG">Kilograms (KG) — Fabric Rolls</option>
                  <option value="Meters">Meters</option>
                  <option value="Pieces">Finished Garment Pieces</option>
                  <option value="Swatch Kit">Swatch Kit</option>
                </select>
              </div>
            </div>

            <div>
              <label>Destination City / Port of Delivery *</label>
              <input required type="text" placeholder="e.g. Tirupur, Surat, Mumbai, or International Port" value={formData.deliveryLocation} onChange={e => setFormData({...formData, deliveryLocation: e.target.value})} />
            </div>

            <div>
              <label>Technical Specifications & Custom Requirements</label>
              <textarea rows={4} placeholder="Specify GSM tolerance, Pantone color codes, custom lab dip requirements, packaging specifications..." value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})}></textarea>
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '16px', fontSize: '1.05rem', borderRadius: '8px', letterSpacing: '0.5px' }}>
            Submit Commercial RFQ Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default RFQ;
