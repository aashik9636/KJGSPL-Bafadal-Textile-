import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { b2bFabrics } from '../data/mockData';
import gsap from 'gsap';

const RFQ = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const fabricId = searchParams.get('fabric');
  const initialType = searchParams.get('type') === 'sample' ? 'sample' : 'quote';
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    requestType: initialType,
    fabricId: fabricId || '',
    quantity: '',
    unit: 'KG',
    deliveryLocation: '',
    notes: ''
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
        <div style={{ width: '80px', height: '80px', background: '#d4edda', color: '#155724', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '2.5rem', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}>✓</div>
        <h2>Request Submitted Successfully</h2>
        <p className="text-light mt-md" style={{ maxWidth: '500px', fontSize: '1.1rem' }}>
          Thank you for your enquiry. Your {formData.requestType} request has been received. Our B2B team will contact you shortly with the details.
        </p>
        <button className="btn btn-primary mt-xl" style={{ padding: '12px 24px' }} onClick={() => navigate('/account')}>View My Account</button>
      </div>
    );
  }

  return (
    <div className="container section" style={{ maxWidth: '800px' }}>
      <h1 className="section-title text-center" style={{ marginBottom: '1rem' }}>Business Enquiry</h1>
      <p className="text-center text-light mb-xl" style={{ fontSize: '1.1rem' }}>Submit an RFQ or sample request for wholesale fabrics or OEM manufacturing.</p>
      
      <div className="card" style={{ padding: '3rem 2.5rem' }} ref={formRef}>
        <form onSubmit={handleSubmit}>
          <h3 className="mb-md" style={{ fontSize: '1.3rem', borderBottom: '2px solid var(--color-secondary)', paddingBottom: '0.5rem' }}>Company Details</h3>
          <div className="grid grid-cols-2 gap-md mb-xl">
            <div>
              <label>Company Name *</label>
              <input required type="text" placeholder="e.g. Acme Clothing" value={formData.companyName} onChange={e => setFormData({...formData, companyName: e.target.value})} />
            </div>
            <div>
              <label>Contact Person *</label>
              <input required type="text" placeholder="Full Name" value={formData.contactName} onChange={e => setFormData({...formData, contactName: e.target.value})} />
            </div>
            <div>
              <label>Business Email *</label>
              <input required type="email" placeholder="contact@company.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>
            <div>
              <label>Phone Number</label>
              <input type="tel" placeholder="+1 234 567 8900" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
            </div>
          </div>

          <h3 className="mb-md pt-md" style={{ fontSize: '1.3rem', borderBottom: '2px solid var(--color-secondary)', paddingBottom: '0.5rem' }}>Request Details</h3>
          <div className="grid gap-md mb-xl">
            <div className="mb-sm">
              <label>Request Type *</label>
              <div className="radio-group" style={{ marginTop: '12px' }}>
                <label>
                  <input type="radio" name="requestType" value="quote" checked={formData.requestType === 'quote'} onChange={e => setFormData({...formData, requestType: e.target.value})} /> Request a Quote
                </label>
                <label>
                  <input type="radio" name="requestType" value="sample" checked={formData.requestType === 'sample'} onChange={e => setFormData({...formData, requestType: e.target.value})} /> Request a Sample
                </label>
                <label>
                  <input type="radio" name="requestType" value="oem" checked={formData.requestType === 'oem'} onChange={e => setFormData({...formData, requestType: e.target.value})} /> OEM Manufacturing
                </label>
              </div>
            </div>

            {formData.requestType !== 'oem' && (
              <div>
                <label>Select Fabric/Article</label>
                <select value={formData.fabricId} onChange={e => setFormData({...formData, fabricId: e.target.value})}>
                  <option value="">Select a fabric...</option>
                  {b2bFabrics.map(f => (
                    <option key={f.id} value={f.id}>{f.name} ({f.composition})</option>
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
                <label>Unit</label>
                <select value={formData.unit} onChange={e => setFormData({...formData, unit: e.target.value})}>
                  <option value="KG">Kilograms (KG)</option>
                  <option value="Meters">Meters</option>
                  <option value="Yards">Yards</option>
                  <option value="Pieces">Pieces</option>
                </select>
              </div>
            </div>

            <div>
              <label>Delivery Location (City/Country) *</label>
              <input required type="text" placeholder="e.g. Mumbai, India" value={formData.deliveryLocation} onChange={e => setFormData({...formData, deliveryLocation: e.target.value})} />
            </div>

            <div>
              <label>Additional Notes or Specifications</label>
              <textarea rows={4} placeholder="Please provide any specific requirements regarding color, testing, packaging..." value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})}></textarea>
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '16px', fontSize: '1.1rem', borderRadius: '8px', letterSpacing: '1px' }}>Submit Request</button>
        </form>
      </div>
    </div>
  );
};

export default RFQ;
