import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ShoppingBag, 
  Factory, 
  Layers, 
  ShieldCheck, 
  Building2, 
  Globe2, 
  Award, 
  CheckCircle2, 
  Truck, 
  FileText, 
  ChevronRight,
  Compass,
  MapPin,
  Mail,
  Phone,
  Check
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import gsap from 'gsap';

const Home = () => {
  const { currency } = useCurrency();
  const heroRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        gsap.fromTo('.hero-anim-item', 
          { y: 25, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out" }
        );
      }
      if (statsRef.current) {
        gsap.fromTo('.stat-box',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power2.out", delay: 0.3 }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-white text-slate-900">
      
      {/* 1. HERO SECTION: Clean & Simple Institutional Header */}
      <section className="relative bg-slate-950 text-white py-20 lg:py-28 overflow-hidden" ref={heroRef}>
        {/* Subtle background mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.12),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(245,158,11,0.08),transparent_50%)]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 text-xs font-semibold tracking-wider uppercase mb-6 hero-anim-item">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>BAFADAL TEXTILE TRADING LLC • DUBAI, UAE • EST. 1994</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white max-w-4xl leading-tight mb-6 hero-anim-item">
            Precision Fabric Milling & Global Apparel Manufacturing.
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed mb-12 hero-anim-item">
            Headquartered in Dubai, Bafadal Group unites three decades of textile heritage, circular knitting, and volume OEM production. We operate two distinct commerce channels tailored for global buyers and retail consumers.
          </p>

          {/* Two Clean Gateway Cards (No visual clutter!) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl hero-anim-item">
            
            {/* Card 1: B2C Retail Fashion */}
            <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-6 sm:p-8 hover:border-amber-500 transition shadow-lg flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                    <ShoppingBag size={20} />
                  </div>
                  <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Consumer Retail
                  </span>
                </div>
                <h2 className="text-xl font-bold text-white mb-2">Bstar Ready-to-Wear</h2>
                <p className="text-slate-300 text-sm leading-relaxed mb-5">
                  Direct retail fashion. Premium cotton t-shirts, french terry hoodies, and denim with instant card checkout.
                </p>
                <ul className="space-y-2 text-xs text-slate-200 mb-6">
                  <li className="flex items-center gap-2"><Check size={14} className="text-emerald-400" /> Individual piece ordering (Qty: 1+)</li>
                  <li className="flex items-center gap-2"><Check size={14} className="text-emerald-400" /> Standard retail pricing in {currency.code}</li>
                  <li className="flex items-center gap-2"><Check size={14} className="text-emerald-400" /> Instant Card & Apple Pay Checkout</li>
                </ul>
              </div>
              <Link 
                to="/shop" 
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-sm font-bold transition shadow"
              >
                <span>Shop Bstar Apparel</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Card 2: B2B Commercial Wholesale */}
            <div className="bg-slate-900/90 border border-blue-500/30 rounded-2xl p-6 sm:p-8 hover:border-blue-500 transition shadow-lg flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                    <Building2 size={20} />
                  </div>
                  <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    Commercial Wholesale
                  </span>
                </div>
                <h2 className="text-xl font-bold text-white mb-2">B2B Fabrics & OEM Hub</h2>
                <p className="text-slate-300 text-sm leading-relaxed mb-5">
                  Commercial fabric rolls & volume private-label manufacturing. Push multiple items to Quote Cart for unified RFQ.
                </p>
                <ul className="space-y-2 text-xs text-slate-200 mb-6">
                  <li className="flex items-center gap-2"><Check size={14} className="text-blue-400" /> Bulk fabric rolls (MOQ 100+ KG)</li>
                  <li className="flex items-center gap-2"><Check size={14} className="text-blue-400" /> Tiered FOB Jebel Ali Port rates (USD default)</li>
                  <li className="flex items-center gap-2"><Check size={14} className="text-blue-400" /> Multi-item Quote Basket & 5% UAE VAT</li>
                </ul>
              </div>
              <Link 
                to="/fabrics" 
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition shadow"
              >
                <span>Enter B2B Wholesale Portal</span>
                <ArrowRight size={16} />
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* 2. STATS COUNTER STRIP */}
      <section className="bg-slate-900 border-b border-slate-800 py-8" ref={statsRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="border-l-2 border-blue-500 pl-4 stat-box">
              <div className="text-2xl sm:text-3xl font-black text-white">25M+</div>
              <div className="text-xs text-slate-400 font-medium mt-1">Meters Annual Fabric Output</div>
            </div>
            <div className="border-l-2 border-blue-500 pl-4 stat-box">
              <div className="text-2xl sm:text-3xl font-black text-white">500+</div>
              <div className="text-xs text-slate-400 font-medium mt-1">Mill Fabric Formulations</div>
            </div>
            <div className="border-l-2 border-blue-500 pl-4 stat-box">
              <div className="text-2xl sm:text-3xl font-black text-white">60+</div>
              <div className="text-xs text-slate-400 font-medium mt-1">Export Destination Markets</div>
            </div>
            <div className="border-l-2 border-emerald-500 pl-4 stat-box">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400">100%</div>
              <div className="text-xs text-slate-400 font-medium mt-1">UAE FTA TRN & VAT Compliant</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORPORATE HERITAGE & PROFILE */}
      <section className="py-20 bg-slate-50 border-b border-slate-200" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 uppercase tracking-wider mb-3">
                <Compass size={14} />
                <span>Our Heritage & Corporate Profile</span>
              </div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-4">
                Rooted in Dubai. Powering Textiles Worldwide.
              </h2>
              <p className="text-slate-600 text-base leading-relaxed mb-4">
                Established over 30 years ago in Dubai’s historic commercial quarter, Bafadal Textile Trading LLC has grown into a vertically integrated textile powerhouse supplying fabric rolls and private-label apparel to brands across the GCC, Africa, Europe, and Asia.
              </p>
              <p className="text-slate-500 text-sm leading-relaxed mb-8">
                Operating directly from Dubai gives our partners an unmatched geographical advantage—immediate ocean freight connectivity through Jebel Ali Port and rapid air cargo via Dubai International Airport (DXB).
              </p>

              <div className="space-y-4">
                <div className="flex gap-3 items-start bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <div className="p-2 rounded-lg bg-amber-50 text-amber-600 shrink-0">
                    <Award size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">4-Point American Inspection Standard</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Every roll is lab-checked for shrinkage (&lt;3%), pilling resistance, and Delta E color accuracy.</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-600 shrink-0">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Official UAE FTA Tax Compliance</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Registered under TRN 100482910200003 with formal 5% UAE VAT documentation for international customs.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200">
              <img 
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&q=80" 
                alt="Bafadal Textile Mills" 
                className="w-full h-[420px] object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-slate-900/90 backdrop-blur-md text-white px-5 py-3 rounded-xl border border-slate-700 flex items-center gap-3">
                <span className="text-2xl font-black text-amber-400">30+</span>
                <span className="text-xs font-semibold leading-tight text-slate-300">Years of Textile<br />Manufacturing</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. MILL INFRASTRUCTURE (Clean 4-Card Grid) */}
      <section className="py-20 bg-white border-b border-slate-200" id="infrastructure">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
              <Factory size={14} />
              <span>Integrated Manufacturing</span>
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-3">High-Tech Mill Capabilities</h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              From combed yarn knitting to reactive dyeing and computerized garment assembly, our mill machinery operates to international ISO and OEKO-TEX specifications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1 */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition">
              <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80" alt="Knitting" className="w-full h-44 object-cover" />
              <div className="p-5">
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">01. Knitting</span>
                <h3 className="text-base font-bold text-slate-900 mt-1 mb-2">Circular & Flat Knitting</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  28G–32G high-gauge circular knitters producing Single Jersey, Interlock, Rib, and French Terry (140–420 GSM).
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition">
              <img src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80" alt="Dyeing" className="w-full h-44 object-cover" />
              <div className="p-5">
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">02. Dyeing</span>
                <h3 className="text-base font-bold text-slate-900 mt-1 mb-2">Reactive Dyeing Lab</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Computerized Datacolor spectrophotometers for Delta E &lt; 0.5 matching with OEKO-TEX Standard 100 eco-certified dyes.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition">
              <img src="https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=600&q=80" alt="Garmenting" className="w-full h-44 object-cover" />
              <div className="p-5">
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">03. Garments</span>
                <h3 className="text-base font-bold text-slate-900 mt-1 mb-2">CAD Cutting & Assembly</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Gerber computerized spreading & cutting tables supporting 12 assembly lines with 200,000 finished pieces/month capacity.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition">
              <img src="https://images.unsplash.com/photo-1574634534894-89d7576c8259?auto=format&fit=crop&w=600&q=80" alt="Quality Lab" className="w-full h-44 object-cover" />
              <div className="p-5">
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">04. Quality</span>
                <h3 className="text-base font-bold text-slate-900 mt-1 mb-2">Testing Laboratory</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Physical and chemical testing for tensile strength, Martindale pilling, colorfastness, and dimensional stability.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. TWO DEDICATED DIVISIONS (Clean Comparison Table) */}
      <section className="py-20 bg-slate-50 border-b border-slate-200" id="divisions">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 uppercase tracking-wider mb-2">
              <Layers size={14} />
              <span>Architectural Separation</span>
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Two Dedicated Channels</h2>
            <p className="text-sm text-slate-500">
              Clear segregation between retail consumers and commercial wholesale buyers.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="py-4 px-6 font-bold text-slate-900 w-1/3">Feature</th>
                    <th className="py-4 px-6 font-bold text-amber-700 bg-amber-50/50 w-1/3">Bstar Retail (B2C)</th>
                    <th className="py-4 px-6 font-bold text-blue-700 bg-blue-50/50 w-1/3">Bafadal Wholesale (B2B)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                  <tr>
                    <td className="py-3.5 px-6 font-semibold text-slate-700">Target Audience</td>
                    <td className="py-3.5 px-6 text-slate-600 bg-amber-50/20">Individual shoppers & consumers</td>
                    <td className="py-3.5 px-6 text-slate-600 bg-blue-50/20">Clothing brands, factories, traders</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-6 font-semibold text-slate-700">Minimum Order (MOQ)</td>
                    <td className="py-3.5 px-6 font-bold text-emerald-700 bg-amber-50/20">1 Piece (No MOQ)</td>
                    <td className="py-3.5 px-6 font-bold text-blue-700 bg-blue-50/20">100+ KG (Rolls) / 50 Pcs (Garments)</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-6 font-semibold text-slate-700">Default Currency</td>
                    <td className="py-3.5 px-6 text-slate-600 bg-amber-50/20">AED (or multi-currency selection)</td>
                    <td className="py-3.5 px-6 text-slate-600 bg-blue-50/20">USD FOB Jebel Ali benchmark</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-6 font-semibold text-slate-700">Ordering Model</td>
                    <td className="py-3.5 px-6 text-slate-600 bg-amber-50/20">Instant Credit / Debit Card Checkout</td>
                    <td className="py-3.5 px-6 text-slate-600 bg-blue-50/20">Multi-item Quote Basket & RFQ Proforma</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-6 font-semibold text-slate-700">Invoicing & Tax</td>
                    <td className="py-3.5 px-6 text-slate-600 bg-amber-50/20">5% UAE VAT included on receipt</td>
                    <td className="py-3.5 px-6 text-slate-600 bg-blue-50/20">FTA TRN 100482910200003 Tax Invoice</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-semibold text-slate-700">Direct Entry</td>
                    <td className="py-4 px-6 bg-amber-50/20">
                      <Link to="/shop" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition">
                        Shop Bstar <ArrowRight size={13} />
                      </Link>
                    </td>
                    <td className="py-4 px-6 bg-blue-50/20">
                      <Link to="/fabrics" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition">
                        Wholesale Hub <ArrowRight size={13} />
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>

      {/* 6. LOGISTICS BANNER */}
      <section className="py-16 bg-white border-b border-slate-200" id="logistics">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-2xl p-8 sm:p-12 text-white border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">
                <Truck size={14} />
                <span>Dubai Global Logistics Hub</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-3">
                Direct Jebel Ali Port Container Logistics
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Situated minutes from Jebel Ali Port, Bafadal Group handles ocean container shipments (FOB, CIF, CFR) to ports worldwide, alongside air freight through DXB and bonded overland trucking across the GCC.
              </p>
            </div>
            <Link 
              to="/fabrics" 
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-950 text-sm font-bold transition shadow"
            >
              <span>Explore Commercial Catalog</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. STANDARDS & CERTIFICATIONS */}
      <section className="py-16 bg-slate-50 border-b border-slate-200" id="standards">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Audited Quality & Environmental Standards</h2>
          <p className="text-xs sm:text-sm text-slate-500 mb-10">Certified by world-leading independent verification institutes.</p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm text-center">
              <ShieldCheck size={28} className="text-emerald-500 mx-auto mb-2" />
              <h3 className="text-sm font-bold text-slate-900">OEKO-TEX Standard 100</h3>
              <p className="text-[11px] text-slate-500 mt-1">Certified free from harmful chemicals.</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm text-center">
              <Award size={28} className="text-blue-600 mx-auto mb-2" />
              <h3 className="text-sm font-bold text-slate-900">ISO 9001:2015</h3>
              <p className="text-[11px] text-slate-500 mt-1">Quality Management System certified.</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm text-center">
              <CheckCircle2 size={28} className="text-amber-500 mx-auto mb-2" />
              <h3 className="text-sm font-bold text-slate-900">UAE FTA TRN Compliant</h3>
              <p className="text-[11px] text-slate-500 mt-1">TRN: 100482910200003 with 5% VAT.</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm text-center">
              <Globe2 size={28} className="text-indigo-500 mx-auto mb-2" />
              <h3 className="text-sm font-bold text-slate-900">GOTS Organic Cotton</h3>
              <p className="text-[11px] text-slate-500 mt-1">Global Organic Textile Standard certified.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CORPORATE INQUIRIES & HEADQUARTERS */}
      <section className="py-16 bg-white" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Connect with Bafadal Group Headquarters</h2>
                <p className="text-xs sm:text-sm text-slate-500 mb-6">
                  Our commercial trade managers and consumer retail desks are ready to assist with your specific textile procurement requirements.
                </p>
                <div className="space-y-3 text-xs text-slate-600">
                  <div className="flex items-center gap-2.5">
                    <MapPin size={16} className="text-blue-600 shrink-0" />
                    <span>Dubai Industrial City, Phase 2, Dubai, United Arab Emirates</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Mail size={16} className="text-blue-600 shrink-0" />
                    <span>b2b-export@bafadalgroup.ae • retail@bstarfashion.ae</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone size={16} className="text-blue-600 shrink-0" />
                    <span>+971 4 398 2200 (Dubai Direct Line)</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
                <Link 
                  to="/fabrics" 
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm transition shadow-sm"
                >
                  <Building2 size={16} />
                  <span>Wholesale Sourcing & RFQ</span>
                </Link>
                <Link 
                  to="/shop" 
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs sm:text-sm transition shadow-sm"
                >
                  <ShoppingBag size={16} />
                  <span>Shop Bstar Retail</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
