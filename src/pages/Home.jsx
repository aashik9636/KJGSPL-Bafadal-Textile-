import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Factory, Layers, Star, Truck, Shield, Headphones } from 'lucide-react';
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
          <span className="hero-label">BAFADAL GROUP</span>
          <h1>Textiles. Manufacturing.<br/>Garments.</h1>
          <p className="hero-desc">
            A unified platform connecting wholesale fabric trading, OEM manufacturing, and our premium consumer collection — BSTAAR.
          </p>
          <div className="hero-buttons">
            <Link to="/shop" className="btn btn-accent">
              Shop BSTAAR <ArrowRight size={16} />
            </Link>
            <Link to="/fabrics" className="btn btn-outline" style={{ borderColor: 'white', color: 'white' }}>
              Explore Fabrics
            </Link>
          </div>
        </div>
      </section>

      {/* Business Verticals */}
      <section className="section container">
        <div className="text-center mb-xl">
          <h2 className="section-title">Our Business Lines</h2>
          <p className="text-light" style={{ maxWidth: '500px', margin: '0 auto' }}>
            Three verticals working together to serve the entire textile value chain.
          </p>
        </div>
        <div className="verticals-grid">
          
          <Link to="/shop" className="vertical-card" ref={el => cardsRef.current[0] = el}>
            <div className="vertical-icon-wrap">
              <img src="/Garments-removebg-preview.png" alt="B Collection" style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
            </div>
            <h3>Ready-Made Garments</h3>
            <p>Explore our premium consumer collection of t-shirts, hoodies, jeans and more.</p>
            <span className="vertical-cta">Shop Garments <ArrowRight size={16} /></span>
          </Link>

          <Link to="/fabrics" className="vertical-card" ref={el => cardsRef.current[1] = el}>
            <div className="vertical-icon-wrap">
              <Layers size={28} />
            </div>
            <h3>Fabric Trading</h3>
            <p>Wholesale fabrics for businesses. Browse compositions, request samples and bulk quotes.</p>
            <span className="vertical-cta">Explore Fabrics <ArrowRight size={16} /></span>
          </Link>

          <Link to="/rfq" className="vertical-card" ref={el => cardsRef.current[2] = el}>
            <div className="vertical-icon-wrap">
              <Factory size={28} />
            </div>
            <h3>OEM Manufacturing</h3>
            <p>End-to-end manufacturing solutions for your clothing brand. From pattern to packaging.</p>
            <span className="vertical-cta">Request a Quote <ArrowRight size={16} /></span>
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
                <h4>Premium Quality</h4>
                <p>Rigorously tested fabrics and garments meeting international standards.</p>
              </div>
            </div>
            <div className="trust-item">
              <Truck size={24} />
              <div>
                <h4>Fast Delivery</h4>
                <p>Nationwide shipping with real-time tracking for every order.</p>
              </div>
            </div>
            <div className="trust-item">
              <Shield size={24} />
              <div>
                <h4>Secure Transactions</h4>
                <p>Encrypted payments and verified business accounts for B2B trade.</p>
              </div>
            </div>
            <div className="trust-item">
              <Headphones size={24} />
              <div>
                <h4>Dedicated Support</h4>
                <p>Expert assistance for sampling, sourcing, and production queries.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
