import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { CurrencyProvider } from './context/CurrencyContext';
import { RfqProvider } from './context/RfqContext';
import { Navbar, Footer } from './components/Shared';

const Home = lazy(() => import('./pages/Home'));
const Shop = lazy(() => import('./pages/Shop'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Fabrics = lazy(() => import('./pages/Fabrics'));
const B2BProductDetail = lazy(() => import('./pages/B2BProductDetail'));
const RFQ = lazy(() => import('./pages/RFQ'));
const Account = lazy(() => import('./pages/Account'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

const PageLoader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
    <div style={{
      width: '40px',
      height: '40px',
      border: '3px solid #e2e8f0',
      borderTopColor: '#0f172a',
      borderRadius: '50%',
      animation: 'spin 0.8s linear infinite'
    }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

function App() {
  return (
    <Router>
      <CurrencyProvider>
        <RfqProvider>
          <CartProvider>
            <div className="flex flex-col" style={{ minHeight: '100vh' }}>
              <Navbar />
              <main style={{ flex: 1 }}>
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/b2c" element={<Shop />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/shop/product/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/b2b" element={<Fabrics />} />
                    <Route path="/fabrics" element={<Fabrics />} />
                    <Route path="/fabrics/:id" element={<B2BProductDetail />} />
                    <Route path="/fabrics/product/:id" element={<B2BProductDetail />} />
                    <Route path="/rfq" element={<RFQ />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                  </Routes>
                </Suspense>
              </main>
              <Footer />
            </div>
          </CartProvider>
        </RfqProvider>
      </CurrencyProvider>
    </Router>
  );
}

export default App;
