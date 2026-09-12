import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { b2bFabrics } from '../data/mockData';
import { Building2, FileText, CheckCircle2, AlertCircle, Layers, ShieldCheck, ArrowRight, PackageCheck } from 'lucide-react';
import gsap from 'gsap';
import './Fabrics.css';

const Fabrics = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current.children,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power2.out" }
      );
    }
  }, []);

  return (
    <div className="fabrics-page container section">
      {/* B2B Wholesale Hero & Notice */}
      <div className="b2b-header-box text-center mb-xl">
        <div className="b2b-pill-header">
          <Building2 size={16} />
          <span>B2B Commercial Wholesale Portal</span>
        </div>
        <h1 className="section-title" style={{ marginBottom: '1rem' }}>Wholesale Fabric Trading</h1>
        <p className="text-light" style={{ maxWidth: '650px', margin: '0 auto', fontSize: '1.05rem', lineHeight: '1.6' }}>
          Direct mill-grade knitted and woven fabrics for garment manufacturers, fashion brands, and exporters. 
        </p>

        {/* Wholesale Separation Notice Banner */}
        <div className="wholesale-notice-banner">
          <AlertCircle size={20} className="notice-icon" />
          <div className="notice-text">
            <strong>B2B Wholesale Channel:</strong> Minimum Order Quantity (MOQ: 100+ KG) applies to all fabrics. 
            Because bulk textiles require custom lab dips, roll weight verification, and freight logistics, 
            <strong> items are NOT added to consumer retail carts</strong> and <strong>cannot be paid via instant card checkout</strong>. 
            All wholesale orders are fulfilled via formal <strong>Quotation (RFQ)</strong> and commercial invoicing.
          </div>
        </div>
      </div>

      {/* B2B Workflow Steps */}
      <div className="b2b-steps-grid mb-xxl">
        <div className="b2b-step-card">
          <div className="step-num-badge">1</div>
          <Layers size={22} className="step-icon" />
          <h4>Select Specifications</h4>
          <p>Choose composition, GSM, roll width & colorways</p>
        </div>
        <div className="b2b-step-card">
          <div className="step-num-badge">2</div>
          <PackageCheck size={22} className="step-icon" />
          <h4>Order Swatch Sample</h4>
          <p>Get a physical fabric swatch kit delivered to inspect feel & quality</p>
        </div>
        <div className="b2b-step-card">
          <div className="step-num-badge">3</div>
          <FileText size={22} className="step-icon" />
          <h4>Request Volume RFQ</h4>
          <p>Receive custom tiered commercial quote based on your tonnage</p>
        </div>
        <div className="b2b-step-card">
          <div className="step-num-badge">4</div>
          <ShieldCheck size={22} className="step-icon" />
          <h4>Proforma & Dispatch</h4>
          <p>Bank transfer / LC commercial terms with mill dispatch</p>
        </div>
      </div>

      {/* Fabric Catalog */}
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
              
              <p className="fabric-quote-status">Commercial Quote on Request</p>

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
                <div className="fabric-actions-buttons flex gap-sm">
                  <Link 
                    to={`/rfq?fabric=${fabric.id}&type=sample`} 
                    className="btn btn-outline fabric-btn-sample" 
                    title="Order fabric swatch kit"
                  >
                    Sample Swatch
                  </Link>
                  <Link 
                    to={`/rfq?fabric=${fabric.id}&type=quote`} 
                    className="btn btn-primary fabric-btn-rfq" 
                    title="Request commercial RFQ quotation"
                  >
                    <FileText size={15} style={{ marginRight: '6px' }} />
                    Request Quote (RFQ)
                  </Link>
                </div>
                <p className="fabric-no-cart-note">
                  🔒 Wholesale item • Not available for retail card checkout
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* OEM Manufacturing Banner Callout */}
      <div className="b2b-oem-callout-card card mt-xxl">
        <div className="b2b-oem-content">
          <span className="b2b-oem-badge">Custom Full-Package Sourcing</span>
          <h2>Need Custom Knitted Garments with These Fabrics?</h2>
          <p>
            Bafadal Group also provides end-to-end OEM garment production from raw yarn to finished packaged apparel with custom labels, prints, and export packaging.
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
