import React, { createContext, useContext, useState, useEffect } from 'react';

const RfqContext = createContext();

export const RfqProvider = ({ children }) => {
  const [rfqItems, setRfqItems] = useState(() => {
    try {
      const saved = localStorage.getItem('bafadal_rfq_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('bafadal_rfq_items', JSON.stringify(rfqItems));
    } catch (e) {
      console.error('Failed to save RFQ items to localStorage', e);
    }
  }, [rfqItems]);

  /**
   * Add an item to the RFQ Cart / Basket
   * @param {Object} item - Fabric or Garment object
   * @param {Object} options - { quantity, unit, targetColor, requestType, customNotes }
   */
  const addToRfq = (item, options = {}) => {
    setRfqItems(prev => {
      const existingIdx = prev.findIndex(i => i.id === item.id && i.requestType === (options.requestType || 'quote'));
      if (existingIdx >= 0) {
        const updated = [...prev];
        const existingQty = parseFloat(updated[existingIdx].quantity) || 0;
        const addQty = parseFloat(options.quantity) || 1;
        updated[existingIdx].quantity = existingQty + addQty;
        if (options.customNotes) {
          updated[existingIdx].customNotes = options.customNotes;
        }
        return updated;
      }
      return [
        ...prev,
        {
          id: item.id || `custom-${Date.now()}`,
          name: item.name,
          category: item.category || 'Fabric',
          image: item.image,
          gsm: item.gsm || null,
          composition: item.composition || null,
          moq: item.moq || 100,
          quantity: options.quantity || (options.requestType === 'sample' ? 1 : item.moq || 100),
          unit: options.unit || (options.requestType === 'sample' ? 'Swatch Kit' : item.unit || 'KG'),
          requestType: options.requestType || 'quote', // 'quote' | 'sample' | 'oem'
          targetColor: options.targetColor || (item.colors ? item.colors[0] : 'Standard'),
          customNotes: options.customNotes || '',
          approxPriceUSD: item.approxPriceUSD || null,
        }
      ];
    });
    return true;
  };

  const removeFromRfq = (index) => {
    setRfqItems(prev => prev.filter((_, i) => i !== index));
  };

  const updateRfqItem = (index, field, value) => {
    setRfqItems(prev => {
      const updated = [...prev];
      if (updated[index]) {
        updated[index] = { ...updated[index], [field]: value };
      }
      return updated;
    });
  };

  const clearRfq = () => {
    setRfqItems([]);
  };

  const rfqCount = rfqItems.length;

  return (
    <RfqContext.Provider value={{
      rfqItems,
      rfqCount,
      addToRfq,
      removeFromRfq,
      updateRfqItem,
      clearRfq
    }}>
      {children}
    </RfqContext.Provider>
  );
};

export const useRfq = () => {
  const context = useContext(RfqContext);
  if (!context) {
    throw new Error('useRfq must be used within an RfqProvider');
  }
  return context;
};
