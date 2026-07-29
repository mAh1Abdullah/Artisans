/**
 * Core Data Models for The Artisan's Market
 * E-Commerce Architecture adhering to CUID2 keys, Integer Cents monetary storage,
 * application-level ENUMs, and immutable JSON commerce snapshots.
 */

export type UserRole = 'user' | 'vendor_user' | 'wholesaler' | 'admin';

export interface User {
  id: string; // CUID2
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  phoneNumber?: string;
  phoneNumberVerified?: boolean;
  createdAt: string;
}

export interface UserTrustProfile {
  id: string;
  userId: string;
  score: number; // 0-100 score
  codEligible: boolean;
  riskLevel: 'low' | 'medium' | 'high';
  manualReviewRequired: boolean;
  lastEvaluatedAt: string;
}

export type VendorStatus = 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected' | 'suspended';

export interface VendorProfile {
  id: string; // CUID2
  organizationId: string;
  ownerUserId: string;
  publicSlug: string;
  displayName: string;
  legalName?: string;
  status: VendorStatus;
  statusReason?: string;
  craftSpecialty: string; // e.g. "Terracotta & Earthenware Pottery", "Handloom Muslin & Jamdani Weaving"
  description: string;
  workshopLocation: string; // e.g. "Dhamrai, Dhaka", "Srimangal, Moulvibazar"
  supportEmail: string;
  supportPhone: string;
  allowCod: boolean;
  rating: number;
  reviewCount: number;
  verifiedArtisan: boolean;
  avatarUrl?: string;
  bannerUrl?: string;
  portfolioImages?: string[];
  submittedAt?: string;
  approvedAt?: string;
  createdAt: string;
}

export type ProductCategory = 
  | 'pottery' 
  | 'woodwork' 
  | 'jewelry' 
  | 'textiles' 
  | 'paintings' 
  | 'leatherwork' 
  | 'glass_resin' 
  | 'custom_gifts' 
  | 'raw_materials';

export interface CustomizationOption {
  id: string;
  type: 'text' | 'select' | 'color' | 'checkbox';
  label: string;
  placeholder?: string;
  options?: string[]; // for 'select'
  required: boolean;
  priceModifierCents: number; // Integer cents added when selected/filled
}

export interface Product {
  id: string; // CUID2
  vendorProfileId: string;
  vendorName: string;
  vendorSlug: string;
  vendorLocation: string;
  title: string;
  description: string;
  category: ProductCategory;
  tags: string[];
  priceCents: number; // Integer cents
  compareAtPriceCents?: number;
  images: string[];
  inStockQuantity: number;
  isCustomizable: boolean;
  customizationOptions?: CustomizationOption[];
  materialsUsed: string[];
  craftTimeDays: number;
  rating: number;
  reviewCount: number;
  isFeatured?: boolean;
  isTrending?: boolean;
  currentVersionId: string;
  latestVersionId: string;
  createdAt: string;
  updatedAt: string;
}

export interface WholesaleTier {
  minQuantity: number;
  pricePerUnitCents: number;
}

export interface RawMaterial {
  id: string; // CUID2
  supplierVendorId: string;
  supplierName: string;
  title: string;
  description: string;
  category: string; // e.g. "Clays & Glazes", "Hardwood Timber", "Yarns & Dyes", "Brass & Copper Wires", "Leather Sheets"
  unit: string; // e.g. "kg", "meter", "board-foot", "spool", "sq-ft"
  images: string[];
  moq: number; // Minimum Order Quantity
  inStockQuantity: number;
  tieredPricing: WholesaleTier[];
  origin: string; // e.g. "Chittagong Hill Tracts", "Sylhet Valley", "Imported Grade A"
  rating: number;
}

export interface CartCustomSelection {
  optionLabel: string;
  value: string;
  priceModifierCents: number;
}

export interface CartItem {
  id: string; // CUID2
  productId?: string;
  rawMaterialId?: string;
  itemType: 'product' | 'raw_material';
  title: string;
  image: string;
  unitPriceCents: number;
  quantity: number;
  vendorId: string;
  vendorName: string;
  isCustomizable?: boolean;
  customSelections?: CartCustomSelection[];
  customNote?: string;
  unitLabel?: string; // for raw materials e.g. "kg"
}

export interface Address {
  id: string;
  recipientName: string;
  phone: string;
  addressLine: string;
  division: string;
  district: string;
  upazila: string;
  postalCode: string;
  isDefault?: boolean;
  deliveryNote?: string;
}

export interface CourierProvider {
  id: string;
  code: string;
  name: string;
  logo: string;
  estimatedDeliveryDays: string;
  basePriceCents: number;
  codSupported: boolean;
}

export type PaymentMethod = 'cod' | 'bkash' | 'sslcommerz';
export type OrderStatus = 'placed' | 'processing' | 'crafting' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentStatus = 'pending' | 'authorized' | 'paid' | 'failed' | 'refunded';

export interface OrderItemSnapshot {
  id: string;
  itemType: 'product' | 'raw_material';
  title: string;
  image: string;
  unitPriceCents: number;
  quantity: number;
  vendorId: string;
  vendorName: string;
  customSelections?: CartCustomSelection[];
  customNote?: string;
}

export interface VendorOrder {
  id: string; // CUID2
  vendorProfileId: string;
  vendorName: string;
  items: OrderItemSnapshot[];
  subtotalCents: number;
  shippingFeeCents: number;
  status: OrderStatus;
  courierName: string;
  trackingNumber?: string;
  estimatedDelivery: string;
}

export interface Order {
  id: string; // CUID2 order transaction ID
  buyerUserId: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  shippingAddressSnapshot: Address;
  vendorOrders: VendorOrder[];
  totalAmountCents: number;
  subtotalCents: number;
  totalShippingCents: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  createdAt: string;
}

export interface ProductReview {
  id: string; // CUID2
  productId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number; // 1-5
  title: string;
  comment: string;
  status: 'approved' | 'pending' | 'rejected';
  createdAt: string;
}

export interface VendorSettlement {
  id: string;
  vendorProfileId: string;
  vendorName: string;
  periodStart: string;
  periodEnd: string;
  grossAmountCents: number;
  commissionCents: number;
  netAmountCents: number;
  status: 'pending_review' | 'approved' | 'paid';
  paidAt?: string;
  createdAt: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning';
  title: string;
  message: string;
}
