export const b2cProducts = [
  {
    id: 'p1',
    name: 'Classic Cotton T-Shirt',
    category: 'Men',
    type: 'T-Shirts',
    price: 899,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80',
    colors: ['Black', 'White', 'Navy'],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 50,
  },
  {
    id: 'p2',
    name: 'Premium Fleece Hoodie',
    category: 'Men',
    type: 'Hoodies',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80',
    colors: ['Grey', 'Black', 'Olive'],
    sizes: ['M', 'L', 'XL', 'XXL'],
    stock: 20,
  },
  {
    id: 'p3',
    name: 'Essential Chino Shorts',
    category: 'Men',
    type: 'Bottoms',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=600&q=80',
    colors: ['Khaki', 'Navy'],
    sizes: ['30', '32', '34', '36'],
    stock: 35,
  },
  {
    id: 'p4',
    name: 'Women\'s Relaxed Fit Tee',
    category: 'Women',
    type: 'T-Shirts',
    price: 799,
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80',
    colors: ['White', 'Pink', 'Black'],
    sizes: ['XS', 'S', 'M', 'L'],
    stock: 60,
  },
  {
    id: 'p5',
    name: 'Kids Graphic T-Shirt',
    category: 'Kids',
    type: 'T-Shirts',
    price: 599,
    image: 'https://images.unsplash.com/photo-1519241047957-be31d7379a5d?auto=format&fit=crop&w=600&q=80',
    colors: ['Red', 'Blue', 'Yellow'],
    sizes: ['4Y', '6Y', '8Y', '10Y'],
    stock: 40,
  },
  {
    id: 'p6',
    name: 'Linen Blend Button-Down',
    category: 'Men',
    type: 'Shirts',
    price: 1899,
    image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=600&q=80', // Fixed URL
    colors: ['White', 'Light Blue', 'Beige'],
    sizes: ['M', 'L', 'XL'],
    stock: 25,
  },
  {
    id: 'p7',
    name: 'Women\'s Oversized Hoodie',
    category: 'Women',
    type: 'Hoodies',
    price: 2199,
    image: 'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?auto=format&fit=crop&w=600&q=80',
    colors: ['Lavender', 'Black', 'Cream'],
    sizes: ['S', 'M', 'L'],
    stock: 30,
  },
  {
    id: 'p8',
    name: 'Everyday Denim Jeans',
    category: 'Men',
    type: 'Bottoms',
    price: 2999,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=600&q=80',
    colors: ['Light Wash', 'Dark Wash', 'Black'],
    sizes: ['30', '32', '34', '36'],
    stock: 45,
  }
];

export const b2bFabrics = [
  {
    id: 'f1',
    name: 'Premium Combed Cotton',
    composition: '100% Cotton',
    gsm: 180,
    width: '42 inches',
    colors: ['White', 'Black', 'Grey Melange', 'Navy'],
    moq: 100,
    unit: 'KG',
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'f2',
    name: 'Poly-Cotton Blend',
    composition: '60% Cotton, 40% Polyester',
    gsm: 200,
    width: '44 inches',
    colors: ['Royal Blue', 'Red', 'Bottle Green'],
    moq: 150,
    unit: 'KG',
    image: 'https://picsum.photos/seed/fabric2/600/800'
  },
  {
    id: 'f3',
    name: 'Heavyweight Brushed Fleece',
    composition: '80% Cotton, 20% Polyester',
    gsm: 320,
    width: '40 inches',
    colors: ['Black', 'Olive', 'Maroon'],
    moq: 200,
    unit: 'KG',
    image: 'https://picsum.photos/seed/fabric3/600/800'
  },
  {
    id: 'f4',
    name: 'French Terry',
    composition: '100% Cotton',
    gsm: 280,
    width: '42 inches',
    colors: ['Grey Melange', 'Navy', 'Mustard'],
    moq: 150,
    unit: 'KG',
    image: 'https://picsum.photos/seed/fabric4/600/800'
  },
  {
    id: 'f5',
    name: 'Single Jersey Spandex',
    composition: '95% Cotton, 5% Spandex',
    gsm: 160,
    width: '44 inches',
    colors: ['White', 'Black', 'Red', 'Royal Blue'],
    moq: 100,
    unit: 'KG',
    image: 'https://picsum.photos/seed/fabric5/600/800'
  }
];

export const dummyDashboardStats = {
  newEnquiries: 12,
  openQuotations: 8,
  ordersInProgress: 4,
  pendingPayments: 2,
  deliveries: 5,
  lowStockItems: 3
};

export const b2bQuotes = [
  {
    id: 'RFQ-0012',
    date: '2026-09-10',
    item: 'Premium Combed Cotton',
    quantity: '500 KG',
    status: 'Quote Provided',
    amount: '₹3,50,000'
  },
  {
    id: 'RFQ-0011',
    date: '2026-09-08',
    item: 'Brushed Fleece',
    quantity: '200 KG',
    status: 'Sample Dispatched',
    amount: 'Pending'
  },
  {
    id: 'ORD-1092',
    date: '2026-09-01',
    item: 'Poly-Cotton Blend',
    quantity: '1000 KG',
    status: 'In Production',
    amount: '₹6,00,000'
  }
];

export const salesData = [
  { name: 'Jan', sales: 4000, revenue: 2400 },
  { name: 'Feb', sales: 3000, revenue: 1398 },
  { name: 'Mar', sales: 2000, revenue: 9800 },
  { name: 'Apr', sales: 2780, revenue: 3908 },
  { name: 'May', sales: 1890, revenue: 4800 },
  { name: 'Jun', sales: 2390, revenue: 3800 },
  { name: 'Jul', sales: 3490, revenue: 4300 },
];
