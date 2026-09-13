import React from 'react';
import { FileText, Package, Truck, CheckCircle, ShieldCheck } from 'lucide-react';
import { b2bQuotes } from '../data/mockData';
import { useCurrency } from '../context/CurrencyContext';

const Account = () => {
  const { currency, formatUSDPrice } = useCurrency();

  return (
    <div className="container section">
      <div className="flex justify-between items-center mb-xl pb-md" style={{ borderBottom: '1px solid var(--color-border)' }}>
        <div>
          <h1 className="section-title text-left" style={{ marginBottom: '8px' }}>B2B Wholesale Portal</h1>
          <p className="text-light">Welcome back, Emirates Garments Trading LLC • TRN: 100234567800003</p>
        </div>
        <div className="flex gap-md">
          <span className="badge" style={{ background: '#e3f2fd', color: '#0d47a1', padding: '6px 12px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 600 }}>
            FTA Verified Business Account (5% UAE VAT)
          </span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-md mb-xl">
        <div className="card" style={{ padding: '1.5rem', borderLeft: '4px solid var(--color-primary)' }}>
          <div className="flex justify-between items-start mb-sm">
            <h4 style={{ fontSize: '0.9rem', color: 'var(--color-text-light)' }}>Open Quotes (RFQ)</h4>
            <FileText size={20} color="var(--color-text-light)" />
          </div>
          <p style={{ fontSize: '1.8rem', fontWeight: 600 }}>2</p>
        </div>
        <div className="card" style={{ padding: '1.5rem', borderLeft: '4px solid var(--color-accent)' }}>
          <div className="flex justify-between items-start mb-sm">
            <h4 style={{ fontSize: '0.9rem', color: 'var(--color-text-light)' }}>Pending Swatches</h4>
            <Package size={20} color="var(--color-text-light)" />
          </div>
          <p style={{ fontSize: '1.8rem', fontWeight: 600 }}>1</p>
        </div>
        <div className="card" style={{ padding: '1.5rem', borderLeft: '4px solid #4caf50' }}>
          <div className="flex justify-between items-start mb-sm">
            <h4 style={{ fontSize: '0.9rem', color: 'var(--color-text-light)' }}>Active Production</h4>
            <Truck size={20} color="var(--color-text-light)" />
          </div>
          <p style={{ fontSize: '1.8rem', fontWeight: 600 }}>1</p>
        </div>
        <div className="card" style={{ padding: '1.5rem', borderLeft: '4px solid #2563eb' }}>
          <div className="flex justify-between items-start mb-sm">
            <h4 style={{ fontSize: '0.9rem', color: 'var(--color-text-light)' }}>B2B Trade Credit</h4>
            <CheckCircle size={20} color="#2563eb" />
          </div>
          <p style={{ fontSize: '1.5rem', fontWeight: 600 }}>Net-30 Days</p>
          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Limit: {formatUSDPrice(50000)} (Approved)</span>
        </div>
      </div>

      <h3 className="mb-md">Recent RFQs, Swatches & Proforma Invoices</h3>
      <div className="card" style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'var(--color-secondary)', borderBottom: '1px solid var(--color-border)' }}>
              <th style={{ padding: '1rem' }}>RFQ / Order ID</th>
              <th style={{ padding: '1rem' }}>Date</th>
              <th style={{ padding: '1rem' }}>Item Specifications</th>
              <th style={{ padding: '1rem' }}>Quantity</th>
              <th style={{ padding: '1rem' }}>Amount (USD benchmark)</th>
              <th style={{ padding: '1rem' }}>VAT / Port</th>
              <th style={{ padding: '1rem' }}>Status</th>
              <th style={{ padding: '1rem' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {b2bQuotes.map((quote, index) => (
              <tr key={index} style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: '1rem', fontWeight: 500 }}>{quote.id}</td>
                <td style={{ padding: '1rem', color: 'var(--color-text-light)' }}>{quote.date}</td>
                <td style={{ padding: '1rem' }}>{quote.item}</td>
                <td style={{ padding: '1rem' }}>{quote.quantity}</td>
                <td style={{ padding: '1rem', fontWeight: 600, color: '#0f172a' }}>{quote.amount}</td>
                <td style={{ padding: '1rem', fontSize: '0.82rem', color: '#64748b' }}>
                  <div>{quote.vatAmount}</div>
                  <span style={{ fontSize: '0.75rem', color: '#2563eb' }}>{quote.port}</span>
                </td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ 
                    padding: '4px 8px', 
                    borderRadius: '4px', 
                    fontSize: '0.8rem',
                    background: quote.status.includes('Order') || quote.status.includes('Production') ? '#e8f5e9' : '#eff6ff',
                    color: quote.status.includes('Order') || quote.status.includes('Production') ? '#2e7d32' : '#1d4ed8'
                  }}>
                    {quote.status}
                  </span>
                </td>
                <td style={{ padding: '1rem' }}>
                  <button className="btn btn-outline" style={{ padding: '4px 8px', fontSize: '0.8rem' }}>View Proforma</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Account;
