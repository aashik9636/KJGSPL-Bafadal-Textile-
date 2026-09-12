import React, { useEffect, useRef } from 'react';
import { dummyDashboardStats, b2bQuotes, salesData } from '../data/mockData';
import { Inbox, FileText, Truck, AlertTriangle, IndianRupee, Briefcase, TrendingUp, Users } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import gsap from 'gsap';

const Dashboard = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }
      );
    }
  }, []);

  return (
    <div className="container section" style={{ background: '#f8f9fa', minHeight: '100vh', padding: '2rem' }}>
      <div className="flex justify-between items-center mb-xl">
        <div>
          <h1 className="section-title text-left" style={{ marginBottom: '4px', fontSize: '2rem' }}>Operations Overview</h1>
          <p className="text-light">Bafadal Internal ERP Dashboard Preview</p>
        </div>
        <div className="flex items-center gap-md">
          <span className="text-light" style={{ fontSize: '0.9rem' }}>Last updated: Just now</span>
          <button className="btn btn-primary" style={{ padding: '8px 16px', borderRadius: '8px' }}>Generate Report</button>
        </div>
      </div>

      <div ref={containerRef}>
        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-md mb-xl">
          <div className="card" style={{ padding: '1.5rem', borderLeft: '4px solid #1976d2' }}>
            <div className="flex justify-between items-center mb-sm">
              <h3 style={{ fontSize: '0.95rem', color: 'var(--color-text-light)' }}>Total Revenue (MTD)</h3>
              <IndianRupee size={20} color="#1976d2" />
            </div>
            <p style={{ fontSize: '1.8rem', fontWeight: 700 }}>₹14.2M</p>
            <p className="mt-xs" style={{ fontSize: '0.8rem', color: '#4caf50', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <TrendingUp size={14} /> +12% from last month
            </p>
          </div>

          <div className="card" style={{ padding: '1.5rem', borderLeft: '4px solid #f57c00' }}>
            <div className="flex justify-between items-center mb-sm">
              <h3 style={{ fontSize: '0.95rem', color: 'var(--color-text-light)' }}>Active Quotes</h3>
              <FileText size={20} color="#f57c00" />
            </div>
            <p style={{ fontSize: '1.8rem', fontWeight: 700 }}>{dummyDashboardStats.openQuotations}</p>
            <p className="mt-xs text-light" style={{ fontSize: '0.8rem' }}>₹2.4M pending approval</p>
          </div>

          <div className="card" style={{ padding: '1.5rem', borderLeft: '4px solid #388e3c' }}>
            <div className="flex justify-between items-center mb-sm">
              <h3 style={{ fontSize: '0.95rem', color: 'var(--color-text-light)' }}>Active Orders</h3>
              <Briefcase size={20} color="#388e3c" />
            </div>
            <p style={{ fontSize: '1.8rem', fontWeight: 700 }}>{dummyDashboardStats.ordersInProgress}</p>
            <p className="mt-xs text-light" style={{ fontSize: '0.8rem' }}>3 in production, 1 packed</p>
          </div>

          <div className="card" style={{ padding: '1.5rem', borderLeft: '4px solid #d32f2f' }}>
            <div className="flex justify-between items-center mb-sm">
              <h3 style={{ fontSize: '0.95rem', color: 'var(--color-text-light)' }}>Low Stock Alerts</h3>
              <AlertTriangle size={20} color="#d32f2f" />
            </div>
            <p style={{ fontSize: '1.8rem', fontWeight: 700 }}>{dummyDashboardStats.lowStockItems}</p>
            <p className="mt-xs text-light" style={{ fontSize: '0.8rem' }}>Requires procurement</p>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid gap-xl mb-xl" style={{ gridTemplateColumns: '2fr 1fr' }}>
          <div className="card" style={{ padding: '1.5rem' }}>
            <h3 className="mb-md" style={{ fontSize: '1.1rem' }}>Revenue vs Sales (Last 7 Months)</h3>
            <div style={{ height: '300px', width: '100%' }}>
              <ResponsiveContainer>
                <AreaChart data={salesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1a1a1a" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#1a1a1a" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#c4a47c" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#c4a47c" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#8884d8" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="revenue" stroke="#1a1a1a" fillOpacity={1} fill="url(#colorRevenue)" />
                  <Area type="monotone" dataKey="sales" stroke="#c4a47c" fillOpacity={1} fill="url(#colorSales)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card" style={{ padding: '1.5rem' }}>
            <h3 className="mb-md" style={{ fontSize: '1.1rem' }}>Enquiry Sources</h3>
            <div style={{ height: '300px', width: '100%' }}>
              <ResponsiveContainer>
                <BarChart data={[{name: 'B2B Fabrics', value: 45}, {name: 'OEM', value: 30}, {name: 'Direct', value: 25}]} layout="vertical" margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                  <XAxis type="number"/>
                  <YAxis dataKey="name" type="category" width={80} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#1a1a1a" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Activity Table */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <div className="flex justify-between items-center mb-md">
            <h3 style={{ fontSize: '1.1rem' }}>Recent RFQs & Active Orders</h3>
            <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '0.85rem' }}>View All</button>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--color-border)', color: 'var(--color-text-light)', fontSize: '0.9rem' }}>
                  <th style={{ padding: '1rem 0.5rem' }}>ID</th>
                  <th style={{ padding: '1rem 0.5rem' }}>Date</th>
                  <th style={{ padding: '1rem 0.5rem' }}>Item</th>
                  <th style={{ padding: '1rem 0.5rem' }}>Quantity</th>
                  <th style={{ padding: '1rem 0.5rem' }}>Amount</th>
                  <th style={{ padding: '1rem 0.5rem' }}>Status</th>
                  <th style={{ padding: '1rem 0.5rem' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {b2bQuotes.map((quote, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '1rem 0.5rem', fontWeight: 600 }}>{quote.id}</td>
                    <td style={{ padding: '1rem 0.5rem', color: 'var(--color-text-light)', fontSize: '0.9rem' }}>{quote.date}</td>
                    <td style={{ padding: '1rem 0.5rem' }}>{quote.item}</td>
                    <td style={{ padding: '1rem 0.5rem' }}>{quote.quantity}</td>
                    <td style={{ padding: '1rem 0.5rem', fontWeight: 500 }}>{quote.amount}</td>
                    <td style={{ padding: '1rem 0.5rem' }}>
                      <span style={{ 
                        padding: '4px 10px', 
                        borderRadius: '12px', 
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        background: quote.status.includes('Order') || quote.status.includes('Production') ? '#e8f5e9' : '#fff3e0',
                        color: quote.status.includes('Order') || quote.status.includes('Production') ? '#2e7d32' : '#e65100'
                      }}>
                        {quote.status}
                      </span>
                    </td>
                    <td style={{ padding: '1rem 0.5rem' }}>
                      <button className="btn btn-outline" style={{ padding: '4px 8px', fontSize: '0.8rem' }}>Manage</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
