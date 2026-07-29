import React, { useState } from 'react';
import { VendorProfile, Product, Order, VendorSettlement, OrderStatus } from '../types';
import { formatPrice } from '../utils/cuid';
import { 
  Store, Package, Plus, Truck, DollarSign, 
  MapPin, Clock, Sparkles, CheckCircle, Sliders, Shield 
} from 'lucide-react';

interface SellerDashboardViewProps {
  vendorProfile: VendorProfile | undefined;
  products: Product[];
  orders: Order[];
  settlements: VendorSettlement[];
  onAddProduct: (productData: any) => void;
  onUpdateOrderStatus: (orderId: string, vendorOrderId: string, status: OrderStatus, trackingNumber?: string) => void;
  onApplySeller: () => void;
}

export const SellerDashboardView: React.FC<SellerDashboardViewProps> = ({
  vendorProfile,
  products,
  orders,
  settlements,
  onAddProduct,
  onUpdateOrderStatus,
  onApplySeller
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'payouts'>('overview');
  const [showAddProductModal, setShowAddProductModal] = useState(false);

  // New product form
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newCategory, setNewCategory] = useState<any>('pottery');
  const [newPriceBDT, setNewPriceBDT] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newCraftDays, setNewCraftDays] = useState('3');
  const [isCustomizable, setIsCustomizable] = useState(true);
  const [customTextLabel, setCustomTextLabel] = useState('Custom Engraved Name / Date');

  if (!vendorProfile) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 bg-amber-100 text-amber-900 rounded-2xl flex items-center justify-center mx-auto shadow-md">
          <Store className="w-8 h-8" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-stone-900">
          Become a Seller on The Artisan's Market
        </h1>
        <p className="text-stone-600 max-w-md mx-auto text-sm">
          You haven't registered an artisan shop profile yet. Apply today to showcase your pottery, weavers, carvings, or wholesale raw materials to nationwide buyers.
        </p>
        <button
          onClick={onApplySeller}
          className="px-6 py-3 bg-amber-950 text-amber-100 rounded-xl font-bold text-sm hover:bg-amber-900 transition-colors cursor-pointer"
        >
          Apply for Seller Profile
        </button>
      </div>
    );
  }

  // Filter vendor's own orders
  const vendorOrdersList: Array<{ orderId: string; vendorOrderId: string; buyerName: string; buyerPhone: string; items: any[]; status: OrderStatus; subtotalCents: number; courierName: string; trackingNumber?: string }> = [];

  orders.forEach(o => {
    o.vendorOrders.forEach(v => {
      if (v.vendorProfileId === vendorProfile.id || true) { // For demo purposes, shows active orders
        vendorOrdersList.push({
          orderId: o.id,
          vendorOrderId: v.id,
          buyerName: o.buyerName,
          buyerPhone: o.buyerPhone,
          items: v.items,
          status: v.status,
          subtotalCents: v.subtotalCents,
          courierName: v.courierName,
          trackingNumber: v.trackingNumber
        });
      }
    });
  });

  const vendorProducts = products.filter(p => p.vendorProfileId === vendorProfile.id || true);

  const handleCreateProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newPriceBDT || !newImageUrl) return;

    const priceCents = Math.round(parseFloat(newPriceBDT) * 100);

    onAddProduct({
      vendorProfileId: vendorProfile.id,
      vendorName: vendorProfile.displayName,
      vendorSlug: vendorProfile.publicSlug,
      vendorLocation: vendorProfile.workshopLocation,
      title: newTitle,
      description: newDescription || 'Beautiful handcrafted piece created with authentic materials.',
      category: newCategory,
      tags: [newCategory, 'Handcrafted', 'Artisan'],
      priceCents,
      images: [newImageUrl],
      inStockQuantity: 15,
      isCustomizable,
      customizationOptions: isCustomizable ? [
        {
          id: 'opt_1',
          type: 'text',
          label: customTextLabel,
          placeholder: 'e.g. "Anika & Fahim - 2026"',
          required: false,
          priceModifierCents: 20000
        }
      ] : [],
      materialsUsed: ['Authentic Natural Materials'],
      craftTimeDays: parseInt(newCraftDays) || 3,
      rating: 5.0,
      reviewCount: 0
    });

    setShowAddProductModal(false);
    setNewTitle('');
    setNewDescription('');
    setNewPriceBDT('');
    setNewImageUrl('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Artisan Shop Banner Header */}
      <div className="bg-gradient-to-r from-amber-950 via-amber-900 to-stone-900 text-amber-100 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={vendorProfile.avatarUrl || 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&q=80&w=300'}
            alt={vendorProfile.displayName}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-400 shadow-md shrink-0"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl font-bold text-white">{vendorProfile.displayName}</h1>
              <span className="bg-amber-400/20 text-amber-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase border border-amber-400/30">
                {vendorProfile.status}
              </span>
            </div>
            <p className="text-xs text-amber-200/80 mt-0.5">{vendorProfile.craftSpecialty} • {vendorProfile.workshopLocation}</p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-amber-900/60 p-1 rounded-2xl border border-amber-800/60">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'overview' ? 'bg-amber-100 text-amber-950 shadow-sm' : 'text-amber-200 hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'products' ? 'bg-amber-100 text-amber-950 shadow-sm' : 'text-amber-200 hover:text-white'
            }`}
          >
            Products ({vendorProducts.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'orders' ? 'bg-amber-100 text-amber-950 shadow-sm' : 'text-amber-200 hover:text-white'
            }`}
          >
            Orders Received ({vendorOrdersList.length})
          </button>
          <button
            onClick={() => setActiveTab('payouts')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'payouts' ? 'bg-amber-100 text-amber-950 shadow-sm' : 'text-amber-200 hover:text-white'
            }`}
          >
            Settlements
          </button>
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-1">
              <span className="text-stone-500 text-xs font-medium block">Total Sales Revenue</span>
              <span className="font-serif text-2xl font-bold text-stone-900">৳26,500</span>
              <span className="text-[11px] text-emerald-700 font-semibold block">+12% this month</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-1">
              <span className="text-stone-500 text-xs font-medium block">Active Product Listings</span>
              <span className="font-serif text-2xl font-bold text-stone-900">{vendorProducts.length}</span>
              <span className="text-[11px] text-stone-500 block">4 customizable items</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-1">
              <span className="text-stone-500 text-xs font-medium block">Pending Orders</span>
              <span className="font-serif text-2xl font-bold text-amber-900">{vendorOrdersList.filter(o => o.status !== 'delivered').length}</span>
              <span className="text-[11px] text-amber-800 font-semibold block">Requires crafting & shipping</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-1">
              <span className="text-stone-500 text-xs font-medium block">Artisan Rating</span>
              <span className="font-serif text-2xl font-bold text-stone-900">4.9 / 5.0</span>
              <span className="text-[11px] text-stone-500 block">48 verified buyer reviews</span>
            </div>
          </div>

          {/* Quick Action: List New Item */}
          <div className="p-6 bg-amber-50 rounded-2xl border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-serif text-lg font-bold text-stone-900">Ready to showcase a new handcrafted piece?</h3>
              <p className="text-xs text-stone-600">Add product images, customization parameters, and craft lead time.</p>
            </div>
            <button
              onClick={() => setShowAddProductModal(true)}
              className="px-5 py-2.5 bg-amber-950 hover:bg-amber-900 text-amber-100 rounded-xl font-bold text-xs shadow-md transition-colors cursor-pointer flex items-center gap-2 shrink-0"
            >
              <Plus className="w-4 h-4 text-amber-400" />
              List New Handcrafted Item
            </button>
          </div>
        </div>
      )}

      {/* Products Tab */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl font-bold text-stone-900">Your Handcrafted Product Listings</h2>
            <button
              onClick={() => setShowAddProductModal(true)}
              className="px-4 py-2 bg-amber-950 hover:bg-amber-900 text-amber-100 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4 text-amber-400" />
              Add Listing
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vendorProducts.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl border border-stone-200 p-4 shadow-xs space-y-3">
                <img src={p.images[0]} alt={p.title} className="w-full h-40 object-cover rounded-xl bg-stone-100 border border-stone-200" />
                <div>
                  <span className="text-[10px] font-bold uppercase text-amber-900 tracking-wider">{p.category}</span>
                  <h3 className="font-serif font-bold text-stone-900 text-sm line-clamp-1">{p.title}</h3>
                  <p className="font-serif font-bold text-stone-900 text-base mt-1">{formatPrice(p.priceCents)}</p>
                </div>
                <div className="flex items-center justify-between text-xs pt-2 border-t border-stone-100 text-stone-500">
                  <span>Stock: {p.inStockQuantity}</span>
                  <span>{p.isCustomizable ? 'Customizable' : 'Standard'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <h2 className="font-serif text-xl font-bold text-stone-900">Customer Custom Orders Received</h2>
          {vendorOrdersList.length === 0 ? (
            <p className="text-xs text-stone-500">No orders received yet.</p>
          ) : (
            <div className="space-y-4">
              {vendorOrdersList.map((vOrder) => (
                <div key={vOrder.vendorOrderId} className="bg-white rounded-2xl border border-stone-200 p-5 space-y-4 shadow-xs">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 pb-3 text-xs">
                    <div>
                      <span className="text-stone-400 block text-[10px]">Buyer Details</span>
                      <span className="font-bold text-stone-900">{vOrder.buyerName}</span> ({vOrder.buyerPhone})
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px]">Courier Partner</span>
                      <span className="font-semibold text-stone-800">{vOrder.courierName}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px]">Order Value</span>
                      <span className="font-serif font-bold text-amber-950 text-base">{formatPrice(vOrder.subtotalCents)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-stone-600">Status:</span>
                      <select
                        value={vOrder.status}
                        onChange={(e) => onUpdateOrderStatus(vOrder.orderId, vOrder.vendorOrderId, e.target.value as OrderStatus, vOrder.trackingNumber || 'PTH-BD-998811')}
                        className="px-3 py-1 bg-amber-50 border border-amber-300 rounded-lg text-xs font-bold text-amber-950 focus:outline-none cursor-pointer"
                      >
                        <option value="placed">Placed</option>
                        <option value="processing">Processing</option>
                        <option value="crafting">Handcrafting in Studio</option>
                        <option value="shipped">Handed to Courier (Shipped)</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </div>
                  </div>

                  {/* Purchased Items & Custom Notes */}
                  <div className="space-y-3">
                    {vOrder.items.map((item: any) => (
                      <div key={item.id} className="flex items-center gap-3 text-xs bg-stone-50 p-3 rounded-xl border border-stone-200/80">
                        <img src={item.image} alt={item.title} className="w-12 h-12 rounded-lg object-cover border border-stone-200" />
                        <div className="flex-1">
                          <p className="font-bold text-stone-900">{item.title} x {item.quantity}</p>
                          {item.customSelections && item.customSelections.length > 0 && (
                            <div className="flex flex-wrap gap-1 text-[11px] text-amber-950 mt-1">
                              {item.customSelections.map((sel: any, idx: number) => (
                                <span key={idx} className="bg-amber-100 border border-amber-300 px-2 py-0.5 rounded font-medium">
                                  Custom {sel.optionLabel}: "{sel.value}"
                                </span>
                              ))}
                            </div>
                          )}
                          {item.customNote && (
                            <p className="text-[11px] text-stone-600 italic mt-1">
                              Custom Instructions: "{item.customNote}"
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Payouts Tab */}
      {activeTab === 'payouts' && (
        <div className="space-y-6">
          <h2 className="font-serif text-xl font-bold text-stone-900">Artisan Payouts & Settlement Ledgers</h2>
          {settlements.length === 0 ? (
            <p className="text-xs text-stone-500">No settlements generated yet.</p>
          ) : (
            <div className="space-y-3">
              {settlements.map((s) => (
                <div key={s.id} className="p-4 bg-white rounded-2xl border border-stone-200 flex flex-wrap items-center justify-between gap-4 text-xs shadow-xs">
                  <div>
                    <span className="text-stone-400 block text-[10px]">Settlement ID</span>
                    <span className="font-mono font-bold text-stone-900">{s.id}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">Gross Sales</span>
                    <span className="font-semibold text-stone-800">{formatPrice(s.grossAmountCents)}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">Platform Fee (5%)</span>
                    <span className="font-semibold text-stone-600">-{formatPrice(s.commissionCents)}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">Net Payout Owed</span>
                    <span className="font-serif font-bold text-emerald-900 text-base">{formatPrice(s.netAmountCents)}</span>
                  </div>
                  <span className="bg-emerald-100 text-emerald-900 font-bold px-3 py-1 rounded-full uppercase text-[10px]">
                    {s.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Add Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-stone-200">
            <h3 className="font-serif text-xl font-bold text-stone-900">List New Handcrafted Product</h3>

            <form onSubmit={handleCreateProductSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-stone-800 block mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hand-Carved Teak Water Pitcher"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-800 block mb-1">Category *</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl"
                >
                  <option value="pottery">Pottery & Clay</option>
                  <option value="woodwork">Teak & Woodcraft</option>
                  <option value="textiles">Jamdani & Textiles</option>
                  <option value="glass_resin">Resin & Botanical</option>
                  <option value="jewelry">Silver & Jewelry</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-stone-800 block mb-1">Price in BDT (৳) *</label>
                  <input
                    type="number"
                    required
                    placeholder="2450"
                    value={newPriceBDT}
                    onChange={(e) => setNewPriceBDT(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-semibold text-stone-800 block mb-1">Handcraft Lead Days</label>
                  <input
                    type="number"
                    value={newCraftDays}
                    onChange={(e) => setNewCraftDays(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-stone-800 block mb-1">Product Image URL *</label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/photo-..."
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-800 block mb-1">Description & Craft Story</label>
                <textarea
                  rows={2}
                  placeholder="Describe kiln process, clay origin, wood grain finish..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isCustomizableCheck"
                  checked={isCustomizable}
                  onChange={(e) => setIsCustomizable(e.target.checked)}
                  className="w-4 h-4 text-amber-900 rounded cursor-pointer"
                />
                <label htmlFor="isCustomizableCheck" className="font-semibold text-stone-800 cursor-pointer">
                  Allow Custom Engraving / Monogram Text Option
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setShowAddProductModal(false)}
                  className="px-4 py-2 border border-stone-300 rounded-xl text-stone-700 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-950 text-amber-100 rounded-xl font-bold cursor-pointer hover:bg-amber-900"
                >
                  Publish Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
