
import React from 'react';
import { FileText, Package, Truck, CheckCircle, ShieldCheck, ArrowRight } from 'lucide-react';
import { b2bQuotes } from '../data/mockData';
import { useCurrency } from '../context/CurrencyContext';

const Account = () => {
  const { currency, formatUSDPrice } = useCurrency();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">B2B Wholesale Portal</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Welcome back, <strong>Emirates Garments Trading LLC</strong> • TRN: 100234567800003
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
            <ShieldCheck size={14} className="text-blue-600" />
            FTA Verified Business Account (5% UAE VAT)
          </span>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border-l-4 border-slate-900 border border-slate-200 p-5 rounded-xl shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-semibold text-slate-500">Open Quotes (RFQ)</span>
            <FileText size={18} className="text-slate-400" />
          </div>
          <p className="text-2xl font-black text-slate-900">2</p>
        </div>

        <div className="bg-white border-l-4 border-amber-500 border border-slate-200 p-5 rounded-xl shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-semibold text-slate-500">Pending Swatches</span>
            <Package size={18} className="text-amber-500" />
          </div>
          <p className="text-2xl font-black text-slate-900">1</p>
        </div>

        <div className="bg-white border-l-4 border-emerald-500 border border-slate-200 p-5 rounded-xl shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-semibold text-slate-500">Active Production</span>
            <Truck size={18} className="text-emerald-500" />
          </div>
          <p className="text-2xl font-black text-slate-900">1</p>
        </div>

        <div className="bg-white border-l-4 border-blue-600 border border-slate-200 p-5 rounded-xl shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-semibold text-slate-500">B2B Trade Credit</span>
            <CheckCircle size={18} className="text-blue-600" />
          </div>
          <p className="text-xl font-black text-slate-900">Net-30 Days</p>
          <span className="text-[11px] text-slate-400">Limit: {formatUSDPrice(50000)} (Approved)</span>
        </div>
      </div>

      {/* Recent Proformas Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Commercial RFQs & Proforma Invoices
          </h2>
          <span className="text-xs text-slate-400">Showing last 4 transactions</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-6">RFQ ID</th>
                <th className="py-3 px-6">Date</th>
                <th className="py-3 px-6">Specification</th>
                <th className="py-3 px-6">Volume</th>
                <th className="py-3 px-6">Amount ({currency.code})</th>
                <th className="py-3 px-6">UAE VAT / Port</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {b2bQuotes.map((quote, index) => (
                <tr key={index} className="hover:bg-slate-50/60 transition">
                  <td className="py-3.5 px-6 font-mono font-bold text-slate-900">{quote.id}</td>
                  <td className="py-3.5 px-6 text-slate-500">{quote.date}</td>
                  <td className="py-3.5 px-6 font-medium text-slate-800">{quote.item}</td>
                  <td className="py-3.5 px-6 font-semibold text-slate-700">{quote.quantity}</td>
                  <td className="py-3.5 px-6 font-black text-slate-900">{quote.amount}</td>
                  <td className="py-3.5 px-6">
                    <span className="text-slate-700 block">{quote.vatAmount}</span>
                    <span className="text-[10px] text-blue-600 font-semibold">{quote.port}</span>
                  </td>
                  <td className="py-3.5 px-6">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      quote.status.includes('Order') || quote.status.includes('Production')
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-blue-50 text-blue-700 border border-blue-200'
                    }`}>
                      {quote.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-6">
                    <button type="button" className="px-3 py-1 rounded border border-slate-200 text-slate-700 hover:bg-slate-100 font-bold transition">
                      View Proforma
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Account;
