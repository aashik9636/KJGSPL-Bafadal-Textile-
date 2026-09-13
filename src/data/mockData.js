export const b2cProducts = [
  {
    id: 'p1',
    brand: 'Bstar',
    name: 'Bstar Classic Combed Cotton T-Shirt',
    category: 'Men',
    type: 'T-Shirts',
    price: 49, // AED base
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80',
    colors: ['Black', 'White', 'Navy'],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 50,
  },
  {
    id: 'p2',
    brand: 'Bstar',
    name: 'Bstar Premium Fleece Hoodie',
    category: 'Men',
    type: 'Hoodies',
    price: 139, // AED base
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80',
    colors: ['Grey', 'Black', 'Olive'],
    sizes: ['M', 'L', 'XL', 'XXL'],
    stock: 20,
  },
  {
    id: 'p3',
    brand: 'Bstar',
    name: 'Bstar Essential Chino Shorts',
    category: 'Men',
    type: 'Bottoms',
    price: 75, // AED base
    image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=600&q=80',
    colors: ['Khaki', 'Navy'],
    sizes: ['30', '32', '34', '36'],
    stock: 35,
  },
  {
    id: 'p4',
    brand: 'Bstar',
    name: 'Bstar Women\'s Relaxed Fit Tee',
    category: 'Women',
    type: 'T-Shirts',
    price: 45, // AED base
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80',
    colors: ['White', 'Pink', 'Black'],
    sizes: ['XS', 'S', 'M', 'L'],
    stock: 60,
  },
  {
    id: 'p5',
    brand: 'Bstar',
    name: 'Bstar Kids Graphic Tee',
    category: 'Kids',
    type: 'T-Shirts',
    price: 35, // AED base
    image: 'https://images.unsplash.com/photo-1519241047957-be31d7379a5d?auto=format&fit=crop&w=600&q=80',
    colors: ['Red', 'Blue', 'Yellow'],
    sizes: ['4Y', '6Y', '8Y', '10Y'],
    stock: 40,
  },
  {
    id: 'p6',
    brand: 'Bstar',
    name: 'Bstar Linen Blend Button-Down',
    category: 'Men',
    type: 'Shirts',
    price: 110, // AED base
    image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=600&q=80',
    colors: ['White', 'Light Blue', 'Beige'],
    sizes: ['M', 'L', 'XL'],
    stock: 25,
  },
  {
    id: 'p7',
    brand: 'Bstar',
    name: 'Bstar Women\'s Oversized Hoodie',
    category: 'Women',
    type: 'Hoodies',
    price: 125, // AED base
    image: 'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?auto=format&fit=crop&w=600&q=80',
    colors: ['Lavender', 'Black', 'Cream'],
    sizes: ['S', 'M', 'L'],
    stock: 30,
  },
  {
    id: 'p8',
    brand: 'Bstar',
    name: 'Bstar Everyday Denim Jeans',
    category: 'Men',
    type: 'Bottoms',
    price: 165, // AED base
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=600&q=80',
    colors: ['Light Wash', 'Dark Wash', 'Black'],
    sizes: ['30', '32', '34', '36'],
    stock: 45,
  }
];

export const b2bFabrics = [
  {
    id: 'f1',
    name: 'Premium Combed Cotton Rolls',
    category: 'Fabric',
    subCategory: 'Knitted Single Jersey',
    composition: '100% Long-Staple Combed Cotton',
    gsm: 180,
    width: '42 inches (Tubular)',
    yarnCount: '30s Ne Combed Compact',
    structure: 'Single Jersey Knit',
    shrinkage: 'Length ±3%, Width ±3%',
    colorFastness: 'Grade 4-5 (ISO 105-C06)',
    origin: 'Bafadal Textile Mills • Dubai Logistics Hub',
    description: 'Ultra-soft, ring-spun compact combed cotton engineered for luxury streetwear and high-end retail t-shirts. Features bio-wash enzyme finishing, superior tensile strength, zero pilling, and exceptional print receptivity for screen printing, DTG, and embroidery.',
    colors: ['Optical White', 'Jet Black', 'Grey Melange', 'Navy Blue', 'Forest Green', 'Sand Khaki'],
    moq: 100,
    unit: 'KG',
    approxPriceUSD: 5.20,
    tieredPricing: [
      { range: '100 - 499 KG', priceUSD: 5.20 },
      { range: '500 - 1,999 KG', priceUSD: 4.85 },
      { range: '2,000+ KG', priceUSD: 4.50 },
    ],
    applications: ['Premium Crewneck T-Shirts', 'Polos', 'Lounge Tops', 'Baby Apparel'],
    leadTime: '5-7 Days (In-Stock Rolls) • 14-20 Days (Custom Lab Dip)',
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'f2',
    name: 'Poly-Cotton Blended Knit',
    category: 'Fabric',
    subCategory: 'Commercial Blended Knit',
    composition: '60% Cotton, 40% Polyester',
    gsm: 200,
    width: '44 inches (Open Width)',
    yarnCount: '24s CVC Ring-Spun',
    structure: 'Interlock / Pique Knit',
    shrinkage: 'Length ±2%, Width ±2%',
    colorFastness: 'Grade 4 (ISO 105-X12)',
    origin: 'Bafadal Textile Mills • Dubai Logistics Hub',
    description: 'High-durability CVC blend combining the natural breathability of pure cotton with the wrinkle-resistance and color retention of polyester. Specifically designed for corporate uniforms, activewear, and school uniforms.',
    colors: ['Royal Blue', 'Scarlet Red', 'Bottle Green', 'Charcoal Heather', 'White'],
    moq: 150,
    unit: 'KG',
    approxPriceUSD: 4.60,
    tieredPricing: [
      { range: '150 - 499 KG', priceUSD: 4.60 },
      { range: '500 - 1,999 KG', priceUSD: 4.30 },
      { range: '2,000+ KG', priceUSD: 3.95 },
    ],
    applications: ['Corporate Uniform Polos', 'School Apparel', 'Durable Workwear'],
    leadTime: '7-10 Days (In-Stock Rolls) • 18 Days (Custom Dye)',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'f3',
    name: 'Heavyweight Brushed Fleece',
    category: 'Fabric',
    subCategory: 'Heavy Winter Fleece',
    composition: '80% Cotton, 20% Polyester',
    gsm: 320,
    width: '40 inches (Tubular)',
    yarnCount: '20s/10s Fleece Yarn',
    structure: '3-End Brushed Fleece',
    shrinkage: 'Length ±3.5%, Width ±2%',
    colorFastness: 'Grade 4+ (ISO Standard)',
    origin: 'Bafadal Textile Mills • Dubai Logistics Hub',
    description: 'Heavyweight thermal fleece with a densely brushed interior for luxurious warmth, plush hand feel, and sturdy drape. Perfect for premium streetwear hoodies, sweatpants, and luxury outerwear.',
    colors: ['Jet Black', 'Olive Drab', 'Maroon Wine', 'Heather Grey', 'Cream Beige'],
    moq: 200,
    unit: 'KG',
    approxPriceUSD: 6.80,
    tieredPricing: [
      { range: '200 - 499 KG', priceUSD: 6.80 },
      { range: '500 - 1,999 KG', priceUSD: 6.40 },
      { range: '2,000+ KG', priceUSD: 5.95 },
    ],
    applications: ['Heavyweight Hoodies', 'Oversized Sweatshirts', 'Winter Joggers', 'Athleisure Sets'],
    leadTime: '5-8 Days (Rolls) • 21 Days (Custom Tech Packs)',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'f4',
    name: 'French Terry Loopback',
    category: 'Fabric',
    subCategory: 'Unbrushed Terry',
    composition: '100% Organic Cotton',
    gsm: 280,
    width: '42 inches (Tubular)',
    yarnCount: '26s Loopback Yarn',
    structure: 'Diagonal Loopback Knit',
    shrinkage: 'Length ±3%, Width ±3%',
    colorFastness: 'Grade 4-5 (ISO Standard)',
    origin: 'Bafadal Textile Mills • Dubai Logistics Hub',
    description: 'Premium diagonal loopback knit that balances breathable moisture-wicking comfort with structured fabric weight. Unbrushed loops on the reverse provide a cool, non-clinging feel suitable for year-round GCC wear.',
    colors: ['Grey Melange', 'Navy Blue', 'Mustard Gold', 'Charcoal', 'Sage Green'],
    moq: 150,
    unit: 'KG',
    approxPriceUSD: 5.90,
    tieredPricing: [
      { range: '150 - 499 KG', priceUSD: 5.90 },
      { range: '500 - 1,999 KG', priceUSD: 5.50 },
      { range: '2,000+ KG', priceUSD: 5.10 },
    ],
    applications: ['All-Season Hoodies', 'Loopback Shorts', 'Quarter-Zip Pullovers'],
    leadTime: '6-9 Days (Rolls) • 16 Days (Custom Dye)',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'f5',
    name: 'Single Jersey Spandex Stretch',
    category: 'Fabric',
    subCategory: 'Performance Stretch Knit',
    composition: '95% Cotton, 5% Lycra Spandex',
    gsm: 160,
    width: '44 inches (Open Width)',
    yarnCount: '34s Combed + 30D Spandex',
    structure: '4-Way Stretch Single Jersey',
    shrinkage: 'Length ±2%, Width ±2%',
    colorFastness: 'Grade 4 (ISO Standard)',
    origin: 'Bafadal Textile Mills • Dubai Logistics Hub',
    description: 'Silky smooth 4-way stretch jersey with high recovery memory. Form-fitting, breathable, and pre-shrunk for premium activewear, women’s fitted tops, and contemporary fashion essentials.',
    colors: ['Pure White', 'Jet Black', 'Crimson Red', 'Royal Blue', 'Dusty Rose'],
    moq: 100,
    unit: 'KG',
    approxPriceUSD: 5.75,
    tieredPricing: [
      { range: '100 - 499 KG', priceUSD: 5.75 },
      { range: '500 - 1,999 KG', priceUSD: 5.35 },
      { range: '2,000+ KG', priceUSD: 4.90 },
    ],
    applications: ['Athletic Tops', 'Women\'s Bodycon Wear', 'Stretch Undergarments'],
    leadTime: '5-7 Days (In-Stock Rolls) • 14 Days (Custom Dye)',
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80'
    ]
  }
];

export const b2bGarments = [
  {
    id: 'bg1',
    name: 'Bstar Wholesale Crewneck T-Shirt (OEM)',
    category: 'Wholesale Garment',
    subCategory: 'Finished OEM Apparel',
    composition: '100% Combed Cotton, 180 GSM',
    gsm: 180,
    width: 'Custom Fit Tech Pack',
    yarnCount: '30s Combed Compact',
    structure: 'Cut & Sew Finished Garment',
    shrinkage: 'Pre-Shrunk (±1.5%)',
    colorFastness: 'Grade 4-5 (ISO Compliant)',
    origin: 'Bafadal OEM Garment Factory • Dubai / GCC Export',
    description: 'Commercial contract manufacturing for custom private-label t-shirts. Includes custom neck labeling, screen printing or embroidery, individualized polybag packaging, and barcode hangtags according to your tech pack specifications.',
    colors: ['White', 'Black', 'Charcoal', 'Navy', 'Custom Pantone'],
    moq: 100,
    unit: 'Pieces',
    approxPriceUSD: 3.80,
    tieredPricing: [
      { range: '100 - 499 Pcs', priceUSD: 3.80 },
      { range: '500 - 1,999 Pcs', priceUSD: 3.40 },
      { range: '2,000+ Pcs', priceUSD: 2.95 },
    ],
    leadTime: '14-21 Days Production (Air/Sea Freight via Jebel Ali Port)',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'bg2',
    name: 'Bstar Wholesale Fleece Hoodie (OEM / Private Label)',
    category: 'Wholesale Garment',
    subCategory: 'Heavyweight Finished Hoodies',
    composition: '80% Cotton, 20% Polyester, 320 GSM',
    gsm: 320,
    width: 'Custom Streetwear Fit',
    yarnCount: 'Heavyweight 3-End Fleece',
    structure: 'Double Needle Stitched / 2x2 Rib Cuffs',
    shrinkage: 'Pre-Shrunk (±2%)',
    colorFastness: 'Grade 4+ (ISO Compliant)',
    origin: 'Bafadal OEM Garment Factory • Dubai / GCC Export',
    description: 'Turnkey private label hoodie production. Premium metal aglet drawstrings, reinforced kangaroo pocket, double-lined hood, and high-density screen print or puff embroidery services for apparel brands and retail chains.',
    colors: ['Black', 'Heather Grey', 'Sage Green', 'Custom Pantone'],
    moq: 50,
    unit: 'Pieces',
    approxPriceUSD: 11.50,
    tieredPricing: [
      { range: '50 - 199 Pcs', priceUSD: 11.50 },
      { range: '200 - 999 Pcs', priceUSD: 10.20 },
      { range: '1,000+ Pcs', priceUSD: 8.90 },
    ],
    leadTime: '18-25 Days Production (Air/Sea Freight via Jebel Ali Port)',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'bg3',
    name: 'Bstar Wholesale Pique Polo (Corporate & Uniform)',
    category: 'Wholesale Garment',
    subCategory: 'Corporate & Hospitality Polos',
    composition: '100% Cotton Double Pique, 220 GSM',
    gsm: 220,
    width: 'Regular Corporate Cut',
    yarnCount: 'Double Pique Knit',
    structure: 'Ribbed Knit Collar & Sleeve Bands',
    shrinkage: 'Pre-Shrunk (±1.5%)',
    colorFastness: 'Grade 4 (ISO Compliant)',
    origin: 'Bafadal OEM Garment Factory • Dubai / GCC Export',
    description: 'High-end pique polos tailored for corporate uniforms, hotel staff, golf clubs, and retail merchandisers. Features anti-curl knitted collars, mother-of-pearl buttons, and customized corporate logo embroidery.',
    colors: ['Navy Blue', 'Classic White', 'Jet Black', 'Sky Blue'],
    moq: 80,
    unit: 'Pieces',
    approxPriceUSD: 5.40,
    tieredPricing: [
      { range: '80 - 299 Pcs', priceUSD: 5.40 },
      { range: '300 - 999 Pcs', priceUSD: 4.80 },
      { range: '1,000+ Pcs', priceUSD: 4.20 },
    ],
    leadTime: '14-20 Days Production (Air/Sea Freight via Jebel Ali Port)',
    image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80'
    ]
  }
];

export const dummyDashboardStats = {
  newEnquiries: 14,
  openQuotations: 8,
  ordersInProgress: 5,
  pendingPayments: 2,
  deliveries: 6,
  lowStockItems: 3
};

export const b2bQuotes = [
  {
    id: 'RFQ-0024',
    date: '2026-09-12',
    item: 'Premium Combed Cotton (500 KG) + Bstar OEM Tees (200 Pcs)',
    quantity: 'Multi-Item Basket',
    status: 'Quote Provided',
    amount: '$4,350 USD',
    vatAmount: '$217.50 (5% UAE VAT)',
    port: 'Jebel Ali Port, Dubai'
  },
  {
    id: 'RFQ-0023',
    date: '2026-09-08',
    item: 'French Terry Loopback Fabric',
    quantity: '300 KG',
    status: 'Swatch Dispatched',
    amount: 'Pending',
    vatAmount: 'TBD',
    port: 'Dubai Logistics City'
  },
  {
    id: 'ORD-1088',
    date: '2026-09-01',
    item: 'Bstar Heavyweight Hoodies Bulk Order',
    quantity: '1,000 Pieces',
    status: 'In Production',
    amount: '$11,500 USD',
    vatAmount: '$575.00 (5% UAE VAT)',
    port: 'Jebel Ali Free Zone (JAFZA)'
  }
];

export const salesData = [
  { name: 'Jan', sales: 4200, revenue: 16500 },
  { name: 'Feb', sales: 3800, revenue: 14800 },
  { name: 'Mar', sales: 5100, revenue: 21200 },
  { name: 'Apr', sales: 4600, revenue: 18900 },
  { name: 'May', sales: 5900, revenue: 24500 },
  { name: 'Jun', sales: 6200, revenue: 27800 },
  { name: 'Jul', sales: 6800, revenue: 31200 },
];
