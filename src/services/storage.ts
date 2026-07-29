import { 
  User, VendorProfile, Product, RawMaterial, CartItem, Order, 
  ProductReview, VendorSettlement, VendorStatus, OrderStatus 
} from '../types';
import { 
  INITIAL_USERS, INITIAL_VENDORS, INITIAL_PRODUCTS, 
  INITIAL_RAW_MATERIALS, INITIAL_ORDERS, INITIAL_REVIEWS 
} from '../data/mockData';
import { createCuid } from '../utils/cuid';

const KEYS = {
  CURRENT_USER: 'artisan_market_current_user',
  VENDORS: 'artisan_market_vendors',
  PRODUCTS: 'artisan_market_products',
  RAW_MATERIALS: 'artisan_market_raw_materials',
  CART: 'artisan_market_cart',
  WISHLIST: 'artisan_market_wishlist',
  ORDERS: 'artisan_market_orders',
  REVIEWS: 'artisan_market_reviews',
  SETTLEMENTS: 'artisan_market_settlements'
};

class StorageService {
  private listeners: Array<() => void> = [];

  constructor() {
    this.initDefaults();
  }

  private initDefaults() {
    if (!localStorage.getItem(KEYS.CURRENT_USER)) {
      localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(INITIAL_USERS[0]));
    }
    if (!localStorage.getItem(KEYS.VENDORS)) {
      localStorage.setItem(KEYS.VENDORS, JSON.stringify(INITIAL_VENDORS));
    }
    if (!localStorage.getItem(KEYS.PRODUCTS)) {
      localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
    }
    if (!localStorage.getItem(KEYS.RAW_MATERIALS)) {
      localStorage.setItem(KEYS.RAW_MATERIALS, JSON.stringify(INITIAL_RAW_MATERIALS));
    }
    if (!localStorage.getItem(KEYS.CART)) {
      localStorage.setItem(KEYS.CART, JSON.stringify([]));
    }
    if (!localStorage.getItem(KEYS.WISHLIST)) {
      localStorage.setItem(KEYS.WISHLIST, JSON.stringify([INITIAL_PRODUCTS[0].id]));
    }
    if (!localStorage.getItem(KEYS.ORDERS)) {
      localStorage.setItem(KEYS.ORDERS, JSON.stringify(INITIAL_ORDERS));
    }
    if (!localStorage.getItem(KEYS.REVIEWS)) {
      localStorage.setItem(KEYS.REVIEWS, JSON.stringify(INITIAL_REVIEWS));
    }
    if (!localStorage.getItem(KEYS.SETTLEMENTS)) {
      const demoSettlements: VendorSettlement[] = [
        {
          id: createCuid('set_'),
          vendorProfileId: INITIAL_VENDORS[0].id,
          vendorName: INITIAL_VENDORS[0].displayName,
          periodStart: '2026-07-01T00:00:00Z',
          periodEnd: '2026-07-25T00:00:00Z',
          grossAmountCents: 1540000, // ৳15,400
          commissionCents: 77000,    // 5% commission = ৳770
          netAmountCents: 1463000,   // ৳14,630
          status: 'paid',
          paidAt: '2026-07-26T10:00:00Z',
          createdAt: '2026-07-25T18:00:00Z'
        }
      ];
      localStorage.setItem(KEYS.SETTLEMENTS, JSON.stringify(demoSettlements));
    }
  }

  public subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach(l => l());
  }

  // --- USER & ROLE MANAGEMENT ---
  public getCurrentUser(): User {
    const raw = localStorage.getItem(KEYS.CURRENT_USER);
    return raw ? JSON.parse(raw) : INITIAL_USERS[0];
  }

  public setCurrentUserRole(role: User['role']) {
    const user = this.getCurrentUser();
    user.role = role;
    localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(user));
    this.notify();
  }

  // --- VENDORS ---
  public getVendors(): VendorProfile[] {
    const raw = localStorage.getItem(KEYS.VENDORS);
    return raw ? JSON.parse(raw) : INITIAL_VENDORS;
  }

  public getVendorByUserId(userId: string): VendorProfile | undefined {
    return this.getVendors().find(v => v.ownerUserId === userId);
  }

  public submitVendorApplication(appData: {
    displayName: string;
    publicSlug: string;
    craftSpecialty: string;
    description: string;
    workshopLocation: string;
    supportEmail: string;
    supportPhone: string;
    allowCod: boolean;
    avatarUrl?: string;
    bannerUrl?: string;
  }): VendorProfile {
    const user = this.getCurrentUser();
    const existingVendors = this.getVendors();

    const newVendor: VendorProfile = {
      id: createCuid('v_'),
      organizationId: createCuid('org_'),
      ownerUserId: user.id,
      publicSlug: appData.publicSlug || appData.displayName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      displayName: appData.displayName,
      legalName: appData.displayName,
      status: 'approved', // Auto-approved for smooth demonstration
      craftSpecialty: appData.craftSpecialty,
      description: appData.description,
      workshopLocation: appData.workshopLocation,
      supportEmail: appData.supportEmail,
      supportPhone: appData.supportPhone,
      allowCod: appData.allowCod,
      rating: 5.0,
      reviewCount: 0,
      verifiedArtisan: true,
      avatarUrl: appData.avatarUrl || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300',
      bannerUrl: appData.bannerUrl || 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=1200',
      submittedAt: new Date().toISOString(),
      approvedAt: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };

    existingVendors.unshift(newVendor);
    localStorage.setItem(KEYS.VENDORS, JSON.stringify(existingVendors));

    // Update current user role to vendor_user
    this.setCurrentUserRole('vendor_user');
    this.notify();
    return newVendor;
  }

  public updateVendorStatus(vendorId: string, status: VendorStatus, reason?: string) {
    const vendors = this.getVendors();
    const vendor = vendors.find(v => v.id === vendorId);
    if (vendor) {
      vendor.status = status;
      if (reason) vendor.statusReason = reason;
      localStorage.setItem(KEYS.VENDORS, JSON.stringify(vendors));
      this.notify();
    }
  }

  // --- PRODUCTS ---
  public getProducts(): Product[] {
    const raw = localStorage.getItem(KEYS.PRODUCTS);
    return raw ? JSON.parse(raw) : INITIAL_PRODUCTS;
  }

  public addProduct(product: Omit<Product, 'id' | 'currentVersionId' | 'latestVersionId' | 'createdAt' | 'updatedAt'>): Product {
    const products = this.getProducts();
    const id = createCuid('prod_');
    const newProduct: Product = {
      ...product,
      id,
      currentVersionId: 'v1',
      latestVersionId: 'v1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    products.unshift(newProduct);
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products));
    this.notify();
    return newProduct;
  }

  // --- RAW MATERIALS ---
  public getRawMaterials(): RawMaterial[] {
    const raw = localStorage.getItem(KEYS.RAW_MATERIALS);
    return raw ? JSON.parse(raw) : INITIAL_RAW_MATERIALS;
  }

  // --- CART ---
  public getCart(): CartItem[] {
    const raw = localStorage.getItem(KEYS.CART);
    return raw ? JSON.parse(raw) : [];
  }

  public addToCart(item: Omit<CartItem, 'id'>) {
    const cart = this.getCart();
    const id = createCuid('cart_');
    
    // Check if identical item already in cart
    const existingIndex = cart.findIndex(c => 
      c.productId === item.productId && 
      c.rawMaterialId === item.rawMaterialId &&
      JSON.stringify(c.customSelections) === JSON.stringify(item.customSelections)
    );

    if (existingIndex > -1) {
      cart[existingIndex].quantity += item.quantity;
    } else {
      cart.push({ ...item, id });
    }

    localStorage.setItem(KEYS.CART, JSON.stringify(cart));
    this.notify();
  }

  public updateCartQuantity(cartItemId: string, quantity: number) {
    let cart = this.getCart();
    if (quantity <= 0) {
      cart = cart.filter(i => i.id !== cartItemId);
    } else {
      const item = cart.find(i => i.id === cartItemId);
      if (item) item.quantity = quantity;
    }
    localStorage.setItem(KEYS.CART, JSON.stringify(cart));
    this.notify();
  }

  public removeFromCart(cartItemId: string) {
    const cart = this.getCart().filter(i => i.id !== cartItemId);
    localStorage.setItem(KEYS.CART, JSON.stringify(cart));
    this.notify();
  }

  public clearCart() {
    localStorage.setItem(KEYS.CART, JSON.stringify([]));
    this.notify();
  }

  // --- WISHLIST ---
  public getWishlist(): string[] {
    const raw = localStorage.getItem(KEYS.WISHLIST);
    return raw ? JSON.parse(raw) : [];
  }

  public toggleWishlist(productId: string): boolean {
    let wishlist = this.getWishlist();
    let isAdded = false;
    if (wishlist.includes(productId)) {
      wishlist = wishlist.filter(id => id !== productId);
    } else {
      wishlist.push(productId);
      isAdded = true;
    }
    localStorage.setItem(KEYS.WISHLIST, JSON.stringify(wishlist));
    this.notify();
    return isAdded;
  }

  // --- ORDERS ---
  public getOrders(): Order[] {
    const raw = localStorage.getItem(KEYS.ORDERS);
    return raw ? JSON.parse(raw) : INITIAL_ORDERS;
  }

  public placeOrder(
    buyerName: string,
    buyerEmail: string,
    buyerPhone: string,
    shippingAddress: Order['shippingAddressSnapshot'],
    paymentMethod: Order['paymentMethod'],
    courierName: string
  ): Order {
    const cart = this.getCart();
    const user = this.getCurrentUser();
    const orders = this.getOrders();

    // Group cart items by vendor
    const itemsByVendor: Record<string, CartItem[]> = {};
    cart.forEach(item => {
      if (!itemsByVendor[item.vendorId]) {
        itemsByVendor[item.vendorId] = [];
      }
      itemsByVendor[item.vendorId].push(item);
    });

    const vendorOrders = Object.entries(itemsByVendor).map(([vendorId, items]) => {
      const vendorName = items[0].vendorName;
      const subtotalCents = items.reduce((sum, item) => {
        const itemCustoms = item.customSelections?.reduce((s, c) => s + c.priceModifierCents, 0) || 0;
        return sum + (item.unitPriceCents + itemCustoms) * item.quantity;
      }, 0);
      const shippingFeeCents = 6000; // ৳60 per vendor

      return {
        id: createCuid('vord_'),
        vendorProfileId: vendorId,
        vendorName,
        items: items.map(i => ({
          id: createCuid('item_'),
          itemType: i.itemType,
          title: i.title,
          image: i.image,
          unitPriceCents: i.unitPriceCents,
          quantity: i.quantity,
          vendorId: i.vendorId,
          vendorName: i.vendorName,
          customSelections: i.customSelections,
          customNote: i.customNote
        })),
        subtotalCents,
        shippingFeeCents,
        status: 'placed' as OrderStatus,
        courierName,
        estimatedDelivery: '3-4 Days Doorstep'
      };
    });

    const subtotalCents = vendorOrders.reduce((sum, vo) => sum + vo.subtotalCents, 0);
    const totalShippingCents = vendorOrders.reduce((sum, vo) => sum + vo.shippingFeeCents, 0);
    const totalAmountCents = subtotalCents + totalShippingCents;

    const newOrder: Order = {
      id: createCuid('ord_'),
      buyerUserId: user.id,
      buyerName,
      buyerEmail,
      buyerPhone,
      shippingAddressSnapshot: { ...shippingAddress },
      vendorOrders,
      subtotalCents,
      totalShippingCents,
      totalAmountCents,
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
      status: 'placed',
      createdAt: new Date().toISOString()
    };

    orders.unshift(newOrder);
    localStorage.setItem(KEYS.ORDERS, JSON.stringify(orders));
    this.clearCart();
    this.notify();
    return newOrder;
  }

  public updateVendorOrderStatus(orderId: string, vendorOrderId: string, status: OrderStatus, trackingNumber?: string) {
    const orders = this.getOrders();
    const order = orders.find(o => o.id === orderId);
    if (order) {
      const vOrder = order.vendorOrders.find(v => v.id === vendorOrderId);
      if (vOrder) {
        vOrder.status = status;
        if (trackingNumber) vOrder.trackingNumber = trackingNumber;
        
        // Derive master order status
        const allStatus = order.vendorOrders.map(v => v.status);
        if (allStatus.every(s => s === 'delivered')) {
          order.status = 'delivered';
        } else if (allStatus.some(s => s === 'shipped' || s === 'crafting')) {
          order.status = 'shipped';
        }

        localStorage.setItem(KEYS.ORDERS, JSON.stringify(orders));
        this.notify();
      }
    }
  }

  // --- REVIEWS ---
  public getReviews(): ProductReview[] {
    const raw = localStorage.getItem(KEYS.REVIEWS);
    return raw ? JSON.parse(raw) : INITIAL_REVIEWS;
  }

  public addReview(review: Omit<ProductReview, 'id' | 'createdAt' | 'status'>): ProductReview {
    const reviews = this.getReviews();
    const newRev: ProductReview = {
      ...review,
      id: createCuid('rev_'),
      status: 'approved',
      createdAt: new Date().toISOString()
    };
    reviews.unshift(newRev);
    localStorage.setItem(KEYS.REVIEWS, JSON.stringify(reviews));
    this.notify();
    return newRev;
  }

  // --- SETTLEMENTS ---
  public getSettlements(): VendorSettlement[] {
    const raw = localStorage.getItem(KEYS.SETTLEMENTS);
    return raw ? JSON.parse(raw) : [];
  }
}

export const storageService = new StorageService();
