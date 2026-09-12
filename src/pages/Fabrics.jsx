import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { b2bFabrics } from '../data/mockData';
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
      <div className="text-center mb-xxl">
        <h1 className="section-title" style={{ marginBottom: '1rem' }}>Fabric Trading</h1>
        <p className="text-light" style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
          Browse our catalog of premium wholesale fabrics. Request samples to verify quality, or submit an RFQ for bulk pricing.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-xl" ref={containerRef}>
        {b2bFabrics.map(fabric => (
          <div key={fabric.id} className="fabric-card card">
            <div className="fabric-img-wrapper">
              <img src={fabric.image} alt={fabric.name} className="fabric-img" />
              <div className="fabric-badge">MOQ: {fabric.moq} {fabric.unit}</div>
            </div>
            <div className="fabric-info">
              <h3 className="fabric-name">{fabric.name}</h3>
              
              <div className="fabric-specs mt-md">
                <div className="spec-row"><span className="spec-label">Composition</span> <span className="spec-value">{fabric.composition}</span></div>
                <div className="spec-row"><span className="spec-label">GSM</span> <span className="spec-value">{fabric.gsm}</span></div>
                <div className="spec-row"><span className="spec-label">Width</span> <span className="spec-value">{fabric.width}</span></div>
              </div>

              <div className="fabric-colors mt-md">
                <p className="spec-label mb-xs">Available Colors:</p>
                <div className="flex gap-xs" style={{ flexWrap: 'wrap' }}>
                  {fabric.colors.map(color => (
                    <span key={color} className="color-tag">{color}</span>
                  ))}
                </div>
              </div>

              <div className="flex gap-sm mt-xl" style={{ marginTop: 'auto', paddingTop: '1.5rem' }}>
                <Link to={`/rfq?fabric=${fabric.id}&type=sample`} className="btn btn-outline" style={{ flex: 1, padding: '10px 12px', fontSize: '0.85rem' }}>Sample</Link>
                <Link to={`/rfq?fabric=${fabric.id}&type=quote`} className="btn btn-primary" style={{ flex: 2, padding: '10px 12px', fontSize: '0.85rem' }}>Request Quote</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fabrics;
