import React, { useEffect, useRef } from 'react';
import { dummyDashboardStats, b2bQuotes, salesData } from '../data/mockData';
import { FileText, DollarSign, Briefcase, TrendingUp, AlertTriangle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { useCurrency } from '../context/CurrencyContext';
import gsap from 'gsap';

const Dashboard = () => {
  const containerRef = useRef(null);
  const { currency, formatUSDPrice } = useCurrency();

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current.children,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: "power2.out" }
      );
    }
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Operations & ERP Dashboard</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">Bafadal Internal ERP • Dubai JAFZA Operations</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 font-medium">Currency: <strong>{currency.code}</strong></span>
            <button type="button" className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition">
              Generate Report
            </button>
          </div>
        </div>

        <div ref={containerRef} className="space-y-8">
          
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border-l-4 border-blue-600 border border-slate-200 p-5 rounded-xl shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold text-slate-500">Total Revenue (MTD)</span>
                <DollarSign size={18} className="text-blue-600" />
              </div>
              <p className="text-2xl font-black text-slate-900">$178,500</p>
              <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1 mt-1">
                <TrendingUp size={13} /> +14.2% from last month
              </p>
            </div>

            <div className="bg-white border-l-4 border-amber-500 border border-slate-200 p-5 rounded-xl shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold text-slate-500">Active Quotes (RFQ)</span>
                <FileText size={18} className="text-amber-500" />
              </div>
              <p className="text-2xl font-black text-slate-900">{dummyDashboardStats.openQuotations}</p>
              <p className="text-xs text-slate-400 mt-1">$42,800 pending approvals</p>
            </div>

            <div className="bg-white border-l-4 border-emerald-500 border border-slate-200 p-5 rounded-xl shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold text-slate-500">Active Orders</span>
                <Briefcase size={18} className="text-emerald-500" />
              </div>
              <p className="text-2xl font-black text-slate-900">{dummyDashboardStats.ordersInProgress}</p>
              <p className="text-xs text-slate-400 mt-1">3 in production, 2 ready</p>
            </div>

            <div className="bg-white border-l-4 border-rose-500 border border-slate-200 p-5 rounded-xl shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold text-slate-500">Low Stock Fabric Rolls</span>
                <AlertTriangle size={18} className="text-rose-500" />
              </div>
              <p className="text-2xl font-black text-slate-900">{dummyDashboardStats.lowStockItems}</p>
              <p className="text-xs text-slate-400 mt-1">Requires mill dye batch</p>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
                Revenue vs Volume (USD '000s)
              </h3>
              <div className="h-72 w-full">
                <ResponsiveContainer>
                  <AreaChart data={salesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0f172a" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#0f172a" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                    <YAxis stroke="#94a3b8" fontSize={11} />
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: '11px' }} />
                    <Area type="monotone" dataKey="revenue" stroke="#0f172a" fillOpacity={1} fill="url(#colorRevenue)" name="Revenue ($)" />
                    <Area type="monotone" dataKey="sales" stroke="#f59e0b" fillOpacity={1} fill="url(#colorSales)" name="Volume (KG/Pcs)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
                Production by Category
              </h3>
              <div className="h-72 w-full">
                <ResponsiveContainer>
                  <BarChart data={[
                    { category: 'Single Jersey', rolls: 450 },
                    { category: 'French Terry', rolls: 320 },
                    { category: 'Rib 1x1', rolls: 180 },
                    { category: 'OEM Apparel', rolls: 520 },
                  ]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="category" stroke="#94a3b8" fontSize={10} />
                    <YAxis stroke="#94a3b8" fontSize={10} />
                    <Tooltip />
                    <Bar dataKey="rolls" fill="#2563eb" radius={[6, 6, 0, 0]} name="Volume (Rolls/Pcs)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Recent Operations Table */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Live Orders Pipeline
              </h3>
              <span className="text-xs text-slate-400">JAFZA Dubai Logistics</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase tracking-wider text-[11px] font-bold">
                  <tr>
                    <th className="py-3 px-6">Order ID</th>
                    <th className="py-3 px-6">Date</th>
                    <th className="py-3 px-6">Specification</th>
                    <th className="py-3 px-6">Volume</th>
                    <th className="py-3 px-6">Port / Incoterm</th>
                    <th className="py-3 px-6">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {b2bQuotes.map((quote, index) => (
                    <tr key={index} className="hover:bg-slate-50/60 transition">
                      <td className="py-3.5 px-6 font-mono font-bold text-slate-900">{quote.id}</td>
                      <td className="py-3.5 px-6 text-slate-500">{quote.date}</td>
                      <td className="py-3.5 px-6 font-medium text-slate-800">{quote.item}</td>
                      <td className="py-3.5 px-6 font-semibold text-slate-700">{quote.quantity}</td>
                      <td className="py-3.5 px-6 text-slate-600">{quote.port}</td>
                      <td className="py-3.5 px-6">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          quote.status.includes('Order') || quote.status.includes('Production')
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-blue-50 text-blue-700 border border-blue-200'
                        }`}>
                          {quote.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;
