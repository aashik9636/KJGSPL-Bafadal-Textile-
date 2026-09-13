import React, { createContext, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';

const CurrencyContext = createContext();

export const CURRENCIES = {
  AED: { code: 'AED', symbol: 'AED', name: 'UAE Dirham', flag: '🇦🇪', rateFromAED: 1 },
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', flag: '🇺🇸', rateFromAED: 0.2723 },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', flag: '🇪🇺', rateFromAED: 0.2510 },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound', flag: '🇬🇧', rateFromAED: 0.2150 },
  SAR: { code: 'SAR', symbol: 'SAR', name: 'Saudi Riyal', flag: '🇸🇦', rateFromAED: 1.021 },
  INR: { code: 'INR', symbol: '₹', name: 'Indian Rupee', flag: '🇮🇳', rateFromAED: 22.85 },
};

export const CurrencyProvider = ({ children }) => {
  const location = useLocation();

  const isB2B = location.pathname.startsWith('/fabrics') || 
                location.pathname.startsWith('/rfq') || 
                location.pathname.startsWith('/account') || 
                location.pathname.startsWith('/dashboard');

  const [channelCurrency, setChannelCurrency] = useState({
    b2c: localStorage.getItem('bafadal_currency_b2c') || 'AED',
    b2b: localStorage.getItem('bafadal_currency_b2b') || 'USD',
  });

  const currentCurrencyCode = isB2B ? channelCurrency.b2b : channelCurrency.b2c;
  const currency = CURRENCIES[currentCurrencyCode] || (isB2B ? CURRENCIES.USD : CURRENCIES.AED);

  const setCurrency = (code) => {
    if (CURRENCIES[code]) {
      if (isB2B) {
        setChannelCurrency(prev => ({ ...prev, b2b: code }));
        localStorage.setItem('bafadal_currency_b2b', code);
      } else {
        setChannelCurrency(prev => ({ ...prev, b2c: code }));
        localStorage.setItem('bafadal_currency_b2c', code);
      }
    }
  };

  /**
   * Format an amount given in base AED into current currency
   */
  const formatPrice = (amountInAED) => {
    if (amountInAED === undefined || amountInAED === null || isNaN(amountInAED)) return '';
    const converted = amountInAED * currency.rateFromAED;
    const formatted = Math.round(converted).toLocaleString();
    if (currency.code === 'USD' || currency.code === 'EUR' || currency.code === 'GBP') {
      return `${currency.symbol}${formatted}`;
    }
    return `${currency.symbol} ${formatted}`;
  };

  /**
   * Format an amount given in base USD (common for wholesale B2B)
   */
  const formatUSDPrice = (amountInUSD) => {
    if (amountInUSD === undefined || amountInUSD === null || isNaN(amountInUSD)) return '';
    const amountInAED = amountInUSD / CURRENCIES.USD.rateFromAED;
    return formatPrice(amountInAED);
  };

  return (
    <CurrencyContext.Provider value={{
      currency,
      currentCurrencyCode,
      setCurrency,
      currencies: CURRENCIES,
      formatPrice,
      formatUSDPrice,
      isB2BDefault: isB2B
    }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
