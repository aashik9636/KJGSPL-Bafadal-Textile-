import React from 'react';
import { FileText, Package, Truck, CheckCircle } from 'lucide-react';
import { b2bQuotes } from '../data/mockData';

const Account = () => {
  return (
    <div className="container section">
      <div className="flex justify-between items-center mb-xl pb-md" style={{ borderBottom: '1px solid var(--color-border)' }}>
        <div>
          <h1 className="section-title text-left" style={{ marginBottom: '8px' }}>Business Portal</h1>
          <p className="text-light">Welcome back, Demo Textiles Co.</p>
        </div>
        <div className="flex gap-md">
          <span className="badge" style={{ background: '#e3f2fd', color: '#0d47a1', padding: '6px 12px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 600 }}>Verified Business Account</span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-md mb-xl">
        <div className="card" style={{ padding: '1.5rem', borderLeft: '4px solid var(--color-primary)' }}>
          <div className="flex justify-between items-start mb-sm">
            <h4 style={{ fontSize: '0.9rem', color: 'var(--color-text-light)' }}>Open Quotes</h4>
            <FileText size={20} color="var(--color-text-light)" />
          </div>
          <p style={{ fontSize: '1.8rem', fontWeight: 600 }}>2</p>
        </div>
        <div className="card" style={{ padding: '1.5rem', borderLeft: '4px solid var(--color-accent)' }}>
          <div className="flex justify-between items-start mb-sm">
            <h4 style={{ fontSize: '0.9rem', color: 'var(--color-text-light)' }}>Pending Samples</h4>
            <Package size={20} color="var(--color-text-light)" />
          </div>
          <p style={{ fontSize: '1.8rem', fontWeight: 600 }}>1</p>
        </div>
        <div className="card" style={{ padding: '1.5rem', borderLeft: '4px solid #4caf50' }}>
          <div className="flex justify-between items-start mb-sm">
            <h4 style={{ fontSize: '0.9rem', color: 'var(--color-text-light)' }}>Active Orders</h4>
            <Truck size={20} color="var(--color-text-light)" />
          </div>
          <p style={{ fontSize: '1.8rem', fontWeight: 600 }}>1</p>
        </div>
      </div>

      <h3 className="mb-md">Recent RFQs & Orders</h3>
      <div className="card" style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'var(--color-secondary)', borderBottom: '1px solid var(--color-border)' }}>
              <th style={{ padding: '1rem' }}>ID</th>
              <th style={{ padding: '1rem' }}>Date</th>
              <th style={{ padding: '1rem' }}>Item</th>
              <th style={{ padding: '1rem' }}>Quantity</th>
              <th style={{ padding: '1rem' }}>Amount</th>
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
                <td style={{ padding: '1rem', fontWeight: 500 }}>{quote.amount}</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ 
                    padding: '4px 8px', 
                    borderRadius: '4px', 
                    fontSize: '0.8rem',
                    background: quote.status.includes('Order') || quote.status.includes('Production') ? '#e8f5e9' : '#fff3e0',
                    color: quote.status.includes('Order') || quote.status.includes('Production') ? '#2e7d32' : '#e65100'
                  }}>
                    {quote.status}
                  </span>
                </td>
                <td style={{ padding: '1rem' }}>
                  <button className="btn btn-outline" style={{ padding: '4px 8px', fontSize: '0.8rem' }}>View Details</button>
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
