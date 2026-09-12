import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Factory, Layers, Star, Truck, Shield, Headphones, Building2, CreditCard, FileText, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import './Home.css';

const Home = () => {
  const heroRef = useRef(null);
  const cardsRef = useRef([]);
  const featuresRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(heroRef.current.children, 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power2.out" }
    );

    gsap.fromTo(cardsRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out", delay: 0.3 }
    );

    if (featuresRef.current) {
      gsap.fromTo(featuresRef.current.children,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out", delay: 0.6 }
      );
    }
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay" />
        <div className="container hero-content" ref={heroRef}>
          <span className="hero-label">BAFADAL GROUP COMMERCE</span>
          <h1>Textiles. Manufacturing.<br/>Garments.</h1>
          <p className="hero-desc">
            A dual-channel textile platform with dedicated separation for <strong>B2C Consumer Retail Shopping</strong> (Instant Card Checkout) and <strong>B2B Wholesale & OEM Manufacturing</strong> (Commercial RFQ Quotes).
          </p>
          <div className="hero-buttons">
            <Link to="/shop" className="btn btn-accent hero-btn-b2c">
              <ShoppingBag size={17} />
              <span>Shop B2C Garments</span>
            </Link>
            <Link to="/fabrics" className="btn btn-outline hero-btn-b2b" style={{ borderColor: 'white', color: 'white' }}>
              <Building2 size={17} />
              <span>B2B Wholesale Portal</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Dual Portal Gateway Section */}
      <section className="section dual-portal-section">
        <div className="container">
          <div className="text-center mb-xl">
            <span className="gateway-eyebrow">Two Distinct Commerce Channels</span>
            <h2 className="section-title" style={{ marginBottom: '0.75rem' }}>Select Your Destination</h2>
            <p className="text-light" style={{ maxWidth: '600px', margin: '0 auto' }}>
              Whether you are an individual retail consumer or a commercial clothing manufacturer, we have customized workflows designed for you.
            </p>
          </div>

          <div className="portal-cards-grid">
            {/* B2C Retail Card */}
            <div className="portal-gateway-card b2c">
              <div className="portal-card-badge b2c">🛍️ B2C Consumer Retail</div>
              <h3>BSTAAR Ready-to-Wear</h3>
              <p className="portal-card-desc">
                High-quality consumer fashion apparel crafted from our signature fabrics. Purchase individual pieces directly with rapid delivery.
              </p>
              
              <ul className="portal-feature-list">
                <li><CheckCircle2 size={16} color="#059669" /> Individual piece ordering (Qty: 1, 2, 3...)</li>
                <li><CheckCircle2 size={16} color="#059669" /> Direct "Add to Cart" consumer shopping</li>
                <li><CheckCircle2 size={16} color="#059669" /> Instant Credit / Debit Card & UPI Checkout</li>
                <li><CheckCircle2 size={16} color="#059669" /> 7-day hassle-free consumer returns</li>
              </ul>

              <div className="portal-card-footer">
                <Link to="/shop" className="btn btn-primary gateway-btn">
                  <span>Enter B2C Retail Store</span>
                  <ArrowRight size={16} />
                </Link>
                <span className="portal-terms-sub">Direct card payment • Retail receipts</span>
              </div>
            </div>

            {/* B2B Wholesale Card */}
            <div className="portal-gateway-card b2b">
              <div className="portal-card-badge b2b">🏢 B2B Commercial Wholesale</div>
              <h3>Wholesale Fabrics & OEM</h3>
              <p className="portal-card-desc">
                Bulk raw textile sourcing and contract manufacturing for fashion brands, retail chains, and garment factories across the globe.
              </p>

              <ul className="portal-feature-list">
                <li><CheckCircle2 size={16} color="#2563eb" /> Commercial rolls with MOQ (100+ KG)</li>
                <li><CheckCircle2 size={16} color="#2563eb" /> Physical swatch and fabric sample kits</li>
                <li><CheckCircle2 size={16} color="#2563eb" /> Formal RFQ quotation & proforma invoicing</li>
                <li><CheckCircle2 size={16} color="#2563eb" /> No retail card checkout • Corporate bank transfer / LC</li>
              </ul>

              <div className="portal-card-footer">
                <Link to="/fabrics" className="btn btn-primary gateway-btn b2b-btn">
                  <span>Enter B2B Wholesale Hub</span>
                  <ArrowRight size={16} />
                </Link>
                <span className="portal-terms-sub">Quote-based pricing • Commercial GST invoices</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Verticals */}
      <section className="section container">
        <div className="text-center mb-xl">
          <h2 className="section-title">Comprehensive Value Chain</h2>
          <p className="text-light" style={{ maxWidth: '500px', margin: '0 auto' }}>
            Three core verticals working harmoniously under the Bafadal banner.
          </p>
        </div>
        <div className="verticals-grid">
          
          <Link to="/shop" className="vertical-card" ref={el => cardsRef.current[0] = el}>
            <div className="vertical-icon-wrap">
              <img src="/Garments-removebg-preview.png" alt="B Collection" style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
            </div>
            <div className="flex items-center gap-xs mb-xs">
              <span className="vertical-tag b2c">B2C Retail</span>
            </div>
            <h3>Ready-Made Garments</h3>
            <p>Explore our premium consumer collection of t-shirts, hoodies, jeans with instant card checkout.</p>
            <span className="vertical-cta">Shop Retail Garments <ArrowRight size={16} /></span>
          </Link>

          <Link to="/fabrics" className="vertical-card" ref={el => cardsRef.current[1] = el}>
            <div className="vertical-icon-wrap">
              <Layers size={28} />
            </div>
            <div className="flex items-center gap-xs mb-xs">
              <span className="vertical-tag b2b">B2B Wholesale</span>
            </div>
            <h3>Fabric Trading</h3>
            <p>Wholesale rolls for clothing brands. Browse GSM, order swatch samples and get commercial quotes.</p>
            <span className="vertical-cta">Explore Fabrics <ArrowRight size={16} /></span>
          </Link>

          <Link to="/rfq" className="vertical-card" ref={el => cardsRef.current[2] = el}>
            <div className="vertical-icon-wrap">
              <Factory size={28} />
            </div>
            <div className="flex items-center gap-xs mb-xs">
              <span className="vertical-tag b2b">B2B Manufacturing</span>
            </div>
            <h3>OEM Manufacturing</h3>
            <p>End-to-end custom production for your apparel brand. From custom patterns to private labeling.</p>
            <span className="vertical-cta">Submit RFQ Request <ArrowRight size={16} /></span>
          </Link>

        </div>
      </section>

      {/* Trust Section */}
      <section className="trust-section">
        <div className="container">
          <div className="trust-grid" ref={featuresRef}>
            <div className="trust-item">
              <Star size={24} />
              <div>
                <h4>Certified Mill Quality</h4>
                <p>Rigorously lab-tested fabric rolls and finished garments meeting ISO standards.</p>
              </div>
            </div>
            <div className="trust-item">
              <CreditCard size={24} />
              <div>
                <h4>Secure Payment Channels</h4>
                <p>Encrypted consumer card payments for B2C and verified bank invoicing for B2B.</p>
              </div>
            </div>
            <div className="trust-item">
              <Truck size={24} />
              <div>
                <h4>Pan-India & Global Logistics</h4>
                <p>Doorstep consumer delivery and containerized freight shipping for commercial orders.</p>
              </div>
            </div>
            <div className="trust-item">
              <Headphones size={24} />
              <div>
                <h4>Dedicated Commerce Desk</h4>
                <p>Specialized accounts managers for wholesale sampling and prompt consumer assistance.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
