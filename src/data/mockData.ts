import { User, VendorProfile, Product, RawMaterial, Order, CourierProvider, ProductReview, DeliveryZone, DeliveryLocation, Shipment, ShipmentEvent, WishlistItem, UserStyleProfile } from '../types';
import { createCuid } from '../utils/cuid';

export const INITIAL_USERS: User[] = [
  {
    id: createCuid('u_buyer'),
    name: 'Anika Rahman',
    email: 'anika@example.com',
    role: 'user',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    phoneNumber: '+8801712345678',
    phoneNumberVerified: true,
    createdAt: '2026-01-15T10:00:00Z'
  },
  {
    id: createCuid('u_artisan1'),
    name: 'Master Rahat Ali',
    email: 'rahat.clay@artisanmarket.bd',
    role: 'vendor_user',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    phoneNumber: '+8801811223344',
    phoneNumberVerified: true,
    createdAt: '2025-11-20T08:30:00Z'
  },
  {
    id: createCuid('u_wholesaler1'),
    name: 'Chittagong Raw Supplies Co.',
    email: 'supply@ctgraw.bd',
    role: 'wholesaler',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300',
    phoneNumber: '+8801900112233',
    phoneNumberVerified: true,
    createdAt: '2025-09-10T12:00:00Z'
  }
];

export const INITIAL_VENDORS: VendorProfile[] = [
  {
    id: createCuid('v_clay'),
    organizationId: createCuid('org_clay'),
    ownerUserId: 'u_artisan1',
    publicSlug: 'clay-craft-heritage',
    displayName: 'Dhamrai Clay Heritage Studio',
    legalName: 'Dhamrai Pottery Crafts & Arts',
    status: 'approved',
    craftSpecialty: 'Terracotta & Earthenware Pottery',
    description: 'Third-generation master potters crafting natural earthenware, terracotta dinnerware, and artistic clay planters using centuries-old Dhamrai kiln techniques.',
    workshopLocation: 'Dhamrai, Dhaka Division',
    supportEmail: 'contact@dhamraiclay.com',
    supportPhone: '+8801811223344',
    allowCod: true,
    rating: 4.9,
    reviewCount: 48,
    verifiedArtisan: true,
    avatarUrl: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&q=80&w=300',
    bannerUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=1200',
    createdAt: '2025-11-20T08:30:00Z'
  },
  {
    id: createCuid('v_loom'),
    organizationId: createCuid('org_loom'),
    ownerUserId: createCuid('u_loom'),
    publicSlug: 'sonargaon-royal-jamdani',
    displayName: 'Sonargaon Royal Jamdani Weavers',
    legalName: 'Sonargaon Loom Guild Ltd.',
    status: 'approved',
    craftSpecialty: 'Handloom Muslin & Jamdani Weaving',
    description: 'UNESCO-recognized handwoven Jamdani silk sarees, scarves, and custom tapestry woven knot by knot on traditional wooden pit looms.',
    workshopLocation: 'Sonargaon, Narayanganj',
    supportEmail: 'weaver@jamdanisonargaon.bd',
    supportPhone: '+8801755443322',
    allowCod: true,
    rating: 4.95,
    reviewCount: 62,
    verifiedArtisan: true,
    avatarUrl: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=300',
    bannerUrl: 'https://images.unsplash.com/photo-1606744888344-493238951221?auto=format&fit=crop&q=80&w=1200',
    createdAt: '2025-10-12T14:20:00Z'
  },
  {
    id: createCuid('v_wood'),
    organizationId: createCuid('org_wood'),
    ownerUserId: createCuid('u_wood'),
    publicSlug: 'hill-tracts-woodwork',
    displayName: 'Chittagong Hill Woodcraft Guild',
    legalName: 'Hill Tracts Artisan Woodworks',
    status: 'approved',
    craftSpecialty: 'Hand-Carved Teak & Mahogany Crafts',
    description: 'Sustainably harvested teak and mahogany turned into custom engraved serving boards, wall sculptures, and artisanal home furniture.',
    workshopLocation: 'Kaptai Road, Chittagong',
    supportEmail: 'hello@hillwoodcraft.com',
    supportPhone: '+8801899887766',
    allowCod: true,
    rating: 4.85,
    reviewCount: 35,
    verifiedArtisan: true,
    avatarUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=300',
    bannerUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200',
    createdAt: '2025-12-01T11:10:00Z'
  },
  {
    id: createCuid('v_resin'),
    organizationId: createCuid('org_resin'),
    ownerUserId: createCuid('u_resin'),
    publicSlug: 'botanical-resin-studio',
    displayName: 'Aura Botanical & Resin Keepsakes',
    legalName: 'Aura Artisan Decor',
    status: 'approved',
    craftSpecialty: 'Resin & Pressed Flower Home Accessories',
    description: 'Preserving natural Bangladeshi wildflowers, ferns, and botanical elements inside hand-poured crystal resin clocks, coasters, and jewelry.',
    workshopLocation: 'Dhanmondi, Dhaka',
    supportEmail: 'contact@aurastudio.bd',
    supportPhone: '+8801677889900',
    allowCod: true,
    rating: 4.8,
    reviewCount: 29,
    verifiedArtisan: true,
    avatarUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=300',
    bannerUrl: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&q=80&w=1200',
    createdAt: '2026-01-05T09:15:00Z'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: createCuid('prod_1'),
    vendorProfileId: INITIAL_VENDORS[0].id,
    vendorName: 'Dhamrai Clay Heritage Studio',
    vendorSlug: 'clay-craft-heritage',
    vendorLocation: 'Dhamrai, Dhaka',
    title: 'Hand-Carved Earthen Water Pitcher & Tumbler Set',
    description: 'Keep your drinking water naturally cool with this hand-thrown clay pitcher and pair of matching terracotta tumblers. Kiln-baked with natural earthenware glazes and customizable with engraved initials or calligraphy on the base.',
    category: 'pottery',
    tags: ['Pottery', 'Terracotta', 'Eco-Friendly', 'Kitchenware', 'Custom Engraving'],
    priceCents: 245000, // ৳2,450
    compareAtPriceCents: 280000,
    images: [
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800'
    ],
    inStockQuantity: 18,
    isCustomizable: true,
    customizationOptions: [
      {
        id: 'opt_engrave',
        type: 'text',
        label: 'Custom Base Engraving / Name (Optional)',
        placeholder: 'e.g. "Anika & Fahim - 2026"',
        required: false,
        priceModifierCents: 20000 // +৳200
      },
      {
        id: 'opt_glaze',
        type: 'select',
        label: 'Clay Finish',
        options: ['Natural Terracotta Brown', 'Dark Charcoal Matte', 'Rustic Ochre Glaze'],
        required: true,
        priceModifierCents: 0
      }
    ],
    materialsUsed: ['Natural Dhamrai Clay', 'Organic Earthenware Slip', 'Beeswax Polish'],
    craftTimeDays: 4,
    rating: 4.9,
    reviewCount: 32,
    isFeatured: true,
    isTrending: true,
    currentVersionId: 'v1',
    latestVersionId: 'v1',
    createdAt: '2026-02-01T10:00:00Z',
    updatedAt: '2026-02-01T10:00:00Z'
  },
  {
    id: createCuid('prod_2'),
    vendorProfileId: INITIAL_VENDORS[1].id,
    vendorName: 'Sonargaon Royal Jamdani Weavers',
    vendorSlug: 'sonargaon-royal-jamdani',
    vendorLocation: 'Sonargaon, Narayanganj',
    title: 'Heritage 80-Count Royal Handloom Jamdani Saree',
    description: 'An exquisite handwoven Jamdani saree featuring geometric floral motif stitching (Panna Hazar & Tercha motifs) woven meticulously over 45 days on traditional wooden pit looms.',
    category: 'textiles',
    tags: ['Jamdani', 'Handloom', 'Silk', 'Heritage Textiles', 'Wedding Collection'],
    priceCents: 1850000, // ৳18,500
    compareAtPriceCents: 2100000,
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1606744888344-493238951221?auto=format&fit=crop&q=80&w=800'
    ],
    inStockQuantity: 5,
    isCustomizable: true,
    customizationOptions: [
      {
        id: 'opt_blouse',
        type: 'select',
        label: 'Matching Unstitched Blouse Piece',
        options: ['Included Matching Silk Blouse', 'Contrast Maroon Silk (+৳1,000)'],
        required: true,
        priceModifierCents: 0
      },
      {
        id: 'opt_woven_monogram',
        type: 'text',
        label: 'Woven Pallu Initials / Monogram (Custom Request)',
        placeholder: 'e.g. "A & R"',
        required: false,
        priceModifierCents: 150000 // +৳1,500
      }
    ],
    materialsUsed: ['Pure Cotton Yarn 80s', 'Mulberry Silk Thread', 'Zari Gold Accents'],
    craftTimeDays: 30,
    rating: 5.0,
    reviewCount: 24,
    isFeatured: true,
    isTrending: true,
    currentVersionId: 'v1',
    latestVersionId: 'v1',
    createdAt: '2026-01-20T11:00:00Z',
    updatedAt: '2026-01-20T11:00:00Z'
  },
  {
    id: createCuid('prod_3'),
    vendorProfileId: INITIAL_VENDORS[2].id,
    vendorName: 'Chittagong Hill Woodcraft Guild',
    vendorSlug: 'hill-tracts-woodwork',
    vendorLocation: 'Chittagong',
    title: 'Solid Teak Wood Artisanal Charcuterie & Serving Board',
    description: 'Hand-carved from seasoned Chittagong Hill teak wood. Sealed with food-safe organic walnut oil and featuring raw live-edge brass handle accents.',
    category: 'woodwork',
    tags: ['Teak Wood', 'Hand Carved', 'Serving Board', 'Kitchen', 'Personalized'],
    priceCents: 380000, // ৳3,800
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800'
    ],
    inStockQuantity: 12,
    isCustomizable: true,
    customizationOptions: [
      {
        id: 'opt_laser',
        type: 'text',
        label: 'Custom Laser Engraved Family Name or Quote',
        placeholder: 'e.g. "The Rahman Family Kitchen"',
        required: false,
        priceModifierCents: 35000 // +৳350
      },
      {
        id: 'opt_handle',
        type: 'select',
        label: 'Handle Design',
        options: ['Raw Brass Inlay Handle', 'Carved Wood Ergonomic Handle', 'Minimalist Hole Loop'],
        required: true,
        priceModifierCents: 0
      }
    ],
    materialsUsed: ['Chittagong Teak Wood', 'Food-Safe Mineral Oil', 'Solid Brass Pins'],
    craftTimeDays: 3,
    rating: 4.8,
    reviewCount: 19,
    isFeatured: true,
    isTrending: false,
    currentVersionId: 'v1',
    latestVersionId: 'v1',
    createdAt: '2026-02-10T09:00:00Z',
    updatedAt: '2026-02-10T09:00:00Z'
  },
  {
    id: createCuid('prod_4'),
    vendorProfileId: INITIAL_VENDORS[3].id,
    vendorName: 'Aura Botanical & Resin Keepsakes',
    vendorSlug: 'botanical-resin-studio',
    vendorLocation: 'Dhaka',
    title: 'Pressed Wildflower & Resin Botanical Wall Clock',
    description: 'Real dried orchids, ferns, and marigolds suspended inside a 12-inch clear resin clock disk with quiet gold quartz clock mechanism.',
    category: 'glass_resin',
    tags: ['Resin', 'Pressed Flowers', 'Wall Clock', 'Home Decor', 'Custom Colors'],
    priceCents: 420000, // ৳4,200
    images: [
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800'
    ],
    inStockQuantity: 8,
    isCustomizable: true,
    customizationOptions: [
      {
        id: 'opt_flower_tone',
        type: 'select',
        label: 'Flower Palette',
        options: ['Warm Crimson & Gold Wildflowers', 'Pastel Blush & Fern Greens', 'Royal Blue Hydrangeas & Silver Leaf'],
        required: true,
        priceModifierCents: 0
      },
      {
        id: 'opt_clock_numerals',
        type: 'select',
        label: 'Clock Numeral Style',
        options: ['Roman Numerals (Gold)', 'Minimal Dots (Gold)', 'Bengali Numerals (Gold)'],
        required: true,
        priceModifierCents: 0
      }
    ],
    materialsUsed: ['Crystal UV Resin', 'Natural Pressed Flowers', 'Solid Walnut Wooden Rim', 'Gold Hands'],
    craftTimeDays: 5,
    rating: 4.85,
    reviewCount: 15,
    isFeatured: false,
    isTrending: true,
    currentVersionId: 'v1',
    latestVersionId: 'v1',
    createdAt: '2026-02-12T14:00:00Z',
    updatedAt: '2026-02-12T14:00:00Z'
  }
];

export const INITIAL_RAW_MATERIALS: RawMaterial[] = [
  {
    id: createCuid('raw_1'),
    wholesalerVendorProfileId: INITIAL_VENDORS[0].id,
    supplierName: 'Chittagong Raw Supplies Co.',
    name: 'Purified White Earthenware Clay Powder (Grade A)',
    category: 'Clay',
    description: 'High-plasticity refined ceramic clay powder ideal for wheel-throwing, sculpturing, and kiln-firing up to 1200°C. Sourced from natural riverbed deposits.',
    priceCents: 120000, // ৳1,200 per bag
    unit: 'bag (25kg)',
    moq: 2, // 2 bags min
    stockQuantity: 250,
    status: 'active',
    images: [
      'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&q=80&w=800'
    ],
    createdAt: '2026-01-10T08:00:00Z',
    updatedAt: '2026-01-10T08:00:00Z'
  },
  {
    id: createCuid('raw_2'),
    wholesalerVendorProfileId: INITIAL_VENDORS[2].id,
    supplierName: 'Chittagong Hill Timber Guild',
    name: 'Seasoned Teak Wood Planks (Kiln Dried)',
    category: 'Wood',
    description: 'First-grade Chittagong Hill teak wood planks with smooth grain pattern. Treated for bug resistance and moisture content below 10%. Perfect for carvers.',
    priceCents: 45000, // ৳450 per board foot
    unit: 'board foot',
    moq: 10,
    stockQuantity: 1200,
    status: 'active',
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800'
    ],
    createdAt: '2026-01-12T09:30:00Z',
    updatedAt: '2026-01-12T09:30:00Z'
  },
  {
    id: createCuid('raw_3'),
    wholesalerVendorProfileId: INITIAL_VENDORS[1].id,
    supplierName: 'Sylhet Fiber & Yarn Distributors',
    name: 'Raw Handspun Mulberry Silk Thread Spools (Natural Cream)',
    category: 'Yarn',
    description: '100% pure organic mulberry silk yarn spools suitable for handloom weaving, Jamdani embroidery, and textile crafts.',
    priceCents: 220000, // ৳2,200 per spool
    unit: 'spool (500g)',
    moq: 1,
    stockQuantity: 80,
    status: 'active',
    images: [
      'https://images.unsplash.com/photo-1606744888344-493238951221?auto=format&fit=crop&q=80&w=800'
    ],
    createdAt: '2026-01-15T11:00:00Z',
    updatedAt: '2026-01-15T11:00:00Z'
  },
  {
    id: createCuid('raw_4'),
    wholesalerVendorProfileId: INITIAL_VENDORS[2].id,
    supplierName: 'Dhamrai Metalsmith Supply Guild',
    name: 'Pure Solid Brass Sheet (1mm Thickness)',
    category: 'Metals',
    description: 'High-purity brass sheets for custom jewelry, filigree stamping, lamp engraving, and metal craftwork.',
    priceCents: 180000, // ৳1,800 per sheet
    unit: 'sheet (2ft x 3ft)',
    moq: 2,
    stockQuantity: 150,
    status: 'active',
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800'
    ],
    createdAt: '2026-01-18T14:20:00Z',
    updatedAt: '2026-01-18T14:20:00Z'
  },
  {
    id: createCuid('raw_5'),
    wholesalerVendorProfileId: INITIAL_VENDORS[0].id,
    supplierName: 'Dhaka Craft Beads Depot',
    name: 'Natural Hand-Carved Terracotta Craft Beads Set',
    category: 'Beads',
    description: 'Assorted artisan terracotta clay beads with pre-drilled holes for jewelry making, tapestries, and traditional wall hangings.',
    priceCents: 85000, // ৳850 per pack
    unit: 'pack (500 pcs)',
    moq: 3,
    stockQuantity: 300,
    status: 'active',
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800'
    ],
    createdAt: '2026-01-20T10:00:00Z',
    updatedAt: '2026-01-20T10:00:00Z'
  },
  {
    id: createCuid('raw_6'),
    wholesalerVendorProfileId: INITIAL_VENDORS[2].id,
    supplierName: 'Hazaribagh Tanneries Corp',
    name: 'Full Grain Vegetable Tanned Leather Hide (Tan Brown)',
    category: 'Leather',
    description: 'Eco-friendly vegetable-tanned full grain cowhide leather (1.8-2.0mm thickness) for bags, wallets, journal covers, and straps.',
    priceCents: 420000, // ৳4,200 per hide
    unit: 'hide (20 sq ft)',
    moq: 1,
    stockQuantity: 45,
    status: 'active',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800'
    ],
    createdAt: '2026-01-22T16:00:00Z',
    updatedAt: '2026-01-22T16:00:00Z'
  },
  {
    id: createCuid('raw_7'),
    wholesalerVendorProfileId: INITIAL_VENDORS[1].id,
    supplierName: 'Eco-Craft Packaging Hub',
    name: 'Eco Hand-Pressed Recycled Jute Packaging Bags',
    category: 'Packaging',
    description: 'Biodegradable artisan jute packaging pouches with drawstring loops for eco-conscious luxury product presentation.',
    priceCents: 65000, // ৳650 per set
    unit: 'set (50 bags)',
    moq: 5,
    stockQuantity: 500,
    status: 'active',
    images: [
      'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&q=80&w=800'
    ],
    createdAt: '2026-01-25T12:00:00Z',
    updatedAt: '2026-01-25T12:00:00Z'
  }
];

export const COURIER_PROVIDERS: CourierProvider[] = [
  {
    id: 'pathao',
    code: 'pathao_courier',
    name: 'Pathao Courier Express',
    logo: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=120',
    estimatedDeliveryDays: '1-2 Days (Dhaka), 3-4 Days (National)',
    basePriceCents: 6000, // ৳60 base
    codSupported: true
  },
  {
    id: 'paperfly',
    code: 'paperfly_express',
    name: 'Paperfly Doorstep Delivery',
    logo: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=120',
    estimatedDeliveryDays: '2-3 Days Nationwide',
    basePriceCents: 7000, // ৳70
    codSupported: true
  },
  {
    id: 'redx',
    code: 'redx_logistics',
    name: 'RedX Nationwide Logistics',
    logo: 'https://images.unsplash.com/photo-1568283096533-0dd83424e61e?auto=format&fit=crop&q=80&w=120',
    estimatedDeliveryDays: '2-4 Days',
    basePriceCents: 6500, // ৳65
    codSupported: true
  },
  {
    id: 'steadfast',
    code: 'steadfast_courier',
    name: 'Steadfast Courier',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=120',
    estimatedDeliveryDays: '1-3 Days',
    basePriceCents: 6000,
    codSupported: true
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: createCuid('ord_demo1'),
    buyerUserId: 'u_buyer',
    buyerName: 'Anika Rahman',
    buyerEmail: 'anika@example.com',
    buyerPhone: '+8801712345678',
    shippingAddressSnapshot: {
      id: 'addr_1',
      recipientName: 'Anika Rahman',
      phone: '+8801712345678',
      addressLine: 'House 42, Road 11, Block D',
      division: 'Dhaka',
      district: 'Dhaka',
      upazila: 'Banani',
      postalCode: '1213',
      deliveryNote: 'Please ring bell upon arrival'
    },
    vendorOrders: [
      {
        id: createCuid('vord_1'),
        vendorProfileId: INITIAL_VENDORS[0].id,
        vendorName: 'Dhamrai Clay Heritage Studio',
        items: [
          {
            id: 'item_1',
            itemType: 'product',
            title: 'Hand-Carved Earthen Water Pitcher & Tumbler Set',
            image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=800',
            unitPriceCents: 265000, // Includes ৳200 customization engraving
            quantity: 1,
            vendorId: INITIAL_VENDORS[0].id,
            vendorName: 'Dhamrai Clay Heritage Studio',
            customSelections: [
              { optionLabel: 'Custom Base Engraving', value: 'Anika & Fahim', priceModifierCents: 20000 },
              { optionLabel: 'Clay Finish', value: 'Natural Terracotta Brown', priceModifierCents: 0 }
            ],
            customNote: 'Please handle ceramic with extra cushioning.'
          }
        ],
        subtotalCents: 265000,
        shippingFeeCents: 6000,
        status: 'shipped',
        courierName: 'Pathao Courier Express',
        trackingNumber: 'PTH-BD-889021',
        estimatedDelivery: 'Tomorrow by 4:00 PM'
      }
    ],
    subtotalCents: 265000,
    totalShippingCents: 6000,
    totalAmountCents: 271000, // ৳2,710
    paymentMethod: 'bkash',
    paymentStatus: 'paid',
    status: 'shipped',
    createdAt: '2026-07-26T14:30:00Z'
  }
];

export const INITIAL_REVIEWS: ProductReview[] = [
  {
    id: createCuid('rev_1'),
    productId: INITIAL_PRODUCTS[0].id,
    userId: 'u_buyer',
    userName: 'Anika Rahman',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    orderItemId: 'item_1_1',
    vendorProfileId: 'v_dhamrai_pottery',
    rating: 5,
    title: 'Exquisite Terracotta Craftsmanship!',
    comment: 'The pitcher is even more majestic in person. The terracotta glaze keeps water naturally cool and earthy. Truly authentic Bangladeshi heritage art.',
    status: 'approved',
    createdAt: '2026-07-27T11:00:00Z',
    submittedAt: '2026-07-27T10:00:00Z',
    approvedAt: '2026-07-27T11:00:00Z'
  }
];

export const INITIAL_COUPONS = [
  {
    id: createCuid('cpn_1'),
    code: 'HERITAGE15',
    description: '15% Off Handcrafted Heritage Arts & Crafts Collection',
    status: 'active' as const,
    rules: {
      discountType: 'percentage' as const,
      discountValue: 15,
      minOrderAmountCents: 200000, // ৳2,000 min order
      maxDiscountCapCents: 100000  // ৳1,000 max discount cap
    },
    usageCount: 42,
    usageLimit: 1000,
    validUntil: '2026-12-31T23:59:59Z',
    createdAt: '2026-01-01T00:00:00Z'
  },
  {
    id: createCuid('cpn_2'),
    code: 'ARTISAN500',
    description: '৳500 Direct Discount on Handcrafted Orders',
    status: 'active' as const,
    rules: {
      discountType: 'fixed' as const,
      discountValue: 50000, // ৳500 in cents
      minOrderAmountCents: 300000 // ৳3,000 min order
    },
    usageCount: 18,
    validUntil: '2026-12-31T23:59:59Z',
    createdAt: '2026-02-01T00:00:00Z'
  },
  {
    id: createCuid('cpn_3'),
    code: 'WHOLESALE10',
    description: '10% Off Bulk Raw Materials Wholesale Hub Supply',
    status: 'active' as const,
    rules: {
      discountType: 'percentage' as const,
      discountValue: 10,
      minOrderAmountCents: 500000 // ৳5,000 min order
    },
    usageCount: 9,
    createdAt: '2026-03-01T00:00:00Z'
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: createCuid('notif_1'),
    userId: 'u_buyer',
    title: 'Order Shipped via Pathao Express',
    body: 'Your Hand-Carved Earthen Water Pitcher set is en route with tracking #PTH-BD-889021.',
    type: 'order_update' as const,
    read: false,
    createdAt: '2026-07-26T14:35:00Z'
  },
  {
    id: createCuid('notif_2'),
    userId: 'u_buyer',
    title: 'Trust Profile Evaluated: High Trust Tier',
    body: 'Your account verified phone number & order completion earned a +25 Trust Score boost.',
    type: 'trust_update' as const,
    read: true,
    createdAt: '2026-07-25T09:00:00Z'
  }
];

export const INITIAL_AUDIT_LOGS = [
  {
    id: createCuid('audit_1'),
    actorUserId: 'u_admin_system',
    actorRole: 'admin' as const,
    action: 'vendor_approved',
    entityType: 'vendor' as const,
    entityId: INITIAL_VENDORS[0].id,
    reason: 'Verified master artisan credentials and Dhamrai pottery workshop address documentation.',
    createdAt: '2025-11-20T08:35:00Z'
  },
  {
    id: createCuid('audit_2'),
    actorUserId: 'u_admin_system',
    actorRole: 'admin' as const,
    action: 'product_approved',
    entityType: 'product' as const,
    entityId: INITIAL_PRODUCTS[0].id,
    reason: 'Quality control pass for ceramic glazes and craftsmanship details.',
    createdAt: '2026-02-01T10:05:00Z'
  }
];

// --- PHASE 9: INITIAL SHIPPING, DELIVERY ZONES & COURIERS DATA ---

export const INITIAL_DELIVERY_ZONES: DeliveryZone[] = [
  {
    id: 'zone_dhaka',
    code: 'dhaka_metro',
    name: 'Dhaka Metro Area',
    basePriceCents: 6000, // ৳60
    estimatedDeliveryDaysMin: 1,
    estimatedDeliveryDaysMax: 2,
    isActive: true
  },
  {
    id: 'zone_outside',
    code: 'outside_dhaka',
    name: 'Outside Dhaka (District Cities)',
    basePriceCents: 12000, // ৳120
    estimatedDeliveryDaysMin: 2,
    estimatedDeliveryDaysMax: 4,
    isActive: true
  },
  {
    id: 'zone_remote',
    code: 'remote_area',
    name: 'Remote / Hill Tracts Area',
    basePriceCents: 18000, // ৳180
    estimatedDeliveryDaysMin: 4,
    estimatedDeliveryDaysMax: 7,
    isActive: true
  }
];

export const INITIAL_DELIVERY_LOCATIONS: DeliveryLocation[] = [
  { id: 'loc_1', division: 'Dhaka', district: 'Dhaka', upazilaThana: 'Dhanmondi', postalCode: '1205', isRemote: false },
  { id: 'loc_2', division: 'Dhaka', district: 'Dhaka', upazilaThana: 'Gulshan', postalCode: '1212', isRemote: false },
  { id: 'loc_3', division: 'Chittagong', district: 'Chittagong', upazilaThana: 'Agrabad', postalCode: '4100', isRemote: false },
  { id: 'loc_4', division: 'Sylhet', district: 'Sylhet', upazilaThana: 'Zindabazar', postalCode: '3100', isRemote: false },
  { id: 'loc_5', division: 'Chittagong', district: 'Rangamati', upazilaThana: 'Kaptai', postalCode: '4530', isRemote: true },
];

export const INITIAL_COURIER_PROVIDERS = [
  {
    id: 'cour_pathao',
    code: 'pathao',
    name: 'Pathao Logistics Express',
    supportsCod: true,
    avgDeliveryHours: 24,
    apiEndpoint: 'https://api.pathao.com/v1/merchant',
    isActive: true
  },
  {
    id: 'cour_redx',
    code: 'redx',
    name: 'RedX Delivery Network',
    supportsCod: true,
    avgDeliveryHours: 48,
    apiEndpoint: 'https://api.redx.com.bd/v1/parcels',
    isActive: true
  },
  {
    id: 'cour_steadfast',
    code: 'steadfast',
    name: 'Steadfast Courier Specialist',
    supportsCod: true,
    avgDeliveryHours: 36,
    apiEndpoint: 'https://api.steadfast.com.bd/v1/create_order',
    isActive: true
  }
];

export const INITIAL_SHIPMENTS: Shipment[] = [
  {
    id: createCuid('shp_1'),
    vendorOrderId: 'vord_1',
    courierProviderId: 'cour_pathao',
    courierName: 'Pathao Logistics Express',
    trackingNumber: 'PTH-BD-889021',
    shippingFeeCents: 6000,
    codAmountCents: 271000,
    status: 'in_transit',
    createdAt: '2026-07-26T14:30:00Z',
    updatedAt: '2026-07-26T16:00:00Z'
  }
];

export const INITIAL_SHIPMENT_EVENTS: ShipmentEvent[] = [
  {
    id: createCuid('shpevt_1'),
    shipmentId: INITIAL_SHIPMENTS[0].id,
    status: 'booked',
    location: 'Dhamrai Pottery Workshop',
    description: 'Shipment booked via Pathao Merchant API endpoint.',
    eventTimestamp: '2026-07-26T14:32:00Z'
  },
  {
    id: createCuid('shpevt_2'),
    shipmentId: INITIAL_SHIPMENTS[0].id,
    status: 'picked_up',
    location: 'Dhamrai Pickup Point',
    description: 'Parcel collected by Pathao Rider #441.',
    eventTimestamp: '2026-07-26T15:10:00Z'
  },
  {
    id: createCuid('shpevt_3'),
    shipmentId: INITIAL_SHIPMENTS[0].id,
    status: 'in_transit',
    location: 'Tejgaon Central Hub, Dhaka',
    description: 'Arrived at central distribution center for local delivery routing.',
    eventTimestamp: '2026-07-26T16:00:00Z'
  }
];

// --- PHASE 10: WISHLIST, REVIEWS & USER STYLE PROFILES MOCK DATA ---

export const INITIAL_WISHLIST: WishlistItem[] = [
  {
    id: createCuid('wsh_1'),
    userId: 'u_buyer',
    productId: 'prod_2', // Muslin Saree
    createdAt: '2026-07-20T10:00:00Z'
  }
];

export const INITIAL_USER_STYLE_PROFILES: UserStyleProfile[] = [
  {
    id: createCuid('usp_1'),
    userId: 'u_buyer',
    department: 'Women',
    sizeTops: 'M',
    sizeBottoms: 'M',
    sizeShoes: '38 EU',
    preferences: {
      favoriteCrafts: ['Jamdani Weaving', 'Terracotta Pottery', 'Brass Crafting'],
      preferredColors: ['Indigo', 'Teracotta Red', 'Warm Ochre'],
      styleCategories: ['Heritage Wear', 'Traditional Home Decor']
    },
    consentVersion: 'v1.0',
    consentedAt: '2026-07-01T08:00:00Z'
  }
];



